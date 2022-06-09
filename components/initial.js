import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Routes from './routes'

const Tab = createBottomTabNavigator();

export default function Teste({route}) {
  const idUser = route.params;
  // console.log('idUser:', idUser);
  return(
    <NavigationContainer independent={true}>
      <Routes />
    </NavigationContainer>
  )
}