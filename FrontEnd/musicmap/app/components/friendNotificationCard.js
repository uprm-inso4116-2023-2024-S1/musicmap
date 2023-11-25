import { Text, TouchableOpacity, View, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';

const FriendNotificationCard = ({ name }) => {
  const navigation = useNavigation();
  const handler = () => {navigation.navigate('FriendProfile');}; 

  return (
    <TouchableOpacity onPress={handler} style={styles.cardContainer}>
      <Text style={styles.mainText}>{ "New Friend Request!" }</Text>
      <View style={styles.miniRect}/>
      <Text style={styles.secondText}>{ name + " wants to be friends with you!"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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
  miniRect: {
    width: "100%", 
    height: 5, 
    backgroundColor: "#424242"
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
});
export default FriendNotificationCard;