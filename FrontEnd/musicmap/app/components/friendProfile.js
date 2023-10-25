import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Widget from './widget';

function FriendProfile() {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row", //flexDirection - Orientation of the Area View, row designates it as horizontal
        marginTop: "10px", //Margin - How much distance is placed between object and the screen borders, could be placed in pixels or in percentages based on screen size
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
      
        <TouchableOpacity
          style={{
            height: 106, //60%',
            width: "90%", //width of designated area relative to screen size
            justifyContent: "center", //Literally places all objects in the center of the area
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
              textAlign: "right",
              marginRight: 20,
              fontSize: 25,
              marginLeft: "3%",
              marginTop: "-10%",
              fontFamily: "System",
              fontWeight: "bold",
            }}
          >
            Friend Name
          </Text>
          <Text
            style={{
              color: "#424242",
              textAlign: "right",
              marginRight: 20,
              fontSize: 15,
              marginLeft: "3%",
              fontFamily: "System",
              fontWeight: "bold",
            }}
          >
            Bio 
          </Text>
        </TouchableOpacity>

        <Widget
        MainText={'Favorite Music Type'}
        SecondText={"Friend's favorite music type"}
        />
        <Widget
        MainText={'Favorite Songs'}
        SecondText={"Friend's favorite songs"}
        />
        <Widget
        MainText={'Favorite Aritsts'}
        SecondText={"Friend's favorite artists"}
        />
          
 
      </ScrollView>

      <Stack.Screen //Allows editing of screen components, header, footer, etc
        options={{
          headerLeft: () => (
            <Text
              style={{
                color: "#424242",
                fontSize: 24,
                marginLeft: "7%",
                fontFamily: "System",
                fontWeight: "bold",
              }}
            >
              Friend Profile
            </Text>
          ),
        }}
      />
    </SafeAreaView>
  );
};

export default FriendProfile;