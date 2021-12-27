import React, {useEffect}from 'react';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { Text, View, SafeAreaView, Image,FlatList, ScrollView ,TouchableOpacity,TextInput,RefreshControl, StyleSheet, SliderComponent} from "react-native";
import { useState   } from "react";
import Loading from './Loading';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';



const chat = ({ navigation , route }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = useState("");
    const [threads, setThreads] = useState([]);
    const [threads1, setThreads1] = useState([]);
    const [threads2, setThreads2] = useState([]);


    const [loading, setLoading] = useState(true);
    const studant = route.params; //current user object is here
  // alert(studant.number); 
  var currents_user_number = studant.number;
//alert(currents_user_number);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  
  /**
   * Fetch threads from Firestore
   */
   useEffect(() => {
    const unsubscribe = firestore()
    .collection('THREADS')
    .orderBy('latestMessage.createdAt', 'desc')
    
   // .isEqual('11715558:11715557')
    .onSnapshot(querySnapshot => {
      const threads = querySnapshot.docs.map(documentSnapshot => {
        return {
          _id: documentSnapshot.id, //_id==11715558:1171557
          // give defaults
          name: '',

          latestMessage: {
            text: ''
          },
          ...documentSnapshot.data()
        };
      
      });

      setThreads(threads);
     
      var j = 0 ;
      var max;
 //   var max =threads[0]._id.split(':'); //max=11715557:11715558 max[0]=11715557, max[1]=11715558
     for(let i=0 ; i<threads.length; i++)
     {
        max =threads[i]._id.split(':'); 
        if(max[0] == currents_user_number || max[1] == currents_user_number)
        {
          threads1[j] = threads[i];
          j++;
        }   
      }
      setThreads1(threads1);
     


    fetch("http://10.0.2.2:4000/signInS")
    .then(res=>res.json())
    .then(results=>{
   
   fetch("http://10.0.2.2:4000/signInC")
    .then(res=>res.json())
    .then(ress=>{
   
        for(let i=0 ; i<threads1.length; i++)
        {
            var sndr , rcvr;
            var s= threads1[i]._id.split(':');
            if (s[0]== currents_user_number){
               sndr = s[0];
               rcvr = s[1];
            }
            else if(s[1]== currents_user_number){
             sndr = s[1];
             rcvr = s[0];
            }

           for (let j=0 ; j<results.length ; j++)
           {  
               if(results[j].number==rcvr){
                   threads2.push({std:results[j], thd:threads1[i], sndr:sndr, rcvr:rcvr})
               }    }

               for (let j=0 ; j<ress.length ; j++)
               {  
                   if(ress[j].email==rcvr){
                       threads2.push({std:ress[j], thd:threads1[i], sndr:sndr, rcvr:rcvr})
                   }    }

        }
        console.log(JSON.stringify(threads2));

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
});
})
  }, []);

  if (loading) {
    return <Loading />;
  }


function renderHeader() {
    return (
        <View style={{ flexDirection: 'row', height: 50 , marginBottom:'5%',backgroundColor:'white',marginTop:'2%' }}>
      
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
                onPress={() => navigation.replace("not",route.params)}
            >
            
            <Image
                    source={icons.bell}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor:COLORS.primary,
                        paddingTop :'3%',

                    }}
                />
            </TouchableOpacity>

            
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , flexDirection:'row'}}>
                    <View
                        style={{
                            width: '95%',
                            height: "85%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            marginTop:"3%",
                            marginLeft:'3%',
                            flexDirection:'row',
                            marginBottom:"3%",
                            flex:1,
                           
                        }}
                    >
                        
                        <TextInput
                        style={{ ...FONTS.body3 , color:'#005e66' , paddingLeft:'3%',flex:4 }}
                        placeholder=" search "
                        placeholderTextColor="#005e66"
                        onChangeText={(search) => setSearch(search)}
                        />
                        <TouchableOpacity style={{alignSelf:'flex-end',
                        //backgroundColor:'gray',
                        width:40,height:40,borderRadius:25,alignContent:'center',justifyContent:'center',marginRight:'1%'}}
                        onPress={()=>navigation.replace('search',{item :route.params._id,s:search,type:'student'})}
                        >
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 23,
                                height: 23,
                                tintColor: COLORS.primary,
                                alignSelf:'center'
                            }}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}
var maax,max,min,reciver,commId,comm;
var sender = currents_user_number;
function bring_it(){
    if(maax[0]==sender)
           reciver=maax[1];
            else
             reciver=maax[0];
}

    function renderNot() {
        // maax =item._id.split(':');
        //    {bring_it()}
        const renderItem = ({ item }) => ( //item = threads =chats that oula have
    
        <TouchableOpacity
                style={{ 
                backgroundColor:COLORS.white,
                borderTopWidth:1,
                borderColor:COLORS.secondary,
                flexDirection:'row',
                height:100,
                justifyContent:'center',
                alignContent:'center'

                }}
                
                onPress={() => navigation.replace("conversation",{
                    max:(item.sndr>item.rcvr? item.sndr : item.rcvr),
                    min:(item.sndr<item.rcvr? item.sndr : item.rcvr),
                    sender:item.sndr,
                    reciver:item.rcvr
                   }) }

      //   onPress={() => navigation.navigate('conversation', { thread: item })}

                
            >
            
                {/* Image */}
                
                <View
                    style={{
                        //marginBottom: SIZES.padding/2,
                        flex:1,
                        justifyContent:'center',
                        alignContent:'center'
                       
                    }}
                >
                    <Image
                        source={{uri:item.std.imag}}
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
                    marginTop:'5%',
                    marginLeft:'10%',
                    flex:3,
                    justifyContent:'center',
                    alignContent:'center',
                }}>
                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 , color:COLORS.primary , flex:2,fontWeight:'bold', flexWrap:'wrap',marginTop:'-3%'}}>{item.std.name} </Text>
                <Text style={{ ...FONTS.body3 ,flex:2, flexWrap:'wrap',marginTop:'-3%',color:COLORS.secondary}}>
                {item.thd.latestMessage.text} 
                
                </Text>
                </View>
                <Image
                        source={icons.conversation}
                        resizeMode="contain"
                        style={{
                            width: 23,
                            height: 23,
                            tintColor: COLORS.primary,
                            marginTop:'5%',
                            flex:1,
                            
                        }}
                    />
            </TouchableOpacity>
        )
        return (

            <FlatList
            data={threads2} //item:1171558:11715557
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
        <View style={{
            flex:1,
            backgroundColor:COLORS.white
        }}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <SafeAreaView style ={{
            backgroundColor:'white'
        }}>
        {renderHeader()}
       { renderNot()}
       </SafeAreaView>
       </ScrollView>
       <View style={{
                backgroundColor:COLORS.transparent,
                width:'100%',
                height:45,
                alignContent:'center',
                justifyContent:'center',
                alignSelf:'center',
                alignItems:'center',
                margin:5,
                flexDirection:'row'

            
            }}>

<TouchableOpacity style={{
                    flex:2,
                    alignSelf:'center'
                }}
                onPress={()=>navigation.navigate('Home',route.params)}
                >
                    <Image
                            source={icons.homes}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor:COLORS.secondary,
                                alignSelf:'center'
                            }}
                        />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex:2,
                    alignSelf:'center'
                }}
                onPress={()=>navigation.replace('communities',route.params)}
                >
                    <Image
                            source={icons.comms}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor:COLORS.secondary,
                                alignSelf:'center'
                            }}
                        />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex:2,
                    alignSelf:'center'
                }}
                onPress={()=>navigation.replace('star',route.params)}
                >
                    <Image
                            source={icons.star}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor:COLORS.secondary,
                                alignSelf:'center'
                            }}
                        />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex:2,
                    alignSelf:'center'
                }}
                onPress={()=>navigation.replace('eventwait',route.params)}
                >
                    <Image
                            source={icons.eventtime}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor:COLORS.secondary,
                                alignSelf:'center'
                            }}
                        />
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                    flex:2,
                    height:55,
                    alignSelf:'center',
                    borderRadius:100,
                    //borderTopRightRadius:25,
                    alignContent:'center',
                    justifyContent:'center',
                  //  backgroundColor:COLORS.lightGray3
                }}>
                <Image
                            source={icons.conversation}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor:COLORS.primary,
                                alignSelf:'center'
                            }}
                        />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex:2,
                    alignSelf:'center'
                }}
                onPress={()=>navigation.replace('studentProfile',route.params)}
                >
                    <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor:COLORS.secondary,
                                alignSelf:'center'
                            }}
                        />
                </TouchableOpacity>
             </View>
</View>
       
    )}

export default chat;


