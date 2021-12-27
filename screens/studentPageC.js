import React from "react";
import { useState ,useEffect  } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
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
    RefreshControl
} from "react-native";


import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loading from './Loading';


LogBox.ignoreLogs([
	'VirtualizedLists should never be nested',
])
const Home = ({ navigation,route }) => {
  const student = route.params.item; //object student i visit 
  const comm = route.params.comm; // id of the comm
  const [DFollowers,setDFollowers]=useState([]);
  const [Dstudents,setDstudents]=useState([]);
  const [folls,setFolls]=useState([]);
  const [people,setPeople]=useState([]);
  const [Communs,setCommuns]=useState([]);

  const [loading, setLoading] = useState(true);
  




  /**
   * Create a new Firestore collection to save threads
   */


   function handleButtonPress(){


    var sender = "";
    var reciver = student.number; 
    var max = "";
    var min = reciver;  
    
    fetch("http://10.0.2.2:4000/signInC")
        .then(res=>res.json())
        .then(results=>{
          for (let i =0;i<results.length;i++){

            if (results[i]._id==comm)
            {
              sender = results[i].email;
              max=sender;
             // alert(sender);

              firestore()
              .collection('THREADS')
              .doc(max+':'+min)
              .set({
                name: student.name,
                latestMessage: {
                  text: `Chat with ${student.name}.`,
                  createdAt: new Date().getTime()
                }
              })
              .then( docRef => {
                docRef.collection('MESSAGES').add({
                  text: `Chat with${student.name}.`,
                  createdAt: new Date().getTime(),
                  system: true
                });
              });
              navigation.replace("conversation",{
                commId:comm,
                comm:student,
                max:max,
                min:min,
                sender:sender,
                reciver:reciver
               });
            }
          }
        });

    
    
  
   }


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
const [follow, setfollow] = useState("Followed");

const [like, setLike] = useState('white');
const [followcoler, setfollowcoler] = useState(COLORS.primary);
const [followcoler2, setfollowcoler2] = useState(COLORS.white);

const [refreshing, setRefreshing] = React.useState(false);

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
                        onPress={()=>{
                          
                        navigation.navigate('search',{item :comm,s:search,type:'comm'})}}
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
  
       <TouchableOpacity  style={{
         position:'absolute',
         top:185,
         left:'3%',
         backgroundColor:'white',
         borderRadius:30,
         width:'30%',
         height:50,
         alignContent:'center',
         justifyContent:'center',
        // borderColor:COLORS.secondary,
        // borderWidth:2,
         flexDirection:'row',
    

       }}
    onPress={()=>handleButtonPress()}
       >
      
      <Image
         style={{
           tintColor:COLORS.primary,
           width:20,
           height:20,
           marginRight:'7%',
           alignSelf:'center',

         }}
         source={require('../assets/icons/conversation.png')}
       />
         <Text style={{color:COLORS.primary,fontSize:SIZES.body2, alignSelf:'center',fontWeight:'bold'}}
         
         >Chat</Text>
         
       </TouchableOpacity>
   <Text style={{
           //flex:1,
            fontSize:SIZES.h2,
            fontWeight:"bold",
            color:COLORS.primary,
            position:'absolute',
            top:'50%',
            marginLeft:'3%',
            //marginBottom:'%',
            
       }}>
         {student.name}
       </Text>
   <View style={{
     
         alignContent:'center',
         justifyContent:'center',
         marginTop:'-27%',
         marginLeft:'3%',
         height:200,

       }}>
    <View
    style={{
      top :25,
      marginBottom:'7%',
     
    }}>
    
    <Text style={{
      fontSize:SIZES.body3,
      paddingLeft:4,
      paddingRight:10,
      color:COLORS.black,
      paddingBottom:'3%'
    }}>
      {student.des} 
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
   
    function ret (){
      if (Followersc==COLORS.white){
      return(
        <SafeAreaView style={{
          backgroundColor:'white',
        //  marginTop:'-7%'
        }}>
        {renderFollowers()}
        </SafeAreaView>
      )
      }
      else if (Eventc==COLORS.white){
      return(
        <SafeAreaView style={{
          backgroundColor:'white',
        //  marginTop:'-7%'
        }}>
        {renderEventList()}
        </SafeAreaView>
      )
      }
    }
    function renderPin() {
      const renderItem = ({ item }) => (
         
          <View
              style={{ marginBottom: SIZES.padding * 2,backgroundColor:'white' }}
              
          >
          
              {/* Image */}
              
              <View
                  style={{
                      marginBottom: SIZES.padding/2,
                      backgroundColor:COLORS.lightGray3,
                      borderRadius:25,
                  }}
              >
            <View>
            <Image
                source={icons.pushPin}
                style={{
                  margin:'2%',
                    width : 40,
                    height:40,
                    tintColor: COLORS.primary,
                }} 
            />
            <Text style={{ ...FONTS.body2 , color:COLORS.primary, margin:'5%'}}>{item.text}</Text>
            </View>
               
                  {img(item.icon)}
                  
                  <View
                      style={{
                          position: 'absolute',
                          bottom: 0,
                          height: 50,
                          left:318,
                          //paddingTop:'5%',
                          width: SIZES.width * 0.13,
                          backgroundColor: COLORS.primary,
                          borderTopLeftRadius: SIZES.radius,
                          borderBottomRightRadius: SIZES.radius,
                          alignItems: 'center',
                          justifyContent: 'center',
                          ...styles.shadow
                      }}
                  >
                   <TouchableOpacity
                   onPress={handleLike}
                   >
                      <Image
                          source={icons.like}
                          style={{
                              width : 30,
                              height:30,
                              tintColor: like,
                          }} 
                      />
                      </TouchableOpacity>
                  </View>
                  
              </View>            
          </View>
      )

      return (
       
        <FlatList  
              data={pin}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                  paddingBottom: 30
              }}
          />
      )
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
    function renderPosts() {
     
      
      const renderItem = ({ item }) => (
         
          <View
              style={{ marginBottom: SIZES.padding * 2, backgroundColor:'white' }}
              
          >
          
              {/* Image */}
              
              <View
                  style={{
                      marginBottom: SIZES.padding/2,
                      backgroundColor:COLORS.lightGray3,
                      borderRadius:25,
                  }}
              >
               <Text style={{ ...FONTS.body2 , color:COLORS.primary, margin:'5%',marginBottom:'7%'}}>{item.text}</Text>
                    {img(item.icon)}
                  <View
                      style={{
                          position: 'absolute',
                          bottom: 0,
                          height: 50,
                          left:318,
                          //paddingTop:'5%',
                          width: SIZES.width * 0.13,
                          backgroundColor: COLORS.primary,
                          borderTopLeftRadius: SIZES.radius,
                          borderBottomRightRadius: SIZES.radius,
                          alignItems: 'center',
                          justifyContent: 'center',
                          ...styles.shadow
                      }}
                  >
                   <TouchableOpacity
                   onPress={handleLike}
                   >
                      <Image
                          source={icons.like}
                          style={{
                              width : 30,
                              height:30,
                              tintColor: like,
                          }} 
                          

                      />
                      </TouchableOpacity>
                  </View>
                  
              </View>            
          </View>
      )

      return (
       
        <FlatList  
              data={posts}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                  paddingBottom: 30
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
            onPress={() =>{if (item._id!=comm) 
            navigation.replace("commPageC",
            {userId:comm,item:item}
            )
            else navigation.replace('commProfile',item)
            }}
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
                {item._id!=comm&&(  <Text style={{ ...FONTS.h4 , color:COLORS.white ,flexWrap:"wrap",margin:15,}}>{item.name}</Text>)}
                {item._id==comm&&(  <Text style={{ ...FONTS.h4 , color:COLORS.white ,flexWrap:"wrap",margin:15,}}>You</Text>)}
                    
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
 
    function renderEventList() {
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
                onPress={() => navigation.navigate("EventShowScreenC",
                    item,
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