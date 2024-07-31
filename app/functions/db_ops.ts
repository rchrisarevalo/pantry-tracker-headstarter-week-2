import { firestore } from "@/firebase"
import { collection, DocumentData, getDocs, addDoc, Query, query, QuerySnapshot } from "firebase/firestore"

import React from "react"
import { PantryItem } from "../page"

export const updatePantry = async () => {
    
}

export const addToPantry = async () => {

}

export const removeFromPantry = async () => {

}

export const retrieveFromPantry = async (setPantryItems: React.Dispatch<React.SetStateAction<any[]>>) => {
    const item: Query<DocumentData, DocumentData> = query(collection(firestore, 'pantry-inventory'))
    const snapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(item)
    const pantryItems: any[] = []
    snapshot.forEach((doc) => {
        pantryItems.push({
            name: doc.id,
            ...doc.data()
        })
    })
    setPantryItems(pantryItems)
    console.log(pantryItems)
}