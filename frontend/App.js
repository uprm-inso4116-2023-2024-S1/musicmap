import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

import haversineDistance from './functions/distanceCalc';
import sendLocation from './functions/sendLocation'
import getMarkerData from './functions/getMarkerData';
import getAllMarkerData from './functions/getAllMarkerData';

/*
 * These are just the coordinates I've saved for the Mock Pins.
 */
var coord1 = { latitude: 18.207604066510275, longitude: -67.14085782708979 }
var coord2 = { latitude: 18.20717280650395, longitude: -67.14166720383717 }

var garibaldys = {
  "coords": {
    "latitude": 18.204900697653727,
    "longitude": -67.13988521587275
  }
}

var allMarkersEnabled = false;

export default function App() {
  /**
   * This here simply creates a state variable, `location`,
   * that can be updated as we go. 
   * 
   * The `location` can be thought of as a getter and
   * `setLocation` as a getter.
   * 
   * https://react.dev/reference/react/useState
   */
  const [location, setLocation] = useState();
  const [markerData, setMarkerData] = useState([]);
  /**Empty array to determine the InitialState for markerData */

  /**
   * This runs every time that the attributes inside are updated. 
   * This is a default setting that can be modified by adding [<x>] at the end.
   * 
   * https://react.dev/reference/react/useEffect
   */
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      // var currentLocation = await Location.getCurrentPositionAsync({});
      // setLocation(currentLocation.coords)
      var currentLocation = garibaldys
      setLocation(currentLocation.coords)

      // Note to self, the Development Machine
      // address can change depending where im connected
      // from ofc so make sure to update it :) 
      await sendLocation(currentLocation)


      const fetchMarkerData = async () => {
        if (allMarkersEnabled) {
          var data = await getAllMarkerData();
        }
        else {
          var data = await getMarkerData();
        }
        setMarkerData(data);
        console.log("MARKERDATA", data)
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



  // console.log("Location:" ,location)
  return (
    <View style={styles.container}>

      {/* 
    This call right below with the {location && ... } 
    can be read as a conditional. If the location has been acquired,
    we render the map, otherwise, it renders something else. For now,
    it renders nothing.
    */}
      {location && (
        <MapView initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.021,
          /**
           * I believe the Delta variables
           * are simply how much it will be
           * zoomed or something like that
           */
        }}
          style={styles.map}>

          {/* Nearby Markers */}
          {markerData.map((marker) => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
            />
          ))}


          {/* Mock Marker */}
          <Marker
            coordinate={coord1}
            onPress={() => haversineDistance(
              location.latitude,
              location.longitude,
              coord1.latitude,
              coord1.longitude
            )}
          />

          {/* This is the User Pin*/}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            onPress={()=>{
              allMarkersEnabled = !allMarkersEnabled;
            }}
            pinColor='blue'
          />
        </MapView>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
