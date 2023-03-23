import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InsertRawMaterial from './app/screens/InsertRawMaterial';
import LAddNewPacking from './app/screens/LAddNewPacking';
import LViewPackings from './app/screens/LViewPackings';
import ViewRawMaterials from './app/screens/ViewRawMaterials';


const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{/* <Stack.Screen name="LAddNewPacking" component={LAddNewPacking} options={{ headerShown: false }} /> */}
				<Stack.Screen name="LViewPackings" component={LViewPackings} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}