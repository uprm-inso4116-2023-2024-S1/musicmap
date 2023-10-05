import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Button, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Friends = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState(""); // State for search input

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleSave = () => {
    // Add logic to save the inputText or perform any other action
    toggleModal();
  };

  // Define an array of friends with their active status
  const friendsData = [
    { name: "John", active: true },
    { name: "Alice", active: false },
    { name: "Jay", active: false },
    { name: "The Rock", active: true },
    // Add more friends and their statuses here
  ];

  // Filter friends based on search input
  const filteredFriends = friendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* New header */}
      <Stack.Screen
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
              Friends
            </Text>
          ),
          headerTitle: "",
          headerRight: () => (
            <Button
              title="Add"
              onPress={toggleModal}
            />
          ),
          headerTitleAlign: "center",
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "green", marginLeft: "7%", position:"absolute", top:5}}>Active Friends</Text>

      {/* Profile Pictures and Names */}
      <View style={{ flexDirection: "row", marginLeft: "7%" }}>
        {filteredFriends.map((friend, index) => (
          <View style={styles.profileContainer} key={index}>
            <View
              style={[
                styles.profileCircle,
                {
                  borderColor: friend.active ? "green" : "red", // Conditionally set the border color
                },
              ]}
            ></View>
            <Text style={styles.profileName}>{friend.name}</Text>
          </View>
        ))}
      </View>
      {/* End of Profile Pictures and Names */}
      
      {/* Search Bar */}
      <TextInput
        placeholder="Search Friends"
        placeholderTextColor = "#ccc"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          margin: 10,
          
        }}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {/* End of Search Bar */}
      
      {/* End of new header */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: "80%", backgroundColor: "white", padding: 35, borderRadius: 20 }}>
            <TextInput
              placeholder="Enter Username"
              placeholderTextColor="#888"
              value={inputText}
              onChangeText={handleInputChange}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              }}
            />
            <Button title="Send Friend Request" onPress={handleSave} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = {
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10, // Adjust the margin as needed
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    borderWidth: 2, // Add a border width
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5, // Adjust the margin as needed
  },
};

export default Friends;
