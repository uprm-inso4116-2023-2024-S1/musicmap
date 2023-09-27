import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Map from '../pages/map'

const { Navigator, Screen } = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Navigator headerMode='none' initialRouteName='Map'>
            <Screen name="Map" component={Map}/>
        </Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator