import { View, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

const List = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');

	const addTodo = async () => {
		try {
			const docRef = await addDoc(collection(FIRESTORE_DB, 'todos'), {
				title: todo,
				done: false
			});
			setTodo('');
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
					placeholder="Add new todo"
					onChangeText={(text) => setTodo(text)}
					value={todo}
				/>										
			</View>	

			<View style={styles.btncontainer}>
				<TouchableOpacity>
					<Button
						style={styles.button} 
						onPress={addTodo} 
						title="Add Todo" 
						disabled={todo === ''} 
					/>
				</TouchableOpacity>
			</View>
			
		</View>
	);
};

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

export default List;