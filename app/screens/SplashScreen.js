import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
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
            <Image source={require("./images/logo.png")}></Image>
        </LinearGradient>
        
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingBottom: 30,
        justifyContent: 'center'        
    },
})

export default SplashScreen
