import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import NotificationCard from "../components/NotificationCard";

const cards = [
  { content: "Friend Request!", notification: "New Friend!" },
  { content: "Don't Miss Out!", notification: "New music available!" },
  { content: "Music Streak!", notification: "Continue your listening streak!" },
  { content: "Friend Request!", notification: "New Friend!" },
];

const Notifications = () => {
  return (
    <SafeAreaView
      style={{
        //SafeAreaView- Similar to HTML 'div', creates a designated sized area for you to edit
        flexDirection: "column", //flexDirection - Orientation of the Area View, row designates it as horizontal
        marginTop: "10px", //Margin - How much distance is placed between object and the screen borders, could be placed in pixels or in percentages based on screen size
        height: "100%", //Height - Self-explanatory, height of the object relative to screen
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* This is so it creates cards for each item in the array */}
        {cards.map((c, i) => (
          <NotificationCard
            key={i}
            content={c.content}
            notification={c.notification}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
