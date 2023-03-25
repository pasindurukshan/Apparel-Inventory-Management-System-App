import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TPInsertOrder from './app/screens/TPInsertOrder';
import TPUpdateOrder from './app/screens/TPUpdateOrder';
import TPVeiwOrder from './app/screens/TPVeiwOrder';

import Home from './app/screens/Home';
import Isloading from './app/screens/Isloading';
import LAddNewPacking from './app/screens/LAddNewPacking';
import LUpdatePackings from './app/screens/LUpdatePackings';
import LViewPackings from './app/screens/LViewPackings';

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

				<Stack.Screen name="TPVeiwOrder" component={TPVeiwOrder} options={{headerShown: false}}/>
				<Stack.Screen name="TPUpdateOrder" component={TPUpdateOrder} options={{headerShown: false}}/>
				<Stack.Screen name="TPInsertOrder" component={TPInsertOrder} options={{headerShown: false}}/>
			
				<Stack.Screen name="Isloading" component={Isloading} options={{ headerShown: false }} />
				<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<Stack.Screen name="LViewPackings" component={LViewPackings} options={{ headerShown: false }} />
				<Stack.Screen name="LAddNewPacking" component={LAddNewPacking} options={{ headerShown: false }} />
				<Stack.Screen name="LUpdatePackings" component={LUpdatePackings} options={{ headerShown: false }} />

				<Stack.Screen name="PMUpdateFactoryFormScreen" component={PMUpdateFactoryForm} options={{ headerShown: false }} />
				<Stack.Screen name="PMViewFactoryFormScreen" component={PMViewFactoryForm} options={{ headerShown: false }} />
				<Stack.Screen name="PMCreateFactoryFormScreen" component={PMCreateFactoryForm} options={{ headerShown: false }} />
				
				<Stack.Screen name="Addrawmaterials" component={InsertRawMaterial} options={{headerShown: false}}/>
				<Stack.Screen name="Viewrawmaterials" component={ViewRawMaterials} options={{headerShown: false}}/>
				<Stack.Screen name="Updaterawmaterials" component={UpdateRawMaterials} options={{headerShown: false}}/>
        
			</Stack.Navigator>
		</NavigationContainer>
	);
}