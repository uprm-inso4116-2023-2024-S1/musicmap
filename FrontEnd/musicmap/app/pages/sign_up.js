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
import checkSignUp from '../../functions/checkSignUp';

const Sign_up = ({navigation}) => {
  // State variables to store user input data
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setuserEmail] = useState('');

  // Function to handle sign-up process
  const handleSignup = async () => {
    if (userName === '' || userPassword === '' || userEmail === '') {
      console.log('Empty Fields');
    } else {
      // Log user input data (you can add sign-up logic here in the future)
      console.log('Username:', userName);
      console.log('Email:', userEmail);
      console.log('Password:', userPassword);


      
      console.log("Checking Sign Up")
      var signUpSuccess = await checkSignUp(userName, userEmail, userPassword);
      
      // User Succesfully signed up. New User is created
      if (signUpSuccess==true){
        navigation.navigate('Profile')
      }

      //Otherwise, send a message indicating a failed login.
      //this is only in the console for now however
      else{
        console.log("Sign Up Failed")
      }
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
              placeholder="Username"
              placeholderTextColor="#ccc"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={userEmail}
              onChangeText={(text) => setuserEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc"
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
