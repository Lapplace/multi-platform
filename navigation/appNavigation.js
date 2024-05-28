import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import MovieScreen from '../screen/MovieScreen';
import SearchScreen from '../screen/SearchScreen';
import LoginScreen from '../screen/LoginScreen'
import DetailScreen from '../screen/DetailScreen'
import SettingsScreen from '../screen/SettingsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Setting from "../new/Setting";
import Account from "../new/Account";
import Videos from "../new/Video";
import SignupScreen from "../screen/SignupScreen";
import StartScreen from "../screen/StartScreen";
import HistoryScreen from "../screen/HistoryScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Mytabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={28} />
          )
        }}
      />
      <Tab.Screen name="Favourite" component={DetailScreen} options={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name='camera-metering-spot' color={color} size={28} />
        )
      }} />
      <Tab.Screen name="Settings" component={Setting} options={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name='account' color={color} size={28} />
        )
      }} />
    </Tab.Navigator>
  )
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator innitialRouteName="Login" >
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
        <Stack.Screen name="HomeTabs" options={{ headerShown: false }} component={Mytabs} />
        <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
        <Stack.Screen name="Account" options={{ headerShown: false }} component={Account} />
        <Stack.Screen name="ViewVideo" options={{ headerShown: false }} component={Videos} />
        <Stack.Screen name="Start" options={{ headerShown: false }} component={StartScreen} />
        <Stack.Screen name="History" options={{ headerShown: false }} component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
