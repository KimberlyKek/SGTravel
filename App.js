import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LaunchScreen from './index';
import HomeScreen from './busInfo';
import BusArrival from './busArrival';

const Stack = createNativeStackNavigator();

//navigations for buttons
function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="SGTravel" component={LaunchScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="Arrival Time"  component={BusArrival}/>
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App () {

  return (
    <StackNavigator/>
  
  )
}
