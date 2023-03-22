import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

const UpdateRawMaterial = ({ navigation, route }) => {
  const [materialName, setMaterialName] = useState('');
  const [materialPrice, setMaterialPrice] = useState('');
  const [materialQuantity, setMaterialQuantity] = useState('');
  const [supplierName, setSupplierName] = useState('');

  useEffect(() => {
    const rawMaterialRef = doc(FIRESTORE_DB, 'rawmaterials', route.params.val);
    rawMaterialRef.get().then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setMaterialName(data.materialName);
        setMaterialPrice(data.materialPrice);
        setMaterialQuantity(data.materialQuantity);
        setSupplierName(data.supplierName);
      }
    });
  }, [route.params.val]);

  const updateItem = async () => {
    const rawRef = doc(FIRESTORE_DB, "rawmaterials", item.id);
    await updateDoc(rawRef, {
      materialName,
      materialPrice,
      materialQuantity,
      supplierName,
    });
}


    return (
        <>
          <TextInput value={materialName} onChangeText={setMaterialName} />
          <TextInput value={materialPrice} onChangeText={setMaterialPrice} />
          <TextInput value={materialQuantity} onChangeText={setMaterialQuantity} />
          <TextInput value={supplierName} onChangeText={setSupplierName} />
          <Button title="Update" onPress={updateItem} />
        </>
      );
  }

  export default UpdateRawMaterials