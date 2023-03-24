import { View, StyleSheet, TextInput, Button, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

const LAddNewPacking = ({ navigation }) => {
    const [orderID, setOrderID] = useState('');
    const [customer, setCustomer] = useState('');
    const [category, setCategory] = useState('');
    const [payment, setPayment] = useState('');
    const [quantity, setQuantity] = useState('');
    const [weight, setWeight] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [address, setAddress] = useState('');

    const isFormNotFilled = () => {
        return orderID.trim() === '' || category.trim() === '' || payment.trim() === '' || quantity.trim() === '' || weight.trim() === '' || dueDate.trim() === '' || address.trim() === '';
    }

    const clear = () => {
        setOrderID('')
        setCategory('')
        setPayment('')
        setQuantity('')
        setWeight('')
        setDueDate('')
        setAddress('')
        setCustomer('')
    }

    const addPacking = async () => {
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'packing'), {
                customer: customer,
                orderID: orderID,
                category: category,
                payment: payment,
                quantity: quantity,
                weight: weight,
                dueDate: dueDate,
                address: address,
            });
            setCustomer('')
            setOrderID('')
            setCategory('')
            setPayment('')
            setQuantity('')
            setWeight('')
            setDueDate('')
            setAddress('')
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('LViewPackings')}>
                    <View style={styles.button}>
                        <Text style={styles.text} >Back</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Add New Order ID"
                        onChangeText={(text) => setOrderID(text)}
                        value={orderID}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add New Customer"
                        onChangeText={(text) => setCustomer(text)}
                        value={customer}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add Category name"
                        onChangeText={(text) => setCategory(text)}
                        value={category}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add Payment Status"
                        onChangeText={(text) => setPayment(text)}
                        value={payment}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add Quantity"
                        onChangeText={(text) => setQuantity(text)}
                        value={quantity}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add Weight (KG)"
                        onChangeText={(text) => setWeight(text)}
                        value={weight}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add Due Date"
                        onChangeText={(text) => setDueDate(text)}
                        value={dueDate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add Address"
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                    />
                </View>

                <View style={styles.btncontainer}>
                    <TouchableOpacity
                        onPress={addPacking}
                        disabled={isFormNotFilled()}
                    >
                        <Text style={styles.btn}>Add Packing</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
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
        width: "15%",
        height: 40,
        borderRadius: 50
    },
    text: {
        color: 'white',
        padding: 10
    }
});


export default LAddNewPacking