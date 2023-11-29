import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
const [widgetData, setWidgetData] = useState([
    {
            title: "User Name",
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

  const toggleEditSubtext = (subtext, index) => {
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

  const updateNowPlaying = ({ song, artist }) => {
    const nowPlayingIndex = widgetData.findIndex(
      (widget) => widget.title === "Now Playing"
    );
    if (nowPlayingIndex !== -1) {
      const updatedWidgetData = [...widgetData];
      updatedWidgetData[nowPlayingIndex].subtext = `${song} by ${artist}`;
      setWidgetData(updatedWidgetData);
    }
  };

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

  const renderUserNameWidget = (widget, index) => {
    const isUserNameWidget = widget.title === "User Name";
    const isNowPlayingWidget = widget.title === "Now Playing";
  
    return (
      <TouchableOpacity
        key={widget.title}
        onPress={() => {
          if (!isNowPlayingWidget) {
            toggleEditSubtext(widget.subtext, index);
          }
        }}
        style={getUserNameWidgetStyle(index)}
      >
        {isNowPlayingWidget ? (
          // Render the Now Playing widget without editing capability
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
            <View
              style={{
                marginLeft: "3%",
                marginTop: 10,
                backgroundColor: "gray",
                borderRadius: 50,
              }}
            ></View>
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
        ) : (
          // Render other widgets with or without editing capability
          <>
            {isEditingSubtext && currentIndex === index ? (
              // Text input for editing the bio
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
            ) : (
              // Other widgets with their respective UI
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
            )}
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flexDirection: "row", marginTop: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {widgetData.map((widget, index) => renderUserNameWidget(widget, index))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;