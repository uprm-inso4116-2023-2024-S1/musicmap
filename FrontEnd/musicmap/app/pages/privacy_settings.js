import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import SettingsTabs from "../components/SettingsTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const PrivacySettings = () => {
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
        {/* Your existing SettingsTabs components */}
        <SettingsTabs text="Personal Data" />
        <SettingsTabs text="Password & Security" />
        <SettingsTabs text="Location" />
        <SettingsTabs text="Contacts" />
        <SettingsTabs text="Photos" />
        <SettingsTabs text="Private Account" />
      </ScrollView>

      {/* Centered text underneath SettingsTabs */}
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        
      }}>
        <Text style={{ fontSize: 20, textAlign: 'center',fontFamily: "System",
        fontWeight: "bold",marginBottom:15}}>
          If your account is private, only your friends will be able to see your location, songs you are playing, and profile.
        </Text>
      </View>

      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text
              style={{
                color: "#424242",
                fontSize: 25,
                marginLeft: "7%",
                fontFamily: "System",
                fontWeight: "bold",
              }}
            >
              Privacy_settings
            </Text>
          ),
          headerTitle: "",
        }}
      />
    </SafeAreaView>
  );
};

export default PrivacySettings;