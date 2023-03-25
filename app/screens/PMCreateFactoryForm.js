import { View, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { QRCode } from 'qrcode.react';


const PMCreateFactoryForm = ({ navigation }) => {
    const [productionid, setProductionid] = useState('');
    const [factoryid, setFactoryid] = useState('');
    const [factoryname, setFactoryname] = useState('');
    const [materialid1, setMaterialid1] = useState('');
    const [materialid1qty, setMaterialid1qty] = useState('');
    const [qrCodeValue, setQrCodeValue] = useState('');
    
    const isFormNotFilled = () => {
        return productionid.trim() === '' || factoryid.trim() === '' || factoryname.trim() === '' || materialid1.trim() === '' || materialid1qty.trim() === '';
    }


    const createFactoryForm = async () => {
        try {
            // Generate QR code value
            const qrCodeValue = {
                productionId: productionid,
                factoryId: factoryid,
                factoryName: factoryname,
                materialId1: materialid1,
                materialId1Qty: materialid1qty,
            };

            // Save the form data and QR code value to Firestore
            const docRef = await addDoc(collection(FIRESTORE_DB, 'factoryform'), {
                productionId: productionid,
                factoryId: factoryid,
                factoryName: factoryname,
                materialId1: materialid1,
                materialId1Qty: materialid1qty,
                qrCodeValue: qrCodeValue,
            });

            setProductionid('');
            setFactoryid('');
            setFactoryname('');
            setMaterialid1('');
            setMaterialid1qty('');
            setQrCodeValue(qrCodeValue);
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };


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
            <View style={styles.headerContainer}>
                <Text style={styles.topic}>Add Factory</Text>
            </View>
            <ScrollView>

                <Text style={styles.header}>Production ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert production id"
                    onChangeText={(text) => setProductionid(text)}
                    value={productionid}
                />

                <Text style={styles.header}>Factory Id</Text>
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

                <Text style={styles.header}>Apparel Type</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert apparel type"
                    onChangeText={(text) => setMaterialid1(text)}
                    value={materialid1}
                />

                <Text style={styles.header}>Apparel Quantity</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert Apparel Quantity"
                    keyboardType="numeric"
                    onChangeText={(text) => setMaterialid1qty(text)}
                    value={materialid1qty}
                />


                <View style={styles.btncontainer}>
                    <TouchableOpacity
                        onPress={() => {
                            createFactoryForm();
                            navigation.navigate('PMViewFactoryFormScreen')
                        }}
                    >
                        <Text style={styles.btn}>Add Factory Form</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </LinearGradient>
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
        backgroundColor: 'black',
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1
    },
    btn: {
        color: 'white',
        fontSize: 17
    },
    button: {
        backgroundColor: 'black',
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1
    },
    text: {
        color: 'white',
        padding: 20
    },
    header: {
        marginTop: 10,
        marginLeft: 40,
        fontSize: 20,
        color: "white"
    },
    imgBtn: {
        backgroundColor: 'black',
        marginTop: 15,
        marginLeft: 40,
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1
    },
    img: {
        // marginLeft: 40,
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
    },
    background: {
        flex: 1,
        paddingTop: 60,
        paddingBottom: 30,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 60
    },
    topic: {
        marginTop: 10,
        color: 'white',
        fontSize: 50,
    },
    imgContainer: {
        alignItems: 'center'
    }
});


export default PMCreateFactoryForm