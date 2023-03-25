import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TPInsertOrder from './app/screens/TPInsertOrder';
import TPUpdateOrder from './app/screens/TPUpdateOrder';
import TPVeiwOrder from './app/screens/TPVeiwOrder';
import PMCreateFactoryForm from './app/screens/PMCreateFactoryForm';
import PMViewFactoryForm from './app/screens/PMViewFactoryForm';
import PMUpdateFactoryForm from './app/screens/PMUpdateFactoryForm';



const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>

				<Stack.Screen name="TPVeiwOrder" component={TPVeiwOrder} options={{headerShown: false}}/>
				<Stack.Screen name="TPUpdateOrder" component={TPUpdateOrder} options={{headerShown: false}}/>
				<Stack.Screen name="TPInsertOrder" component={TPInsertOrder} options={{headerShown: false}}/>
				
				<Stack.Screen name="PMUpdateFactoryFormScreen" component={PMUpdateFactoryForm} options={{ headerShown: false }} />
				<Stack.Screen name="PMViewFactoryFormScreen" component={PMViewFactoryForm} options={{ headerShown: false }} />
				<Stack.Screen name="PMCreateFactoryFormScreen" component={PMCreateFactoryForm} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}