import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import InsertRawMaterial from './app/screens/InsertRawMaterial';
import LAddNewPacking from './app/screens/LAddNewPacking';
import LPacking from './app/screens/LPacking';
import LUpdatePackings from './app/screens/LUpdatePackings';
import LViewPackings from './app/screens/LViewPackings';
import NavigationBar from './app/screens/NavigationBar';
import Sample from './app/screens/Sample';
import UpdateRawMaterials from './app/screens/UpdateRawMaterials';
import ViewRawMaterials from './app/screens/ViewRawMaterials';


const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<Stack.Screen name="LPacking" component={LPacking} options={{ headerShown: false }} /> */}
				<Stack.Screen name="LAddNewPacking" component={LAddNewPacking} options={{ headerShown: false }} />
				<Stack.Screen name="LViewPackings" component={LViewPackings} options={{ headerShown: false }} />
				<Stack.Screen name="LUpdatePackings" component={LUpdatePackings} options={{ headerShown: false }} />
				{/* <Stack.Screen name="Addrawmaterials" component={InsertRawMaterial} options={{headerShown: false}}/>
				<Stack.Screen name="Viewrawmaterials" component={ViewRawMaterials} options={{headerShown: false}}/>
				<Stack.Screen name="Updaterawmaterials" component={UpdateRawMaterials} options={{headerShown: false}}/> */}


			</Stack.Navigator>
			{/* <Drawer.Navigator drawerContent={(props) => <DrawerNavigation {...props} />}>
				<Drawer.Screen name="Sample" component={Sample} options={{ headerShown: false }} />
			</Drawer.Navigator> */}
		</NavigationContainer>
	);
}