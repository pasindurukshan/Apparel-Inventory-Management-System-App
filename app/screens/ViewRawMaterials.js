import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import InsertRawMaterial from '../screens/InsertRawMaterial';


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
                <Text style={styles.listItem}>{item.materialName}</Text>
                <Text style={styles.listItem}>{item.materialPrice}</Text>
                <Text style={styles.listItem}>{item.materialQuantity}</Text>
                <Text style={styles.listItem}>{item.supplierName}</Text>
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
        <SafeAreaView>
            {rawinfo.length > 0 && (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={groupedRawInfo}
                        renderItem={renderItemList}
                        keyExtractor={(item) => item.materialName}
                    />
                </ScrollView>                
            )}
        </SafeAreaView>
    )
  
      
}

const styles = StyleSheet.create({
	container: {        
        marginTop: 105,       
    },
    list: {
        borderColor: 'black',
        borderWidth: 1,  
        margin: 5,
        borderRadius: 10,
        padding: 15      
    },
    listItem: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'purple',
        marginTop: 35,
        width: 60,
        height: 60,
        borderRadius: 50
    },
    text : {
        color: 'white'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
        marginLeft: 50
      },
    rawItemContainer: {
    flexDirection: 'row'
    },
    textContainer: {
        width: 200,
        padding: 10
    }
});


export default ViewRawMaterials