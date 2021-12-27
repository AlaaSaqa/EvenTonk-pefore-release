import React from "react";
import { useState ,useEffect  } from "react";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    RefreshControl,
    Alert
} from "react-native";


import { icons, images, SIZES, COLORS, FONTS } from '../constants'
const Home = ({ navigation ,route}) => {
const [search, setSearch] = useState("");
const [joinText, setJoinText] = useState("JOIN");

const student = route.params;


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
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
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  const [datae,setDatae] = useState([])
  const [datac,setDatac] = useState([])
  const [valid,setValid]=useState(false)
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
  },[])

    function renderHeader() {
 
        return (
            <View style={{ flexDirection: 'row', height: 50 , marginBottom:'5%',backgroundColor:'transparent' ,marginTop:'2%'}}>
            
            
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("not",route.params)}
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
                        onPress={()=>navigation.navigate('search',{item :route.params._id,s:search,type:'student'})}
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

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                style={{  marginLeft : SIZES.padding,
                
                }}
                onPress={() => navigation.navigate("commPage", 
                {userId:student._id,item:item}
                )}
            >
                {/* Image */}
                
                <View
                    style={{
                        marginBottom: SIZES.padding,
                        width:300,
                        height:170,
                    }}
                >
                   <Image
                            source={{uri:item.imag}}
                            resizeMode="contain"
                            style={{
                                width: 300,
                                height: 170,
                                resizeMode:'cover',
                                borderTopRightRadius: SIZES.radius,
                                borderBottomLeftRadius: SIZES.radius,


                            }}
                        />

<View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            //height: 50,
                            //width: SIZES.width * 0.2,
                            backgroundColor: COLORS.primary,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 , color:COLORS.white ,flexWrap:"wrap",margin:15}}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 ,top:-20}}>
                <Text style={{ ...FONTS.h1 , color:COLORS.primary ,}}>Communities</Text>
                

                <FlatList
                    data={datac}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function renderEventList() {
        const renderItem = ({ item }) => (

            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("EventShowScreen", 
                {userId:student._id,event:item}
                )}
            >
            
                {/* Image */}
                
                <View
                    style={{
                        marginBottom: SIZES.padding/2
                    }}
                >
                    <Image
                        source={{uri:item.imag}}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 250,
                            borderRadius: SIZES.radius
                        }}
                    />
                    
                   
                    
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 , color:COLORS.primary , fontWeight:'bold'}}>{item.name}</Text>

                <View
                    style={{
                       // marginTop: SIZES.padding,
                        flexDirection: 'row',
                        marginBottom:'5%',
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.people}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10,
                            marginTop :4,
                        }}
                    />
                    

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
    
    
            <View
                style={{ flexDirection: 'row' }}
               
            >
                <Text style={{ ...FONTS.body3 , color:COLORS.primary }}>{item.commName} Community</Text>
                
            </View>
        
                        }
                    
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={datae}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView
      //  showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}>
            {renderHeader()}
            {renderMainCategories()}
            <Text
             style={{...FONTS.h1 ,
             marginBottom:'3%',
             marginLeft:'4%',
             marginTop:'-13%',
             color:COLORS.primary
            }}> Events</Text>
            {renderEventList()}
            </ScrollView>
            <View style={{
                backgroundColor:COLORS.white,
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
                    height:55,
                    alignSelf:'center',
                    borderRadius:100,
                    //borderTopRightRadius:25,
                    alignContent:'center',
                    justifyContent:'center',
                  //  backgroundColor:COLORS.lightGray3
                }}>
                <Image
                            source={icons.homes}
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
                onPress={()=>navigation.navigate('communities',route.params)}
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
                onPress={()=>navigation.navigate('star',route.params)}
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
                onPress={()=>navigation.navigate('eventwait',route.params)}
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
                    alignSelf:'center'
                }}
                onPress={()=>navigation.navigate('chatS',route.params)}
                >
                    <Image
                            source={icons.conversation}
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
                onPress={()=>navigation.navigate('studentProfile',route.params)}
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
        </SafeAreaView>
    )
}

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

export default Home;