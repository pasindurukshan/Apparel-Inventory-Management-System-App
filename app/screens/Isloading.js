import { View, Text } from 'react-native'
import React from 'react'
import SplashScreen from './SplashScreen'

const Isloading = ({ navigation }) => {
    const [showSplash, setShowSplash] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {showSplash ? (
                <SplashScreen />
            ) : (
                navigation.navigate('login')
            )}
        </View>
    )
}

export default Isloading