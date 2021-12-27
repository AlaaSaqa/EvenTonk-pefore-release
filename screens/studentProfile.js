import React from "react";
import { useState ,useEffect  } from "react";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    FlatList,
    TextInput,
    RefreshControl,
    Alert,
    
} from "react-native";

export const tel = require("../assets/icons/telephone.png");
import { MenuProvider } from 'react-native-popup-menu';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from 'react-native';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { color } from "react-native-reanimated";
LogBox.ignoreLogs([
	'VirtualizedLists should never be nested',
])


LogBox.ignoreLogs([
	'VirtualizedLists should never be nested',
])
const Home = ({ navigation,route }) => {
  const [DFollowers,setDFollowers]=useState([]);
  const [Dstudents,setDstudents]=useState([]);
  const [folls,setFolls]=useState([]);
  const [people,setPeople]=useState([]);
  useEffect(()=>{
   
      fetch("http://10.0.2.2:4000/studentComms")
      .then(res=>res.json())
      .then(results=>{
          setDFollowers(results)
      });
     // alert(JSON.stringify(DFollowers));
     fetch("http://10.0.2.2:4000/signInC")
     .then(res=>res.json())
     .then(results=>{
      setDstudents(results)
     });

     fetch("http://10.0.2.2:4000/eventPeople")
     .then(res=>res.json())
     .then(results=>{
       setFolls(results)
     });
     fetch("http://10.0.2.2:4000/Event")
     .then(res=>res.json())
     .then(results=>{
       setPeople(results)
     });
  
  },[])
const [search, setSearch] = useState("");
const [joinText, setJoinText] = useState("JOINED");
const [follow, setfollow] = useState("Followed");
const [star, setStar] = useState(COLORS.secondary);
const [like, setLike] = useState('white');
const [followcoler, setfollowcoler] = useState(COLORS.primary);
const [followcoler2, setfollowcoler2] = useState(COLORS.white);
const [refreshing, setRefreshing] = React.useState(false);
const student=route.params;
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const [EventFull, setEventFull] = useState(COLORS.primary);
const [FollowersFull, setFollowersFull] = useState(COLORS.secondary);

const [Eventc, setEventc] = useState(COLORS.white);
const [Followersc, setFollowersc] = useState(COLORS.primary);
const handleStar = () => { 
    if (star==COLORS.secondary)
    setStar('gold');
    else setStar(COLORS.secondary);
    }
    const handleLike = () => { 
      if (like=='white')
      setLike('red');
      else setLike('white');
      }
     
const handleEventFull = () => { 
      setFollowersFull(COLORS.secondary);
      setEventFull(COLORS.primary);
      setEventc(COLORS.white);
      setFollowersc(COLORS.primary);
    }

    const handleFollowersFull = () => { 
      setFollowersFull(COLORS.primary);
      setEventFull(COLORS.secondary);
      setEventc(COLORS.primary);
      setFollowersc(COLORS.white);
    }
      
  const onPressFollow= () => {
    if (follow=='Follow'){
        setfollow("Followed");
    }
    else  if (follow=='Followed'){
      setfollow("Follow");
    }
   if (followcoler==COLORS.lightGray){
   
        setfollowcoler(COLORS.primary);}
    else{
          setfollowcoler(COLORS.lightGray);
       
        } 
        if (followcoler2==COLORS.primary){
          setfollowcoler2('white');
        }else {
          setfollowcoler2(COLORS.primary);
        }

    
  };
  
  


    
    function renderHeader() {
      return (
          <View style={{ flexDirection: 'row', height: 50,backgroundColor:'white' }}>
          
          
              <TouchableOpacity
                  style={{
                      width: 50,
                      paddingLeft: SIZES.padding * 2,
                      justifyContent: 'center'
                  }}
                  onPress={() => navigation.replace("not",student)}
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
            
                       
            <Menu >
    <MenuTrigger>
    <Image
      source={icons.list}
      resizeMode="contain"
      style={{
          width: 30,
          height: 30,
          tintColor:COLORS.primary,
          top:7,
          right:5,
      }}
     />
     </MenuTrigger> 
    <MenuOptions style={{
        alignSelf:'center',marginLeft:-5
    }}
    optionsContainerStyle=
   {{height:'100%',width:200,
  // borderRadius:25
   }}
    >
     <MenuOption  
     style={styles.menuItem}>
      <View>
        <Image
        source={icons.list}
        style={{
          tintColor:COLORS.primary,
          alignSelf:'center',
          width:35,height:35,
        }}
        ></Image>
      </View>
      </MenuOption>
      <MenuOption onSelect={()=>navigation.replace('settingsS',student)}  style={
        styles.menuItem}>
      <View ><Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Settings</Text></View>
      </MenuOption>
      <MenuOption onSelect={() =>navigation.navigate('about')} style={ styles.menuItem}>
        <Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>About Us</Text>
      </MenuOption>
      <MenuOption onSelect={() =>navigation.navigate('terms')} style={ styles.menuItem}>
        <Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Terms & Conditions</Text>
      </MenuOption>
      <MenuOption onSelect={() =>{
       Alert.alert(
    "Log Out",
    "Do you want to Log out?",
    [
      {
        text: "Cancel",
        onPress: () => {return;}
      },
      { text: "Log Out", onPress: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        });}}
    ]
  );
     }} style={ styles.menuItem}>
        <Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Log Out</Text>
      </MenuOption>
    </MenuOptions>
  </Menu>
      </View>
     
          
      )
  }
   
    const styles = StyleSheet.create({
      cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
      },
      container: {
        flex: 1,
      },
      emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
      },
      headerBackgroundImage: {
        //paddingBottom: 70,
        paddingTop: 45,
        height:'75%',
        width:'100%',
        
      },
      headerContainer: {
        backgroundColor:'white',
        height:500,

      },
      headerColumn: {
        backgroundColor: 'transparent',
  
        ...Platform.select({
          ios: {
            alignItems: 'center',
            elevation: 1,
            marginTop: -1,
          },
          android: {
            alignItems: 'center',
          },
        }),
      },
      placeIcon: {
        color: 'white',
        fontSize: 26,
      },
      scroll: {
        backgroundColor: '#FFF',
      },
      telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
      },
      userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      userCityRow: {
        backgroundColor: 'transparent',
      },
      userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
      },
      userImage: {
        //borderColor: COLORS.white,
        borderRadius: 100,
        borderColor:COLORS.white,
        borderWidth:3,
        height: 150,
        marginBottom: 15,
        width: 150,
      //  position:'absolute',
       // top:140,
      //  left:'75%',
      },
      userNameText: {
        color: COLORS.primary,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
        flex:1,
      },
      scrollView: {
       // backgroundColor: 'pink',
        marginHorizontal: 20,
      },
      scrollbtnEvent:{
              backgroundColor:EventFull,
              flex:1,
              borderRadius: 40,
              width:'100%',
              height:50,
              justifyContent:'center',
              alignContent:'center',
              marginRight:'2%',   
      },
scrollbtnFollowers:{
  backgroundColor:FollowersFull,
  flex:1,
  borderRadius: 40,
  width:'100%',
  height:50,
  justifyContent:'center',
  alignContent:'center',
  marginRight:'2%',   
},
      textbtnF:{
        color: Followersc,
        fontSize:SIZES.body3, 
        alignSelf:'center',
        fontWeight:'bold'
      },
      textbtnE:{
        color: Eventc,
        fontSize:SIZES.body3, 
        alignSelf:'center',
        fontWeight:'bold'
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
      item: {
        margin: 10,
      },
      itemPhoto: {
        width: 200,
        height: 200,
      },
      itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
      },
      menuItem:{
        backgroundColor:COLORS.white,
        width:170,
        marginTop:7,
        marginLeft:-30,
        marginRight:-30,
        marginBottom:7,
        paddingTop:5,
        paddingBottom:5,
        borderBottomWidth:1,
        borderBottomColor:COLORS.secondary
      },
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
        starPress:{
            tintColor:COLORS.gold
        },
    })
   
    function renderMainCategories() {
        return (
          
   <View style={styles.headerContainer}>
                
   
   <ImageBackground
     style={styles.headerBackgroundImage}
     blurRadius={10}
     source={{uri:student.imag}}
     
   >
   
   
  
     <View style={styles.headerColumn}>
     
       <Image
         style={styles.userImage}
         source={{uri:student.imag}}
       />
       
      
       <View style={styles.userAddressRow}>
       <Image
                 name="place"
                 underlayColor={COLORS.primary}
                 iconStyle={styles.placeIcon}     
       /> 
       </View>
     </View>
   </ImageBackground>
  
       
   <Text style={{
           //flex:1,
            fontSize:SIZES.h2,
            fontWeight:"bold",
            color:COLORS.primary,
            position:'absolute',
            top:'53%',
            marginLeft:'3%',
          
            
       }}>
          {student.name}
       </Text>
   <View style={{
     
         alignContent:'center',
         justifyContent:'center',
         marginTop:'-35%',
         marginLeft:'3%',
         height:200,

       }}>
    <View
    style={{
      top :25,
      marginBottom:'7%',
      //height:0,
    }}>
    
    <Text style={{
      fontSize:SIZES.body3,
      paddingLeft:4,
      paddingRight:10,
      color:COLORS.black,
      paddingBottom:'3%',
      marginTop:50,
    }}>
     {student.des}
    </Text>
    <Text style={{
      fontSize:SIZES.body3,
      paddingLeft:4,
      paddingRight:10,
      color:'gray',
     // paddingBottom:'3%',
      //marginTop:15,
    }}>
        <Image
        source={tel}
        style={{
          tintColor:COLORS.secondary,
          alignSelf:'center',
          width:20,height:20,
        }}
        ></Image>  {student.phone}
    </Text>
    <Text style={{
      fontSize:SIZES.body3,
      paddingLeft:4,
      paddingRight:10,
      color:'gray',
     // paddingBottom:'3%',
      //marginTop:15,
    }}>
    <Image
        source={icons.edit}
        style={{
          tintColor:COLORS.secondary,
          alignSelf:'center',
          width:18,height:18,
        }}
        ></Image>  {student.number}
    </Text>
    <Text style={{
      fontSize:SIZES.body3,
      paddingLeft:4,
      paddingRight:10,
      color:'gray',
      //paddingBottom:'3%',
      marginBottom:15,
    }}>
   <Image
        source={icons.emailnew}
        style={{
          tintColor:COLORS.secondary,
          alignSelf:'center',
          width:20,height:20,
        }}
        ></Image>  {student.email}
    </Text>
</View>

       <View
       style={
           {
             flexDirection:'row',
             justifyContent:'center',
             width:'100%',
             //marginTop:'10%',
             flexDirection:'row',
             flexWrap:'wrap',
             height:7,
             
           }
         }>
         
       <TouchableOpacity  style={styles.scrollbtnEvent}
       onPress={handleEventFull}>
         <Text style={styles.textbtnE}>Events</Text>
       </TouchableOpacity>

       <TouchableOpacity  style={styles.scrollbtnFollowers}
       onPress={handleFollowersFull}>
         <Text style={styles.textbtnF}>Following</Text>
       </TouchableOpacity>
       </View>
       
       </View>
       </View>
        )
    }
   
    function ret(){
      if (Followersc==COLORS.white){
      return(
        <SafeAreaView style={{
          backgroundColor:'white',
          //marginTop:'-10%'
        }}>
        {renderFollowers()}
        </SafeAreaView>
      )
      }
      else if (Eventc==COLORS.white){
      return(
        <SafeAreaView style={{
          backgroundColor:'white',
         // marginTop:'-10%'
        }}>
        {renderList()}
        </SafeAreaView>
      )
      }
    }
  function img (icon){
    if (icon!='')
      return (
        <Image
        source={icon}
        //resizeMode="cover"
        style={{
            margin:'5%',
            marginBottom:'10%',
            width: '90%',
            height: 300,
            borderRadius: SIZES.radius
        }}
    />
      )
    }
    
  function foll(){
    if (followcoler==COLORS.lightGray)
    {return (
      <Image
       style={{
         tintColor:COLORS.primary,
         width:20,
         height:20,
        marginRight:'7%',
         alignSelf:'center',
        //  position:'absolute',
          //right:70,

       }}
       source={require('../assets/icons/plus.png')}
     />
    )

    }}
    function renderFollowers() {
      var students=[];
   
      for (let i=0;i<DFollowers.length;i++){
        if (DFollowers[i].studentId==student._id){
           var s = DFollowers[i].commIds;
           var ss = s.split('+');
           for (let j =0;j<ss.length;j++){
             for(let k=0;k<Dstudents.length;k++){
               if (Dstudents[k]._id==ss[j]){
                 students.push(Dstudents[k]);
               }
             }
           }
        }
      }
      const renderItem = ({ item }) => {
          return(
            <TouchableOpacity
            
            style={{  marginBottom : SIZES.padding*2,
            width:'100%',
            //top:-30,
            height:200,
           
            }}
            onPress={() => navigation.replace("commPage",
             {userId:student._id,item:item})}
        >
            {/* Image */}
            
            <View
                style={{
                    marginBottom: SIZES.padding,
                    width:'100%',
                    height:200,
                }}
            >
               <Image
                        source={{uri:item.imag}}
                        resizeMode="contain"
                        style={{
                            width: '100%',
                            height: 200,
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
       
        <View style={{ 
            padding: SIZES.padding * 2,
            top:-40,
            //backgroundColor:COLORS.white,
            marginBottom:120 }}>
                <FlatList
                    data={students}
                    
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2}}
                />
            </View>
      )
  }
    function renderList() {
      var peo = [];
      for (let i =0;i<folls.length;i++){
        var s = folls[i].students;
        var ss = s.split('+');
        for (let k =0;k<ss.length;k++){
          if (ss[k]==student._id){
              for (let j =0;j<people.length;j++){
                if (people[j]._id==folls[i].event){
                  peo.push(people[j]);
                }
              }
          }
        }
      }
        const renderItem = ({ item }) => (
           
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.replace("eventPage",
                {userId:student._id,event:item})}
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
                
                
                <Text style={{ ...FONTS.body2 , color:COLORS.primary , fontWeight:'bold'}}>{item.name}</Text>

                <View
                    style={{
                       // marginTop: SIZES.padding,
                        flexDirection: 'row',
                        marginBottom:'10%',
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
                            
              <View
                  style={{ flexDirection: 'row' }}
               
              >
                  <Text style={{ ...FONTS.body3 , color:COLORS.primary }}>{item.commName} Community</Text>
                  
              </View>
              
                        
                           
                        
                      
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
         
          <FlatList  
                data={peo}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
           
        )
    }

    return (
      <MenuProvider>
        <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {renderHeader()}
            {renderMainCategories()}
            {ret()}
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
                    alignSelf:'center'
                }}
                onPress={()=>navigation.navigate('Home',student)}
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
                onPress={()=>navigation.replace('communities',student)}
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
                onPress={()=>navigation.replace('star',student)}
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
                onPress={()=>navigation.replace('eventwait',student)}
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
                onPress={()=>navigation.replace('chatS',student)}
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
                    height:55,
                    alignSelf:'center',
                    borderRadius:100,
                    //borderTopRightRadius:25,
                    alignContent:'center',
                    justifyContent:'center',
                  //  backgroundColor:COLORS.lightGray3
                }}>
                <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor:COLORS.primary,
                                alignSelf:'center'
                            }}
                        />
                </TouchableOpacity>
            
             </View>
        </SafeAreaView>

        </MenuProvider>
    )
}


export default Home;