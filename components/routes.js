import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, Feather } from '@expo/vector-icons'
import Inicio from './home'
import Criar from './create'
import Atualizar from './update'
import Apagar from './delete'
import Procurar from './search'
import loginInfo from './loginInfo'

const Tab = createBottomTabNavigator();

export default function Routes({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopColor: 'tranparent',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#555',
      }}
    >
      <Tab.Screen name='Home' component={Inicio}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name='home' size={15} color={color} />
          )
        }}
      />
      <Tab.Screen name='Search' component={Procurar}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name='search' size={15} color={color} />
          )
        }}
      />

      <Tab.Screen name='Create' component={Criar}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="film" size={15} color={color} />
          )
        }}
      />

      <Tab.Screen name='Update' component={Atualizar}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="upload-cloud" size={15} color={color} />
          )
        }}
      />

      <Tab.Screen name='Delete' component={Apagar}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="delete" size={15} color={color} />
          )
        }}
      />
      <Tab.Screen name='Login' component={loginInfo}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="user" size={15} color={color} />
          )
        }}
      />

    </Tab.Navigator>
  )
}