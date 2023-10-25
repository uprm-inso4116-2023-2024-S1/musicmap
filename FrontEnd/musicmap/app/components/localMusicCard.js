import React from "react-native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

import { useNavigation } from '@react-navigation/native';

const LocalMusicCard = ({ navigation }) => {
    const handleMap = () => {navigation.navigate('MusicMap');}; 
  return (
  <TouchableOpacity onPress={handleMap}  style={styles.cardContainer}>
    <Text style={styles.mainText}>{ "Local Music you may like..." }</Text>
    <View style={{ width: "100%", height: 5, backgroundColor: "#424242" }}/>
    <Text style={styles.secondText}> {'Tap to see where on MusicMap!'} </Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
      height: 85, 
      width: "90%", 
      justifyContent: "center",
      alignItems: "left", 
      backgroundColor: "white",
      marginLeft: "5%",
      borderRadius: 10, 
      elevation: 5,
      marginBottom: 18,
    },
    mainText: {
      color: "#424242",
      textAlign: "left",
      marginLeft: 10,
      fontSize: 20,
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
  
export default LocalMusicCard;