import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
  Modal,
  Pressable,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Linking } from "react-native";

import { getMarkerData, getAllMarkerData } from "../../functions/getMapsData";
import sendLocation from "../../functions/sendLocation";

var garibaldys = {
  "coords": {
    "latitude": 18.204900697653727,
    "longitude": -67.13988521587275
  }
}
var showAll = false;

const Map = () => {

  const [markerData, setMarkerData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  /**
   * These are the user coordinates that we will be using, they can
   * be altered later on to acquire the user location, but for now we
   * will use a default set of coordinates near the college campus :)
   */
  const [location, setLocation] = useState()


  const [errorMsg, setErrorMsg] = useState(null);

  /**
   * The main usage of this `useEffect` is to acquire the Permissions to
   * render the user location, and while we are indeed getting permissions here,
   * we don't really use them as we set the coordinates back to default values.
   */
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
      var currentLocation = garibaldys
      setLocation(currentLocation.coords)


      console.log("currentLocation :", currentLocation)
      await sendLocation(currentLocation)


      const fetchMarkerData = async () => {
        var data = await getMarkerData();
        setMarkerData(data);
      }

      fetchMarkerData();
      // Define a variable to control the interval for fetching data
      const dataFetchInterval = 10000; // Set to your desired interval in milliseconds (e.g., 10 seconds)

      // Set up an interval to fetch data at the defined rate
      const dataFetchIntervalId = setInterval(fetchMarkerData, dataFetchInterval);

      // Cleanup interval on component unmount
      return () => clearInterval(dataFetchIntervalId);
    };
    getPermissions();
  }, []);

  const openMarkerModal = (marker) => {
    setSelectedMarker(marker);
    setOpenModal(true);
  };

  const closeMarkerModal = () => {
    setSelectedMarker(null);
    setOpenModal(false);
  };

  const renderMarkerModal = () => {
    return (
      <Modal
        visible={openModal}
        transparent={true}
        onRequestClose={closeMarkerModal}
        animationType="slide"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close"
              selectable={true}
              size={30}
              style={{ alignSelf: "flex-end" }}
              onPress={closeMarkerModal}
            />
            <Pressable
              style={({ pressed }) => [
                styles.modal_container,
                pressed && { backgroundColor: "#1877F218" },
              ]}
              onPress={() => console.log("send request <3")}
            >
              <Text style={styles.modal_friend_request}>
                Send Friend Request
              </Text>
            </Pressable>

            {/* Data from clicked marker is displayed here */}

            {selectedMarker && (
              <View style={styles.box}>
                <Text style={styles.modal_text_title}>Currently Playing</Text>
                <View style={styles.albumInfoContainer}>
                  <View style={styles.leftbox}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(selectedMarker.track_url)}
                    >
                      <Image
                        source={{ uri: selectedMarker.cover }}
                        style={styles.album_img}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rightview}>
                    <Text style={styles.modal_text}>
                      {selectedMarker.track_name}
                    </Text>
                    <Text style={styles.artist_name}>
                      {selectedMarker.artist_name}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {selectedMarker && (
              <View style={styles.box}>
                <Text style={styles.modal_text_title}>Top Artists:</Text>
                <Text
                  style={styles.favorite_name}
                  onPress={() => Linking.openURL(selectedMarker.track_url)}
                >
                  {selectedMarker.favorite_artist}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderMarkerModal()}
      {location ? (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Here goes the user pin */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            onPress={() => showAll= !showAll}
            image = {require('../imgs/userPin.png')}
          />


          {/* These are all the pins from our DB */}
          {markerData.map((marker) => (
            <Marker
              key={marker.username}
              image={require('../imgs/Pin.png')}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              onPress={() => openMarkerModal(marker)}
            /** 
             * Sets the pressed marker as the `selectedMarker`
             * and uses its data to display it in the Modal
            */

            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal_text: {
    fontWeight: "400",
    fontSize: 18,
  },
  modal_text_title: {
    fontWeight: "500",
    fontSize: 24,
  },
  modal_friend_request: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
  },
  modal_container: {
    width: 350,
    backgroundColor: "#1877F2",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  box: {
    width: 350,
    height: 150,
    borderRadius: 8,
    backgroundColor: "white",
    // Changing Padding and Margins
    // To get a moreso symmetric box
    padding: 12,
    marginBottom: 1,
    marginTop: 10,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: 400,
    maxHeight: "90%",
    margin: 20,
    backgroundColor: "#efefef",
    borderRadius: 15,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
    gap: 10,
  },
  albumInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  leftbox: {
    marginRight: 10,
  },
  album_img: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  rightview: {
    flex: 1,
  },
  artist_name: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
  favorite_name: {
    marginTop: 15,
    fontSize: 20,
    color: "gray",
  },
  username_txt: {
    fontSize: 30,
  },
  bio_txt: {
    fontSize: 15,
    color: "gray",
  },
});

export default Map;
