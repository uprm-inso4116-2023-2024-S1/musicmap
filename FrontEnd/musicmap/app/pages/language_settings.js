import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import SettingsTabs from "../components/SettingsTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Language_settings= () => {

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
              text="English"
            />
            <SettingsTabs
              text="Spanish"
            />
            <SettingsTabs text="French"/>
            <SettingsTabs text="German"/>
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
                  Language_Settings
                </Text>
              ),
              headerTitle: "",
            }}
          />
        </SafeAreaView>
      );
}
export default Language_settings;