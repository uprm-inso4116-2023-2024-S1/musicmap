import React from "react-native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

import { useNavigation } from '@react-navigation/native';

const Widget = ({ navigation, MainText, SecondText}) => {
    // const handleMap = () => {navigation.navigate('MusicMap');}; 
  return (
  <TouchableOpacity style={styles.cardContainer}>
    <Text style={styles.mainText}>{ MainText }</Text>
    <View style={{ width: "100%", height: 5, backgroundColor: "#424242" }}/>
    <Text style={styles.secondText}> { SecondText } </Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 106, 
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
        marginLeft: 20,
        fontSize: 20,
        marginLeft: "3%",
        marginTop: "-14%",
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
  
export default Widget;


