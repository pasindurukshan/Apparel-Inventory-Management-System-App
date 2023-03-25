import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import SplashScreen from './SplashScreen'
import { LinearGradient } from 'expo-linear-gradient';

const Isloading = ({ navigation }) => {
    const [showSplash, setShowSplash] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.background}>
            {showSplash ? (
                <SplashScreen />
            ) : (
                navigation.navigate('login')
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center'   
    },
})

export default Isloading