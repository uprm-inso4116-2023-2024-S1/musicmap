import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapComponent from './map_maker.js'

const Tab = createBottomTabNavigator();  
const Profile = () =>{
    return(
        <SafeAreaView style={{    //SafeAreaView- Similar to HTML 'div', creates a designated sized area for you to edit 
            flexDirection: "row", //flexDirection - Orientation of the Area View, row designates it as horizontal
            marginTop: '-7%',     //Margin - How much distance is placed between object and the screen borders, could be placed in pixels or in percentages based on screen size
            marginBottom: '-100%',
            height: '100%',        //Height - Self-explanatory, height of the object relative to screen
        }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 222, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'right', marginRight: 20, fontSize: 25, marginLeft: '3%', marginTop: '-45%', fontFamily: 'System', fontWeight: 'bold' }}>User_Name</Text>    
                        <Text style={{color: '#424242', textAlign: 'right', marginRight: 20, fontSize: 15, marginLeft: '3%',  fontFamily: 'System', fontWeight: 'bold' }}>Favorite Music Type</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Now Playing</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Now Playing</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Favorite Songs</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Now Playing</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Favorite Artists</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Now Playing</Text>    

                    </TouchableOpacity>
                   

                </View>

            </ScrollView>
            
            <Stack.Screen //Allows editing of screen components, header, footer, etc
                options={{
                    headerLeft: () => (
                        <Text style={{color: '#424242', fontSize: 30, marginLeft: '7%', fontFamily: 'System', fontWeight: 'bold'}}>Profile</Text>        
                    ),
                    headerTitle: ""
                }}
            />

        </SafeAreaView>

    )
};

const Friends = () =>{
    return(
        <SafeAreaView style={{    //SafeAreaView- Similar to HTML 'div', creates a designated sized area for you to edit 
            flexDirection: "row", //flexDirection - Orientation of the Area View, row designates it as horizontal
            marginTop: '10%',     //Margin - How much distance is placed between object and the screen borders, could be placed in pixels or in percentages based on screen size
            height: '100%',        //Height - Self-explanatory, height of the object relative to screen
            }}>
            <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                justifyContent: "center", //Literally places all objects in the center of the area
                alignItems: "center",     //Aligns every object relative to their center
                backgroundColor: 'red', //Sets the color to the color code input, can also be place literally, like 'red'
                height: '10%',
                width: '80%', //width of designated area relative to screen size
                marginLeft: '10%', 
                borderRadius: 10, //Rounds the corners of the imaginary box area
                elevation: 20,
                }}>

                <Text style={{color: 'white'}}>Button!</Text> 
                

            </TouchableOpacity>
            
            <Stack.Screen //Allows editing of screen components, header, footer, etc
                options={{
                    headerLeft: () => (
                        <Text style={{color: '#424242', fontSize: 30, marginLeft: '7%', fontFamily: 'System', fontWeight: 'bold'}}>Friends</Text>        
                    ),
                    headerTitle: ""
                }}
            />

        </SafeAreaView>

    )
};

//"@types/react-native": "^0.72.2",
// This is the map component. (At least I hope it works that way.)
const Map = () =>{
    return(

        <SafeAreaView style={{    //SafeAreaView- Similar to HTML 'div', creates a designated sized area for you to edit 
            flexDirection: "row", //flexDirection - Orientation of the Area View, row designates it as horizontal
            marginTop: '10%',     //Margin - How much distance is placed between object and the screen borders, could be placed in pixels or in percentages based on screen size
            height: '100%',        //Height - Self-explanatory, height of the object relative to screen
            }}>
            
            <Stack.Screen //Allows editing of screen components, header, footer, etc
                options={{
                    headerLeft: () => (
                        <Text style={{color: '#424242', fontSize: 30, marginLeft: '7%', fontFamily: 'System', fontWeight: 'bold'}}>Map</Text>        
                    ),
                    headerTitle: ""
                }}
            />
            <MapComponent />
        </SafeAreaView>
        
    )
};
const Notifications = () =>{
    return(
        <SafeAreaView style={{    //SafeAreaView- Similar to HTML 'div', creates a designated sized area for you to edit 
            flexDirection: "row", //flexDirection - Orientation of the Area View, row designates it as horizontal
            marginTop: '-7%',     //Margin - How much distance is placed between object and the screen borders, could be placed in pixels or in percentages based on screen size
            height: '100%',        //Height - Self-explanatory, height of the object relative to screen
            }}>
             <ScrollView showsVerticalScrollIndicator={false} >
                <View>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Notification</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Content</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Notification</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Content</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Notification</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Content</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Notification</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Content</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Notification</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Content</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Notification</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Content</Text>    

                    </TouchableOpacity>

                    <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
                        height: 106, //60%',
                        width: '90%', //width of designated area relative to screen size
                        justifyContent: "center", //Literally places all objects in the center of the area
                        alignItems: "left",     //Aligns every object relative to their left
                        backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
                        marginLeft: '5%', 
                        borderRadius: 10, //Rounds the corners of the imaginary box area
                        elevation: 5,
                        marginBottom: 18
                    }}>
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 20, fontSize: 20, marginLeft: '3%', marginTop: '-14%', fontFamily: 'System', fontWeight: 'bold' }}>Notification</Text>    
                        <View style={{width: '100%', height: 5, backgroundColor: '#424242', }}></View>   
                        <Text style={{color: '#424242', textAlign: 'left', marginLeft: 10, fontSize: 15, fontFamily: 'System' }}>Content</Text>    

                    </TouchableOpacity>


                    
                   

                </View>

            </ScrollView>
            <Stack.Screen //Allows editing of screen components, header, footer, etc
                options={{
                    headerLeft: () => (
                        <Text style={{color: '#424242', fontSize: 25, marginLeft: '7%', fontFamily: 'System', fontWeight: 'bold'}}>Notifications</Text>        
                    ),
                    headerTitle: ""
                }}
            />

        </SafeAreaView>

    )
};

const Settings = () => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <TouchableOpacity style={{ //Touchable opacity, creates an area that can be "touched", basically reates a button area
            height: 50, //60%',
            width: '90%', //width of designated area relative to screen size
            justifyContent: "center", //Literally places all objects in the center of the area
            alignItems: "left",     //Aligns every object relative to their left
            backgroundColor: 'white', //Sets the color to the color code input, can also be place literally, like 'red'
            borderRadius: 10, //Rounds the corners of the imaginary box area
            top: -275,
            elevation:20
        }}>
            <Text style={{color: '#424242', textAlign: 'left', marginLeft: '15%', fontSize: 20, fontFamily: 'System', fontWeight: 'bold' }}>Profile</Text>    
                         
        </TouchableOpacity>
        

        <Stack.Screen //Allows editing of screen components, header, footer, etc
                options={{
                    headerLeft: () => (
                        <Text style={{color: '#424242', fontSize: 30, marginLeft: '7%', fontFamily: 'System', fontWeight: 'bold'}}>Settings</Text>        
                    ),
                    headerTitle: ""
                }}
            />

      </SafeAreaView>
    );
  };

const App = () => {
    return (
        
      <NavigationContainer independent={true}>
        <Tab.Navigator tabBarOptions={{
          activeTintColor: '#D10050'}}>
          <Tab.Screen name="Settings" component={Settings} />
          <Tab.Screen name="Friends" component={Friends} />
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Notifications" component={Notifications} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
  

export default App;