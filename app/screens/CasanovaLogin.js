import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    setErrorMessage(null);
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        navigation.push("Home");
      })
      .catch((error) => {
        const statusCode = error.code;

        if (statusCode === "auth/user-not-found") {
          setErrorMessage("User not found");
          return;
        } else if (statusCode === "auth/wrong-password") {
          setErrorMessage("Wrong password");
          return;
        } else if (statusCode === "auth/invalid-email") {
          setErrorMessage("Invalid email");
          return;
        } else {
          setErrorMessage("Something went wrong");
          return;
        }
      });
  };

  const handleSignup = () => {
    setErrorMessage(null);
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((userCredential) => {
        // Handle successful loginconst user = userCredential.user;
        const user = userCredential.user;
            Alert.alert("Success", "User created Successfully !!",[
                {
                text: "OK", 
                onPress: () => {
                    navigation.push("login");
                  },
                },
            ]);
      })
      .catch ((error)=>{
        const statusCode = error.code;

        if (statusCode === "auth/user-not-found") {
          setErrorMessage("User not found");
          return;
        } else if (statusCode === "auth/wrong-password") {
          setErrorMessage("Wrong password");
          return;
        } else if (statusCode === "auth/invalid-email") {
          setErrorMessage("Invalid email");
          return;
        } else if (statusCode === "auth/email-already-in-use") {
          setErrorMessage("Email already in use");
          return;
        } else if (statusCode === "auth/weak-password") {
          setErrorMessage("Password must be at least 6 characters");
          return;
        } else {
          setErrorMessage("Something went wrong");
          return;
        }
      });
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
      <View style={styles.titleContainer}>
        <Image source={require("./images/logo.png")}></Image>
      </View>  
      {errorMessage !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      <Text style={styles.header} >Enter Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.header} >Enter Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={styles.buttonText}>Don't have an account ?</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    marginTop: 1,
    marginLeft: 40,
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 30,
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'black',
    height: 50,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  background: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'center'        
},
titleContainer: {
    alignItems: 'center',
},
header: {
    marginTop: 10,
    marginLeft: 40,
    fontSize: 20,
    color : "white",
    marginBottom: 10
},
errorContainer: {
    width: "100%",
    alignItems: 'center',
    marginBottom: 20
  },
  errorText: {
    color: "red",
    fontSize: 30
  },
  text : {
    marginTop: 10
  }
});
