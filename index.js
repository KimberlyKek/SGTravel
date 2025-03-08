import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// LaunchScreen function
export default function LaunchScreen({ navigation}) {

    return (
      <SafeAreaView style={{flex: 1, width:"100%", height:"100%"}}>
      <View style={styles.container}>
        <Image style={ {width: "25%", height:"10%", position: 'absolute', top: "3%", left: "0.5%"}} source = {require("./images/SGTravel.png")}/>
        <Image style={ {width: "100%", height:"35%", top: "15%"}} source={require("./images/BusImage.png")}/>
        <View style={styles.textcon}>
        <Text style={styles.TextContainer}>SGTravel App</Text>
        <Text style={styles.TextSubcontainer}>Perform all public transit related services in one go. Anytime, anywhere</Text>
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity  style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate("Home")}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE0E0'
  },

  textcon: {
    alignItems: "center",
    marginBottom: 20,
    top: "15%"
  },

  TextContainer: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
   
  },

  TextSubcontainer: {
    textAlign: "center",
    fontSize: 14,
    color: 'black',
   
  },

  button: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9E7F5',
    marginBottom: 40,
    borderRadius: 25,
    top: "300%",
    width: "80%",
    left: "9%"
  },

  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});
