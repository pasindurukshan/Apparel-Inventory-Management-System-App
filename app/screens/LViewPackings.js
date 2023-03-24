import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import InsertRawMaterial from '../screens/InsertRawMaterial';

const LViewPackings = ({ navigation }) => {

    const [packinfo, setPackInfo] = useState([]);

    useEffect(() => {
        const packRef = collection(FIRESTORE_DB, 'packing');

        const subscriber = onSnapshot(packRef, {
            next: (snapshot) => {
                const info = [];
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data());

                    info.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setPackInfo(info);
            }
        });
        return () => subscriber();
    }, []);

    const renderPackItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("LUpdatePackings", { item });
            }}>
            <View style={styles.rawItemContainer}>
                <Text style={styles.listItem}>OrderID   :              {item.orderID}</Text>
                <Text style={styles.listItem}>Customer  :           {item.customer}</Text>
                <Text style={styles.listItem}>Category  :            {item.category}</Text>
                <Text style={styles.listItem}>Payment  :             {item.payment}</Text>
                <Text style={styles.listItem}>Quantity   :            {item.quantity}</Text>
                <Text style={styles.listItem}>Weight      :            {item.weight}</Text>
                <Text style={styles.listItem}>DueDate   :            {item.dueDate}</Text>
                <Text style={styles.listItem}>Address   :            {item.address}</Text>
            </View>
        </TouchableOpacity>
    );


    const renderItemList = ({ item }) => (
        <FlatList
            style={styles.list}
            data={packinfo.filter(pack => pack.orderID === item.orderID)}
            renderItem={renderPackItem}
            keyExtractor={(raw) => raw.id}
        />
    );

    const groupedPackInfo = Object.values(packinfo.reduce((acc, cur) => {
        const key = cur.orderID;
        if (!acc[key]) {
            acc[key] = { orderID: key };
        }
        acc[key].data = [...(acc[key].data || []), cur];
        return acc;
    }, {}));



    return (
        <View>
            {packinfo.length > 0 && (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={groupedPackInfo}
                        renderItem={renderItemList}
                        keyExtractor={(item) => item.orderID}
                    />
                </ScrollView>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('LAddNewPacking')}>
                <View style={styles.button}>
                    <Text style={styles.text} >Back</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 105,
    },
    list: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,
        padding: 15
    },
    listItem: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'purple',
        marginTop: 35,
        width: 60,
        height: 60,
        borderRadius: 50
    },
    button: {
        backgroundColor: 'purple',
        width: "15%",
        height: 40,
        borderRadius: 50
    },
    text: {
        color: 'white',
        padding: 10
    }
});


export default LViewPackings