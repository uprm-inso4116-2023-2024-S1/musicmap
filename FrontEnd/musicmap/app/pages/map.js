import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Alert, Text, Modal, Pressable, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import Ionicons from "@expo/vector-icons/Ionicons";

const Map = () => {
  // 
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState(18.2073496);
  const [longitude, setLongitude] = useState(-67.1445881);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      } catch (error) {
        console.error("Error getting current location: ", error);
        setErrorMsg('Error getting current location');
      }
    };
    fetchData();


    const defaultLocation = {
      latitude: 18.2073496,
      longitude: -67.1445881,
    };

    const defaultLocation2 = {
      latitude: 18.2573496,
      longitude: -67.2445881,
    };

    setMarkers([{ id: 1, coordinate: defaultLocation }, { id: 2, coordinate: defaultLocation2 }]);
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

            
            {selectedMarker && (
              <View style={styles.box}>
                <Text style={styles.modal_text}>{selectedMarker.id}</Text>
                <Text style={styles.modal_text}>Bio</Text>
              </View>
            )}
            {selectedMarker && (
              <View style={styles.box}>
                <Text style={styles.modal_text}>Currently Listening</Text>
                <Text style={styles.modal_text}>Kirby Candy Mountain (?)</Text>
              </View>
            )}
            {selectedMarker && (
              <View style={styles.box}>
                <Text style={styles.modal_text}>Top Artists:</Text>
                <Text style={styles.modal_text}>{`\u2022 Koji Kondo`}</Text>
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
    fontWeight: '500', 
    fontSize: 18 
  },

  modal_friend_request:{
    color: "white", 
    fontWeight: "800", 
    fontSize: 15 

  },

  modal_container:{
    width: 250,
    backgroundColor: "#1877F2",
    height: 35,
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
    height: 100,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
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
});

export default Map;
