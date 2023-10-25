import { ScrollView, Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import NotificationCard from "../components/NotificationCard";
import FriendNotificationCard from "../components/friendNotificationCard";
import LocalMusicCard from "../components/localMusicCard";
import PopularMusicCard from "../components/popularMusicCard";

const cards = [
];

const friendCards = [
  { name: "Optimus Prime"},
  { name: "Elita One"},
  { name: "Bumblebee"},
]

const popularMusic = [
  "The Touch",
  "We Are the Reason",
  "Your Father Would be Proud",
  "We Don't Talk About Bruno",
  "Mega Max X Ending",
  "Tower of Flower",
]

const Notifications = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PopularMusicCard music={popularMusic}/>
        <LocalMusicCard navigation={navigation}/>
        {/* This is so it creates cards for each item in the array */}
        {cards.map((c, i) => (
          <NotificationCard
            key={i}
            content={c.content}
            notification={c.notification}
          />
        ))}
        {friendCards.map((c, i) => (
          <FriendNotificationCard
            key={i}
            name={c.name}
          />
        ))}
      </ScrollView>
      <Stack.Screen //Allows editing of screen components, header, footer, etc
        options={{
          headerLeft: () => (
            <Text style={styles.headerStyle}>Notifications</Text>
          ),
          headerTitle: "",
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flexDirection: "column", 
    marginTop: "10px", 
    height: "100%", 
  },
  headerStyle: {
    color: "#424242",
    fontSize: 25,
    marginLeft: "7%",
    fontFamily: "System",
    fontWeight: "bold",
  }
  
});

export default Notifications;
