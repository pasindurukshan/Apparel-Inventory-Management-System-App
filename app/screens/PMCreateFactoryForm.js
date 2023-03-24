import { View, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

const PMCreateFactoryForm = ({ navigation }) => {
    const [productionid, setProductionid] = useState('');
    const [factoryid, setFactoryid] = useState('');
    const [factoryname, setFactoryname] = useState('');
    const [materialid1, setMaterialid1] = useState('');
    const [materialid1qty, setMaterialid1qty] = useState('');

    const isFormNotFilled = () => {
        return productionid.trim() === '' || factoryid.trim() === '' || factoryname.trim() === '' || materialid1.trim() === '' || materialid1qty.trim() === '';
    }


    const addFactoryForm = async () => {
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'factoryform'), {
                productionId: productionid,
                factoryId: factoryid,
                factoryName: factoryname,
                materialId1: materialid1,
                materialId1Qty: materialid1qty
            });
            setProductionid('');
            setFactoryid('');
            setFactoryname('');
            setMaterialid1('');
            setMaterialid1qty('');
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Viewfactoryforms')}>
                <View style={styles.button}>
                    <Text style={styles.text} >Back</Text>
                </View>
            </TouchableOpacity>

            <View>
                <Text style={styles.header}>Production ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert production id"
                    onChangeText={(text) => setProductionid(text)}
                    value={productionid}
                />

                <Text style={styles.header}>Factory ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert factory id"
                    onChangeText={(text) => setFactoryid(text)}
                    value={factoryid}
                />

                <Text style={styles.header}>Factory Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert factory name"
                    onChangeText={(text) => setFactoryname(text)}
                    value={factoryname}
                />

                <Text style={styles.header}>Material Id 1</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert material id 1"
                    keyboardType="numeric"
                    onChangeText={(text) => setMaterialid1(text)}
                    value={materialid1}
                />

                <Text style={styles.header}>Material Id 1 Quantity</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert material id 1 quantity"
                    keyboardType="numeric"
                    onChangeText={(text) => setMaterialid1qty(text)}
                    value={materialid1qty}
                />
            </View>

            <View style={styles.btncontainer}>
                <TouchableOpacity
                    onPress={addFactoryForm}
                    disabled={isFormNotFilled()}
                >
                    <Text style={styles.btn}>Add Factory Form</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
    },
    form: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        marginTop: 1,
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
});


export default PMCreateFactoryForm