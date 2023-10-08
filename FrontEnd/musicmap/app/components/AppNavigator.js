import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Map from '../pages/map'
import Settings from '../pages/settings';
import Notifications from '../pages/notifications';
import Profile from '../pages/profile';
import Friends from '../pages/friends';

const { Navigator, Screen } = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Navigator headerMode='none' initialRouteName='Friends'>
            <Screen name="Map" component={Map}/>
            <Screen name="Settings" component={Settings}/>
            <Screen name="Notifications" component={Notifications}/>
            <Screen name="Profile" component={Profile}/>
            <Screen name="Friends" component={Friends}/>
        </Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator