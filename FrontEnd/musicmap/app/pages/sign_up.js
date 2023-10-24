import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const Sign_up = () => {
  // State variables to store user input data
  const [Name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setuserEmail] = useState('');

  // Function to handle sign-up process
  const handleSignup = () => {
    if (userName === '' || userPassword === '' || userEmail === '' || Name === '') {
      console.log('Empty Fields');
    } else {
      // Log user input data (you can add sign-up logic here in the future)
      console.log('Name:', Name);
      console.log('Username:', userName);
      console.log('Email:', userEmail);
      console.log('Password:', userPassword);
      // Future code to handle Sign up goes here
    }
  };

  return (
    <ScrollView >
      <KeyboardAvoidingView >
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title_text}>Sign Up</Text>
          <View style={styles.signupContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={Name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={userEmail}
              onChangeText={(text) => setuserEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={userPassword}
              onChangeText={(text) => setUserPassword(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.btntext}>Sign up</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <Stack.Screen //Allows editing of screen components, header, footer, etc
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
              Sign Up
            </Text>
          ),
          headerTitle: "",
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  safeArea: {
    width: '100%',
    alignItems: 'center',
  },
  title_text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#424242',
    marginBottom: 100,
  },
  signupContainer: {
    width: '80%', // Make the container wider
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#D10050',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '60%',
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'System',
  },
});

export default Sign_up;
