import { firestore } from "@/firebase"
import { collection, DocumentData, getDocs, addDoc, Query, query, QuerySnapshot, CollectionReference, DocumentReference, setDoc } from "firebase/firestore"

import React from "react"
import { PantryItem } from "../page"

export const updatePantry = async () => {
    
}

export const addToPantry = async (setPantryItems: React.Dispatch<React.SetStateAction<any[]>>, form: PantryItem) => {
    const item: CollectionReference<DocumentData, DocumentData> = collection(firestore, 'pantry-inventory')
    const snapshot: DocumentReference<DocumentData, DocumentData> = await addDoc(item, form)
    
    retrieveFromPantry(setPantryItems)
}

export const removeFromPantry = async () => {

}

export const retrieveFromPantry = async (setPantryItems: React.Dispatch<React.SetStateAction<any[]>>) => {
    const item: Query<DocumentData, DocumentData> = query(collection(firestore, 'pantry-inventory'))
    const snapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(item)
    console.log(snapshot)
    const pantryItems: any[] = []
    snapshot.forEach((doc) => {
        pantryItems.push({
            name: doc.id,
            ...doc.data()
        })
    })
    setPantryItems(pantryItems)
}