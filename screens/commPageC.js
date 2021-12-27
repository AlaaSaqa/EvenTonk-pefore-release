import React, { useEffect } from "react";
import { useState   } from "react";
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

const Home = ({ navigation ,route}) => {
const [search, setSearch] = useState("");
const [follow, setfollow] = useState("Follow");
const [like, setLike] = useState('white');
const [followcoler, setfollowcoler] = useState('white');
const [followcoler2, setfollowcoler2] = useState(COLORS.primary);
const [EventFull, setEventFull] = useState(COLORS.primary);
const [MediaFull, setMediaFull] = useState(COLORS.secondary);
const [FollowersFull, setFollowersFull] = useState(COLORS.secondary);
const [Eventc, setEventc] = useState(COLORS.white);
const [Mediac, setMediac] = useState(COLORS.primary);
const [Followersc, setFollowersc] = useState(COLORS.primary);
const [refreshing, setRefreshing] = React.useState(false);
const commId= route.params.userId; //me as a  community sender
const comm = route.params.item;//community reciver
const [DFollowers,setDFollowers]=useState([]);
const [Dstudents,setDstudents]=useState([]);
const [DEvents,setDEvents]=useState([]);
const [DPosts,setDPosts]=useState([]);
const [st,setSt]=useState();
const [loading, setLoading] = useState(true);




  /**
   * Create a new Firestore collection to save threads
   */


   function handleButtonPress(){

    var sender = "";
    var reciver = comm.name;   
    var max = "";
    var min = "";
    var maxInt = "";
    var minInt = "";


    fetch("http://10.0.2.2:4000/signInC")
        .then(res=>res.json())
        .then(results=>{
          for (let i =0;i<results.length;i++){

            if (results[i]._id==commId)
            {
              
              sender = results[i].email;
              maxInt = parseInt(results[i].email.length);  //44
              minInt = parseInt(comm.email.length); //7

             if (maxInt>=minInt)
             {
               max = results[i].email;
               min = comm.email;
             }
             else
              {
                max = comm.email;
                min = results[i].email;

             }
             // alert(sender);
     



              firestore()
              .collection('THREADS')
              .doc(max+":"+min)
              .set({
                name: comm.name,
                latestMessage: {
                  text: `Chat with ${comm.name}.`,
                  createdAt: new Date().getTime()
                }
              })
              .then( docRef => {
                docRef.collection('MESSAGES').add({
                  text: `Chat with${comm.name}.`,
                  createdAt: new Date().getTime(),
                  system: true
                });
              });
              navigation.replace("conversation",{
                commId:commId,
                comm:comm,
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
  fetch("http://10.0.2.2:4000/signInC")
  .then(res=>res.json())
  .then(results=>{
  console.log(results[1].number)
    for(let i = 0 ; i<results.length; i++){
      if(results[i]._id == commId)
      setSt(results[i]);  }})




  fetch("http://10.0.2.2:4000/commComms")
  .then(res=>res.json())
  .then(rel=>{
   for(let i=0;i<rel.length;i++){
     if (rel[i].comm==commId){
      let s =rel[i].comms;
      let ss = s.split('+');
      for (let j=0;j<ss.length;j++){
        if (ss[j]==comm._id){
            setfollowcoler(COLORS.primary);
              setfollowcoler2('white');
              setfollow("Followed");
        }
      }
     }
   }
  })

  
  fetch("http://10.0.2.2:4000/studentComms")
  .then(res=>res.json())
  .then(results=>{
      setDFollowers(results)
  });
 // alert(JSON.stringify(DFollowers));
 fetch("http://10.0.2.2:4000/signInS")
 .then(res=>res.json())
 .then(results=>{
  setDstudents(results)
 });


 fetch("http://10.0.2.2:4000/Event")
 .then(res=>res.json())
 .then(results=>{
   setDEvents(results)
 });

 fetch("http://10.0.2.2:4000/commPost")
   .then(res=>res.json())
   .then(results=>{
       setDPosts(results)
   });
  

},[])


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }     
const handleEventFull = () => { 
      setFollowersFull(COLORS.secondary);
      setMediaFull(COLORS.secondary);
      setEventFull(COLORS.primary);
      setEventc(COLORS.white);
      setFollowersc(COLORS.primary);
      setMediac(COLORS.primary);
    }

const handleMediaFull = () => { 
      setFollowersFull(COLORS.secondary);
      setMediaFull(COLORS.primary);
      setEventFull(COLORS.secondary);
      setEventc(COLORS.primary);
      setFollowersc(COLORS.primary);
      setMediac(COLORS.white);
    }
    const handleFollowersFull = () => { 
      setFollowersFull(COLORS.primary);
      setMediaFull(COLORS.secondary);
      setEventFull(COLORS.secondary);
      setEventc(COLORS.primary);
      setFollowersc(COLORS.white);
      setMediac(COLORS.primary);
    }



   
  const onPressFollow= () => {
    if (follow=='Follow'){
        setfollow("Followed");
        fetch("http://10.0.2.2:4000/commComms")
        .then(res=>res.json())
        .then(res=>{
          for (let i = 0 ;i<res.length;i++){
            if (res[i].comm==commId){
              var s=res[i].comms+"+"+comm._id;
              fetch("http://10.0.2.2:4000/update-commComms",{
            method :"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:res[i]._id,
                comm:commId,
                comms:s,
            })
          }).then(data=>{
            console.log(data)
            res.send(data)
        }).catch(err=>{
            console.log(err)
        })
            }
          }
        })
    }
    else  if (follow=='Followed'){
      setfollow("Follow");
      fetch("http://10.0.2.2:4000/commComms")
      .then(res=>res.json())
      .then(res=>{
        for (let i = 0 ;i<res.length;i++){
          if (res[i].comm==commId){
            var s=res[i].comms;
            var ss = s.split('+');
            var final ="";
            for (let j =0;j<ss.length;j++){
              if (ss[j]!=comm._id){
                final = final + ss[j] + '+';
              }
            }
            fetch("http://10.0.2.2:4000/update-commComms",{
          method :"post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              id:res[i]._id,
              comm:commId,
              comms:final,
          })
        }).then(data=>{
          console.log(data)
          res.send(data)
      }).catch(err=>{
          console.log(err)
      })
          }
        }
      })

    }
   if (followcoler=='white'){
   
        setfollowcoler(COLORS.primary);}
    else{
          setfollowcoler('white');
       
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
                         
                        navigation.navigate('search',{item :commId,s:search,type:'comm'})}}
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
        height: 130,
        marginBottom: 15,
        width: 130,
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
      scrollbtnMedia:{
        backgroundColor:MediaFull,
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
        fontSize:SIZES.body4, 
        alignSelf:'center',
        fontWeight:'bold'
      },
      textbtnM:{
        color: Mediac,
        fontSize:SIZES.body4, 
        alignSelf:'center',
        fontWeight:'bold'
      },
      
      textbtnE:{
        color: Eventc,
        fontSize:SIZES.body4, 
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
     source={{uri:comm.imag}}
     
   >
   
   
  
     <View style={styles.headerColumn}>
     
       <Image
         style={styles.userImage}
         source={{uri:comm.imag}}
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
         left:'10%',
         backgroundColor:followcoler,
         borderRadius:30,
         width:'35%',
         height:50,
         alignContent:'center',
         justifyContent:'center',
         borderColor:COLORS.secondary,
         borderWidth:1,
         flexDirection:'row',

       }}
       onPress={onPressFollow}
       >
      
       {foll()}
         <Text style={{color:followcoler2,fontSize:SIZES.body2, alignSelf:'center',fontWeight:'bold'}}
         
         >{follow}</Text>
         
       </TouchableOpacity>
       <TouchableOpacity  style={{
        position:'absolute',
         top:185,
         left:'60%',
         backgroundColor:'white',
         borderRadius:30,
         width:'25%',
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
            top:'52%',
            marginLeft:'3%',
            //marginBottom:'%',
            
       }}>
          {comm.name}
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
      marginBottom:'10%',
      //height:0,
    }}>
  
    <Text style={{
      fontSize:SIZES.body3,
      paddingLeft:4,
      paddingRight:10,
      color:COLORS.black,
      
    }}>

    {comm.des}{'\n'}email : {comm.email}
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
             top:-20,
            // marginBottom:30,
             
           }
         }>
         
       <TouchableOpacity  style={styles.scrollbtnEvent}
       onPress={handleEventFull}>
         <Text style={styles.textbtnE}>Events</Text>
       </TouchableOpacity>

       <TouchableOpacity  style={styles.scrollbtnFollowers}
       onPress={handleFollowersFull}>
         <Text style={styles.textbtnF}>Followers</Text>
       </TouchableOpacity>

       <TouchableOpacity  style={styles.scrollbtnMedia}
       onPress={handleMediaFull}>
         <Text style={styles.textbtnM}>Media</Text>
       </TouchableOpacity>

      

      
       </View>
       
       </View>
       </View>
        )
    }
    function foll(){
      if (followcoler=='white')
      {return (
        <Image
         style={{
           tintColor:COLORS.primary,
           width:20,
           height:20,
           marginRight:'7%',
           alignSelf:'center',

         }}
         source={require('../assets/icons/plus.png')}
       />
      )

      }
      
    }
    function ret (){
      if (Followersc==COLORS.white){
      return(
        <SafeAreaView style={{
          backgroundColor:'white',
          marginTop:'-7%',
        }}>
        {renderFollowers()}
        </SafeAreaView>
      )
      }
      else if (Eventc==COLORS.white){
      return(
        <SafeAreaView style={{
          backgroundColor:'white',
         marginTop:'-7%',
        }}>
        {renderEventList()}
        </SafeAreaView>
      )
      }
     
      else if (Mediac==COLORS.white){
        return(
          <SafeAreaView style={{
            backgroundColor:'white',
            marginTop:'-7%',
          }}>
          {renderPosts()}
          </SafeAreaView>
          )
      }
    }
    
  function img (icon){
    if (icon!='')
      return (
        <Image
        source={{uri:icon}}
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
      var posts=[];
      
      for (let i=0;i<DPosts.length;i++){
        if (DPosts[i].commId==comm._id){
          posts.push(DPosts[i]); 
        }
      }
      
      
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
                      paddingBottom:'6%'
                  }}
              >
               <Text style={{ ...FONTS.body2 , color:COLORS.primary, margin:'5%',marginBottom:'7%'}}>{item.post}</Text>
                    {img(item.imag)}
            
                  
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


    function renderFollowers() {
      var students=[];
      var student="";

      for (let i=0;i<DFollowers.length;i++){
        var cm = DFollowers[i].commIds;
        var cms = cm.split('+');
        for (let j=0 ;j<cms.length;j++){
          if (cms[j]==comm._id){
            for (let k =0;k<Dstudents.length;k++){
              if (Dstudents[k]._id==DFollowers[i].studentId){
                students.push(Dstudents[k]);
              }
            }
          }
        }
      }
      const renderItem = ({ item }) => (

          <TouchableOpacity
              style={{ 
                backgroundColor:'white',justifyContent:'center',
                marginLeft:'-3%',
                marginRight:'-3%',
                alignContent:'center'}}
              onPress={() => navigation.replace("studentPageC", 
                  {item:item,comm:commId}
              )}
          >
          
              {/* Image */}
              
              <View
                  style={{
                      marginBottom: SIZES.padding/2,
                      flex:1,
                      flexDirection:'row',
                      width:'100%',
                      height:100,
                      backgroundColor:COLORS.lightGray3,
                      borderRadius:25,
                      justifyContent:"center",
                      alignContent:"center",
                  }}
              >
               <View
               style={{
                margin:'3%',
                marginLeft:'10%',
                        width:50,
                        height: 50,
                        flex:1,
                        
                        
               }}>

                  <Image
                      source={{uri:item.imag}}
                      resizeMode="cover"
                      style={{
                       width:80,
                       height:80,
                       borderRadius:100,
                       marginLeft:'-25%',
                      }}
                  />
                  </View>
                 
                   <Text style={{ ...FONTS.h4 , color:COLORS.primary ,flex:1,alignSelf:"center",
                   right:60,
                   }}
                      // onPress={onPressJoin}
                      >{item.name}</Text>
          <TouchableOpacity  style={{
        // position:'absolute',
         //top:200,
         left:'1%',
         top:22,
         //right:30,
        // backgroundColor:COLORS.primary,
         borderRadius:30,
         width:'27%',
         height:55,
         marginRight:15,
         alignContent:'center',
         justifyContent:'center',
       // borderColor:COLORS.secondary,
       //  borderWidth:1,
         flexDirection:'row',
       }}
       onPress={() => 
      
        navigation.replace("conversation",{
           max:st.email,
           min:item.number,
          sender:st.email,
          reciver:item.number
         })
        }
               >
       <Image
                      source={icons.conversation}
                     // resizeMode="cover"
                      style={{
                        tintColor:COLORS.primary,
                       width:35,
                       height:35,
                       right:-30,
                       top:9,
                      }}
                  />
        
         
       </TouchableOpacity>
                  

              </View>

              

          </TouchableOpacity>
      )

      return (
       <View>
        <Text style={{...FONTS.body2,
          alignSelf:'center',color:COLORS.secondary,
          fontWeight:'bold',marginBottom:5
        }}> {students.length} following people </Text>
        <FlatList  
              data={students}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              //showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                  paddingBottom: 30
              }}
          /></View>
      )
  }

    function renderEventList() {
      var events =[];
     
    //  alert(DEvents.length)
      for (let i=0;i<DEvents.length;i++){
        if (DEvents[i].comm==comm._id){
         // DEvents.pop(DEvents[i]);  
         events.push(DEvents[i])

        }
      }
        const renderItem = ({ item }) => (
           
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("EventShowScreenC", 
                    item
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
                data={events}
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
        }
        >
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