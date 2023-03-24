import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, Image  } from 'react-native';
import { doc, updateDoc, deleteDoc  } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const UpdateRawMaterials = ({ navigation, route }) => {
  const { item } = route.params;

  const [materialId, setMaterialId] = useState(item.materialId);
  const [materialName, setMaterialName] = useState(item.materialName);
  const [supplierName, setSupplierName] = useState(item.supplierName);
  const [materialPrice, setMaterialPrice] = useState(item.materialPrice);
  const [materialQuantity, setMaterialQuantity] = useState(item.materialQuantity);

  const updateItem = async () => {
    const rawRef = doc(FIRESTORE_DB, "rawmaterials", item.id);
    await updateDoc(rawRef, {
      materialId,  
      materialName,
      materialPrice,
      materialQuantity,
      supplierName,
    });
  };

  const deleteItem = async () => {
    try {
      const rawRef = doc(FIRESTORE_DB, "rawmaterials", item.id);
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
          <Text style={styles.topic}>Update Item</Text>
        </View>
        <Text style={styles.header}>Material ID</Text>
        <TextInput 
        style={styles.input} 
        value={materialId} 
        editable={false}
        selectable={false}
        onChangeText={setMaterialId} 
        />

        <Text style={styles.header}>Material Name</Text>
        <TextInput 
        style={styles.input} 
        value={materialName} 
        onChangeText={setMaterialName} 
        />

        <Text style={styles.header}>Supplier Name</Text>
        <TextInput 
        style={styles.input} 
        value={supplierName} 
        onChangeText={setSupplierName} 
        />

        <Text style={styles.header}>Price</Text>
        <TextInput 
        style={styles.input} 
        value={materialPrice} 
        keyboardType="numeric"
        onChangeText={setMaterialPrice} 
        />

        <Text style={styles.header}>Quantity</Text> 
        <TextInput 
          style={styles.input} 
          value={materialQuantity} 
          keyboardType="numeric"
          onChangeText={setMaterialQuantity} 
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
              <Text style={styles.btn}>Delete Item</Text>
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

  export default UpdateRawMaterials