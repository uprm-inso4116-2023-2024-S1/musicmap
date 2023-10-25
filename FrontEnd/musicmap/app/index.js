import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "./pages/settings";
import Notifications from "./pages/notifications";
import Map from "./pages/map";
import Friends from "./pages/friends";
import Profile from "./pages/profile";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FriendProfile from "./components/friendProfile";


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      tabBarOptions={{
        activeTintColor: "#D10050",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Settings" component={Settings} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gear" size={"30%"} color={color} />
            
          ),
        }} />

      <Tab.Screen name="Friends" component={Friends} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" size={"30%"} color={color} />
          ),
        }} />

      <Tab.Screen name="MusicMap" component={Map} options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="location-pin" size={"37%"} color={color} />
          ),
        }} />

      <Tab.Screen name="Notifications" component={Notifications} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" size={"30%"} color={color} />
          ),
        }} />

      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={"30%"} color={color} />
          ),
        }} />
      <Tab.Screen name="FriendProfile" component={FriendProfile}  options={{tabBarButton: () => null,
      tabBarVisible:false //hide tab bar on this screen
      }} />
    </Tab.Navigator>
  );
};

export default App;
