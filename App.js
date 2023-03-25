import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InsertRawMaterial from './app/screens/InsertRawMaterial';
import UpdateRawMaterials from './app/screens/UpdateRawMaterials';
import ViewRawMaterials from './app/screens/ViewRawMaterials';
import PMCreateFactoryForm from './app/screens/PMCreateFactoryForm';
import PMViewFactoryForm from './app/screens/PMViewFactoryForm';
import PMUpdateFactoryForm from './app/screens/PMUpdateFactoryForm';


const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Addrawmaterials" component={InsertRawMaterial} options={{ headerShown: false }} />
				<Stack.Screen name="Viewrawmaterials" component={ViewRawMaterials} options={{ headerShown: false }} />
				<Stack.Screen name="Updaterawmaterials" component={UpdateRawMaterials} options={{ headerShown: false }} />

				<Stack.Screen name="PMViewFactoryFormScreen" component={PMViewFactoryForm} options={{ headerShown: false }} />
				<Stack.Screen name="PMCreateFactoryFormScreen" component={PMCreateFactoryForm} options={{ headerShown: false }} />
				<Stack.Screen name="PMUpdateFactoryFormScreen" component={PMUpdateFactoryForm} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}