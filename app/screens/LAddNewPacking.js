import { View, StyleSheet, TextInput, Button, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

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
            navigation.navigate('LViewPackings')
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
                <Text style={styles.topic}>Add Packing</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.header}>Order ID</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Add New Order ID"
                            onChangeText={(text) => setOrderID(text)}
                            value={orderID}
                        />
                        <Text style={styles.header}>Customer Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Add New Customer"
                            onChangeText={(text) => setCustomer(text)}
                            value={customer}
                        />
                        <Text style={styles.header}>Category Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Add Category name"
                            onChangeText={(text) => setCategory(text)}
                            value={category}
                        />
                        <Text style={styles.header}>Payment Status</Text>
                        <Picker
                            selectedValue={payment}
                            onValueChange={(payment) => setPayment(payment)}
                            style={styles.input}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder="Add Payment Status"
                                onChangeText={(text) => setPayment(text)}
                                value={payment}
                            />
                            <Picker.Item label="Paid" value="Paid" />
                            <Picker.Item label="Cash On Delivery" value="COD" />
                        </Picker>
                        <Text style={styles.header}>Quantity</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Add Quantity"
                            onChangeText={(text) => setQuantity(text)}
                            value={quantity}
                            keyboardType="numeric"
                        />
                        <Text style={styles.header}>Weight (KG)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Add Weight (KG)"
                            onChangeText={(text) => setWeight(text)}
                            value={weight}
                            keyboardType="numeric"
                        />
                        <Text style={styles.header}>Due Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="YYYY/MM/DD"
                            onChangeText={(text) => setDueDate(text)}
                            value={dueDate}

                        />

                        <Text style={styles.header}>Address</Text>
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
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: 'center',
        paddingBottom: 20,
        
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
        backgroundColor: '#222849',
        height: 50,
        borderRadius: 10,
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
    },
    header: {
        marginTop: 10,
        marginLeft: 40,
        fontSize: 20,
        color: "#FFF"
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    topic: {
        marginTop: 10,
        color: '#FFF',
        fontSize: 42,
    },
    background: {
        flex: 1,
        paddingTop: 60,
        paddingBottom: 30
    },
    selectedValue: {
        marginTop: 20,
        fontSize: 18,
    },
});


export default LAddNewPacking