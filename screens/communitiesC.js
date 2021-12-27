import React from "react";
import { useState ,useEffect  } from "react";
import { createBottomTabNavigator,} from "@react-navigation/bottom-tabs"
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    RefreshControl
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { ScrollView } from "react-native-gesture-handler";
const communities = ({ navigation ,route}) => {
   
    const [c1,setC1]=useState([]);
      const [c2,setC2]=useState([]);
    useEffect(()=>{
        fetch("http://10.0.2.2:4000/commComms")
        .then(res=>res.json())
        .then(res=>{
          
            setC1(res);
          
        })
        
        fetch("http://10.0.2.2:4000/signInC")
        .then(res=>res.json())
        .then(res=>{
            setC2(res);
        }) 
      },[])
  
const [search, setSearch] = useState("");
const comm = route.params;


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    fetch("http://10.0.2.2:4000/commComms")
        .then(res=>res.json())
        .then(res=>{
          
            setC1(res);
          
        })
        
        fetch("http://10.0.2.2:4000/signInC")
        .then(res=>res.json())
        .then(res=>{
            setC2(res);
        })
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

    function renderHeader() {
       
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
           
                
           <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("notc",route.params)}
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
                        onPress={()=>navigation.replace('search',{item :comm._id,s:search,type:'comm'})}
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
        
        var s="";
        var ss=[];
        var m =[];
       
     // alert(JSON.stringify(c2))
            for (let i =0;i<c1.length;i++){
                if (c1[i].comm==comm._id){
                    s=c1[i].comms;
                     ss=s.split('+');
                }
            }
           
           
        for (let i=0;i<ss.length;i++){
            for(let j=0;j<c2.length;j++){
                if (ss[i]==c2[j]._id){
                    m.push(c2[j]);
                }
            }
        } 
        const renderItem = ({ item }) => {
            if (item._id!=comm._id)
            return (
                <TouchableOpacity
                style={{  margin : SIZES.padding*0.5,
                width:'100%'
                }}
                onPress={() => navigation.replace("commPageC",
                {userId:comm._id,item:item})}
            >
                <View
                    style={{
                        marginBottom: SIZES.padding,
                        width:'100%',
                        height:250,
                    }}
                >
                   <Image
                            source={{uri:item.imag}}
                            resizeMode="contain"
                            style={{
                                width: '98%',
                                height: 250,
                                resizeMode:'cover',
                                borderTopRightRadius: SIZES.radius,
                                borderBottomLeftRadius: SIZES.radius,


                            }}
                        />

<View
                        style={{
                            position: 'absolute',
                           // bottom: 200,
                           // height: 50,
                            //width:250,
                            backgroundColor: COLORS.primary,
                            borderBottomRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 , color:COLORS.white ,flexWrap:"wrap",margin:15,}}>{item.name}</Text>
                    </View>
               
                </View>
            </TouchableOpacity>
            )
        }
       
       
        return (
            <View style={{ padding: SIZES.padding * 2,marginBottom:120 }}>
                <Text style={{ ...FONTS.h1 , color:COLORS.primary }}>Communities</Text>
                

                <FlatList
                    data={m}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2}}
                />
            </View>
          
            
        )
       
        
      
    }
 

   
    return (
        <SafeAreaView style={styles.container}>
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
           
            {renderMainCategories()} 
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
                onPress={()=>navigation.replace('HomeC',route.params)}
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
                    height:55,
                    alignSelf:'center',
                    borderRadius:100,
                    //borderTopRightRadius:25,
                    alignContent:'center',
                    justifyContent:'center',
                  //  backgroundColor:COLORS.lightGray3
                }}>
                <Image
                            source={icons.comms}
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
                onPress={()=>navigation.replace('addEvent',route.params)}
                >
                    <Image
                            source={icons.addev}
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
                onPress={()=>navigation.replace('chat',route.params)}
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
                onPress={()=>navigation.replace('commProfile',route.params)}
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
        backgroundColor: COLORS.lightGray4,
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
    starPress:{
        tintColor:COLORS.gold
    },
   
})

export default communities;