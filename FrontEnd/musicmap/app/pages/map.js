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

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState(18.2073496);
  const [longitude, setLongitude] = useState(-67.1445881);
  const [errorMsg, setErrorMsg] = useState(null);
  const [deletedMarker, setDeletedMarker] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      } catch (error) {
        console.error("Error getting current location: ", error);
        setErrorMsg("Error getting current location");
      }
    };

    fetchData();

    const defaultLocation = {
      latitude: 18.2073496,
      longitude: -67.1445881,
    };

    setMarkers([{ id: 1, coordinate: defaultLocation }]);
  }, []);

  const deleteMarker = (targetLocation) => {
    const updatedMarkers = markers.filter(
      (marker) =>
        marker.coordinate.latitude !== targetLocation.latitude ||
        marker.coordinate.longitude !== targetLocation.longitude
    );
    setMarkers(updatedMarkers);
  };

  const handleMapPress = (e) => {
    const newMarkers = [
      ...markers,
      {
        user_name: "Axel",//Change to backend data
        Bio: "Temporary Bio, change to backend \n Testing how this will look",//Change to backend data
        id: markers.length + 1, //Change to backend data
        coordinate: e.nativeEvent.coordinate, //Change to backend data
        album_img: require("../imgs/temp_album.png"), //Change to backend data
        track_name: "Garden", //Change to backend data
        album_name: "Hablot Brown", //Change to backend data
        href: "https://open.spotify.com/album/0m0bo1CSzebkmFL486kMZY?si=g-KisZT5SPC3uoasgNhEkQ", //Change to backend data
        favorite_artist: "Hablot Brown",//Change to backend data
        artist_href:
          "https://open.spotify.com/artist/6LtgEnShwvrqAaKohg7skM?si=gHryLSMaS9WaL6ks7x43pA",//Change to backend data
      },
    ];
    setMarkers(newMarkers);
  };

  const handleMapLongPress = (e) => {
    const lastMarker = markers[markers.length - 1];
    if (lastMarker) {
      deleteMarker(lastMarker.coordinate);
      setDeletedMarker(lastMarker);
    }
  };

  useEffect(() => {
    if (deletedMarker) {
      Alert.alert(
        "Debug:",
        `Marker deleted at ${deletedMarker.coordinate.latitude}, ${deletedMarker.coordinate.longitude}`
      );
      setDeletedMarker(null);
    }
  }, [deletedMarker]);

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
            {selectedMarker && (
              <View style={styles.box}>
                <Text style={styles.username_txt}>
                  {selectedMarker.user_name}
                </Text>
                <Text style={styles.bio_txt}>{selectedMarker.Bio}</Text>
              </View>
            )}
            {selectedMarker && (
              <View style={styles.box}>
                <Text style={styles.modal_text}>Currently Playing</Text>
                <View style={styles.albumInfoContainer}>
                  <View style={styles.leftbox}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(selectedMarker.href)}
                    >
                      <Image
                        source={selectedMarker.album_img}
                        style={styles.album_img}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rightview}>
                    <Text style={styles.modal_text}>
                      {selectedMarker.track_name}
                    </Text>
                    <Text style={styles.album_name}>
                      {selectedMarker.album_name}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {selectedMarker && (
              <View style={styles.box}>
                <Text style={styles.modal_text}>Top Artists:</Text>
                <Text
                  style={styles.favorite_name}
                  onPress={() => Linking.openURL(selectedMarker.artist_href)}
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
      {latitude !== null && longitude !== null ? (
        <MapView
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
          onLongPress={handleMapLongPress}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              image={require("../imgs/Pin.png")}
              coordinate={marker.coordinate}
              onPress={() => openMarkerModal(marker)}
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
    fontWeight: "500",
    fontSize: 18,
  },
  modal_friend_request: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
  },
  modal_container: {
    width: 250,
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
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
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
    padding: 15,
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
  album_name: {
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
