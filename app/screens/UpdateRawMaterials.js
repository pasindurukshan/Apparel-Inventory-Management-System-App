import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert  } from 'react-native';
import { doc, updateDoc, deleteDoc  } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

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
    
    <View style={styles.container}>
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
    </View>
  );

};

  const styles = StyleSheet.create({
    container: {
        marginTop: 120,
		    justifyContent: 'center',
    },
    form : {
        marginVertical: 20,
        flexDirection: 'row',
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
		backgroundColor: 'purple',
		height: 50,
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
		fontSize: 20
	}
  })

  export default UpdateRawMaterials