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
    RefreshControl,
    Linking,
} from "react-native";

import * as Animatable from 'react-native-animatable';
import CountDown from 'react-native-countdown-component';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
	'VirtualizedLists should never be nested',
])

const Home = ({ navigation ,route}) => {
  const [arr,setArr] = useState([31,28,31,30,31,30,31,31,30,31,30,31]);
const [joinEvent,setJoinEvent]=useState('Join');
const [folls,setFolls]=useState([]);
const [people,setPeople]=useState([]);
const [DLinks,setDLinks]=useState([]);
const [DPosts,setDPosts]=useState([]);
const [likes,setLikes]=useState([]);
const [star,setStar]=useState(COLORS.secondary);
const [st,setSt]=useState();
const student= route.params.userId; //mongo id    
const [event,setEvent] = useState(route.params.event);

var datec = new Date().getDate();
  var monthc = new Date().getMonth() + 1;
  var yearc = new Date().getFullYear();
  var hoursc = new Date().getHours();
  var minc = new Date().getMinutes(); 
  var secc = new Date().getSeconds();
  var s =event.startDate;
  var ss = s.split(' ');
  var daye = parseInt(ss[2]);
  var yeare = parseInt(ss[3]);
  var mon = ss[1];
  var mone=parsmon(mon);
  var timep = event.startDateTime;
  var time = timep.split(' ');
  var t = time [0];
  var ap = time[1];
  var hm = t.split(':');
  var h = parseInt(hm[0]);
  var m = parseInt(hm[1]);
if (h==12&&ap=='am'){
  h=0;
}
else if (ap=='pm'&&h!=12){
h=h+12;
}
var ssecc=0;
if (mone!=monthc){
  var m ;
  for(let i =0;i<arr.length;i++){
    if (i+1==monthc)
      m=arr[i];
  }
  var dc= m-datec+daye;//31-26=>5
  ssecc =(ssecc+(dc*86400))
  }
  else
  ssecc =(ssecc+((daye-datec)*86400))
  ssecc =(ssecc+((h-hoursc)*3600))
  ssecc =(ssecc+((m-minc)*60))


function parsmon(s){
  if (s=='Jan') return 1;
  else if (s=='Feb')return 2;
  else if (s=='Mar')return 3;
  else if (s=='Apr')return 4;
  else if (s=='May')return 5;
  else if (s=='Jun')return 6;
  else if (s=='Jul')return 7;
  else if (s=='Aug')return 8;
  else if (s=='Sep')return 9;
  else if (s=='Oct')return 10;
  else if (s=='Nov')return 11;
  else if (s=='Dec')return 12;
} 

useEffect(()=>{
  fetch("http://10.0.2.2:4000/signInS")
  .then(res=>res.json())
  .then(results=>{
  console.log(results[1].number)
    for(let i = 0 ; i<results.length; i++){
      if(results[i]._id == student)
      setSt(results[i]);
   
    }

  }
  )

fetch("http://10.0.2.2:4000/eventPeople")
  .then(res=>res.json())
  .then(res=>{
    for (let i = 0 ;i<res.length;i++){
      if (res[i].event==event._id){
        var s=res[i].students;
        var ss = s.split('+');
        var final ="";
        for (let j =0;j<ss.length;j++){
          if (ss[j]==student){
            setJoinEvent('Leave')
          }
        }
      }
    }
    })
fetch("http://10.0.2.2:4000/starEvents")
.then(res=>res.json())
.then(results=>{
  for (let i=0;i<results.length;i++){
    if (results[i].student==student){
      var s = results[i].events;
      var ss = s.split('+');
      for (let j=0;j<ss.length;j++){
        if (ss[j]==event._id){
          setStar('gold');
        }
      }
    }
  }
fetch("http://10.0.2.2:4000/EventPost")
    .then(res=>res.json())
    .then(results=>{
        setDPosts(results)
    });
    fetch("http://10.0.2.2:4000/likeevent")
    .then(res=>res.json())
    .then(results=>{
      setLikes(results) ;
  });
fetch("http://10.0.2.2:4000/EventLink")
    .then(res=>res.json())
    .then(results=>{
        setDLinks(results)
    });


fetch("http://10.0.2.2:4000/eventPeople")
.then(res=>res.json())
.then(results=>{
  setFolls(results)
});
fetch("http://10.0.2.2:4000/signInS")
.then(res=>res.json())
.then(results=>{
  setPeople(results)
});

});
},[])
const handleLikeRed=(item)=>{ 
      
  fetch("http://10.0.2.2:4000/likeevent")
  .then(res=>res.json())
  .then(res=>{
    
    for (let i = 0 ;i<res.length;i++){
      if (res[i].student==student){
        var s=res[i].posts+"+"+item._id;
        fetch("http://10.0.2.2:4000/update-likedEventPosts",{
      method :"post",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          id:res[i]._id,
          student:student,
          posts:s,
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
fetch("http://10.0.2.2:4000/likeevent")
  .then(res=>res.json())
  .then(results=>{
    setLikes(results) ;
});

fetch("http://10.0.2.2:4000/EventPost")
.then(res=>res.json())
.then(results=>{
    setDPosts(results)
});
 

}
const handleLikeWhite =(item)=>{

fetch("http://10.0.2.2:4000/likeevent")
.then(res=>res.json())
.then(res=>{
for (let i = 0 ;i<res.length;i++){
if (res[i].student==student){
  var s=res[i].posts;
  var ss = s.split('+');
  var final ="";
  for (let j =0;j<ss.length;j++){
    if (ss[j]!=item._id){
      final = final + ss[j] + '+'; 
    }
  }
  
  fetch("http://10.0.2.2:4000/update-likedEventPosts",{
    method :"post",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        id:res[i]._id,
        student:student,
        posts:final,
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
fetch("http://10.0.2.2:4000/likeevent")
.then(res=>res.json())
.then(results=>{
setLikes(results) ;
});

fetch("http://10.0.2.2:4000/EventPost")
.then(res=>res.json())
.then(results=>{
setDPosts(results)
});


}
const [search, setSearch] = useState("");
const [joinText, setJoinText] = useState("JOIN");

const [like, setLike] = useState('white');
const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const [EventFull, setEventFull] = useState(COLORS.secondary);

const [MediaFull, setMediaFull] = useState(COLORS.primary);
const [FollowersFull, setFollowersFull] = useState(COLORS.secondary);

const [Eventc, setEventc] = useState(COLORS.primary);
const [Mediac, setMediac] = useState(COLORS.white);
const [Followersc, setFollowersc] = useState(COLORS.primary);

const starpress=()=>{
  
  if (star==COLORS.secondary){
    fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })
    setStar('gold');
    //alert(event)
    fetch("http://10.0.2.2:4000/starEvents")
    .then(res=>res.json())
    .then(res=>{
      for (let i = 0 ;i<res.length;i++){
        if (res[i].student==student){
          var s=res[i].events+"+"+event._id;
          fetch("http://10.0.2.2:4000/update-starEvents",{
        method :"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:res[i]._id,
            student:student,
            events:s,
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
    
    fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })
  }
  else if (star=='gold'){
    fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })
    setStar(COLORS.secondary);
   
    fetch("http://10.0.2.2:4000/starEvents")
    .then(res=>res.json())
    .then(res=>{
      for (let i = 0 ;i<res.length;i++){
        if (res[i].student==student){
          var s=res[i].events;
          var ss = s.split('+');
          var final ="";
          for (let j =0;j<ss.length;j++){
            if (ss[j]!=event._id){
              final = final + ss[j] + '+';
            }
          }
          fetch("http://10.0.2.2:4000/update-starEvents",{
        method :"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:res[i]._id,
            student:student,
            events:final,
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
    
        fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })
      
  }
}



    const handleLike = () => { 
      if (like=='white')
      setLike('red');
      else setLike('white');
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
                         
                        navigation.replace('search',{item :student,s:search,type:'student'})}}
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

const [join, setJoin] = useState("JOIN");
const [pay, setPay] = useState("15$");
const [place, setplace] = useState("11B10101");
const [start, setstart] = useState("sat, January 25, 2021 at 3:00 PM - Thu, January 30, 2021 at 2:00 Pm");
//const [end, setend] = useState(" 2021-11-02T16:33:00.000Z");
const [joinColor, setJoinColor] = useState(COLORS.white);
const [joinTextColor, setJoinTextColor] = useState(COLORS.primary);
const onPressJoinBotton= () => {
   if (join=='JOIN'){
       setJoin('JOINED');
   }
   else  if (join=='JOINED'){
    setJoin('JOIN');
}
if (joinColor==COLORS.white){
    setJoinColor(COLORS.primary);
}
else  if (joinColor==COLORS.primary){
    setJoinColor(COLORS.white);
}
if (joinTextColor==COLORS.primary){
    setJoinTextColor(COLORS.white);
}
else if (joinTextColor==COLORS.white){
    setJoinTextColor(COLORS.primary);
}
  };
    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3
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
        height:200,
        width:'100%',
        alignContent:'center',
        justifyContent:'center'
        
      },
      headerContainer: {
        backgroundColor:'white',
       // height:00,

      },
      footer: {
    
        paddingHorizontal: 20,
        paddingVertical: -50

    },
    signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 7
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
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
        borderWidth:5,
        height: 200,
      //  marginBottom: 15,
        width: 200,
       // position:'absolute',
        top:-30,
        alignSelf:'center'
      
  
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
    function renderfollowbtn() {
      return (
        <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: '#FFF'
        }]}
    >
       
        </Animatable.View>
       
       ) }


    function renderMainCategories() {
        return (
         
        
   <View style={styles.headerContainer}>
    
   
   <ImageBackground style={styles.headerBackgroundImage} blurRadius={2.8}  source={{uri:event.imag}}>


   <CountDown
        size={30}
        until={ssecc}
        onFinish={() => alert('finished')}
        onPress={() => alert('hello')}
        timeLabelStyle={{...FONTS.h4 ,color: 'white',fontWeight:'bold'}}
        digitStyle={{backgroundColor: '#FFF'}}
      //  separatorStyle={{color: '#FFF'}}
        digitTxtStyle={{color:COLORS.primary}}
        //timeLabels={{}}

//        showSeparator

      />
     
   </ImageBackground>
<View style={{
    marginTop:15,
    marginLeft:15,
    marginRight:15,
    marginBottom:50,
}}>
   <View style={{ 
            flexDirection:'row',
            alignContent:'center',
            justifyContent:'center'
          }}> 
   <Text style={{

            fontSize:SIZES.h2,
            fontWeight:"bold",
            color:COLORS.primary,
            marginLeft:'-1%',
            marginBottom:20,
            flex:5,
            
       }}>
           {event.name}  </Text> 
           {joinEvent=='Leave'&&( 
             <TouchableOpacity onPress={()=>starpress()}>
           <Image
             source={icons.rate}
             style={{
              // flex:1,
               height:35,
               width:35,
               alignSelf:'center',
               tintColor:star
             }}
           /> 
          
           </TouchableOpacity>)}
          
          </View>
          <Text style={{
            flexDirection:'row',
            marginTop:-7,
            marginBottom:15,
          }}> 
          <Text style={{fontSize:14,  color: '#666666',  fontWeight:'normal'}}>
           Organized by 
           </Text>
          <Text style={{fontSize:14,  fontWeight:'bold', color: '#000'}}>
          {' '} {event.commName}
          </Text>
          </Text>    

       <View style={{ flexDirection:'row',marginBottom:'2%'}}>
       <FontAwesome 
                    name="calendar"
                    color='#c4c8cf'
                    size={30}   
                    style={{
                    //  tintColor:COLORS.primary,
                     marginRight:'3%'
                      }} 
                />
       <Text style={{
           fontSize:16,
            color:'#000000',
            alignSelf:'center'
       }}>
          {event.startDate} - {event.endDate} 
          {'\n '}{event.startDateTime} - {event.endDateTime}
       </Text>
       </View>
       
       <View style={{ flexDirection:'row',marginBottom:'3%'}}>
       <FontAwesome 
                    name="map-marker"
                    color='#c4c8cf'
                    size={30}
                    style={{
                    //  tintColor:'#009387',
                     // flex:1,
                     marginRight:'3%'
                      }}        
                    
                />
           <Text>
           <Text style={{
           fontSize:16,
            color:'#000000',
            alignSelf:'center'
       }}>  Collage Number {event.selVal}</Text>
      

                <Text  style={{
           fontSize:13,
            color:'#666666',
            alignSelf:'center'
       }}> {'\n  '} {event.place}
                    </Text>
                
                </Text>
   
      
       </View>
       
       <View style={{ flexDirection:'row',marginBottom:'3%'}}>
       <FontAwesome 
                    name="microphone"
                    color='#c4c8cf'
                    size={30}   
                    style={{
                   //   tintColor:COLORS.primary,
                     marginRight:'3%'
                      }} 
                />
                <Text>
       <Text style={{
           fontSize:16,
            color:'#000000',
            alignSelf:'center'
       }}>
           {event.speaker1}
       </Text>
       <Text  style={{
           fontSize:13,
            color:'#666666',
            alignSelf:'center'
       }}> {'\n'} {event.info1}
         </Text>
      </Text>
    </View>
    {event.speaker2!=""&&(
      <View style={{ flexDirection:'row',marginBottom:'3%'}}>
       <FontAwesome 
                    name="microphone"
                    color='#c4c8cf'
                    size={30}   
                    style={{
                   //   tintColor:COLORS.primary,
                     marginRight:'3%'
                      }} 
                />
                <Text>
       <Text style={{
           fontSize:16,
            color:'#000000',
            alignSelf:'center'
       }}>
           {event.speaker2}
       </Text>
       <Text  style={{
           fontSize:13,
            color:'#666666',
            alignSelf:'center'
       }}> {'\n'} {event.info2}
         </Text>
      </Text>
    </View>
    )}
    {event.speaker3!=""&&(
      <View style={{ flexDirection:'row',marginBottom:'3%'}}>
       <FontAwesome 
                    name="microphone"
                    color='#c4c8cf'
                    size={30}   
                    style={{
                   //   tintColor:COLORS.primary,
                     marginRight:'3%'
                      }} 
                />
                <Text>
       <Text style={{
           fontSize:16,
            color:'#000000',
            alignSelf:'center'
       }}>
           {event.speaker3}
       </Text>
       <Text  style={{
           fontSize:13,
            color:'#666666',
            alignSelf:'center'
       }}> {'\n'} {event.info3}
         </Text>
      </Text>
    </View>
    )}
    {event.speaker4!=""&&(
      <View style={{ flexDirection:'row',marginBottom:'3%'}}>
       <FontAwesome 
                    name="microphone"
                    color='#c4c8cf'
                    size={30}   
                    style={{
                   //   tintColor:COLORS.primary,
                     marginRight:'3%'
                      }} 
                />
                <Text>
       <Text style={{
           fontSize:16,
            color:'#000000',
            alignSelf:'center'
       }}>
           {event.speaker4}
       </Text>
       <Text  style={{
           fontSize:13,
            color:'#666666',
            alignSelf:'center'
       }}> {'\n'} {event.info4}
         </Text>
      </Text>
    </View>
    )}
    {event.pay!=''&&(  <View style={{
              alignContent:'center',
              justifyContent:'center',
              backgroundColor:COLORS.primary,
              borderRadius:5,
              padding:7

            }}><Text style={{fontSize:20,  color: 'white',  fontWeight:'bold',alignSelf:'center'}}>{event.pay}</Text></View>)}
  
     
   <View style={{
     
         alignContent:'center',
         justifyContent:'center',
       //  marginTop:'-27%',
       //  marginLeft:'3%',
        // height:200,

       }}>
    <View
    style={{
     // marginBottom:'10%',
      //height:0,
    }}>
    <View style={{
        flexDirection:'row',
        marginBottom:'3%',
        justifyContent:'center',
        alignContent:'center'
    }}>
    <Text style={{
      fontSize:17,
      fontWeight:'bold',
      paddingRight:210,
     marginTop:'4%',
      color:COLORS.primary,}}>Event Description</Text>
      </View>
    <Text style={{
      fontSize:SIZES.body3,
      paddingLeft:4,
      paddingRight:10,
      color:COLORS.black,
      textAlign: "justify",
      borderBottomWidth: 1,
      borderBottomColor: '#c4c8cf',
      marginTop:'-1%'
      
    }}>
  {event.des}
   {'\n'} 
  
     </Text>

</View>
</View>
       <View
       style={
           {
             flexDirection:'row',
             justifyContent:'center',
             width:'100%',
             marginTop:'5%',
             flexDirection:'row',
             flexWrap:'wrap',
             height:7,
             //top:-20,
             marginBottom:40,
             
           }
         }>
         
         <TouchableOpacity  style={styles.scrollbtnMedia}
       onPress={handleMediaFull}>
         <Text style={styles.textbtnM}>Media</Text>
       </TouchableOpacity>
      
       <TouchableOpacity  style={styles.scrollbtnEvent}
       onPress={handleEventFull}>
         <Text style={styles.textbtnE}>Links</Text>
       </TouchableOpacity>

       <TouchableOpacity  style={styles.scrollbtnFollowers}
       onPress={handleFollowersFull}>
         <Text style={styles.textbtnF}>Joined</Text>
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
        {renderLinks()}
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
          {renderfollowbtn()}
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
    if (DPosts[i].eventId==event._id){
       // DPosts.pop(DPosts[i]);  
       posts.push(DPosts[i]);  
    }
  }
  for (let i=0;i<likes.length;i++){
    if (likes[i].student==student){
      var s = likes[i].posts;
      var ss = s.split('+');
      for (let j =0;j<ss.length;j++){
        for (let k=0;k<posts.length;k++){
          if (ss[j]==posts[k]._id){
            posts[k].likes=1;
          }
        }
      }
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
                      {(item.likes==1)&&(
                   <TouchableOpacity
                    onPress={()=>{
                      for (let i =0;i<posts.length;i++){
                        if (item._id==posts[i]._id){
                            likes[i].likes=0;
                        }
                      }
                      handleLikeRed(item);
                      handleLikeWhite(item); }}
                   >
                  <Image
                          source={icons.like}
                          style={{
                              width : 30,
                              height:30,
                              tintColor: 'red',
                          }} 
                      />
                      
                      </TouchableOpacity>)}

                      {(item.likes==0)&&(
                   <TouchableOpacity
                    onPress={()=>{
                      for (let i =0;i<posts.length;i++){
                        if (item._id==posts[i]._id){
                            likes[i].likes=1;
                        }
                      }
                      handleLikeRed(item);
                    }}
                   >
                  <Image
                          source={icons.like}
                          style={{
                              width : 30,
                              height:30,
                              tintColor:'white',
                          }} 
                      />
                      </TouchableOpacity>)}
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

  function renderLinks() {
     
    var links=[];
    
    for (let i=0;i<DLinks.length;i++){
      if (DLinks[i].eventId==event._id){
        links.push(DLinks[i]);  
      }
    }

    const renderItem = ({ item }) => (
       <View style={{
         backgroundColor:COLORS.lightGray,
         borderRadius:25,
         marginLeft:'3%',
         marginRight:'3%',
         marginBottom:'3%',
         padding:'5%'

       }}>
         <Text style={{...FONTS.h3,color:COLORS.primary,marginLeft:'7%'}}>{item.postLink}</Text>
         <Text  style={{...FONTS.h3,color:COLORS.secondary,marginLeft:'10%',textDecorationLine: 'underline',marginTop:'3%'}}
              onPress={() => Linking.openURL(item.link)}>
          {item.link}
        </Text>
       </View>
       
    )

    return (
     
      <FlatList  
            data={links}
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
      var peo = [];
     
      for (let i =0;i<folls.length;i++){
        if (folls[i].event==event._id){
          var s = folls[i].students;
          var ss= s.split('+');
          for (let j=0;j<people.length;j++){
            for (let k=0;k<ss.length;k++)
            if (ss[k]==people[j]._id){
              if (student != people[j]._id)
              peo.push(people[j]);
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
              onPress={() => navigation.replace("studentPage", 
                {student:student,item:item}
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
           max:(parseInt(st.number)>parseInt(item.number)? st.number: item.number),
           min:(parseInt(st.number)<parseInt(item.number)? st.number: item.number),
          sender:st.number,
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
        }}> {((joinEvent=='Leave')&&(peo.length+1))||(peo.length)} joined people </Text>
        <FlatList  
              data={peo}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              //showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                  paddingBottom: 30
              }}
          />
          </View>
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
        {((event.accept=='true')||(event.accept=='false'&&joinEvent=='Leave'))&&(
        <TouchableOpacity
       style={{
           backgroundColor:COLORS.primary,
           alignSelf:'center',
           width:"100%",
           height:60,
       
         
           alignContent:'center',
           justifyContent:'center'
       }}
       onPress={()=>{
        if (joinEvent=='Join'){
        setJoinEvent("Leave");
        fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })
        fetch("http://10.0.2.2:4000/eventPeople")
        .then(res=>res.json())
        .then(res=>{
          
          for (let i = 0 ;i<res.length;i++){
            if (res[i].event==event._id){
              var s=res[i].students+"+"+student;
              fetch("http://10.0.2.2:4000/update-eventPeople",{
            method :"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:res[i]._id,
                event:event._id,
                students:s,
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
        
        fetch("http://10.0.2.2:4000/update-event",{
          method :"post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            id:event._id,
            imag:event.imag,
            name:event.name,
            startDate:event.startDate,
            endDate:event.endDate,
            startDateTime:event.startDateTime,
            endDateTime:event.endDateTime,
            pay:event.pay,
            selVal:event.selVal,
            place:event.place,
            des:event.des,
            numS:event.numS,
            speaker1:event.speaker1,
            info1:event.info1,
            speaker2:event.speaker2,
            info2:event.info2,
            speaker3:event.speaker3,
            info3:event.info3,
            speaker4:event.speaker4,
            info4:event.info4,
            people:(parseInt(event.people)+1),
            comm: (event.comm),
            stars:(event.stars),
            commName:(event.commName),
            accept:(event.accept),
          })
        }).then(data=>{
          console.log(data)
          res.send(data)
        }).catch(err=>{
          console.log(err)
        })
    fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })
       
    }
    else if (joinEvent=='Leave'){
        setJoinEvent("Join");
        fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })

      fetch("http://10.0.2.2:4000/eventPeople")
      .then(res=>res.json())
      .then(res=>{
        for (let i = 0 ;i<res.length;i++){
          if (res[i].event==event._id){
            var s=res[i].students;
            var ss = s.split('+');
            var final ="";
            for (let j =0;j<ss.length;j++){
              if (ss[j]!=student){
                final = final + ss[j] + '+';
              }
            }
            fetch("http://10.0.2.2:4000/update-eventPeople",{
          method :"post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              id:res[i]._id,
              event:event._id,
              students:final,
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
     
      fetch("http://10.0.2.2:4000/update-event",{
          method :"post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            id:event._id,
            imag:event.imag,
            name:event.name,
            startDate:event.startDate,
            endDate:event.endDate,
            startDateTime:event.startDateTime,
            endDateTime:event.endDateTime,
            pay:event.pay,
            selVal:event.selVal,
            place:event.place,
            des:event.des,
            numS:event.numS,
            speaker1:event.speaker1,
            info1:event.info1,
            speaker2:event.speaker2,
            info2:event.info2,
            speaker3:event.speaker3,
            info3:event.info3,
            speaker4:event.speaker4,
            info4:event.info4,
            people:(parseInt(event.people)-1),
            comm: (event.comm),
            stars:(event.stars),
            commName:(event.commName),
            accept:(event.accept),
          })
        }).then(data=>{
          console.log(data)
          res.send(data)
        }).catch(err=>{
          console.log(err)
        })
    fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
        for (let i=0;i<results.length;i++){
          if (results[i]._id==event._id){
            setEvent(results[i]);
          }
        }
    })

    fetch("http://10.0.2.2:4000/starEvents")
    .then(res=>res.json())
    .then(res=>{
      for (let i = 0 ;i<res.length;i++){
        if (res[i].student==student){
          var s=res[i].events;
          var ss = s.split('+');
          var final ="";
          for (let j =0;j<ss.length;j++){
            if (ss[j]!=event._id){
              final = final + ss[j] + '+';
            }
          }
          fetch("http://10.0.2.2:4000/update-starEvents",{
        method :"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:res[i]._id,
            student:student,
            events:final,
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
    
    setStar(COLORS.secondary);
   
   
      
    }
       }
       }
       >
           <Text style={{
             fontSize:17,
             fontWeight:'bold',
             //fontWeight:'bold',
             color:COLORS.white,
             alignSelf:'center'
           }
           }>{joinEvent}</Text>
       </TouchableOpacity>)}
       {event.accept=='false'&&(
        <TouchableOpacity
       style={{
           backgroundColor:COLORS.primary,
           alignSelf:'center',
           width:"100%",
           height:60,
       
         
           alignContent:'center',
           justifyContent:'center'
       }}
       >
           <Text style={{
             fontSize:17,
             fontWeight:'bold',
             //fontWeight:'bold',
             color:COLORS.white,
             alignSelf:'center'
           }
           }>Full Event</Text>
       </TouchableOpacity>
       )}
      
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
    starPress:{
        tintColor:COLORS.gold
    },
  
    text_header: {
      color: '#005e66',
      fontWeight: 'bold',
      fontSize: 24,
  },
  text_footer1: {
      color: '#05375a',
      fontSize: 17,
      fontWeight: "bold",
   //   fontFamily: 'ZenKurenaido-Regular'


  },
  text_footer2: {
      color: '#666666',
      fontSize: 12,     
  },
})

export default Home;