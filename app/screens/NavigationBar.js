import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NavigationBar = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>My App</Text>
            <View style={styles.menu}>
                <Text style={styles.menuItem}>Home</Text>
                <Text style={styles.menuItem}>About</Text>
                <Text style={styles.menuItem}>Contact</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 70,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    menu: {
        flexDirection: 'row',
    },
    menuItem: {
        fontSize: 18,
        color: '#666',
        marginLeft: 20,
    },
});

export default NavigationBar;
