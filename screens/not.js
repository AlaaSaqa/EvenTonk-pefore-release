import React from 'react';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { StyleSheet, Text, View, SafeAreaView, Image,FlatList, ScrollView ,TouchableOpacity,TextInput,RefreshControl} from "react-native";
import { useState,useEffect   } from "react";
import firestore from '@react-native-firebase/firestore';
import Loading from './Loading';



const not = ({ navigation ,route}) => {
   
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [threads, setThreads] = useState([]);
    const [th, setTh] = useState([]);
    const student=route.params;
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
      const [event,setEvent]=useState([]);
      const [comm,setComm]=useState([]);
      const [not,setNot]=useState([]);

  
useEffect(()=>{
    fetch("http://10.0.2.2:4000/not")
    .then(res=>res.json())
    .then(not=>{setNot(not)});
    fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(event=>{setEvent(event)}); 
    fetch("http://10.0.2.2:4000/studentComms")
    .then(res=>res.json())
    .then(comm=>{setComm(comm)});
},[])

function renderHeader() {
    return (
        <View style={{ flexDirection: 'row', height: 50 , marginBottom:'5%',backgroundColor:'white' ,marginTop:'2%'}}>
        <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
                onPress={() => navigation.goBack()}
            >
            
            <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor:COLORS.primary,
                        paddingTop :'3%',

                    }}
                />
            </TouchableOpacity>

           
        </View>
    )
}

    function renderNot() {
        var h=[];
        var m =[]; 
        for (let i=0;i<comm.length;i++){
            if (comm[i].studentId==route.params._id){
                var s = comm[i].commIds;
                var ss = s.split('+');
                for (let j=0;j<event.length;j++){
                for (let k=0;k<ss.length;k++){
                        if (event[j].comm==ss[k]){
                            m.push(event[j]);
                        }
                    }
                }
            }
        }
        
        for (let i =0 ; i<m.length;i++){
            for (let j=0;j< not.length ; j++){
                if (not[j].eventId==m[i]._id){
                    h.push ({not:not[j],event:m[i]});
                }
            }
        }
     
       
    
     
    
    
        const renderItem = ({ item }) => (

            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 ,
                backgroundColor:COLORS.lightGray3,
                marginLeft:'-3%',
                marginRight:'-3%',
                borderRadius:35,
                padding:'5%',
                flexDirection:'row',
                height:100,
                justifyContent:'center',
                alignContent:'center',
                borderWidth:1,
                borderColor:COLORS.secondary,
                marginBottom:'2%'
                }}
                onPress={() => navigation.navigate("eventPage",{userId:route.params._id,event:item.event})}
            >
            
                {/* Image */}
                
                <View
                    style={{
                        //marginBottom: SIZES.padding/2,
                        flex:1,
                        justifyContent:'center',
                        alignContent:'center',
                        left:-10,
                        
                       
                    }}
                >
                    <Image
                        source={{uri:item.event.imag}}
                        resizeMode="cover"
                        style={{
                            width: 75,
                            height: 75,
                            borderRadius: 50,
                            //flex:1,
                        }}
                    />

                </View>
                <View style={{
                    flex:3,
                    justifyContent:'center',
                    alignContent:'center',
                }}>
                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 , color:COLORS.primary , flex:2,fontWeight:'bold', flexWrap:'wrap',marginTop:'-3%'}}>{item.event.commName} publish new event</Text>
                <Text style={{ ...FONTS.body3 ,flex:2, flexWrap:'wrap',marginTop:'5%'}}>
                {item.event.name}
                </Text>
                </View>
            </TouchableOpacity>
        )

     return (

            <FlatList
            data={h} 
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={{
                paddingHorizontal: SIZES.padding * 2,
                paddingBottom: "30%"
            }}
          />
        )
        }
    return (

        <SafeAreaView style ={{
            backgroundColor:'white'
        }}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
        {renderHeader()}
       { renderNot()}
       </ScrollView>
       </SafeAreaView>
    )}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.lightGray4
        },
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 1,
        },
       
       
    })
export default not;