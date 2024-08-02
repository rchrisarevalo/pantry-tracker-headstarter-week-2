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
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

import React from "react";
import { PantryItem } from "../page";

const itemExists = async (
  form: PantryItem,
  collect: CollectionReference<DocumentData, DocumentData>
): Promise<boolean> => {
  const item: Query<DocumentData, DocumentData> = query(
    collect,
    where("name", "==", form.name)
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

  if (pantryItems.length != 0) {
    return true;
  } else {
    return false;
  }
};

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

  // Set alert triggered to false by default
  // in case the state is currently set to
  // true.
  setAlertTriggered(false)

  // Check to see if the instance of the item
  // that is about to be added exists.
  const exists = await itemExists(form, collect)

  // If item does not exist in database,
  // add it.
  //
  // Otherwise, don't add it to DB.
  if (!exists) {
    await addDoc(collect, form);
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

  // Set alert triggered to false by default
  // in case the state is currently set to
  // true.
  setAlertTriggered(false)

  // Unlike the addToPantry function, where an error
  // is generated if an instance of an item already 
  // exists when attempting to add it to the DB,
  // the item has to exist in order to update the
  // quantity of the item that is about to be
  // updated.
  const exists = await itemExists(form, collect)

  if (exists) {
    await setDoc(doc(firestore, "pantry-inventory", form.name), form)
    await retrieveFromPantry(setPantryItems)
    setDisplayModal(false)
  } else {
    setAlertTriggered(true)
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
    )

    // Set alert triggered to false by default
    // in case the state is currently set to
    // true.
    setAlertTriggered(false)

    // Make sure that the item exists
    // before removing it from the
    // database (or pantry in this
    // case).
    const exists = await itemExists(form, collect)

    // If the item exists, remove it from
    // the database.
    //
    // Otherwise, throw an error.
    if (exists) {
        await deleteDoc(doc(firestore, "pantry-inventory", form.name))
        await retrieveFromPantry(setPantryItems)
        setDisplayModal(false)
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