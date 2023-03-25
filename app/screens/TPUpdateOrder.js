import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, Image  } from 'react-native';
import { doc, updateDoc, deleteDoc  } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const TPUpdateOrder = ({ navigation, route }) => {
  const { item } = route.params;

  const [orderId, setOrderId] = useState(item.orderId);
  const [cusName, setCusName] = useState(item.cusName);
  const [address, setAddress] = useState(item.address);
  const [phoneNo, setPhoneNo] = useState(item.phoneNo);
  const [orderDescription, setOrderDescription] = useState(item.orderDescription);

  const updateItem = async () => {
    const rawRef = doc(FIRESTORE_DB, "orderDetails", item.id);
    await updateDoc(rawRef, {
      orderId,  
      cusName,
      address,
      phoneNo,
      orderDescription,
    });
  };

  const deleteItem = async () => {
    try {
      const rawRef = doc(FIRESTORE_DB, "orderDetails", item.id);
      await deleteDoc(rawRef);
      navigation.navigate('Viewrawmaterials');
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
              navigation.navigate('Viewrawmaterials')
            },
          style: "destructive"
        }
      ]
    );
  };
  // navigation.navigate('Viewrawmaterials')
  return (
    
    <LinearGradient
            style={styles.background}
            colors={['black', 'purple']}

            start={{
                x:1.5,
                y:0.7
            }}
    
            end={{
                x:0,
                y:1
            }}
        >
      <ScrollView >
        <View style={styles.container}>
          <Text style={styles.topic}>Update Order</Text>
        </View>
        <Text style={styles.header}>Order ID</Text>
        <TextInput 
        style={styles.input} 
        value={orderId} 
        editable={false}
        selectable={false}
        onChangeText={setOrderId} 
        />

        <Text style={styles.header}>Customer Name</Text>
        <TextInput 
        style={styles.input} 
        value={cusName} 
        onChangeText={setCusName} 
        />

        <Text style={styles.header}>Address</Text>
        <TextInput 
        style={styles.input} 
        value={address} 
        onChangeText={setAddress} 
        />

        <Text style={styles.header}>Phone No</Text>
        <TextInput 
        style={styles.input} 
        value={phoneNo} 
        keyboardType="numeric"
        onChangeText={setPhoneNo} 
        />

        <Text style={styles.header}>Description</Text> 
        <TextInput 
          style={styles.input} 
          value={orderDescription} 
          onChangeText={setOrderDescription} 
        />

        <View style={styles.btncontainer}>
          <TouchableOpacity
              onPress={() => {
                  updateItem();
                  navigation.navigate('Viewrawmaterials')
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
              <Text style={styles.btn}>Delete Order</Text>
          </TouchableOpacity>        
      </View>
      </ScrollView>
      </LinearGradient>
  );

};

const styles = StyleSheet.create({
  form : {
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent : 'center',
      alignItems: 'center',
  },
  input : {
      marginTop: 10,
      marginLeft: 40,
      height: 50,
      width: '80%',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#fff',
  },
  btncontainer : {
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
  btn : {
    color: 'white',
    fontSize: 17
  },
  button: {
    backgroundColor: 'purple',
    width: 60,
    height: 60,
    borderRadius: 50
  },
  text : {
      color: 'white',
      padding: 20
  },
  header: {
      marginTop: 10,
      marginLeft: 40,
      fontSize: 20,
      color : 'white'
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
  topic : {
    marginTop : 10,
    color :'white',
    fontSize: 50,
  },
  container : {
    alignItems : 'center',
    marginBottom: 20
  }
  })

  export default TPUpdateOrder