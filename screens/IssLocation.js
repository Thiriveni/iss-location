import React, { Component } from 'react';
import { Alert, Text, View, ImageBackground, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import axios from 'axios';
import MapView,{Marker}  from  "react-native-maps"

export default class IssLocationScreen extends Component {

constructor(){
    super();
    this.state={
        location:{}
    }
}

    componentDidMount(){
        this.getIssLocation()
    }

    getIssLocation=()=>{
     axios
     .get("https://api.wheretheiss.at/v1/satellites/25544")
     .then(
         (responce)=>{
          this.setState({
              location:responce.data
          })
     .catch(
         (error)=>{
          Alert.alert(error.message)
         }
     )
         }
     )
    }
    render() {
        return (
            
            <View
                style={{
                    flex: 1,
                    
                }}>
                     <SafeAreaView style={styles.droidSafeArea}>
                         </SafeAreaView>
                <ImageBackground 
                source={require("../ISS-assets/assets/iss_bg.jpg")}
                style={styles.backgroundImage}
                >
                  
                
               <View style={styles.titleBar}>  
               <Text style={styles.titleText}>ISS Location</Text>  
               </View>
               <View style={styles.mapContainer}>
                   <MapView 
                   style={styles.map}
                   region={{
                       latitude:this.state.location.latitude,
                       longitude:this.state.location.longitude,
                       latitudeDelta:100,
                       longitudeDelta:100
                   }}
                   >

                   </MapView>
               </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
     },
     backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    mapContainer: {
        flex:0.7
    },
    map: {
        width:"100%",
        height:"100%"

    }
})
