import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

const LUpdatePackings = ({ navigation, route }) => {
  const { item } = route.params;

  const [orderID, setOrderID] = useState(item.orderID);
  const [customer, setCustomer] = useState(item.customer);
  const [category, setCategory] = useState(item.category);
  const [payment, setPayment] = useState(item.payment);
  const [quantity, setQuantity] = useState(item.quantity);
  const [weight, setWeight] = useState(item.weight);
  const [dueDate, setDueDate] = useState(item.dueDate);
  const [address, setAddress] = useState(item.address);

  const updateItem = async () => {
    const packRef = doc(FIRESTORE_DB, "packing", item.id);
    await updateDoc(packRef, {
      customer,
      orderID,
      category,
      payment,
      quantity,
      weight,
      dueDate,
      address,
    });
  };

  const deleteItem = async () => {
    try {
      const packRef = doc(FIRESTORE_DB, "packing", item.id);
      await deleteDoc(packRef);
      navigation.navigate('LViewPackings');
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
            navigation.navigate('LViewPackings')
          },
          style: "destructive"
        }
      ]
    );
  };

  return (

    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('LViewPackings')}>
          <View style={styles.button}>
            <Text style={styles.text} >Back</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.header}>Order ID</Text>
        <TextInput
          style={styles.input}
          value={orderID}
          editable={false}
          selectable={false}
          onChangeText={setOrderID}
        />

        <Text style={styles.header}>Customer Name</Text>
        <TextInput
          style={styles.input}
          value={customer}
          onChangeText={setCustomer}
        />

        <Text style={styles.header}>Category Name</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.header}>Payment Status</Text>
        <TextInput
          style={styles.input}
          value={payment}
          onChangeText={setPayment}
        />

        <Text style={styles.header}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text style={styles.header}>Weight (KG)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.header}>Due Date</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
        />

        <Text style={styles.header}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.btncontainer}>
          <TouchableOpacity
            onPress={() => {
              updateItem();
              navigation.navigate('LViewPackings')
            }}
          >
            <Text style={styles.btn}>Update</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btncontainers}>
          <TouchableOpacity
            onPress={() => {
              handleDeleteButtonPress();
            }}
          >
            <Text style={styles.btn}>Delete Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  btncontainers: {
    marginTop: 10,
    marginBottom: 30,
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
  },
  header: {
    marginTop: 10,
    marginLeft: 40,
    fontSize: 20
  }
})

export default LUpdatePackings