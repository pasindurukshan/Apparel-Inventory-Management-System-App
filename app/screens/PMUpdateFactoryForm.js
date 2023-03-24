import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

const PMUpdateFactoryForm = ({ navigation, route }) => {
    const { item } = route.params;

    const [productionid, setProductionid] = useState(item.productionid);
    const [factoryid, setFactoryid] = useState(item.factoryid);
    const [factoryname, setFactoryname] = useState(item.factoryname);
    const [materialid1, setMaterialid1] = useState(item.materialid1);
    const [materialid1qty, setMaterialid1qty] = useState(item.materialid1qty);

    const updateItem = async () => {
        const rawRef = doc(FIRESTORE_DB, "factoryform", item.id);
        await updateDoc(rawRef, {
            productionid,
            factoryid,
            materialid1,
            materialid1qty,
            factoryname,
        });
    };

    const deleteItem = async () => {
        try {
            const rawRef = doc(FIRESTORE_DB, "factoryform", item.id);
            await deleteDoc(rawRef);
            navigation.navigate('PMViewFactoryForm');
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleDeleteButtonPress = () => {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        deleteItem()
                        navigation.navigate('PMViewFactoryForm')
                    },
                    style: "destructive"
                }
            ]
        );
    };
    // navigation.navigate('PMViewFactoryForm')
    return (

        <View style={styles.container}>
            <Text style={styles.header}>Production ID</Text>
            <TextInput
                style={styles.input}
                value={productionid}
                editable={false}
                selectable={false}
                onChangeText={setProductionid}
            />

            <Text style={styles.header}>Factory ID</Text>
            <TextInput
                style={styles.input}
                value={factoryid}
                editable={false}
                selectable={false}
                onChangeText={setFactoryid}
            />

            <Text style={styles.header}>Factory Name</Text>
            <TextInput
                style={styles.input}
                value={factoryname}
                editable={false}
                selectable={false}
                onChangeText={setFactoryname}
            />

            <Text style={styles.header}>Material Id 1</Text>
            <TextInput
                style={styles.input}
                value={materialid1}
                onChangeText={setMaterialid1}
            />

            <Text style={styles.header}>Material Id 1 Quantity</Text>
            <TextInput
                style={styles.input}
                value={materialid1qty}
                keyboardType="numeric"
                onChangeText={setMaterialid1qty}
            />

            <View style={styles.btncontainer}>
                <TouchableOpacity
                    onPress={() => {
                        updateItem();
                        navigation.navigate('PMViewFactoryForm')
                    }}
                >
                    <Text style={styles.btn}>Update</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btncontainer}>
                <TouchableOpacity
                    onPress={() => {
                        handleDeleteButtonPress();
                    }}
                >
                    <Text style={styles.btn}>Delete Item</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        marginTop: 120,
        justifyContent: 'center',
    },
    form: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        marginTop: 10,
        marginLeft: 40,
        height: 50,
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    btncontainer: {
        marginTop: 30,
        marginLeft: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: 'purple',
        height: 50,
        borderRadius: 10
    },
    btn: {
        color: 'white',
        fontSize: 17
    },
    button: {
        backgroundColor: 'purple',
        width: 60,
        height: 60,
        borderRadius: 50
    },
    text: {
        color: 'white',
        padding: 20
    },
    header: {
        marginTop: 10,
        marginLeft: 40,
        fontSize: 20
    }
})

export default PMUpdateFactoryForm