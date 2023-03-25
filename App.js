import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CasanovaLogin from './app/screens/CasanovaLogin';
import InsertRawMaterial from './app/screens/InsertRawMaterial';
import UpdateRawMaterials from './app/screens/UpdateRawMaterials';
import ViewRawMaterials from './app/screens/ViewRawMaterials';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="login" component={CasanovaLogin} options={{headerShown: false}}/>
				<Stack.Screen name="Viewrawmaterials" component={ViewRawMaterials} options={{headerShown: false}}/>
				<Stack.Screen name="Addrawmaterials" component={InsertRawMaterial} options={{headerShown: false}}/>
				<Stack.Screen name="Updaterawmaterials" component={UpdateRawMaterials} options={{headerShown: false}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}