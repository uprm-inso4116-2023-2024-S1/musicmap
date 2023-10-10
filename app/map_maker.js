//All the imports we need
import React, { useEffect, useState, useRef} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = '####################'; // I'd prefer if yall had your own key, have me test it since i have, but I can't share my key

const customMapStyle = [
  

];

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      // yadayada to ask for permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // this has the user's location info dudes
      const locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }}
          
          provider={MapView.PROVIDER_GOOGLE}
          //we do this to make sure only the custom marker is visible
          showsUserLocation={false}
          //showsUserLocation={true}

          //styling of map
          customMapStyle={customMapStyle}

          //DISABLING OF MOVEMENT 
          zoomEnabled={false} // Disables zooming cause we dont want  them extending too far or too in
          scrollEnabled={false} // Disable panning
          rotateEnabled={false} // Disable rotation
        >  
           <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            // Use a custom icon image
            image={require('./custom-marker-icon.png')} // Replace with your custom icon image
            anchor={{ width: 0.2, height: 0.2}}
            
          />

        </MapView>
      )}
    </View>
  );
};

//Styling pizaaz goes here
const styles = StyleSheet.create({
  container: {
     width :320, height: 520, top: -60
  },
  map: {
    width :380, height: 550, flex:1
  },
});


export default MapComponent;
