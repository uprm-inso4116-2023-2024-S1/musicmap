import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
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
      
        <TouchableOpacity style={styles.titleCard}>
          <Text style={styles.titleText}>Friend Name</Text>
          <Text style={styles.bioText}>Bio </Text>
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
            <Text style={styles.headerStyle}>Friend Profile</Text>
          ),
          headerTitle: "",
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle:{
    color: "#424242",
    fontSize: 24,
    marginLeft: "7%",
    fontFamily: "System",
    fontWeight: "bold",
  },
  titleCard: {
    height: 106, 
    width: "90%", 
    justifyContent: "center", 
    backgroundColor: "white", 
    marginLeft: "5%",
    borderRadius: 10,
    elevation: 5,
    marginBottom: 18,
  },
  titleText: {
    color: "#424242",
    textAlign: "right",
    marginRight: 20,
    fontSize: 25,
    marginLeft: "3%",
    marginTop: "-10%",
    fontFamily: "System",
    fontWeight: "bold",
  },
  bioText: {
    color: "#424242",
    textAlign: "right",
    marginRight: 20,
    fontSize: 15,
    marginLeft: "3%",
    fontFamily: "System",
    fontWeight: "bold",
  },
  secondText: {
    color: "#424242",
    textAlign: "left",
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "System",
  },
});

export default FriendProfile;
