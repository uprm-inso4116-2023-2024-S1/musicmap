import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = () => {
    //Function to call when log-in is pressed
    if ((userName == "") & (userPassword == "")) {
      console.log("Empty Fields");
    } else {
      console.log("Username:", userName);
      console.log("Password:", userPassword);
    }
  };

  const handleforgot = () => {
    //Function to call when Forgot is pressed
    console.log("Forgot Password");
  };
  const handlesignup = () => {
    //Function to call when Sign up is pressed
    console.log("Sign-Up");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>MusicMap</Text>
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username or Email"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={userPassword}
              onChangeText={(text) => setUserPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log-in</Text>
            </TouchableOpacity>

            <View style={styles.bottomtxt}>
              <TouchableOpacity onPress={handlesignup}>
                <Text style={styles.bottomText}>
                  Don’t have an account? Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleforgot}>
                <Text style={styles.bottomText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Aligns content at the top of the screen
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20, // Add top margin to title
    marginBottom: 150,
    color: "#424242",
  },
  loginContainer: {
    width: "80%",
    alignItems: "center", // Center the login fields horizontally
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%", // Make the input fields full width
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#D10050",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "100%", // Make the button full width
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomtxt: {
    margin: 10,
    alignContent: "center",
  },
  bottomText: {
    color: "#D10050",
    padding: 2,
    paddingTop: 5,
    textAlign: "center",
  },
});

export default Account;
