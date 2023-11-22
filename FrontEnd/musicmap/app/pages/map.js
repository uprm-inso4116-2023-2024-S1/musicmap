import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
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

  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLatitude(18.2073496); // Default location
          setLongitude(-67.1445881); // Default location
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      } catch (error) {
        console.error("Error getting current location: ", error);
        setErrorMsg('Error getting current location');
        console.log('Location grabbed successfully: ');
        console.log(latitude, longitude, '\n');
      }
    };

    fetchData();

    // Set the default location
    const defaultLocation = {
      latitude: 18.2073496,
      longitude: -67.1445881,
    };

    setMarkers([{ id: 1, coordinate: defaultLocation}]);
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
      Alert.alert("Debug: \n", `Marker deleted at ${lastMarker.coordinate.latitude}, ${lastMarker.coordinate.longitude}`);
    } else {
      Alert.alert("Debug: \n", "No markers to delete");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        //mapType="satellite" Uncomment for satellite view
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            image={require("../imgs/Pin.png")}
            coordinate={marker.coordinate}
            pinColor={marker.color}
            onPress={() => Alert.alert("Marker Pressed")}
          />
        ))}
      </MapView>
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
