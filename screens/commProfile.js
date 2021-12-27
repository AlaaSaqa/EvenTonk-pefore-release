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
    RefreshControl,
    Alert,
    
} from "react-native";
import ImagePicker from "react-native-image-crop-picker"
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
LogBox.ignoreLogs([
	'VirtualizedLists should never be nested',
])
LogBox.ignoreAllLogs();

const Home = ({ navigation,route }) => {
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const [search, setSearch] = useState("");

const [likes, setLikes] = useState(0);
const [post, setPost] = useState("");
const [EventFull, setEventFull] = useState(COLORS.primary);
const [MediaFull, setMediaFull] = useState(COLORS.secondary);
const [FollowersFull, setFollowersFull] = useState(COLORS.secondary);
const [Eventc, setEventc] = useState(COLORS.white);
const [Mediac, setMediac] = useState(COLORS.primary);
const [Followersc, setFollowersc] = useState(COLORS.primary);
const [visiblePost, setVisiblePost] = useState(false);
const [imag, setImag] = useState("");
const [visibleImage,setVisibleImage]=useState(true);
const [st,setSt]=useState();


const [com,setCom] =useState(route.params);

const [comm,setComm]=useState(com);
const [commId, setCommId] = useState(comm._id);
const [DFollowers,setDFollowers]=useState([]);
const [Dstudents,setDstudents]=useState([]);
const [DEvents,setDEvents]=useState([]);
const [DPosts,setDPosts]=useState([]);
const [like,setLike]=useState([]);

useEffect(()=>{

  fetch("http://10.0.2.2:4000/signInC")
  .then(res=>res.json())
  .then(results=>{
  console.log(results[1].number)
    for(let i = 0 ; i<results.length; i++){
      if(results[i]._id == routes.params._id)
      setSt(results[i]);  }})


  fetch("http://10.0.2.2:4000/likedComm")
  .then(res=>res.json())
  .then(results=>{
    setLike(results) ;
  });
  
  fetch("http://10.0.2.2:4000/signInC")
  .then(res=>res.json())
  .then(results=>{
    for (let i =0 ;i<results.length;i++){
      if (results[i]._id==com._id){
        setComm(results[i]);
      }
    }
  })

  fetch("http://10.0.2.2:4000/commPost")
  .then(res=>res.json())
  .then(results=>{
      setDPosts(results)
  });

      fetch("http://10.0.2.2:4000/Event")
    .then(res=>res.json())
    .then(results=>{
      setDEvents(results)
    });
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
},[])

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
    setVisiblePost(true); 
    setVisibleImage(true);
    fetch("http://10.0.2.2:4000/send-data-post",{
             method :"post",
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                post,
                imag,
                commId,
                likes
             })
         }).then(res=>res.json())
         .then (data=>{
             console.log(data)
         })
         setImag("");
         setPost("");

   }
 
       
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
                        onPress={()=>navigation.navigate('search',{item :comm._id,s:search,type:'comm'})}
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
      <MenuOption onSelect={()=>navigation.replace('settings',route.params)}  style={
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
    "Do you want to log out?",
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
                value={post}
                numberOfLines={1}
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
        backgroundColor:COLORS.white
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
      scrollbtnMedia:{
        backgroundColor:MediaFull,
        flex:1,
        borderRadius: 40,
        width:'100%',
        height:50,
        justifyContent:'center',
        alignContent:'center',
        marginRight:'4%',   
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
    })
   

    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {

    fetch("http://10.0.2.2:4000/signInC")
    .then(res=>res.json())
    .then(results=>{
       for (let i =0;i<results[i];i++){
         if (results[i]._id==commId){
           setCom(results[i]);
           setComm(com);
           setCommId(comm._id);
         }
       }
    })
    

    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));

  }, []);
 

   
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
    
    function ret (){
      if (Followersc==COLORS.white){
      return(
        <SafeAreaView style={{
          backgroundColor:'white',
          marginTop:'-10%',
        }}>
        {renderFollowers()}
        </SafeAreaView>
      )
      }
      else if (Eventc==COLORS.white){
      return(
        <SafeAreaView style={{
          backgroundColor:'white',
         marginTop:'-10%',
        }}>
        {renderEventList()}
        </SafeAreaView>
      )
      }
     
      else if (Mediac==COLORS.white){
        return(
          <SafeAreaView style={{
            backgroundColor:'white',
            marginTop:'-10%',
          }}>
          {renderPosts()}
          </SafeAreaView>
          )
      }
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
  const [postLikes, setPostLikes] = useState(0);
  const [posst,setPosst]=useState("")
  const [editPostText,setEditPostText]=useState("")
const [editPostImage,setEditPostImage]=useState("")
  const [editP,setEditP]=useState(false)
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

    fetch("http://10.0.2.2:4000/update-comm-post",{
      method :"post",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          id:item._id,
          post:posst,
          imag:editPostImage,
          commId,
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
  function editpost(item){
    setEditP(true);
    setEditPostImage(item.imag);
    setEditPostText(item.post);
    setPosst(item.post);
    setPostLikes(item.likes);
    
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
    function deletePost(id){
      fetch("http://10.0.2.2:4000/delete-post-comm",{
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
   
    function renderPosts() {

      var posts=[];
      fetch("http://10.0.2.2:4000/commPost")
      .then(res=>res.json())
      .then(results=>{
          setDPosts(results)
      });
      for (let i=0;i<DPosts.length;i++){
      //  alert(commId)
        if (DPosts[i].commId==commId){
           // DPosts.pop(DPosts[i]);  
           posts.push(DPosts[i]); 
        }

      }
     
        for (let j =0;j<posts.length;j++){
          for (let i=0;i<like.length;i++){
        var s=like[i].posts;
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
              {postediting(item)}
             {editPostText!=item.post&& <View>
              <View style={{}}>
              
              
               
                <Menu style={{alignSelf:'flex-end'}}>
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
      <MenuOption onSelect={()=> editpost(item)}  style={
        styles.menuItemPost}>
      <View ><Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Edit</Text></View>
      </MenuOption>
      <MenuOption onSelect={() => { Alert.alert(
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
    );}} style={ styles.menuItemPost}>
        <Text style={{...FONTS.body2 , color:COLORS.primary,fontWeight:'bold',alignSelf:'center', }}>Delete</Text>
      </MenuOption>
    
    </MenuOptions>
  </Menu>
              </View>
    
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
                   <Text style={{ ...FONTS.h4 , color:COLORS.white }}> {item.likes} </Text>
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
               
              </View> }
              </View>           
          </View>
      )

      return (
      <View>
      {renderAddPost()}
        <FlatList  
        style={{
          marginBottom:30,
        }}
              data={posts}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              refreshing={refreshing}
              onRefresh={onRefresh}
              contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                  paddingBottom: 30
              }}
          /></View>
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
              onPress={() => navigation.replace("studentPageC",{item:item,comm:commId})}
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
        style={{marginBottom:100}}
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
      var events=[];
     
  //  alert(DEvents.length)
    for (let i=0;i<DEvents.length;i++){
      if (DEvents[i].comm==commId){
        events.push(DEvents[i]); 
      }
    }
        const renderItem = ({ item }) => (
           
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.replace("eventProfile",
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
         <View style={{flexDirection:'column'}}>
        
          <FlatList  
                data={events}
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

    return (
        <MenuProvider>
        <SafeAreaView style={styles.container}
        > 
        <ScrollView style={styles.container}
         showsVerticalScrollIndicator={false}
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
                    alignSelf:'center'
                }}
                onPress={()=>navigation.replace('communitiesC',route.params)}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
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