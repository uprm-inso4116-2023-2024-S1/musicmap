import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PopularMusicCard = ({ music, artist }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleAnswer = () => {
    setIsExpanded(!isExpanded);
  };
  const cardHeight = isExpanded ? null : 85;
  return (
    <TouchableOpacity style={isExpanded ? styles.collapsedCardStyle : styles.expandedCardStyle} onPress={toggleAnswer}>
    
        <Text style={styles.mainText}>{"Popular Music of this week!"}</Text>
        <View style={{ width: "100%", height: 5, backgroundColor: "#424242" }}/>

        {!isExpanded && <Text style={styles.secondText}>{"Tap to see more."}</Text>}
        
        {isExpanded && music.map((musicItem, index) => (
        <Text key={index} style={styles.listText}>{musicItem}</Text>
      ))}
    
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  expandedCardStyle: {
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
  collapsedCardStyle: {
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
  listText: {
    color: "#424242",
    textAlign: "left",
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "System",
    fontWeight: "bold",
  }
});
export default PopularMusicCard;