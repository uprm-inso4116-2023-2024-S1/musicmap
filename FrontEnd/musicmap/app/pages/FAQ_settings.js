import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import FAQCard from "../components/FAQCard";
import { Stack } from "expo-router";

const FAQSection = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <FAQCard
          question="What is the purpose of MusicMap?"
          answer=" MusicMap's purpose is to connect music lovers from around the world by helping them find like-minded individuals who share their passion for music. We aim to solve the challenge of connecting with similar music enthusiasts in the age of streaming platforms.
          "
        />
        <FAQCard
          question="What does MusicMap do?"
          answer=" Our system seamlessly helps users share music preferences, find similar tastes, and discover new artists. It's about forging connections, sharing experiences, and exploring new sonic landscapes"
        />
        <FAQCard
          question="What are the core pillars of MusicMap?"
          answer="MusicMap is built on four core pillars: music enthusiasts, genres, artists, and music itself. These pillars are the timeless foundations of music and are independent of our system's functions."
        />

        {/* Add more FAQCard components as needed */}
      </ScrollView>
      {/* Stack.Screen should be rendered within a Stack Navigator */}
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
              FAQ
            </Text>
          ),
          headerTitle: "",
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default FAQSection;
