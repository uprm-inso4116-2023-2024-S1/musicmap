import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Widget from './widget';

function FriendProfile() {

  const handleFriendRequest = (accepted) => {
    // Your logic for handling friend requests
    if (accepted) {
      // Logic for accepting friend request
      console.log("Friend request accepted");

      // Navigate to the 'AcceptedPage' (replace with your actual page name)
      navigation.navigate('AcceptedPage');
    } else {
      // Logic for declining friend request
      console.log("Friend request declined");

      // Navigate to the 'DeclinedPage' (replace with your actual page name)
      navigation.navigate('DeclinedPage');
    }
  };
  
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
        MainText={'Favorite Artists'}
        SecondText={"Friend's favorite artists"}
        />  

        <View style={styles.friendRequestButtons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => handleFriendRequest(true)}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => handleFriendRequest(false)}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
 
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
  friendRequestButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 18,
    marginTop:20
  },

  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  acceptButton: {
    backgroundColor: 'green',
    marginRight: 10,
  },

  declineButton: {
    backgroundColor: 'red',
    marginLeft: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default FriendProfile;
