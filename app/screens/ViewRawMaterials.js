import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import InsertRawMaterial from '../screens/InsertRawMaterial';
import { LinearGradient } from 'expo-linear-gradient';


const ViewRawMaterials = ({navigation}) => {
    const [rawinfo, setrawInfo] = useState([]);
    const [selectedRaw, setSelectedRaw] = useState(null);

    useEffect(() => {
        const rawRef = collection(FIRESTORE_DB, 'rawmaterials');
    
        const subscriber = onSnapshot(rawRef, {
            next: (snapshot) => {
                const info = [];
                snapshot.docs.forEach((doc) => {
                    info.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
    
                setrawInfo(info);
            }
        });
    
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const renderRawItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Updaterawmaterials", { item });
        }}
      >
        <View style={styles.rawItemContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.materialName}</Text>
                <Text style={styles.listItem}>Price : Rs.{item.materialPrice}</Text>
                <Text style={styles.listItem}>Quantity : {item.materialQuantity}</Text>
            </View>
            <View>
                <Image
                    style={styles.image}
                    source={{ uri: item.image }}
                />
            </View>
          </View>
      </TouchableOpacity>
    );
        


    const renderItemList = ({ item }) => (        
        <FlatList
            style={styles.list}
            data={rawinfo.filter(raw => raw.materialName === item.materialName)}
            renderItem={renderRawItem}
            keyExtractor={(raw) => raw.id}
        />
    );

    const groupedRawInfo = Object.values(rawinfo.reduce((acc, cur) => {
        const key = cur.materialName;
        if (!acc[key]) {
            acc[key] = { materialName: key };
        }
        acc[key].data = [...(acc[key].data || []), cur];
        return acc;
    }, {}));


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
            <Text style={styles.topic}>Raw Materials</Text>
            {rawinfo.length > 0 && (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={groupedRawInfo}
                        renderItem={renderItemList}
                        keyExtractor={(item) => item.materialName}
                    />
                </ScrollView>                
            )}
        </LinearGradient>
    )
  
      
}

const styles = StyleSheet.create({
	container: {        
        marginTop: 50,       
    },
    list: {
        borderColor: 'white',
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
    text : {
        color: 'black'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginLeft: 50,
        borderRadius : 10,
        borderColor: 'white',
        borderWidth: 1
    },
    rawItemContainer: {
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
    name : {
        color : 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    topic : {
        marginTop : 10,
        color :'white',
        fontSize: 50,
    }
});


export default ViewRawMaterials