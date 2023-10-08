import React from "react";
import { Button, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';

const SettingsTabs = ({ navigation, navigateTo, text, icon }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={navigation != undefined ? () => navigation.navigate(navigateTo) : null}
        style={{
          display: "grid",
          gridTemplateColumns: "30px 95% auto",
          height: 50,
          width: "90%",
          //   justifyContent: "space-between",
          //   alignItems: "center",
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: "10px",
          flexDirection: "row",
          //   top: -275,
          //   elevation: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            marginLeft: "10px",
          }}
        >
          <Ionicons name={icon} size={30} color="black" />
        </View>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "#424242",
            textAlign: "left",
            marginLeft: "30px",
            fontSize: 20,
            fontFamily: "System",
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
        <View
          style={{
            // width: '85%',
            display: "flex",
            // alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {text == "Dark Mode" ? (
            <Ionicons
              style={{ marginRight: "5px" }}
              name="toggle-sharp"
              size={30}
              color="black"
            />
          ) : (
            <Ionicons name="chevron-forward-sharp" size={30} color="black" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsTabs;
