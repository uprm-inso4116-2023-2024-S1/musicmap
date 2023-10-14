import React from "react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const NotificationCard = ({ content, notification }) => {
  return (
    <View >
        <TouchableOpacity
          style={{
            height: 85, //60%',
            width: "90%", //width of designated area relative to screen size
            justifyContent: "center", //Literally places all objects in the center of the area
            alignItems: "left", //Aligns every object relative to their left
            backgroundColor: "white", //Sets the color to the color code input, can also be place literally, like 'red'
            marginLeft: "5%",
            borderRadius: 10, //Rounds the corners of the imaginary box area
            elevation: 5,
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              color: "#424242",
              textAlign: "left",
              marginLeft: 10,
              fontSize: 20,
            //   marginLeft: "3%",
            //   marginTop: "-14%",
              fontFamily: "System",
              fontWeight: "bold",
            }}
          >
            {notification}
          </Text>
          <View
            style={{ width: "100%", height: 5, backgroundColor: "#424242" }}
          ></View>
          <Text
            style={{
              color: "#424242",
              textAlign: "left",
              marginLeft: 10,
              fontSize: 15,
              fontFamily: "System",
            }}
          >
            {content}
          </Text>
        </TouchableOpacity>
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
              Notifications
            </Text>
          ),
          headerTitle: "",
        }}
      />
    </View>
  );
};

export default NotificationCard;
