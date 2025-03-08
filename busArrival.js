import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import {StyleSheet,Text,TextInput,View, Image,Button, TouchableOpacity,SafeAreaView, Modal, ScrollView } from "react-native";
import {useRoute } from '@react-navigation/native';

//Display the bus arrival time function
export default function BusArrival () {

// get busstopcode and description data from BusInfo
const route = useRoute();
const busStopcode = route.params?.BusStopCode
const busStop = route.params?.Description
// create loading and data const
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);
//display the API data in the console
console.log(data);

//fetch the data from API based on busStopcode and save inside setData
  useEffect(() => {
    fetch('http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=' + busStopcode, 
                                     {
                                       method: 'get',
                                         headers: {
                                             'Accountkey': 'y3xM2TuAR065XxVGQCFkYg=='
                                         }
                                     })
                                     .then((resp) => resp.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));},[]);

    const [modalVisible, setModalVisible] = useState(false);
   
  //display the data if there is data available, else display message if no available data
  return (
    <SafeAreaView style={{flex: 1, width:"100%", height:"100%"}}>
    <View style={styles.container}>
    
   <ScrollView>
   <View style={styles.textcon}>
    <Text style={styles.TextContainer}>{busStop}</Text>
   <Text style={styles.TextSubCon}> {busStopcode}</Text>
   </View>
    {loading ? (
    <Text>Fetching the data...</Text>
  ) : (
    data.Services.length > 0 ? (data.Services.map((post) => {
      return (
        
        <View style={styles.tableContainer}>
        <View style={styles.tableRowHeader}>
           <View style={styles.tableColumnHeader}>
            <TouchableOpacity>
              <Text style={styles.textHeader} onPress={() => setModalVisible(true)}>{post.ServiceNo}</Text>
              </TouchableOpacity>
           </View>
        </View>
        <View style={styles.tableRow}>
           <View style={styles.tableColumnClockInOutTimes}>
              <Text style={styles.textLineItem}>Next Bus</Text>
           </View>
           <View style={styles.tableColumnTotals}>
              <Text style={styles.textLineItem}>{post.NextBus.EstimatedArrival}</Text>
           </View>
        </View>
        <View style={styles.tableRow}>
           <View style={styles.tableColumnClockInOutTimes}>
              <Text style={styles.textLineItem}>Next Second Bus</Text>
           </View>
           <View style={styles.tableColumnTotals}>
              <Text style={styles.textLineItem}>{post.NextBus2.EstimatedArrival}</Text>
           </View>
        </View>
     </View>
      );
    })
  ) : (<Text style={styles.nodataText}>Bus services are not operating now</Text>)
  )
}
   </ScrollView>

   <View >
  
 
    <Modal   animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
   
<View style={styles.modalView}>
<View style={{backgroundColor: "#5A5A5A"}}>
<Text style={styles.RouteTextContainer}>{busStop}</Text>
<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}><Text style={styles.modalHeaderCloseText}>X</Text></TouchableOpacity>
</View>
<Text style={styles.BusNoText}>Bus No</Text>
<ScrollView>
            <View style={styles.RoutetableContainer}>
               <View style={styles.RoutetableRowHeader}>
                  <View style={styles.RoutetableColumnHeader}>
                     <Text style={styles.RoutetextHeader}>First Bus    Last Bus</Text>
                  </View>
               </View>
               <View style={styles.RoutetableRow}>
                  <View style={styles.RoutetableColumnClockInOutTimes}>
                     <Text style={styles.textLineItem}>Weekdays</Text>
                  </View>
                  <View style={styles.RoutetableColumnTotals}>
                     <Text style={styles.textLineItem}>0500</Text>
                  </View>
                  <View style={styles.RoutetableColumnTotals}>
                     <Text style={styles.textLineItem}>2300</Text>
                  </View>
               </View>

               <View style={styles.RoutetableRow}>
                  <View style={styles.RoutetableColumnClockInOutTimes}>
                     <Text style={styles.textLineItem}>Saturday</Text>
                  </View>
                  <View style={styles.RoutetableColumnTotals}>
                     <Text style={styles.textLineItem}>0500</Text>
                  </View>
                  <View style={styles.RoutetableColumnTotals}>
                     <Text style={styles.textLineItem}>2300</Text>
                  </View>
               </View>

               <View style={styles.RoutetableRow}>
                  <View style={styles.RoutetableColumnClockInOutTimes}>
                     <Text style={styles.textLineItem}>Sunday/PH</Text>
                  </View>
                  <View style={styles.RoutetableColumnTotals}>
                     <Text style={styles.textLineItem}>0500</Text>
                  </View>
                  <View style={styles.RoutetableColumnTotals}>
                     <Text style={styles.textLineItem}>2300</Text>
                  </View>
               </View>
               </View>
         </ScrollView>      
</View>
   </Modal>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

   nodataText : {
      textAlign: "center",
      marginTop: "50%",
      fontSize: 18
   },
    container: {
      flex: 1,
      backgroundColor: '#EFE0E0'
    },
  
    textcon: {
     
      marginTop: "10%"
    },
    TextContainer: {
    
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginTop: "5%"
     
    },
    TextSubCon:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      
    },

    tableColumnHeader: {
        alignItems: "center",
        backgroundColor: "#5A5A5A",
        flex: 5,
        justifyContent: "center"
     },
     tableColumnClockInOutTimes: {
        alignItems: "center",
        backgroundColor: "gray",
        flex: 3,
        justifyContent: "center",
        margin: 1
     },
     tableColumnTotals: {
        alignItems: "center",
        backgroundColor: "gray",
        flex: 2,
        justifyContent: "center",
        margin: 1
     },
     tableRow: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 40
     },
    
     tableContainer: {
        marginTop: 20,
        padding: 5
     },
     textHeader: {
        color:"white",
        fontSize: 20,
        fontWeight: "bold"
      },
      
      textLineItem: {
        color: "white"
      },

    
      modalView: {
        marginTop: "80%",
        margin: 30,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height:"30%"
      },


      RouteTextContainer:{
        
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: "2%"
      },

      BusNoText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: "2%"
        
      },
      RoutetableColumnHeader: {
        alignItems: "flex-end",
        backgroundColor: "#5A5A5A",
        flex: 3,
        justifyContent: "center"
     },
     RoutetableColumnClockInOutTimes: {
        alignItems: "center",
        backgroundColor: "gray",
        flex: 5,
        justifyContent: "center",
        margin: 1
     },
     RoutetableColumnTotals: {
        alignItems: "center",
        backgroundColor: "gray",
        flex: 2,
        justifyContent: "center",
        margin: 1
     },
     RoutetableRow: {
        flex: 5,
        flexDirection: "row",
       
     },
    
     RoutetableContainer: {
        marginTop: 20,
        padding: 5
     },
   
     RoutetextHeader: {
        color:"white",
        fontSize: 15,
        fontWeight: "bold"
        
     },

     modalHeaderCloseText: {
  
      paddingLeft: "92%",
      bottom: "150%",
      color:"white",
      fontSize: 20,
      fontWeight: "bold"
    }
  });
  