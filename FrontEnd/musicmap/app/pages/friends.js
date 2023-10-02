import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Friends = () => {
  return (
    <SafeAreaView
      style={{
        //SafeAreaView- Similar to HTML 'div', creates a designated sized area for you to edit
        flexDirection: "row", //flexDirection - Orientation of the Area View, row designates it as horizontal
        marginTop: "10%", //Margin - How much distance is placed between object and the screen borders, could be placed in pixels or in percentages based on screen size
        height: "100%", //Height - Self-explanatory, height of the object relative to screen
      }}
    >
      <TouchableOpacity
        style={{
          //Touchable opacity, creates an area that can be "touched", basically reates a button area
          justifyContent: "center", //Literally places all objects in the center of the area
          alignItems: "center", //Aligns every object relative to their center
          backgroundColor: "red", //Sets the color to the color code input, can also be place literally, like 'red'
          height: "10%",
          width: "80%", //width of designated area relative to screen size
          marginLeft: "10%",
          borderRadius: 10, //Rounds the corners of the imaginary box area
          elevation: 20,
        }}
      >
        <Text style={{ color: "white" }}>Button!</Text>
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
              Friends
            </Text>
          ),
          headerTitle: "",
        }}
      />
    </SafeAreaView>
  );
};


export default Friends