import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

const Map = () => {
  // Debug function to delete markers
  const deleteMarker = (targetLocation) => {
    const updatedMarkers = markers.filter(marker =>
      marker.coordinate.latitude !== targetLocation.latitude ||
      marker.coordinate.longitude !== targetLocation.longitude
    );
    setMarkers(updatedMarkers);
  };

  //Constants used in map component
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState(18.2073496); //Fallback latitude in case fetching it doesn't work initially
  const [longitude, setLongitude] = useState(-67.1445881);//Fallback longitude in case fetching it doesn't work initially
  const [errorMsg, setErrorMsg] = useState(null);
  const [deletedMarker, setDeletedMarker] = useState(null);

  //Asks for location permission
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

    // Sets the default location for initial render
    const defaultLocation = {
      latitude: 18.2073496,
      longitude: -67.1445881,
    };

    setMarkers([{ id: 1, coordinate: defaultLocation }]);
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleMapPress = (e) => {
    const newMarkers = [
      ...markers,
      {
        id: markers.length + 1,
        coordinate: e.nativeEvent.coordinate,
      },
    ];
    console.log(e.nativeEvent.coordinate, '\n');
    setMarkers(newMarkers);
  };

  const handleMapLongPress = (e) => {
    const lastMarker = markers[markers.length - 1];
    if (lastMarker) {
      // Pass the last marker's location and delete it
      deleteMarker(lastMarker.coordinate);
      setDeletedMarker(lastMarker);
    }
  };

  // Show alert outside the render cycle
  useEffect(() => {
    if (deletedMarker) {
      Alert.alert("Debug:", `Marker deleted at ${deletedMarker.coordinate.latitude}, ${deletedMarker.coordinate.longitude}`);
      setDeletedMarker(null); // Reset deletedMarker after displaying the alert
    }
  }, [deletedMarker]);

  return (
    <SafeAreaView style={styles.container}>
      {latitude !== null && longitude !== null ? (
        <MapView
          style={styles.map}
          // mapType="satellite" //Uncomment for satellite view
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
              onPress={() => Alert.alert("Marker Pressed")}
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
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
