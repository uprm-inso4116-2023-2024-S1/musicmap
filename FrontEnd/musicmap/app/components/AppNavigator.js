import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../pages/account';
import Map from '../pages/map'

const { Navigator, Screen } = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Navigator headerMode='none' initialRouteName='Account'>
            <Screen name="Account" component={Account}/>
        </Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator