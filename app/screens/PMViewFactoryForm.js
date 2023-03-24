import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import PMCreateFactoryForm from '../screens/PMCreateFactoryForm';


const PMViewFactoryForm = ({ navigation }) => {
    const [rawinfo, setrawInfo] = useState([]);
    const [selectedFactory, setSelectedFactory] = useState(null);

    useEffect(() => {
        const rawRef = collection(FIRESTORE_DB, 'factoryform');

        const subscriber = onSnapshot(rawRef, {
            next: (snapshot) => {
                const info = [];
                snapshot.docs.forEach((doc) => {
                    info.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setrawInfo(info);
            }
        });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const renderFactoryItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("PMUpdateFactoryForm", { item });
            }}
        >
            <View style={styles.factoryItemContainer}>
                <Text style={styles.listItem}>{item.factoryId}</Text>
                <Text style={styles.listItem}>{item.factoryname}</Text>
            </View>
        </TouchableOpacity>
    );



    const renderItemList = ({ item }) => (
        <FlatList
            style={styles.list}
            data={rawinfo.filter(raw => raw.factoryId === item.factoryId)}
            renderItem={renderFactoryItem}
            keyExtractor={(raw) => raw.id}
        />
    );

    const groupedFactoryInfo = Object.values(rawinfo.reduce((acc, cur) => {
        const key = cur.factoryId;
        if (!acc[key]) {
            acc[key] = { factoryId: key };
        }
        acc[key].data = [...(acc[key].data || []), cur];
        return acc;
    }, {}));


    return (
        <SafeAreaView>
            {rawinfo.length > 0 && (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={groupedFactoryInfo}
                        renderItem={renderItemList}
                        keyExtractor={(item) => item.factoryId}
                    />
                </ScrollView>
            )}
        </SafeAreaView>
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
    text: {
        color: 'white'
    }
});


export default PMViewFactoryForm