import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
            <View style={styles.ItemContainer}>
                <Text style={styles.listItemorder}>OrderID   :              {item.orderID}</Text>
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
        <LinearGradient
            style={styles.background}
            colors={['black', 'purple']}

            start={{
                x: 1.5,
                y: 0.7
            }}

            end={{
                x: 0,
                y: 1
            }}
        >
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.topic}>Packing Report</Text>
                </View>
                {packinfo.length > 0 && (
                    <ScrollView style={styles.container}>
                        <FlatList
                            data={groupedPackInfo}
                            renderItem={renderItemList}
                            keyExtractor={(item) => item.orderID}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate("LAddNewPacking")}
                        >
                            <Ionicons name="add-circle-outline" size={70} color="white" />
                        </TouchableOpacity>
                    </ScrollView>
                )}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginBottom: 40
    },
    list: {
        borderColor: 'white',
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,
        padding: 15,
        backgroundColor: "#222849"
    },
    listItemorder: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#FFF",
    },
    listItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#FFF"
    },
    button: {
        backgroundColor: 'purple',
        marginTop: 35,
        width: 60,
        height: 60,
        borderRadius: 50
    },
    buttons: {
        paddingTop: 10,
        paddingLeft: 10
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
    },
    headerContainer: {
        alignItems: 'center'
    },
    topic: {
        marginTop: 10,
        color: '#FFF',
        fontSize: 42,
    },
    background: {
        flex: 1,
        paddingTop: 60,
    },
    addButton: {
        width: 70,
        height: 70,
        marginLeft: 320,
        marginBottom: 30,
    }

});


export default LViewPackings