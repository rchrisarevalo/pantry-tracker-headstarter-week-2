import { firestore } from "@/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  addDoc,
  Query,
  query,
  QuerySnapshot,
  CollectionReference,
  DocumentReference,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import React from "react";
import { PantryItem } from "../page";

export const addToPantry = async (
  setPantryItems: React.Dispatch<React.SetStateAction<any[]>>,
  setAlertTriggered: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
  form: PantryItem
): Promise<void> => {
  const collect: CollectionReference<DocumentData, DocumentData> = collection(
    firestore,
    "pantry-inventory"
  );
  const document: DocumentReference<DocumentData, DocumentData> = doc(
    collect,
    form.name
  );

  // Set alert triggered to false by default
  // in case the state is currently set to
  // true.
  setAlertTriggered(false);

  // Check to see if the instance of the item
  // that is about to be added exists.
  const docSnap = await getDoc(document);

  // If item does not exist in database,
  // add it.
  //
  // Otherwise, don't add it to DB.
  if (!docSnap.exists()) {
    await setDoc(document, { count: form.count });
    await retrieveFromPantry(setPantryItems);
    setDisplayModal(false);
  } else {
    setAlertTriggered(true);
  }
};

export const updatePantry = async (
  setPantryItems: React.Dispatch<React.SetStateAction<any[]>>,
  setAlertTriggered: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
  form: PantryItem
): Promise<void> => {
  const collect: CollectionReference<DocumentData, DocumentData> = collection(
    firestore,
    "pantry-inventory"
  );
  const document: DocumentReference<DocumentData, DocumentData> = doc(
    collect,
    form.name
  );

  // Set alert triggered to false by default
  // in case the state is currently set to
  // true.
  setAlertTriggered(false);

  // Unlike the addToPantry function, where an error
  // is generated if an instance of an item already
  // exists when attempting to add it to the DB,
  // the item has to exist in order to update the
  // quantity of the item that is about to be
  // updated.
  const docSnap = await getDoc(document);

  // If the item exists, then update it.
  //
  // Otherwise, don't.
  if (docSnap.exists()) {
    await setDoc(document, { count: form.count });
    await retrieveFromPantry(setPantryItems);
    setDisplayModal(false);
  } else {
    setAlertTriggered(true);
  }
};

export const removeFromPantry = async (
  setPantryItems: React.Dispatch<React.SetStateAction<any[]>>,
  setAlertTriggered: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
  form: PantryItem
): Promise<void> => {
  const collect: CollectionReference<DocumentData, DocumentData> = collection(
    firestore,
    "pantry-inventory"
  );
  const document: DocumentReference<DocumentData, DocumentData> = doc(
    collect,
    form.name
  );

  // Set alert triggered to false by default
  // in case the state is currently set to
  // true.
  setAlertTriggered(false);

  // Unlike the addToPantry function, where an error
  // is generated if an instance of an item already
  // exists when attempting to add it to the DB,
  // the item has to exist in order to update the
  // quantity of the item that is about to be
  // updated.
  const docSnap = await getDoc(document);
  
  // Retrieve the quantity of the item
  // in question.
  const { count } = docSnap.data()

  // If the item exists, and the new count to remove
  // a certain quantity is less than the original
  // quantity of the same item, proceed to the following
  // appropriate condition.
  if (docSnap.exists()) {
    // If the new count is less than the current count
    // of a specific item in the pantry, but is not 0,
    // then update the count to be less than the
    // original count retrieved from the database.
    if (form.count != 0 && form.count < parseInt(count)) {
      await setDoc(document, {count: form.count})
      setDisplayModal(false)
    }
    // If the updated count from the form is 0,
    // then delete the item from the pantry.
    else if (form.count == 0) {
      await deleteDoc(document)
      setDisplayModal(false)
    }
    // Otherwise, throw an error.
    else {
      setAlertTriggered(true)
    }

    // Update the pantry.
    await retrieveFromPantry(setPantryItems)
  } else {
    setAlertTriggered(true)
  }
};

export const retrieveFromPantry = async (
  setPantryItems: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const item: Query<DocumentData, DocumentData> = query(
    collection(firestore, "pantry-inventory")
  );
  const snapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(
    item
  );
  const pantryItems: any[] = [];
  snapshot.forEach((doc) => {
    pantryItems.push({
      name: doc.id,
      ...doc.data(),
    });
  });
  setPantryItems(pantryItems);
};
