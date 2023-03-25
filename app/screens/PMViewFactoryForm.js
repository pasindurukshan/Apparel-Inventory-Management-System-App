import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';


const PMViewFactoryForm = ({ navigation }) => {
    const [factoryinfo, setfactoryInfo] = useState([]);
    const [selectedRaw, setSelectedRaw] = useState(null);

    useEffect(() => {
        const factoryRef = collection(FIRESTORE_DB, 'factoryform');

        const subscriber = onSnapshot(factoryRef, {
            next: (snapshot) => {
                const info = [];
                snapshot.docs.forEach((doc) => {
                    info.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setfactoryInfo(info);
            }
        });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    const renderFactoryItem = ({ item }) => (

        <TouchableOpacity
            onPress={() => {
                navigation.navigate("PMUpdateFactoryFormScreen", { item });
            }}
        >
            <View style={styles.factoryItemContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Factory : {item.factoryName}</Text>
                    <Text style={styles.facname}>{item.productionId}</Text>
                    <Text style={styles.listItem}>Factory ID : {item.factoryId}</Text>
                    <Text style={styles.listItem}>Apparel Type : {item.materialId1}</Text>
                    <Text style={styles.listItem}>Apparel Quantity : {item.materialId1Qty}</Text>
                </View>
                <View style={styles.qrCodeContainer}>
                    
                    <QRCode
                        value={JSON.stringify(item.qrCodeValue)}
                        size={200}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );



    const renderItemList = ({ item }) => (
        <FlatList
            style={styles.list}
            data={factoryinfo.filter(factory => factory.factoryName === item.factoryName)}
            renderItem={renderFactoryItem}
            keyExtractor={(factory) => factory.id}
        />
    );

    const groupedFactoryInfo = Object.values(factoryinfo.reduce((acc, cur) => {
        const key = cur.factoryName;
        if (!acc[key]) {
            acc[key] = { factoryName: key };
        }
        acc[key].data = [...(acc[key].data || []), cur];
        return acc;
    }, {}));


    return (
        <LinearGradient
            style={styles.background}
            colors={['black', 'purple']}

            start={{
                x: 1.5,
                y: 0.7
            }}

            end={{
                x: 0,
                y: 1
            }}
        >
            <Text style={styles.topic}>Factory Forms</Text>
            {factoryinfo.length > 0 && (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={groupedFactoryInfo}
                        renderItem={renderItemList}
                        keyExtractor={(item) => item.factoryName}
                    />
                </ScrollView>
            )}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("PMCreateFactoryFormScreen")}
            >
                <Ionicons name="add-circle-outline" size={70} color="white" />
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    list: {
        borderColor: 'white',
        backgroundColor: '#222849',
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,
        padding: 15
    },
    listItem: {
        fontSize: 15,
        color: 'white',
    },
    button: {
        backgroundColor: 'purple',
        marginTop: 35,
        width: 60,
        height: 60,
        borderRadius: 50
    },
    text: {
        color: 'black'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginLeft: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1
    },
    qrCodeContainer: {
        width: 100,
        height: 100,
        marginTop: 50,
        alignItems: 'center',
    },
    qrCode: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    factoryItemContainer: {
        flexDirection: 'row'
    },
    textContainer: {
        width: 200,
        padding: 10,
    },
    background: {
        flex: 1,
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    facname: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    name: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    topic: {
        marginTop: 10,
        color: 'white',
        fontSize: 50,
    },
    addButton: {
        width: 70,
        height: 70,
        marginLeft: 250,
        marginBottom: 30,
    }
});


export default PMViewFactoryForm