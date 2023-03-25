import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import InsertRawMaterial from './app/screens/InsertRawMaterial';
import Isloading from './app/screens/Isloading';
import LAddNewPacking from './app/screens/LAddNewPacking';
import LUpdatePackings from './app/screens/LUpdatePackings';
import LViewPackings from './app/screens/LViewPackings';
import SplashScreen from './app/screens/SplashScreen';
import UpdateRawMaterials from './app/screens/UpdateRawMaterials';
import ViewRawMaterials from './app/screens/ViewRawMaterials';


const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Isloading" component={Isloading} options={{ headerShown: false }} />
				<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<Stack.Screen name="LViewPackings" component={LViewPackings} options={{ headerShown: false }} />
				<Stack.Screen name="LAddNewPacking" component={LAddNewPacking} options={{ headerShown: false }} />
				<Stack.Screen name="LUpdatePackings" component={LUpdatePackings} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}