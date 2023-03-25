import React from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { TextInput, ScrollView } from 'react-native-gesture-handler'

const Home = ({ navigation }) => {
    return (
        <View style={{
            backgroundColor: "#FFF",
            flex: 1
        }}>
            <View style={{
                backgroundColor: "purple",
                height: "18%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                paddingHorizontal: 20
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    width: "100%"
                }}>
                    <View style={{ width: "100%" }}>
                        <Text style={{
                            fontSize: 28,
                            color: "#FFF",
                            fontWeight: "bold",
                            paddingTop: 30,
                            textAlign: "center"
                        }}>CASANOVA .PVT(LTD)</Text>
                    </View>
                </View>
            </View>


            <View style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                width: "100%",
                alignItems: "center",
                paddingTop: 30
            }}>
                <View style={{ width: "100%" }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 30,
                        color: "#000"
                    }}>Home Page</Text>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 250 }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("PMViewFactoryFormScreen")}
                    style={{
                        height: 236,
                        elevation: 2,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 160
                    }}
                >

                    <View style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                        }}>Productions</Text>
                    </View>
                    <Image
                        source={require("./images/production.jpg")}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Viewrawmaterials")}
                    style={{
                        height: 236,
                        elevation: 2,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 160
                    }}
                >

                    <View style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold"
                        }}>Raw Materials</Text>
                    </View>
                    <Image
                        source={require("./images/rawMaterials.jpg")}
                    />
                </TouchableOpacity>
            </ScrollView>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 250, }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("TPVeiwOrder")}
                    style={{
                        height: 225,
                        elevation: 2,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 160
                    }}
                >

                    <View style={{
                        flexDirection: "row",
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20
                        }}>Transport</Text>
                    </View>
                    <Image
                        source={require("./images/transport.jpg")}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("LViewPackings")}
                    style={{
                        height: 225,
                        elevation: 2,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 160
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20
                        }}>Packings</Text>
                    </View>
                    <Image
                        source={require("./images/packings.jpg")}
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default Home;
