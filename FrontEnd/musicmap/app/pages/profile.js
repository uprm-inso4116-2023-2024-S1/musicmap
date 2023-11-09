// Import necessary React and React Native components

import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the Profile component
const Profile = () => {
  // State for storing user profile data and editing information
  const [widgetData, setWidgetData] = useState([
    {
      title: "User Name",
      subtext: "Your Name Here",
    },
    {
      title: "Favorite Music Type",
      subtext: "Your Favorite Music Type",
    },
    {
      title: "Now Playing",
      subtext: "What You're Listening To",
    },
    {
      title: "Favorite Songs",
      subtext: "Your Favorite Songs",
    },
    {
      title: "Favorite Artists",
      subtext: "Your Favorite Artists",
    },
  ]);

  const [isEditingSubtext, setIsEditingSubtext] = useState(false);
  const [editedSubtext, setEditedSubtext] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Function to handle toggling subtext editing
  const toggleEditSubtext = (subtext, index) => {
    // If you are currently editing a widget, save the changes
    if (isEditingSubtext) {
      updateSubtext();
    }
    setIsEditingSubtext(true);
    setCurrentIndex(index);
    setEditedSubtext(subtext);
  };

   // Function to update subtext when editing is complete
  const updateSubtext = () => {
    if (currentIndex !== -1) {
      // Create a copy of widgetData and update the edited subtext
      const updatedWidgetData = [...widgetData];
      updatedWidgetData[currentIndex].subtext = editedSubtext;
      setWidgetData(updatedWidgetData);
    }
    setIsEditingSubtext(false);
    setCurrentIndex(-1);
  };

  // Render the Profile component
  return (
    <SafeAreaView style={{ flexDirection: "row", marginTop: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {widgetData.map((widget, index) => (
          <TouchableOpacity
            key={widget.title}
            onPress={() => toggleEditSubtext(widget.subtext, index)}
            style={{
              height: widget.title === "User Name" ? 212 : 106,
              width: "90%",
              backgroundColor: "white",
              marginLeft: "5%",
              borderRadius: 10,
              elevation: 5,
              marginBottom: 18,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            {isEditingSubtext && currentIndex === index ? (
              <>
                <TextInput
                  value={editedSubtext}
                  onChangeText={(text) => setEditedSubtext(text)}
                  onBlur={updateSubtext}
                />
              </>
            ) : (
              <>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#424242",
                      fontSize: 25,
                      marginLeft: "3%",
                      fontFamily: "System",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {widget.title}
                  </Text>
                  {widget.title === "User Name" ? (
                    <View
                      style={{
                        marginLeft: "3%",
                        marginTop: 10,
                        width: 75, // Increase width to make the circle bigger
                        height: 75, // Increase height to make the circle bigger
                        backgroundColor: "gray",
                        borderRadius: 50, // Make it a bigger circle
                      }}
                    ></View>
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        height: 5,
                        backgroundColor: "#424242",
                      }}
                    ></View>
                  )}
                  <Text
                    style={{
                      color: "#424242",
                      fontSize: 15,
                      marginLeft: "3%",
                      fontFamily: "System",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {widget.subtext}
                  </Text>
                </View>
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the Profile component as the default export
export default Profile;