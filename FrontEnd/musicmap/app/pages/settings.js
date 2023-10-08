import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import SettingsTabs from "../components/SettingsTabs";

const Settings = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        marginTop: "10px",
        marginLeft: "10%",
        height: "100%",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsTabs
          text="Profile"
          icon="person-outline"
          navigation={navigation}
          navigateTo="Settings"
        />
        <SettingsTabs
          text="Notifications"
          icon="notifications-outline"
          navigation={navigation}
          navigateTo="Settings"
        />
        <SettingsTabs text="Dark Mode" icon="contrast-sharp" />
        <SettingsTabs text="Language" icon="language-outline" />
        <SettingsTabs text="Account Privacy" icon="lock-closed-outline" />
        <SettingsTabs text="FAQ" icon="help-circle-outline" />
      </ScrollView>

      <Stack.Screen //Allows editing of screen components, header, footer, etc
        options={{
          headerLeft: () => (
            <Text
              style={{
                color: "#424242",
                fontSize: 30,
                marginLeft: "7%",
                fontFamily: "System",
                fontWeight: "bold",
              }}
            >
              Settings
            </Text>
          ),
          headerTitle: "",
        }}
      />
    </SafeAreaView>
  );
};


export default Settings