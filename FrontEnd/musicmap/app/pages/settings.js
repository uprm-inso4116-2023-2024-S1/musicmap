import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import SettingsTabs from "../components/SettingsTabs";
import { useTheme } from '@theme';

const Settings = ({ navigation }) => {
  const { colors } = useTheme();

  const changeTheme = () => {
    if(isDark){
        setScheme('light');
    } else {
        setScheme('dark');
    }
  } 

  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        marginTop: "10px",
        marginLeft: "10%",
        height: "100%",
        backgroundColor: colors.secondaryBackground
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsTabs
          text="Profile"
          icon="person-outline"
          navigation={navigation}
          navigateTo="Profile"
        />
        <SettingsTabs
          text="Notifications"
          icon="notifications-outline"
          navigation={navigation}
          navigateTo="Notifications"
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
                //color: colors.text,
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

      <Button
          style={{ marginTop: 40, height: 40, width: 160, backgroundColor: colors.button, borderRadius: 8 }}
          textStyle={{ color: colors.buttonText }}
          text='Change theme mode'
          onPress={() => changeTheme()}
      />
    </SafeAreaView>
  );
};


export default Settings