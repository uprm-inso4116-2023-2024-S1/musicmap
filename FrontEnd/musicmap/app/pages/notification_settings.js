import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import SettingsTabs from "../components/SettingsTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";


const Notification_settings= () => {

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
              text="Pause Notification" 
            />
            <SettingsTabs
              text="Nearby Music"
            />
            <SettingsTabs text="Recommended Music"/>
          </ScrollView>
    
          <Stack.Screen //Allows editing of screen components, header, footer, etc
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
                  Notification_settings
                </Text>
              ),
              headerTitle: "",
            }}
          />
        </SafeAreaView>
      );
}
export default Notification_settings;