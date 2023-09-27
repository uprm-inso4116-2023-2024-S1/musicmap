import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Settings = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          //Touchable opacity, creates an area that can be "touched", basically reates a button area
          height: 50, //60%',
          width: "90%", //width of designated area relative to screen size
          justifyContent: "center", //Literally places all objects in the center of the area
          alignItems: "left", //Aligns every object relative to their left
          backgroundColor: "white", //Sets the color to the color code input, can also be place literally, like 'red'
          borderRadius: 10, //Rounds the corners of the imaginary box area
          top: -275,
          elevation: 20,
        }}
      >
        <Text
          style={{
            color: "#424242",
            textAlign: "left",
            marginLeft: "15%",
            fontSize: 20,
            fontFamily: "System",
            fontWeight: "bold",
          }}
        >
          Profile
        </Text>
      </TouchableOpacity>

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