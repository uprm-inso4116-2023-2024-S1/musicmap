import { ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';


// Define the Profile component
const Profile = () => {
  // State for storing user profile data and editing information

    /**
   * Check if there has been any data sent as a route parameter.
   * The usage of the `?` prevents there being any error in case
   * that there is no data sent, in this case, `receivedData` will
   * just be `undefined`.
   */
    const route = useRoute();
    const receivedData = route.params?.username;
  
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
      if (receivedData) {
        console.log("RECEIVED DATA" , receivedData)
        setUserName(receivedData);
      }
  
  
    }, [receivedData, userName]);

    /**
     * Interestingly enough, it seems that when I put `userName` as the
     * title for the first widget, it would be null. However, `receivedData`
     * seems to work. A console.log() right below here would also display
     * the `userName1 correctly, weird :)
     */
    const [widgetData, setWidgetData] = useState([
      {
        // Shows the real username if available,
        // otherwise displays "Username"
        title: receivedData || "Username",
        subtext: "Bio Text",
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
    // States for handling editing functionality
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
    // Function to dynamically set styles for the "User Name" widget
    const getUserNameWidgetStyle = (index) => {
      return {
        height: widgetData[index].title === "User Name" ? 212 : 106,
        width: "90%",
        backgroundColor: "white",
        marginLeft: "5%",
        borderRadius: 10,
        elevation: 5,
        marginBottom: 18,
        flexDirection: "row",
        justifyContent: "flex-start",
        borderWidth: widgetData[index].title === "User Name" ? 2 : 0,
        borderColor: "white",
      };
    };
    // Function to render the "User Name" widget
    const renderUserNameWidget = (widget, index) => {
      const isUserNameWidget = widget.title === "User Name";
      return (
        <TouchableOpacity
          key={widget.title}
          onPress={() => toggleEditSubtext(widget.subtext, index)}
          style={getUserNameWidgetStyle(index)}
        >
          {isEditingSubtext && currentIndex === index ? (
            <>
              {/* Text input for editing the bio */}
              <TextInput
                value={editedSubtext}
                onChangeText={(text) => setEditedSubtext(text)}
                onBlur={updateSubtext}
                placeholder="Type here..."
                multiline
                style={{
                  marginLeft: "3%",
                  fontSize: 15,
                  fontFamily: "System",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
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
                {isUserNameWidget ? (
                  // Styling for the special "User Name" widget
                  <View
                    style={{
                      marginLeft: "3%",
                      marginTop: 10,
                      width: 75,
                      height: 75,
                      backgroundColor: "gray",
                      borderRadius: 50,
                    }}
                  ></View>
                ) : (
                  // Styling for other widgets
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
      );
    };
    // Render the Profile component
    return (
      <SafeAreaView style={{ flexDirection: "row", marginTop: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {widgetData.map((widget, index) => renderUserNameWidget(widget, index))}
        </ScrollView>
      </SafeAreaView>
    );
    };
    // Export the Profile component as the default export
    export default Profile;