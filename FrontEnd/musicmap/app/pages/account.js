import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import checkLogin from '../../functions/checkLogin';

const Account = ({navigation}) => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = async () => {
    //Function to call when log-in is pressed
    if ((userName == "") || (userPassword == "")) {
      console.log("Empty Fields");
    } else {

      console.log("Username:", userName);
      console.log("Password:", userPassword);

      // Call `checkLogin` function to verify if credentials are valid
      var loginSuccess = await checkLogin(userName, userPassword)
      
      // If login is successful, we redirect user to profile page
      if(loginSuccess){
        navigation.navigate('Profile')
      }

      // Otherwise, indicate failure of login.
      else{
        console.log("Login failed")
      }
    }
  };

  const handleforgot = () => {
    //Function to call when Forgot is pressed
    console.log("Forgot Password");
  };
  const handlesignup = () => {
    //Function to call when Sign up is pressed
    navigation.navigate('Sign_Up')
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
              placeholderTextColor="#ccc"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc"
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
      <Stack.Screen //Allows editing of screen components, header, footer, etc
            options={{
              headerLeft: () => (
                <Text
                  style={{
                    color: "#424242",
                    fontSize: 25,
                    marginLeft: "7%",
                    fontFamily: "System",
                    fontWeight: "bold",
                  }}
                >
                  Account Login
                </Text>
              ),
              headerTitle: "",
            }}
          />
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
    width: "70%",
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
    width: '70%',
    marginTop:20
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
