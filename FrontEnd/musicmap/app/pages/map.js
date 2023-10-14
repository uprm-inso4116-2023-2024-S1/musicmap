import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Map = () => {
  return (
    <SafeAreaView
      style={{
        //SafeAreaView- Similar to HTML 'div', creates a designated sized area for you to edit
        flexDirection: "row", //flexDirection - Orientation of the Area View, row designates it as horizontal
        marginTop: "10%", //Margin - How much distance is placed between object and the screen borders, could be placed in pixels or in percentages based on screen size
        height: "100%", //Height - Self-explanatory, height of the object relative to screen
      }}
    >
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
              Map
            </Text>
          ),
          headerTitle: "",
        }}
      />
    </SafeAreaView>
  );
};

export default Map;
