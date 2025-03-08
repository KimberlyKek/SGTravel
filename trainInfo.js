import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import {StyleSheet,Text,TextInput,View, Image,Button, TouchableOpacity,SafeAreaView, Animated, Dimensions, FlatList } from "react-native";
import { Separator } from 'react-native-tableview-simple';
import filter from 'lodash.filter';

//train route page
export default TrainInfo = () => {


const [data, setData] = useState(null);
const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);

//fetch the data from json
const getData = async () => {
   
    const resp = await fetch("https://raw.githubusercontent.com/cheeaun/sgraildata/master/data/raw/MRTLRTStnPtt.json");
    const data = await resp.json();
    //set the data into setData
    setData(data);
    //set the search result data into setFullData
    setFullData(data);

  };

  useEffect(() => {
    getData();
  }, []);

//create Item constant to display the data
  const Item = ({ STN_NAME, STN_NO }) => (
    <View>
      <Text style={{fontSize: 20}}>
         {STN_NAME} </Text>
        <Text style={{color:"6b6868" }}>Station No: {STN_NO}</Text>
    </View>
  );

// render the data
  const renderItem = ({ item }) => (
    <Item STN_NAME={item.STN_NAME} STN_NO={item.STN_NO} />
  );

//filter the data when search
  const handleSearch = text => {
    const formattedQuery = text.toUpperCase();
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };
  
  //allow the user to search the data through STN_NAME or STN_NO
  const contains = ({ STN_NAME, STN_NO }, query) => {
    if (STN_NAME.includes(query) || STN_NO.includes(query) ) {
      return true;
    }
  
    return false;
  };

  return (
    <SafeAreaView style={{flex: 1, width:"100%", height:"100%"}}>
    <View style={styles.container}>
     <Image style={ {width: "100%", height:"40%", position: 'absolute'}} source = {require("./images/mrtmap.png")}/>

      {data && (
        <FlatList style={{flex:1, marginTop:"80%", fontSize: 20}}
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
          placeholder="Search train station..."
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EFE0E0'
    },
  
  });
  