import { View, Text } from 'react-native'
import React from 'react'
import { db } from './firebase'
import { collection, getDocs, deleteDoc, doc, userDoc } from 'firebase/firestore'

export default function DataView() {
    const colRef = collection(db, 'Admin')

    getDocs(colRef)
        .then((snapshot) => {
            console.log(snapshot.docs)
        })
    return (
        <View>
            <Text>view</Text>
        </View>
    )
}