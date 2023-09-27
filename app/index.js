import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "./pages/settings";
import Notifications from "./pages/notifications";
import Map from "./pages/map";
import Friends from "./pages/friends";
import Profile from "./pages/profile";

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#D10050",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Friends" component={Friends} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default App;
