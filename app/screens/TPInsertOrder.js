import { View, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const TPInsertOrder = ({navigation}) => {
    const [orderId, setOrderId] = useState('');
	const [cusName, setCusName] = useState('');
	const [address, setAddress] = useState('');
	const [phoneNo, setPhoneNo] = useState('');
	const [orderDescription, setOrderDescription] = useState('');
	const [photo, setPhoto] = useState(null);

	const isFormNotFilled = () => {
		return orderId.trim() === '' || cusName.trim() === '' || address.trim() === '' || phoneNo.trim() === '' || orderDescription.trim() === '';
	}	  

	const handleTakePhoto = async () => {
		let result = await ImagePicker.launchCameraAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	
		if (!result.canceled) {
		  setPhoto(result.uri);
		}
	};


    const addMaterial = async () => {
		try {
			const docRef = await addDoc(collection(FIRESTORE_DB, 'orderDetails'), {
				orderId: orderId,
				cusName: cusName,
				address: address,
				phoneNo: phoneNo,
				orderDescription: orderDescription,
				image: photo
			});
			setOrderId('');
			setCusName('');
			setAddress('');
			setPhoneNo('');
			setOrderDescription('');
			setPhoto(null);
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
                x:1.5,
                y:0.7
            }}
    
            end={{
                x:0,
                y:1
            }}
        >
		<View style={styles.headerContainer}>
			<Text style={styles.topic}>Add Order Details</Text>
		</View>
		<ScrollView>
		{/* <View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('TPVeiwOrder')}>
			<View style={styles.button}>
			<Text style={styles.text} >Back</Text>
			</View>
            </TouchableOpacity>
		<View> */}
			<Text style={styles.header}>Order ID</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert order id"
				onChangeText={(text) => setOrderId(text)}
				value={orderId}
			/>

			<Text style={styles.header}>Customer Name</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert customer name"
				onChangeText={(text) => setCusName(text)}
				value={cusName}
			/>

			<Text style={styles.header}>Address</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert Address"
				onChangeText={(text) => setAddress(text)}
				value={address}
			/>

			<Text style={styles.header}>Phone No</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert Phone No"
				keyboardType="numeric"
				onChangeText={(text) => setPhoneNo(text)}
				value={phoneNo}
			/>

			<Text style={styles.header}>Order Description</Text>
			<TextInput
				style={styles.input}
				placeholder="Insert Order Description"
				onChangeText={(text) => setOrderDescription(text)}
				value={orderDescription}
			/>	

			<View style={styles.imgBtn}>
				<TouchableOpacity
					onPress={handleTakePhoto}
				>
					<Text style={styles.btn}>Take a photo</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.imgContainer}>
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
					<Text style={styles.btn}>Add Order</Text>
				</TouchableOpacity>
			)}
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
		backgroundColor: 'black',
		height: 50,
		borderRadius: 10,
		borderColor: 'white',
		borderWidth: 1
	},
	btn : {
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
    text : {
        color: 'white',
		padding: 20
    },
	header: {
		marginTop: 10,
		marginLeft: 40,
		fontSize: 20,
		color : "white"
	},
	imgBtn : {
		backgroundColor: 'black',
		marginTop: 15,
		marginLeft: 40,
		width: 150,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderColor : 'white',
		borderWidth: 1
	},
	img : {
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
		paddingBottom: 30        
	},
	headerContainer : {
		alignItems : 'center',
    	marginBottom: 20
	},
	topic : {
		marginTop : 10,
		color :'white',
		fontSize: 50,
	},
	imgContainer : {
		alignItems : 'center'
	}
});


export default TPInsertOrder