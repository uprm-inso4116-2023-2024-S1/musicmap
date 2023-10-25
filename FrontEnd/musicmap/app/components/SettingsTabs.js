import React, { useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SettingsTabs = ({ navigation, navigateTo, text }) => {
  const isToggleable = ["Location", "Contacts", "Photos", "Private Account", "Dark Mode", "Pause Music", "Nearby Music", "Recommended Music"].includes(text);
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={navigation != undefined ? () => {
          if (isToggleable) {
            handleToggle();
          }
          navigation.navigate(navigateTo);
        } : null}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
          width: "90%",
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            flex: 1,
            marginLeft: 30,
            color: "#424242",
            fontSize: 20,
            fontFamily: "System",
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
        {isToggleable ? (
          <MaterialIcons
            name={isToggled ? "toggle-on" : "toggle-off"}
            size={50}
            color="black"
            onPress={handleToggle}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={30}
            color="black"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SettingsTabs;
