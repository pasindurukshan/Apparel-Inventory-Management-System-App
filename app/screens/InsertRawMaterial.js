import { View, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';

const InsertRawMaterial = ({navigation}) => {
    const [materialid, setMaterialid] = useState('');
	const [material, setMaterial] = useState('');
	const [supplier, setSupplier] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [photo, setPhoto] = useState(null);

	const isFormNotFilled = () => {
		return materialid.trim() === '' || material.trim() === '' || supplier.trim() === '' || price.trim() === '' || quantity.trim() === '';
	}	  

	const handleTakePhoto = async () => {
		let result = await ImagePicker.launchCameraAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	
		if (!result.cancelled) {
		  setPhoto(result.uri);
		}
	};


    const addMaterial = async () => {
		try {
			const docRef = await addDoc(collection(FIRESTORE_DB, 'rawmaterials'), {
				materialId: materialid,
				materialName: material,
				supplierName: supplier,
				materialPrice: price,
				materialQuantity: quantity,
				image: photo
			});
			setMaterialid('');
			setMaterial('');
			setSupplier('');
			setPrice('');
			setQuantity('');
			setPhoto(null);
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

    return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('Viewrawmaterials')}>
                <View style={styles.button}>
                    <Text style={styles.text} >Back</Text>
                </View>
            </TouchableOpacity>
		<ScrollView>
		<View>
			<Text style={styles.header}>Material ID</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert material id"
				onChangeText={(text) => setMaterialid(text)}
				value={materialid}
			/>

			<Text style={styles.header}>Material Name</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert material name"
				onChangeText={(text) => setMaterial(text)}
				value={material}
			/>

			<Text style={styles.header}>Supplier Name</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert supplier name"
				onChangeText={(text) => setSupplier(text)}
				value={supplier}
			/>

			<Text style={styles.header}>Price</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert price"
				keyboardType="numeric"
				onChangeText={(text) => setPrice(text)}
				value={price}
			/>

			<Text style={styles.header}>Quantity</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert quantity"
				keyboardType="numeric"
				onChangeText={(text) => setQuantity(text)}
				value={quantity}
			/>	

			<View style={styles.imgBtn}>
				<TouchableOpacity
					onPress={handleTakePhoto}
				>
					<Text style={styles.btn}>Take a photo</Text>
				</TouchableOpacity>
			</View>

			{photo && (
				<Image
				source={{ uri: photo }}
				style={styles.img}
				/>
			)}									
		</View>	

		<View style={styles.btncontainer}>
			{photo && (
				<TouchableOpacity
					onPress={addMaterial} 
					disabled={isFormNotFilled()}	
				>
					<Text style={styles.btn}>Add Material</Text>
				</TouchableOpacity>
			)}
		</View>
		</ScrollView>
	</View>
    )
}

const styles = StyleSheet.create({
	container: {
        marginTop: 50,
		justifyContent: 'center',
    },
    form : {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input : {
		marginTop: 1,
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
	},
	imgBtn : {
		backgroundColor: 'purple',
		marginTop: 10,
		marginLeft: 40,
		width: 150,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	img : {
		marginLeft: 40,
		width: 200,
		height: 200, 
		marginTop: 20
	}
});


export default InsertRawMaterial