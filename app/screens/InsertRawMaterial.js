import { View, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

const InsertRawMaterial = () => {
    const [materialid, setMaterialid] = useState('');
	const [material, setMaterial] = useState('');
	const [supplier, setSupplier] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');

	const isFormNotFilled = () => {
		return materialid.trim() === '' || material.trim() === '' || supplier.trim() === '' || price.trim() === '' || quantity.trim() === '';
	}
	  

    const addMaterial = async () => {
		try {
			const docRef = await addDoc(collection(FIRESTORE_DB, 'rawmaterials'), {
				materialId: materialid,
				materialName: material,
				supplierName: supplier,
				materialPrice:price,
				materialQuantity: quantity
			});
			setMaterialid('');
			setMaterial('');
			setSupplier('');
			setPrice('');
			setQuantity('');
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

    return (
		<View style={styles.container}>
		<View>
			<TextInput
				style={styles.input}
				placeholder="Insert material id"
				onChangeText={(text) => setMaterialid(text)}
				value={materialid}
			/>
			<TextInput
				style={styles.input}
				placeholder="Insert material name"
				onChangeText={(text) => setMaterial(text)}
				value={material}
			/>
			<TextInput
				style={styles.input}
				placeholder="Insert supplier name"
				onChangeText={(text) => setSupplier(text)}
				value={supplier}
			/>
			<TextInput
				style={styles.input}
				placeholder="Insert price"
				keyboardType="numeric"
				onChangeText={(text) => setPrice(text)}
				value={price}
			/>
			<TextInput
				style={styles.input}
				placeholder="Insert quantity"
				keyboardType="numeric"
				onChangeText={(text) => setQuantity(text)}
				value={quantity}
			/>										
		</View>	

		<View style={styles.btncontainer}>
			<TouchableOpacity>
				<Button
					style={styles.button} 
					onPress={addMaterial} 
					title="Add Material" 
					disabled={isFormNotFilled()} 
				/>
			</TouchableOpacity>
		</View>
		
	</View>
    )
}

const styles = StyleSheet.create({
	container: {
        marginTop: 80,
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
		width: '80%',
	}
});


export default InsertRawMaterial