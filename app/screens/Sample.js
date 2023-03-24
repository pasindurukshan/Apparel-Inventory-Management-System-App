import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DrawerNavigation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen1')}>
        <Text style={styles.buttonText}>Screen 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen2')}>
        <Text style={styles.buttonText}>Screen 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen3')}>
        <Text style={styles.buttonText}>Screen 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 50,
    paddingLeft: 20,
    width: '80%',
  },
  button: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'left',
  },
});

export default DrawerNavigation;
