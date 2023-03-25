import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, Image } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const PMUpdateFactoryForm = ({ navigation, route }) => {
    const { item } = route.params;

    const [productionId, setProductionid] = useState(item.productionId);
    const [factoryId, setFactoryid] = useState(item.factoryId);
    const [factoryName, setFactoryname] = useState(item.factoryName);
    const [materialId1, setMaterialid1] = useState(item.materialId1);
    const [materialId1Qty, setMaterialid1qty] = useState(item.materialId1Qty);

    const updateItem = async () => {
        const factoryRef = doc(FIRESTORE_DB, "factoryform", item.id);
        await updateDoc(factoryRef, {
            productionId,
            factoryId,
            materialId1,
            materialId1Qty,
            factoryName,
        });
    };

    const deleteItem = async () => {
        try {
            console.log("hello");
            console.log(item.id);
            const factoryRef = doc(FIRESTORE_DB, "factoryform", item.id);
            await deleteDoc(factoryRef);
            navigation.navigate('PMViewFactoryFormScreen');
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
                        navigation.navigate('PMViewFactoryFormScreen')
                    },
                    style: "destructive"
                }
            ]
        );
    };
    // navigation.navigate('PMViewFactoryFormScreen')
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
            <ScrollView >
                <View style={styles.container}>
                    <Text style={styles.topic}>Update Factory</Text>
                </View>
                <Text style={styles.header}>Production ID</Text>
                <TextInput
                    style={styles.input}
                    value={productionId}
                    editable={false}
                    selectable={false}
                    onChangeText={setProductionid}
                />

                <Text style={styles.header}>Factory Id</Text>
                <TextInput
                    style={styles.input}
                    value={factoryId}
                    editable={false}
                    selectable={false}
                    onChangeText={setFactoryid}
                />

                <Text style={styles.header}>Factory Name</Text>
                <TextInput
                    style={styles.input}
                    value={factoryName}
                    editable={false}
                    selectable={false}
                    onChangeText={setFactoryname}
                />

                <Text style={styles.header}>Apparel Type</Text>
                <TextInput
                    style={styles.input}
                    value={materialId1}
                    onChangeText={setMaterialid1}
                />

                <Text style={styles.header}>Apparel Quantity</Text>
                <TextInput
                    style={styles.input}
                    value={materialId1Qty}
                    keyboardType="numeric"
                    onChangeText={setMaterialid1qty}
                />

                <View style={styles.btncontainer}>
                    <TouchableOpacity
                        onPress={() => {
                            updateItem();
                            navigation.navigate('PMViewFactoryFormScreen')
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
                        <Text style={styles.btn}>Delete Factory</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );

};

const styles = StyleSheet.create({
    form: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
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
        backgroundColor: 'black',
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
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
        fontSize: 20,
        color: 'white'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    imgContainer: {
        alignItems: 'center'
    },
    background: {
        flex: 1,
        paddingTop: 60,
    },
    topic: {
        marginTop: 10,
        color: 'white',
        fontSize: 50,
    },
    container: {
        alignItems: 'center',
        marginBottom: 20
    }
})

export default PMUpdateFactoryForm