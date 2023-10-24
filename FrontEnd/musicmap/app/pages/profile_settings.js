import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import SettingsTabs from "../components/SettingsTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Profile_settings= () => {

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
              text="Profile Pic"
            />
            <SettingsTabs
              text="Name"
            />
            <SettingsTabs text="Username"/>
            <SettingsTabs text="Bio"/>
            <SettingsTabs text="Links"/>
          </ScrollView>
    
          <Stack.Screen //Allows editing of screen components, header, footer, etc
            options={{
              headerLeft: () => (
                <Text
                  style={{
                    color: "#424242",
                    fontSize: 20,
                    marginLeft: "7%",
                    fontFamily: "System",
                    fontWeight: "bold",
                  }}
                >
                  Profile Settings
                </Text>
              ),
              headerTitle: "",
            }}
          />
        </SafeAreaView>
      );
}
export default Profile_settings;