import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {StyleSheet,Text,TextInput,View,Image,Button, TouchableOpacity,SafeAreaView,FlatList} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import TrainInfo from "./trainInfo";
import { Separator} from 'react-native-tableview-simple';
import filter from 'lodash.filter';

//top tab navigator for bus route and train route pages function
export default function HomeScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    
    <SafeAreaView style={{flex: 1, width:"100%", height:"100%"}}>
      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:'white',
        tabBarIndicatorStyle: {
          backgroundColor: 'red',
          height:3
        }, 
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {fontSize: 16,},
        tabBarItemStyle: {width: 150, },
        tabBarStyle: {
          height: 40,
          backgroundColor: 'black',
        },
       
      }}>
      
        <Tab.Screen name="Bus Route" component={BusInfo} />
        <Tab.Screen name="Train Route" component={TrainInfo} />
      </Tab.Navigator>

    
</SafeAreaView>

  );
}

//Dashboard/Bus route page
export const  BusInfo = ({navigation})  => {

 const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

// get the current location
  useEffect(() => {
    (async () => {
      //allow the app to access GPS
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


const [data, setData] = useState(null);
const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);

//fetch the data from json 
  const getData = async () => {
   
    const resp = await fetch("https://raw.githubusercontent.com/cheeaun/sgbusdata/main/data/v1/raw/bus-stops.datamall.json");
    const data = await resp.json();
    //set the data into setData constant
    setData(data);
    //set the search result data into setFullData constant
    setFullData(data);

  };

  useEffect(() => {
    getData();
  }, []);

//create a Item constant to display the data
  const Item = ({ BusStopCode, Description }) => (
    <View style={{flex: 1, flexDirection:'row', alignItems: 'center'}}>
      <TouchableOpacity>
      <Text style={{fontSize: 20}} onPress={() => navigation.navigate("Arrival Time", {BusStopCode, Description})}>
         {Description} </Text>
        <Text style={{color:"6b6868" }}>Bus Stop code: {BusStopCode}</Text>
       
        </TouchableOpacity>

        
    </View>
    
  );

  //Render the data
  const renderItem = ({ item }) => (
    <Item Description={item.Description} BusStopCode={item.BusStopCode} />
  );

//filter the data when search
  const handleSearch = text => {
    const formattedQuery = text;
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };
  
  // allow the user to search the data through Description or BusStopCode
  const contains = ({ Description, BusStopCode }, query) => {
   
    if (Description.includes(query) || BusStopCode.includes(query) ) {
      return true;
    }
    return false;
  };


  return (
    <SafeAreaView style={{flex: 1, width:"100%", height:"100%"}}>
    <View style={styles.container}>
   
     <MapView style={{flex: 1, width: "100%"}} provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 1.3290678,
        longitude: 103.776086,
        latitudeDelta: 0.009,
        longitudeDelta: 0.0089,}}>

        <Marker pinColor="red"
        coordinate={{latitude: 1.3290678, longitude: 103.776086,atitudeDelta: 0.009,
          longitudeDelta: 0.0089}} title="You are here"/>
          </MapView>
  
      {data && (
        <FlatList style={{flex:1, fontSize: 20}}
        keyboardShouldPersistTaps="always"
          ListHeaderComponent={
             <View
               style={{
               backgroundColor: '#fff',
               padding: 5,
               marginVertical: 5,
               borderRadius: 20
                }}
            >
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                placeholder="Search bus stop..."
                style={{ backgroundColor: '#fff', paddingHorizontal: 10 }}
            />
             </View>
          }
          ItemSeparatorComponent={Separator}
          data={data}
          renderItem={renderItem}
        />
      )}
    </View>

    <View>
  
    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EFE0E0'
    },
  
  });
  