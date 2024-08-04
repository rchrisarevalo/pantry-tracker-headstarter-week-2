import { firestore } from "@/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  Query,
  query,
  QuerySnapshot,
  CollectionReference,
  DocumentReference,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  where,
} from "firebase/firestore";

import React from "react";
import { PantryItem } from "../pantry/page";

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
    `${form.name}@${form.uid}`,
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
  if (!docSnap.exists() && form.count > 0) {
    await setDoc(document, {
      count: parseInt(form.count.toString()),
      uid: form.uid,
    });
    await retrieveFromPantry(setPantryItems, form.uid);
    setDisplayModal(false);
  } else {
    setAlertTriggered(true);
  }
};

export const updatePantry = async (
  setPantryItems: React.Dispatch<React.SetStateAction<any[]>>,
  item_name: string,
  uid: string | undefined
): Promise<void> => {
  const collect: CollectionReference<DocumentData, DocumentData> = collection(
    firestore,
    "pantry-inventory"
  );
  const document: DocumentReference<DocumentData, DocumentData> = doc(
    collect,
    `${item_name}@${uid}`
  );

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
    const { count } = docSnap.data();
    await setDoc(document, { count: parseInt(count + 1), uid: uid });
    await retrieveFromPantry(setPantryItems, uid);
  }
};

export const removeFromPantry = async (
  setPantryItems: React.Dispatch<React.SetStateAction<any[]>>,
  item_name: string,
  item_qty: number,
  uid: string | undefined
): Promise<void> => {
  // Create a collection instance to access the user's pantry items.
  const collect: CollectionReference<DocumentData, DocumentData> = collection(
    firestore,
    "pantry-inventory"
  );

  // Create a document reference to specify the item the user wants to decrease
  // the quantity of from their pantry.
  const document: DocumentReference<DocumentData, DocumentData> = doc(
    collect,
    `${item_name}@${uid}`
  );

  // Unlike the addToPantry function, where an error
  // is generated if an instance of an item already
  // exists when attempting to add it to the DB,
  // the item has to exist in order to update the
  // quantity of the item that is about to be
  // updated.
  const docSnap = await getDoc(document);

  // If the item exists, and the new count to remove
  // a certain quantity is less than the original
  // quantity of the same item, proceed to the following
  // appropriate condition.
  if (docSnap.exists()) {
    // Retrieve the quantity of the item
    // in question.
    const { count } = docSnap.data();

    // If the next updated item quantity is not zero, and it
    // is less than the quantity retrieved from the database,
    // then decrement the quantity of said item.
    if (item_qty - 1 != 0 && item_qty - 1 < parseInt(count)) {
      await setDoc(document, { count: item_qty - 1, uid: uid });
    }
    // If the next updated count is going to be 0,
    // then delete the item from the pantry.
    else if (item_qty - 1 == 0) {
      await deleteDoc(document);
    }

    // Update the pantry.
    await retrieveFromPantry(setPantryItems, uid);
  }
};

export const retrieveFromPantry = async (
  setPantryItems: React.Dispatch<React.SetStateAction<any[]>>,
  uid: string | undefined
) => {
  // Setup a query to access the collection in the database.
  const item: Query<DocumentData, DocumentData> = query(
    collection(firestore, "pantry-inventory")
  );
  
  // Retrieve the snapshot containing necessary information, such as the
  // item quantity, to display in the user's pantry page.
  const snapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(
    item
  );

  // Create an array to store the pantry items.
  let pantryItems: any[] = [];

  // Iterate through the data retrieved from the database
  // in the snapshot to push it into the pantryItems
  // array.
  snapshot.forEach((doc) => {
    pantryItems.push({
      name: doc.id.split("@")[0],
      ...doc.data(),
    });
  });

  // Filter the pantry items based on the current user's
  // UID (unique ID). This helps uniquely identify
  // the items that are stored in their pantry as opposed
  // to others.
  pantryItems = pantryItems.filter((item) => item.uid == uid)

  // Update the state variable so that the items can be
  // displayed in the user's home page (the pantry).
  setPantryItems(pantryItems);
};
