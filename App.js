import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login'
import Update from './components/update'
import newUser from './components/newUser'
import Home from './components/home'
import Teste from './components/initial'
import loginInfo from './components/loginInfo'
import Create from './components/create'
import Search from './components/search'

const Stack = createStackNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Create"
          component={Create}
          options={{
            headerShown: false,
          }}
        />


        <Stack.Screen
          name="newUser"
          component={newUser}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginInfo"
          component={loginInfo}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="initial"
          component={Teste}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>


  );
}




