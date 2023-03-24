import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

export default function Test() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleNameChange = (text) => {
    setName(text);
  };

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

  const handleUpload = async () => {
    try {
      const imagesCollection = collection(FIRESTORE_DB, 'images');
      await addDoc(imagesCollection, { 
        NameofTheUplopader:name, 
        URI:photo 
      });
      alert('Upload successful!');
      setName('');
      setPhoto(null);
    } catch (error) {
      alert('Upload failed: ' + error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Enter your name:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          marginBottom: 20,
        }}
        onChangeText={handleNameChange}
        value={name}
      />

      <Button title="Take a photo" onPress={handleTakePhoto} />

      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
      
      {photo && (
        <Button title="Upload" onPress={handleUpload} />
      )}
    </View>
  );
}
