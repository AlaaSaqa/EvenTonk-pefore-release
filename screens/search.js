import React from 'react';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { StyleSheet, Text, View, SafeAreaView, Image,FlatList, ScrollView ,TouchableOpacity,TextInput,RefreshControl} from "react-native";
import { useState,useEffect  } from "react";
const not = ({ navigation,route }) => {
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = React.useState(false);
    const [value, setValue] = useState(route.params.s);
    const [user, setUser] = useState(route.params.item);//id
    const [type, setType] = useState(route.params.type);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
      
      const [datas,setDatas] = useState([])
      const [datac,setDatac] = useState([])
      const [datae,setDatae] = useState([])
      useEffect(()=>{
        fetch("http://10.0.2.2:4000/Event")
        .then(res=>res.json())
        .then(results=>{
            setDatae(results)
        })
      
        fetch("http://10.0.2.2:4000/signInC")
        .then(res=>res.json())
        .then(results=>{
            setDatac(results)
        })

        fetch("http://10.0.2.2:4000/signInS")
        .then(res=>res.json())
        .then(results=>{
            setDatas(results)
        })

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
        
          

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , flexDirection:'row',marginRight:'2%'}}>
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
                       

                        onPress={()=>navigation.replace('search',{item:user,type:type,s:search})}
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

    function renderNot() {
      var datacc = [];

        for (let i=0;i<datac.length;i++){
            var s = datac[i].name;
            s= s.toLowerCase();
            if (s.includes(value.toLowerCase())){
               datacc.push(datac[i]);
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
                onPress={() => { 
                if ((item._id==user)&&(type=='comm')){
                    var comm;
                    fetch("http://10.0.2.2:4000/signInC")
                    .then(res=>res.json())
                    .then(results=>{
                        for (let i=0;i<results.length;i++){
                            if (results[i]._id==user){
                            comm= results[i];
                            navigation.replace("commProfile",comm);
                            }
                        }
                    })
                   
                
                }
                else if (type=='comm')navigation.replace("commPageC", 
                {userId:user,item:item})//id
                else if (type=='student')navigation.replace("commPage", 
                {userId:user,item:item})//id
                }}
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
                        source={{uri:item.imag}}
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
                <Text style={{ ...FONTS.body2 , color:COLORS.primary , flex:2,fontWeight:'bold', flexWrap:'wrap',marginTop:'-3%'}}>{item.name} </Text>
                <Text style={{ ...FONTS.body3 ,flex:2, flexWrap:'wrap',marginTop:'-3%'}}>
                {item.des}
                </Text>
                </View>
            </TouchableOpacity>
        )
        if (datacc.length!=0)
        return (
            <FlatList
                data={datacc}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    
                }}
            />
        )
    }
    function renderNot1() {
        var dataee = [];
  
         
          for (let i=0;i<datae.length;i++){
              var s = datae[i].name;
              s= s.toLowerCase();
            if (s.includes(value.toLowerCase())){
                 dataee.push(datae[i]);
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
                  onPress={() => { if (type=='comm')navigation.navigate("EventShowScreenC",item)
                else if (type=='student')navigation.replace("EventShowScreen", 
                {userId:user,event:item})//id
                }}
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
                          source={{uri:item.imag}}
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
                  <Text style={{ ...FONTS.body2 , color:COLORS.primary , flex:2,fontWeight:'bold', flexWrap:'wrap',marginTop:'-3%'}}>{item.name} </Text>
                  <Text style={{ ...FONTS.body3 ,flex:2, flexWrap:'wrap',marginTop:'-3%'}}>
                  {item.des} 
                  </Text>
                  </View>
              </TouchableOpacity>
          )
          if (dataee.length!=0)
          return (
              <FlatList
                  data={dataee}
                  keyExtractor={item => `${item.id}`}
                  renderItem={renderItem}
                  contentContainerStyle={{
                      paddingHorizontal: SIZES.padding * 2,
                     
                  }}
              />
          )
      }
      function renderNot2() {
     
        var datass = [];
    
          for (let i=0;i<datas.length;i++){
              var s = datas[i].name;
              s= s.toLowerCase();
              if (s.includes(value.toLowerCase())){
                 datass.push(datas[i]);
              }
          }
          const renderItem = ({ item }) => (
  
              <TouchableOpacity
                  style={{
                  marginBottom: SIZES.padding * 2 ,
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
                  onPress={() => {
                    if ((item._id==user)&&(type=='student')){
                    var st;
                    fetch("http://10.0.2.2:4000/signInS")
                    .then(res=>res.json())
                    .then(results=>{
                        for (let i=0;i<results.length;i++){
                            if (results[i]._id==user){
                            st= results[i];
                            navigation.replace("studentProfile",st);
                            }
                        }
                    })
                   
                
                }
                     else  if (type=='comm')navigation.replace("studentPageC", 
                  {item:item,comm:user})//id
                else if (type=='student')navigation.replace("studentPage", 
                  {item:item,student:user})//id
                }}
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
                          source={{uri:item.imag}}
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
                  <Text style={{ ...FONTS.body2 , color:COLORS.primary , flex:2,fontWeight:'bold', flexWrap:'wrap',marginTop:'-3%'}}>{item.name} </Text>
                  <Text style={{ ...FONTS.body3 ,flex:2, flexWrap:'wrap',marginTop:'-3%'}}>
                  {item.des}
                  </Text>
                  </View>
              </TouchableOpacity>
          )
        if (datass.length!=0)
          return (
              <FlatList
                  data={datass}
                  keyExtractor={item => `${item.id}`}
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
        {value!=""&&(
            <View>
            <Text style={{...FONTS.body2,fontWeight:'bold',color:COLORS.secondary,margin:10,
            }}>Communities</Text>
       { renderNot()}
       <Text style={{...FONTS.body2,fontWeight:'bold',color:COLORS.secondary,margin:10,
            }}>Events</Text>
       { renderNot1()}
       <Text style={{...FONTS.body2,fontWeight:'bold',color:COLORS.secondary,margin:10,
            }}>Students</Text>
       { renderNot2()}
       </View>)
       }
     
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