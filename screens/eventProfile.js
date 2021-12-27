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
    Alert,
    Switch,
    Platform
} from "react-native";
import { MenuProvider } from 'react-native-popup-menu';
import ImagePicker from "react-native-image-crop-picker"
import * as Animatable from 'react-native-animatable';
import CountDown from 'react-native-countdown-component';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
LogBox.ignoreLogs([
	'VirtualizedLists should never be nested',
])

const Home = ({ navigation,route }) => {
const [arr,setArr] = useState([31,28,31,30,31,30,31,31,30,31,30,31]);
  const [star,setStar]=useState(0);
const [isEnabled, setIsEnabled] = useState(true);
const [DPosts, setDPosts] = useState([]);
const [DPost, setDPost] = useState([]);
const [DLinks, setDLinks] = useState([]);
const [DLink, setDLink] = useState([]);
const [DFollowers, setDFollowers] = useState([]);
const [search, setSearch] = useState("");
const [joinText, setJoinText] = useState("JOIN");
const [visibleImage,setVisibleImage]=useState(true);
const [post,setPost]=useState("")
const [visibleLink,setVisibleLink]=useState(false)
const [postLink,setPostLink]=useState("")
const [link,setLink]=useState("")
const [like, setLike] = useState('white');
const [refreshing, setRefreshing] = React.useState(false);
const [editP,setEditP]=useState(false)
const [editL,setEditL]=useState(false)
const [editPostText,setEditPostText]=useState("")
const [editPostImage,setEditPostImage]=useState("")
const [editLinkText,setEditLinkText]=useState("")
const [editLinkLink,setEditLinkLink]=useState("")

const [st,setSt]=useState()
const eve = route.params;
const [event,setEvent] = useState(route.params);
var datec = new Date().getDate();
var monthc = (new Date().getMonth() + 1);
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
const openDial=(num)=>{
if (Platform.OS=='android'){
  
Linking.openURL('tel:'+num)
}
else {
  Linking.openURL('telprompt:'+num)
}
}
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    fetch("http://10.0.2.2:4000/Event")
  .then(res=>res.json())
  .then(results=>{
    for (let i =0 ;i<results.length;i++){
      if (results[i]._id==eve._id){
        setEvent(results[i]);
       // alert(JSON.stringify(event))
      }
    }
  })
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const [follower, setFollower] = useState("");
const [numfollower, setNumFollower] = useState([]);
const [postLikes, setPostLikes] = useState(0);
const [EventFull, setEventFull] = useState(COLORS.secondary);
const [imag,setImag]=useState("")
const [MediaFull, setMediaFull] = useState(COLORS.primary);
const [FollowersFull, setFollowersFull] = useState(COLORS.secondary);
const [visiblePost, setVisiblePost] = useState(false);
const [Eventc, setEventc] = useState(COLORS.primary);
const [Mediac, setMediac] = useState(COLORS.white);
const [Followersc, setFollowersc] = useState(COLORS.primary);
const [posst,setPosst]=useState("")
const [linkText,setLinkText]=useState("")
const [linkLink,setLinkLink]=useState("")

const toggleSwitch = () =>{ 
  setIsEnabled(previousState => !previousState);
  
  
  if (isEnabled==false){
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
      people:event.people,
      comm: event.comm,
      stars:event.stars,
      commName:event.commName,
      accept:'true',
    })
  }).then(data=>{
    console.log(data)
    res.send(data)
  }).catch(err=>{
    console.log(err)
  })}
  else if (isEnabled==true){
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
        people:event.people,
        comm: event.comm,
        stars:event.stars,
        commName:event.commName,
        accept:'false',
      })
    }).then(data=>{
      console.log(data)
      res.send(data)
    }).catch(err=>{
      console.log(err)
    })}  
}
const [folls,setFolls]=useState([]);
const [people,setPeople]=useState([]);
const [likee,setLikee]=useState([]);


useEffect(()=>{

  fetch("http://10.0.2.2:4000/signInC")
  .then(res=>res.json())
  .then(results=>{
  console.log(results[1].number)
    for(let i = 0 ; i<results.length; i++){
      if(results[i]._id == eve.comm)
      setSt(results[i]); 
     }})
      
  fetch("http://10.0.2.2:4000/likeevent")
  .then(res=>res.json())
  .then(results=>{
    setLikee(results) ;
});
  var m =0;
  fetch("http://10.0.2.2:4000/starEvents")
  .then(res=>res.json())
  .then(results=>{
    for (let i=0;i<results.length;i++){
        var s = results[i].events;
        var ss = s.split('+');
        for (let j=0;j<ss.length;j++){
          if (ss[j]==event._id){
            m=m+1;
          }
        }
    }
    setStar(m);
  })
  fetch("http://10.0.2.2:4000/Event")
  .then(res=>res.json())
  .then(results=>{
    for (let i =0 ;i<results.length;i++){
      if (results[i]._id==eve._id){
        setEvent(results[i]);
        
      }
    }
  })
  if (event.accept=='false'){
    setIsEnabled(false);
  }
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

},[])

function editpost(item){
setEditP(true);
setEditPostImage(item.imag);
setEditPostText(item.post);
setPosst(item.post);
setPostLikes(item.likes);
}
function editlink(item){
  setEditL(true);
  setEditLinkLink(item.link);
  setEditLinkText(item.postLink);
  setLinkText(item.postLink);
  setLinkLink(item.link);  
  }
  function linkediting(item){
    if (editL==true&&editLinkText==item.postLink&&editLinkLink==item.link){
      return (
        <View>
        <TextInput
                      style={{ ...FONTS.body2 , color:'#005e66' ,marginTop:"1%", paddingLeft:'1%',marginLeft:'1%',marginRight:'1%',backgroundColor:COLORS.lightGray3,height:150,borderRadius:25,marginBottom:'3%'}}
                      placeholder="Edit Video description .."
                      multiline={true}
                      value={linkText}
                      numberOfLines={1}
                      placeholderTextColor="#005e66"
                      onChangeText={(poost) => setLinkText(poost)}
                      />
                         <TextInput
                      style={{ ...FONTS.body2 , color:'#005e66' ,marginTop:"1%", paddingLeft:'1%',marginLeft:'1%',marginRight:'1%',backgroundColor:COLORS.lightGray3,height:150,borderRadius:25,marginBottom:'3%'}}
                      placeholder="Edit Video Link .."
                      multiline={true}
                      value={linkLink}
                      numberOfLines={1}
                      placeholderTextColor="#005e66"
                      onChangeText={(poost) => setLinkLink(poost)}
                      />
                      <View style={{
                        flexDirection:'row'
                      }}>
                      <TouchableOpacity style={{
                  width:'90%',
                  flex:3,
                  height:50,
                  backgroundColor:COLORS.primary,
                  borderRadius:25,
                  margin:SIZES.padding*0.25,
                  alignSelf:'center',
                  justifyContent:'center',
                  alignContent:'center',
              }}
              onPress={()=>editLinkDataBase(item)}>
               <Text style={{ ...FONTS.h2, color:COLORS.white ,alignSelf:'center'}}>Save Changes</Text>   
              </TouchableOpacity>
              <TouchableOpacity style={{
                  width:'90%',
                  flex:2,
                  height:50,
                  backgroundColor:COLORS.secondary,
                  borderRadius:25,
                  margin:SIZES.padding*0.25,
                  alignSelf:'center',
                  justifyContent:'center',
                  alignContent:'center',
              }}
              onPress={()=>editLinkCancel(item)}>
               <Text style={{ ...FONTS.h2, color:COLORS.white ,alignSelf:'center'}}>Cancel</Text>  
               </TouchableOpacity>
          
                      </View>
                      </View>
    
      );
    }
  }
  function editLinkDataBase(item){
    if (linkText==""&&linkLink=="")
    {
      Alert.alert(
        "Invalid Input",
        "You Should have link content!!",
        [
          { text: "OK", onPress: () => {
            return;
          } }
        ]
      );
     }
     else {
    fetch("http://10.0.2.2:4000/update-event-link",{
      method :"post",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          id:item._id,
          postLink:linkText,
          link:linkLink,
          eventId:event._id
      })
    }).then(data=>{
      console.log(data)
      res.send(data)
  }).catch(err=>{
      console.log(err)
  })
  
 setEditL(false);
 setLinkLink("");
 setLinkText("");
 setEditLinkLink("");
 setEditLinkText("");}
  }
  function editLinkCancel(){
    setEditL(false);
 setLinkLink("");
 setLinkText("");
 setEditLinkLink("");
 setEditLinkText("");
  }
function editPostDataBase(item){
  if (posst==""&&editPostImage==""){
    Alert.alert(
      "Invalid Input",
      "You Should have post content!!",
      [
        { text: "OK", onPress: () => {
          return;
        } }
      ]
    );
   }
   else {
    if (item.imag!=""&&editPostImage=="")
    setEditPostImage(item.imag);
  fetch("http://10.0.2.2:4000/update-event-post",{
    method :"post",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        id:item._id,
        post:posst,
        imag:editPostImage,
        eventId:event._id,
        likes:postLikes
    })
  }).then(data=>{
    console.log(data)
    res.send(data)
}).catch(err=>{
    console.log(err)
})

setEditP(false);
setEditPostImage("");
setEditPostText("");
setPosst("");
setPostLikes(0);}
}
function editPostCancel(){
  setEditP(false);
  setEditPostImage("");
  setEditPostText("");
  setPosst("");
  setPostLikes(0);
}
function postediting(item){
  if (editP==true&&editPostText==item.post&&postLikes==item.likes){
  return (
    <View>
    <TextInput
                  style={{ ...FONTS.body2 , color:'#005e66' ,marginTop:"3%", paddingLeft:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:COLORS.lightGray,height:150,borderRadius:25,marginBottom:'3%'}}
                  placeholder="Edit post text .."
                  multiline={true}
                  value={posst}
                  numberOfLines={1}
                  placeholderTextColor="#005e66"
                  onChangeText={(poost) => setPosst(poost)}
                  />
                  <View style={{
                    flexDirection:'row'
                  }}>
                  <TouchableOpacity style={{
              width:'90%',
              flex:3,
              height:50,
              backgroundColor:COLORS.primary,
              borderRadius:25,
              margin:SIZES.padding*0.25,
              alignSelf:'center',
              justifyContent:'center',
              alignContent:'center',
              marginLeft:20,
          }}
          onPress={()=>editPostDataBase(item)}>
           <Text style={{ ...FONTS.h2, color:COLORS.white ,alignSelf:'center'}}>Save Changes</Text>   
          </TouchableOpacity>
          <TouchableOpacity style={{
              //width:'90%',
              flex:1,
              height:50,
              backgroundColor:COLORS.primary,
              borderRadius:25,
              margin:SIZES.padding*0.5,
              alignSelf:'center',
              justifyContent:'center',
              alignContent:'center',
          }}
          onPress={()=>{ ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("image ===>>>>",image);
      setEditPostImage(image.path);
     // setVisibleImage(false);
    });}}>
            <Image
              source={icons.image}
              style={{
                  alignSelf:'center',
                  width : 30,
                  height:30,
                  tintColor: COLORS.white,
              }}
          />
          </TouchableOpacity>
          <TouchableOpacity style={{
              width:'10%',
              flex:2,
              height:50,
              backgroundColor:COLORS.secondary,
              borderRadius:25,
              margin:SIZES.padding*0.25,
              alignSelf:'center',
              justifyContent:'center',
              alignContent:'center',
              marginRight:20
          }}
          onPress={()=>editPostCancel()}>
           <Text style={{ ...FONTS.h2, color:COLORS.white ,alignSelf:'center'}}>Cancel</Text>   
          </TouchableOpacity>
                  </View>
                  </View>

  );}
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
      

  function addLink() {
    return (
        <View style={{ flexDirection: 'row',backgroundColor:'white',alignContent:'center',justifyContent:'center',marginBottom:'5%' }}>
        <View style={{
            borderRadius:25,
            borderWidth:2,
            borderColor:COLORS.secondary,
            backgroundColor:COLORS.lightGray,
            width:'90%',
            justifyContent:'center',
            alignContent:'center',
        }}>
        <ScrollView style={{
         
        }}>
            <TextInput
                style={{ ...FONTS.body2 , color:'#005e66' , paddingLeft:'3%',marginLeft:'3%',marginRight:'3%', marginTop:'3%',backgroundColor:COLORS.lightGray3,height:120,borderRadius:25}}
                placeholder="What about the New Link ?"
                multiline={true}
                value={postLink}
                numberOfLines={1}
                placeholderTextColor="#005e66"
                onChangeText={(post) => setPostLink(post)}
                />
        </ScrollView>
        <ScrollView >
        <View style={{
          paddingLeft:'3%',marginLeft:'3%',marginRight:'3%', marginTop:'3%',backgroundColor:COLORS.lightGray3,height:60,borderRadius:25,flexDirection:'row',alignContent:'center',justifyContent:'center',marginBottom:10
          
        }}>
        <Image source={icons.link}
          style={{
            width:25,
            height:25,
            alignSelf:'center',
            tintColor:COLORS.secondary,
            flex:1
          }}
        />
            <TextInput
                style={{ ...FONTS.body2 , color:'#005e66' , paddingLeft:'3%',marginLeft:'3%',marginRight:'3%', marginTop:'3%',backgroundColor:COLORS.lightGray3,height:60,borderRadius:25,alignSelf:'center',
                flex:10}}
                placeholder="Paste Your Link Here "
                multiline={true}
                value={link}
                numberOfLines={1}
                placeholderTextColor="#005e66"
                onChangeText={(post) => setLink(post)}
                />
                </View>
        </ScrollView>
        <View style={{
            flexDirection:'row',
        }}>
        <TouchableOpacity style={{
            //width:'90%',
            flex:3,
            height:50,
            backgroundColor:COLORS.primary,
            borderRadius:25,
            margin:SIZES.padding*0.5,
            alignSelf:'center',
            justifyContent:'center',
            alignContent:'center',
        }}
        onPress={()=>publishLink()}>
         <Text style={{ ...FONTS.h2, color:COLORS.white ,alignSelf:'center'}}>Add Link</Text>   
        </TouchableOpacity>
     </View>
        </View>
        </View>
    )
}
  function Imgp(img){
    if (img!=''){
      return(
      <Image
      source={{uri:imag}}
    //resizeMode="cover"
    style={{
        margin:'5%',
        marginBottom:'10%',
        width: '90%',
        height: 300,
        borderRadius: SIZES.radius
    }}
      />)
    }
  }
  function publish (){
    if (post==""&&imag==""){
      Alert.alert(
        "Invalid Input",
        "You Should have post content!!",
        [
          { text: "OK", onPress: () => {
            return;
          } }
        ]
      );
     }
     else {
   fetch("http://10.0.2.2:4000/send-data-event-post",{
             method :"post",
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                post,
                imag,
                eventId:event._id,
                likes:0
             })
         }).then(res=>res.json())
         .then (data=>{
             console.log(data)
         }) 
         setVisiblePost(true); 
         setVisibleImage(true);
         setPost("");
         setImag("");}
       
 }
 function publishLink (){
  if (postLink==""&&link==""){
    Alert.alert(
      "Invalid Input",
      "You Should have link content!!",
      [
        { text: "OK", onPress: () => {
          return;
        } }
      ]
    );
   }
   else {
fetch("http://10.0.2.2:4000/send-data-event-link",{
           method :"post",
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify({
              postLink,
              link,
              eventId:event._id
           })
       }).then(res=>res.json())
       .then (data=>{
           console.log(data)
       })  
       setLink("");
       setPostLink("");
       setVisibleLink(true); 
      }
}
  function addImage(){
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("image ===>>>>",image);
      setImag(image.path);
      setVisibleImage(false);
    });
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
                        navigation.navigate('search',{item :event.comm,s:search,type:'comm'})}}
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
      menuItemPost: {
        backgroundColor:COLORS.white,
        width:130,
        marginTop:7,
        marginLeft:-30,
        marginRight:-30,
        marginBottom:7,
        paddingTop:5,
        paddingBottom:5,
        borderBottomWidth:1,
        borderBottomColor:COLORS.secondary
      },
      menuItem: {
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
         <TouchableOpacity
                  //  onPress={() => navigation.navigate('')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387',

                    }]}>Join Now</Text>
                </TouchableOpacity>
        </Animatable.View>
       
       ) }

       const getCurrentDate=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() +1;
        var year = new Date().getFullYear();
        
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
  }

    function renderMainCategories() {
        return (
         
        
   <View style={styles.headerContainer}>
    
   
   <ImageBackground style={styles.headerBackgroundImage} blurRadius={2.8}  source={{uri:event.imag}}>
  
   <CountDown
        size={30}
        until={ssecc}
        onFinish={() => alert('finished')}
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
          {event.name}   </Text> 
         
          <View>
           <Image
             source={icons.rate}
             style={{
              // flex:1,
               height:35,
               width:35,
               alignSelf:'center',
               tintColor:'gold'
             }}
           /> 
            <Text style={{
            fontSize:SIZES.body3,
            fontWeight:"bold",
            color:COLORS.primary,
            left :10,
            }}>{star}</Text> 
           </View>
           
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
             {"  "}{event.commName}
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
            alignSelf:'center',
            marginRight:15
       }}>
           Start at {event.startDate} , at time : {event.startDateTime} and End at  {event.endDate} , at time : {event.endDateTime}
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
       }}>Collage Number {event.selVal}</Text>
      

                <Text  style={{
           fontSize:13,
            color:'#666666',
            alignSelf:'center'
       }}> {'\n'} Hall Number {event.place}
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
       }}> {'\n'}{event.info1}
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
       }}> {'\n'}{event.info2}
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
       }}> {'\n'}{event.info3}
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
       }}> {'\n'}{event.info4}
         </Text>
      </Text>
    </View>
    )}
    {event.pay!=""&&(
    <View style={{
              alignContent:'center',
              justifyContent:'center',
              backgroundColor:COLORS.primary,
              borderRadius:5,
              padding:5,
              height:50,


            }}><Text style={{fontSize:15,  color: 'white',  fontWeight:'bold',alignSelf:'center'}}>Payment : {event.pay}</Text></View>   )}
  
     
   <View style={{
     
         alignContent:'center',
         justifyContent:'center',
       }}>
    <View
    style={{
    
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
    function renderAddPost() {
      return (
          <View style={{ flexDirection: 'row',backgroundColor:'white',alignContent:'center',justifyContent:'center',marginBottom:'5%' }}>
          <View style={{
              borderRadius:25,
              borderWidth:2,
              borderColor:COLORS.secondary,
              backgroundColor:COLORS.lightGray,
              width:'90%',
              justifyContent:'center',
              alignContent:'center',
          }}>
          <ScrollView style={{
           
          }}>
              <TextInput
                  style={{ ...FONTS.body2 , color:'#005e66' , paddingLeft:'3%',marginLeft:'3%',marginRight:'3%', marginTop:'3%',backgroundColor:COLORS.lightGray3,height:120,borderRadius:25}}
                  placeholder=" What is new in your community?  "
                  multiline={true}
                  numberOfLines={1}
                  value={post}
                  placeholderTextColor="#005e66"
                  onChangeText={(post) => setPost(post)}
                  />
                   {(!visibleImage)&&
                   (<Image
                    source={{uri : imag}}
                    resizeMode='contain'
                    style={{
                      alignSelf:'center',
                      borderRadius:5,
                      marginBottom:'3%',
                      marginTop:'3%',
                      width:650,height:400,
                    }}
                  />)}
          </ScrollView>
          <View style={{
              flexDirection:'row',
          }}>
          <TouchableOpacity style={{
              //width:'90%',
              flex:3,
              height:50,
              backgroundColor:COLORS.primary,
              borderRadius:25,
              margin:SIZES.padding*0.5,
              alignSelf:'center',
              justifyContent:'center',
              alignContent:'center',
          }}
          onPress={()=>publish()}>
           <Text style={{ ...FONTS.h2, color:COLORS.white ,alignSelf:'center'}}>Publish</Text>   
          </TouchableOpacity>
          <TouchableOpacity style={{
              //width:'90%',
              flex:1,
              height:50,
              backgroundColor:COLORS.primary,
              borderRadius:25,
              margin:SIZES.padding*0.5,
              alignSelf:'center',
              justifyContent:'center',
              alignContent:'center',
          }}
          onPress={()=>addImage()}>
            <Image
              source={icons.image}
              style={{
                  alignSelf:'center',
                  width : 30,
                  height:30,
                  tintColor: COLORS.white,
              }}
          />
          </TouchableOpacity></View>
          </View>
          </View>
      )
  }

  function renderPosts() {
    var posts=[];
  fetch("http://10.0.2.2:4000/EventPost")
  .then(res=>res.json())
  .then(results=>{
      setDPosts(results)
  });

  for (let i=0;i<DPosts.length;i++){
    if (DPosts[i].eventId==event._id){
       // DPosts.pop(DPosts[i]);  
       posts.push(DPosts[i]);  
    }
  }

  
  for (let j =0;j<posts.length;j++){
    for (let i=0;i<likee.length;i++){
  var s= likee[i].posts;

  var ss = s.split('+');

  for (let k =0;k<ss.length;k++){
    if (posts[j]._id==ss[k]){
      posts[j].likes=parseInt( posts[j].likes)+1;
    }
  }
  }
  
}

    const renderItem = ({ item }) => (
       
        <View
            style={{ marginBottom: SIZES.padding * 2, backgroundColor:'white' }}
        >   
            <View
                style={{
                    marginBottom: SIZES.padding/2,
                    backgroundColor:COLORS.lightGray3,
                    borderRadius:25,
                    paddingBottom:'6%'
                }}
            >
            <View style={{flexDirection:'row'}}>

              <View style={{flex:5}}></View>
              {editPostText!=item.post&&
              <Menu >
    <MenuTrigger>
    <Image
      source={icons.menu}
      resizeMode="contain"
      style={{
          width: 30,
          height: 30,
          tintColor:COLORS.primary,
          top:5,
          right:2,
      }}
     />
     </MenuTrigger> 
    <MenuOptions style={{
        alignSelf:'center',marginLeft:-5
    }}
    optionsContainerStyle=
   {{height:120,width:150,borderRadius:25}}
    >
      <MenuOption onSelect={()=> {editpost(item)
      }}  style={
        styles.menuItemPost}>
      <View ><Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Edit</Text></View>
      </MenuOption>
      <MenuOption onSelect={() => {
         Alert.alert(
      "Delete",
      "Do you really want to delete this post",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          deletePost(item._id);
        } }
      ]
    );
      }
      }  style={ styles.menuItemPost}>
        <Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Delete</Text>
      </MenuOption>
    
    </MenuOptions>
  </Menu>}
            </View>
            {postediting(item)}
            {editPostText!=item.post&&
            <View>
             <Text style={{ ...FONTS.body2 , color:COLORS.primary, margin:'5%',marginBottom:'7%'}}>{item.post}</Text>
                  {img(item.imag)}
                <View
                    style={{
                        position: 'absolute',
                        bottom: -20,
                        height: 50,
                        left:289,
                        //paddingTop:'5%',
                        width: SIZES.width * 0.2,
                        backgroundColor: COLORS.primary,
                        borderTopLeftRadius: SIZES.radius,
                        borderBottomRightRadius: SIZES.radius,
                       // paddingTop:'15%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...styles.shadow
                    }}
                >
                 <View
                  style={{ flexDirection:'row',justifyContent:'center',alignContent:'center'}}
                 >
                 <Text style={{ ...FONTS.h2 , color:COLORS.white ,alignSelf:'center'}}> {item.likes} </Text>
                    <Image
                        source={icons.like}
                        style={{
                            width : 30,
                            height:30,
                            tintColor: 'red',
                        }} 
                        

                    />
                    </View>
                </View>
                </View>
                }
               
                
            </View>            
        </View>
    )
      return (

        <View>
       {renderAddPost()}
        <FlatList  
              data={posts}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                  paddingBottom: 30
              }}
          />
          </View>
      )
  }

  function renderLinks() {
    var links=[];
    fetch("http://10.0.2.2:4000/EventLink")
    .then(res=>res.json())
    .then(results=>{
        setDLinks(results)
    })
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
       {editLinkText!=item.postLink&&
       <Menu style={{
         alignSelf:'flex-end',
         left:10,
         top:-5

       }}>
    <MenuTrigger>
    <Image
      source={icons.menu}
      resizeMode="contain"
      style={{
          width: 30,
          height: 30,
          tintColor:COLORS.primary,
          top:5,
          right:2,
      }}
     />
     </MenuTrigger> 
    <MenuOptions style={{
        alignSelf:'center',marginLeft:-5
    }}
    optionsContainerStyle=
   {{height:120,width:150,borderRadius:25}}
    >
      <MenuOption onSelect={()=> editlink(item)}  style={
        styles.menuItemPost}>
      <View ><Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Edit</Text></View>
      </MenuOption>
      <MenuOption onSelect={() => {
         Alert.alert(
      "Delete",
      "Do you really want to delete this link",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          deleteLink(item._id);
        } }
      ]
    );
      }
      } style={ styles.menuItemPost}>
        <Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Delete</Text>
      </MenuOption>
    
    </MenuOptions>
  </Menu>}
  {editLinkText==item.postLink&&linkediting(item)}
  {editLinkText!=item.postLink&&
        <View style={{flexDirection:'column'}}>
         <Text style={{...FONTS.h3,color:COLORS.primary,marginLeft:'7%'}}>{item.postLink}</Text>
         <Text  style={{...FONTS.h3,color:COLORS.secondary,marginLeft:'10%',textDecorationLine: 'underline',marginTop:'3%',marginBottom:'5%'}}
              onPress={() => Linking.openURL(item.link)}>
         {item.link}
        </Text></View>}
       </View>
       
    )

    return (
      <View>
     {addLink()}
      <FlatList  
            data={links}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
                paddingHorizontal: SIZES.padding * 2,
                paddingBottom: 30
            }}
        /></View>
    )
}
function deleteLink(id){
  fetch("http://10.0.2.2:4000/delete-link",{
    method :"post",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      id
    })
  }).then(data=>{
    console.log(data)
    res.send(data)
}).catch(err=>{
    console.log(err)
})
}
function deletePost(id){
  fetch("http://10.0.2.2:4000/delete-post",{
    method :"post",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      id
    })
  }).then(data=>{
    console.log(data)
    res.send(data)
}).catch(err=>{
    console.log(err)
})
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
              peo.push(people[j]);
            }
          }
        }
      
      }
      
      const renderItem = ({ item }) => (

          <TouchableOpacity
              style={{ 
                backgroundColor:'white',justifyContent:'center',
                alignContent:'center',
                width:'100%',
                height:120,
                backgroundColor:COLORS.lightGray3,
                borderRadius:25,
                marginBottom:25
                }}
              onPress={() => navigation.replace("studentPageC", 
              {item:item,comm:event.comm}
              )}
          >
          <View style={{
            flexDirection:'row',
            alignContent:'center',
            justifyContent:'center',
            flex:1,
          }}>
          <View style={{
            //backgroundColor:COLORS.white,
            flex:3,
            height:'95%',
            margin:5,
          }}>
          <Image
            source={{uri:item.imag}}
            style={{
              borderRadius:70,
              width:90,
              height:90,
              margin:10
            }}
          />
          </View>
          <View style={{
            //backgroundColor:COLORS.primary,
            flex:5,
            margin:5,
            height:'95%',
          }}>
              <View style={{
                flexDirection:'column'
              }}>
              <View style={{
                marginTop:20
              }}>
                <Text style={{...FONTS.body2,
                fontWeight:'bold',
                  color:COLORS.primary,
                }}> {item.name} </Text>
              </View>
              <View style={{
                flexDirection:'row'
              }}>
              <TouchableOpacity onPress={() => 
      
      navigation.replace("conversation",{
         max:st.email,
         min:item.number,
        sender:st.email,
        reciver:item.number
       })
      }>
              <Image
                      source={icons.conversation}
                      resizeMode="cover"
                      style={{
                       width:28,
                       height:28,
                       //borderRadius:100,
                       margin:10,
                       tintColor:COLORS.primary
                      }}
                  />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>openDial(item.phone)}>
              <Image
                      source={icons.tel}
                      resizeMode="cover"
                      style={{
                       width:28,
                       height:28,
                       //borderRadius:100,
                       margin:10,
                       tintColor:COLORS.primary
                      }}
                  />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>Linking.openURL('mailto:'+item.email)}>
              <Image
                      source={icons.emailnew}
                      resizeMode="cover"
                      style={{
                       width:28,
                       height:28,
                       margin:10,
                      // borderRadius:100,
                       tintColor:COLORS.primary
                      }}
                  />
              </TouchableOpacity>
              </View>

              </View>
          </View>

          </View>

          </TouchableOpacity>
      )
     
     
      return (
        <View>
        <Text style={{...FONTS.body2,
          alignSelf:'center',color:COLORS.secondary,
          fontWeight:'bold',marginBottom:5
        }}> {peo.length} joined people </Text>
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
     <MenuProvider>
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
         <View style={{
           flexDirection:'column',
           alignContent:'center',
           justifyContent:'center',
         }}>
        <View style={{
          flexDirection:'row',
          flex:1,
          margin:10,
        }}>
          <TouchableOpacity
         onPress={()=>navigation.replace('editEvent',event)}
       style={{
           backgroundColor:COLORS.primary,
           alignSelf:'center',
           flex:1,
           height:60,
           borderWidth:1,
           borderColor:COLORS.white,
           marginRight:5,
           alignContent:'center',
           justifyContent:'center',
           borderRadius:10
       }}
       >
           <Text style={{
             fontSize:17,
             fontWeight:'bold',
             //fontWeight:'bold',
             color:COLORS.white,
             alignSelf:'center'
           }
           }> Edit Details</Text>
       </TouchableOpacity>
       <TouchableOpacity
         onPress={()=>{
          Alert.alert(
      "Delete",
      "Do you really want to delete this event",
      [
        {
          text: "Cancel",
          onPress: () => {return},
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
          
          fetch("http://10.0.2.2:4000/delete-event",{
            method :"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              id:event._id
            })
          }).then(data=>{
            console.log(data)
            res.send(data)
        }).catch(err=>{
            console.log(err)
        })
        navigation.goBack();
        } }
      ]
    );
         }}
       style={{
           backgroundColor:COLORS.secondary,
           alignSelf:'center',
           flex:1,
           height:60,
           borderWidth:1,
           borderColor:COLORS.white,
           alignContent:'center',
           justifyContent:'center',
           borderRadius:10
       }}
       >
           <Text style={{
             fontSize:17,
             fontWeight:'bold',
             //fontWeight:'bold',
             color:COLORS.primary,
             alignSelf:'center'
           }
           }>Delete Event</Text>
       </TouchableOpacity>
       
        </View>
        <View style={{
          flex:1,
    flexDirection:'column',
    alignContent:'center',
    justifyContent:'center',
    //marginTop:,
    marginBottom:10,
    marginLeft:15,
  }}> 
  <Text style={{...FONTS.body2,fontWeight:'bold',
    alignSelf:'flex-start',color:COLORS.primary,flex:5,
  }}> Accept Students </Text>

   <Switch
        style={{transform: [{ scaleX: 1.8 }, { scaleY: 1.5 }],flex:1,alignSelf:'flex-end',marginTop:-25,marginRight:40}}
        trackColor={{ false: "#767577", true: 'gray' }}
        thumbColor={isEnabled ? COLORS.primary : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

  </View>
        </View>
        
            {renderMainCategories()}
            {ret()}
        </ScrollView>
        </SafeAreaView>
        </MenuProvider>
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