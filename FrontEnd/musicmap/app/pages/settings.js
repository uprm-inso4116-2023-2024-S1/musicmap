import { Button, ScrollView, Text, TouchableOpacity, View , StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import SettingsTabs from "../components/SettingsTabs";

const Settings = ({ navigation }) => {

  const handleLogout = () => {
    // Navigate to the "Account" component
    navigation.navigate('Account');
  };
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
          navigateTo="Profile_settings"
        />
        <SettingsTabs
          text="Notifications"
          icon="notifications-outline"
          navigation={navigation}
          navigateTo="Notification_settings"
        />
        <SettingsTabs
          text="Language"
          icon="language-outline"
          navigation={navigation}
          navigateTo="Language_settings"
        />
        <SettingsTabs
          text="Account Privacy"
          icon="lock-closed-outline"
          navigation={navigation}
          navigateTo="Privacy_settings"
        />
        
        <SettingsTabs text="Dark Mode" icon="contrast-sharp" />

        <SettingsTabs
          text="FAQ"
          icon="help-circle-outline"
          navigation={navigation}
          navigateTo="FAQSection"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.label}>Logout</Text>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D10050",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "30%", // Make the button full width]
    alignSelf:'center',
    marginTop:20,
    
  },
  label:{
    color:"#FFFFFF"
  }
});


export default Settings