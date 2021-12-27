import React, { Component } from "react";
import { useState ,useEffect  } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    RefreshControl,
    ImageBackground,
    Switch,
    Alert,
    Button,
    
    
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import { icons,SIZES, COLORS, FONTS } from '../constants'
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreLogs([
	'VirtualizedLists should never be nested',
])
LogBox.ignoreAllLogs();
const addEvent = ({ navigation ,route}) => {
  var c =[];
  const [h,setH]= useState([]);
  const [items,setItems]= useState([]);
  useEffect(()=>{
    fetch("http://10.0.2.2:4000/Gethall")
    .then(res=>res.json())
    .then(results=>{
      console.log(results)
      for (let i =0;i<results.length;i++){
        if (c.includes(results[i].collage)==false){
          c.push(results[i].collage);
        items.push ({label:results[i].collage,value:results[i].collage,table:[]})
        }
      }
      for (let i =0;i<results.length;i++){
        if (c.includes(results[i].collage)==false){
          c.push(results[i].collage);
        items.push ({label:results[i].collage,value:results[i].collage,table:[]})
        }
      }
      for (let i =0;i<results.length;i++){
        for (let j =0;j<items.length;j++){
          if (items[j].label==results[i].collage){
            items[j].table.push({id :i,hall:results[i].hall});
          }
        }
      }
    })
    
},[])  
console.log('h=',h)

const cm = route.params;
const [imag, setImag] = useState("");
function uploadImage(){
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

  const [visibleImage,setVisibleImage]=useState(true);
  const [numS, setNumS] = useState(1);
  const [speakersOn, setSpeakersOn] = useState(true);
  const [speaker1, setSpeakers1] = useState("");
  const [info1, setInfo1] = useState("");
  const [speaker2, setSpeakers2] = useState("");
  const [info2, setInfo2] = useState("");
  const [speaker3, setSpeakers3] = useState("");
  const [info3, setInfo3] = useState("");
  const [speaker4, setSpeakers4] = useState("");
  const [info4, setInfo4] = useState("");
  const [people, setPeople] = useState(0);
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [des, setDes] = useState("");
    const [startDate, setStartDate] = useState("Start Date");
    const [endDate, setEndDate] = useState("End Date");
    const [startDateColer, setStartDateColer] = useState('gray');

    const [EndDateColer, setEndDateColer] = useState('gray');
    const [isDatePickerVisibleStart, setDatePickerVisibilityStart] = useState(false);
    const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);

    const [startDateTime, setStartDateTime] = useState("Time");
    const [endDateTime, setEndDateTime] = useState("Time");
    const [startDateColerTime, setStartDateColerTime] = useState('gray');
    const [EndDateColerTime, setEndDateColerTime] = useState('gray');
    const [isDatePickerVisibleStartTime, setDatePickerVisibilityStartTime] = useState(false);
    const [isDatePickerVisibleEndTime, setDatePickerVisibilityEndTime] = useState(false);
    const [selectedValue, setSelectedValue] = useState(" ");
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selVal, setselVal] = useState("");
    const [value, setValue] = useState(null);
    const [Editable, setEditable] = useState(false);
    const [pay,setPay ] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    
    const toggleSwitch = () =>{ 
      setEditable(!Editable);
      setIsEnabled(previousState => !previousState);}
    const showDatePickerStart = () => {
      setDatePickerVisibilityStart(true);
    };
    const showDatePickerStartTime = () => {
      setDatePickerVisibilityStartTime(true);
    };
  
    const hideDatePickerStart = () => {
      setDatePickerVisibilityStart(false);
    };
    const hideDatePickerStartTime = () => {
      setDatePickerVisibilityStartTime(false);
    };
  
    const handleConfirmStart = (date) => {
      setStartDateColer(COLORS.primary);
     // console.warn("startDate: ", date.toString());
      const d = date.toString() ;
      const pieces = d.split(" ");
      const st = pieces[0] +' '+pieces[1]+' '+pieces[2]+' '+pieces[3];
     
      setStartDate(st);
      hideDatePickerStart();
    };
    const handleConfirmStartTime = (date) => {
      setStartDateColerTime(COLORS.primary);
      const d = date.toString() ;
        const pieces = d.split(" ");
        const st = pieces[4];
        const dd = st.split(':');
        const h = parseInt(dd[0]);
        //console.warn(h)
        if(h==0){
          const et = '12'+':'+dd[1]+ " "+ "am";
          setStartDateTime(et);
        }
        else if (h-12<0){
          const et = dd[0]+':'+dd[1]+ " "+ "am";
          setStartDateTime(et);
        }
        
        else if (h-12>0) {
          const et = h-12 +':'+dd[1]+ " "+ "pm";
          setStartDateTime(et); 
        }
        else if (h==12){
          const et = h+':'+dd[1]+ " "+ "pm";
          setStartDateTime(et);
        }
      
      hideDatePickerStartTime();
    };
    const showDatePickerEnd = () => {
        setDatePickerVisibilityEnd(true);
      };
      const showDatePickerEndTime = () => {
        setDatePickerVisibilityEndTime(true);
      };
    
      const hideDatePickerEnd = () => {
        setDatePickerVisibilityEnd(false);
      };
      const hideDatePickerEndTime = () => {
        setDatePickerVisibilityEndTime(false);
      };
    
      const handleConfirmEnd = (date) => {
        setEndDateColer(COLORS.primary);
        const d = date.toString() ;
        const pieces = d.split(" ");
        const st = pieces[0] +' '+pieces[1]+' '+pieces[2]+' '+pieces[3];
        setEndDate(st);
        hideDatePickerEnd();
      };
      const handleConfirmEndTime = (date) => {
        setEndDateColerTime(COLORS.primary);
        const d = date.toString() ;
        const pieces = d.split(" ");
        const st = pieces[4];
        const dd = st.split(':');
        const h = parseInt(dd[0]);
        //console.warn(h)
        if(h==0){
          const et = '12'+':'+dd[1]+ " "+ "am";
          setEndDateTime(et);
        }
        else if (h-12<0){
          const et = dd[0]+':'+dd[1]+ " "+ "am";
          setEndDateTime(et);
        }
        
        else if (h-12>0) {
          const et = h-12 +':'+dd[1]+ " "+ "pm";
          setEndDateTime(et); 
        }
        else if (h==12){
          const et = h+':'+dd[1]+ " "+ "pm";
          setEndDateTime(et);
        }
       
        
        hideDatePickerEndTime();
      };
      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);
      
function addSpeakers (){
 if (numS==1){
    return (
      <View style={{
        alignContent:'center',
        justifyContent:'center',
        marginTop:'2%'
      }}>
      <View style={{
        alignContent:'center',
        justifyContent:'center',
        flexDirection:'row',
        
      }}>
      <Image
        source={icons.one}
        //resizeMode="cover"
        style={{
           width:30,
           height:30,
           tintColor:COLORS.primary,
           marginTop:'2%',marginLeft:'5%',
           alignSelf:'center',
           //flex:1,
        }}
    />
                <TextInput
                style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
                }}
                placeholder="First Speaker"
                multiline={true}
                numberOfLines={1}
                placeholderTextColor='gray'
                onChangeText={(speakers1) => setSpeakers1(speakers1)}
                />
                </View>

       <View style={{
           marginTop:'3%',
           flexDirection:'row',
           marginLeft:'12%'
       }}>
      
       
          <TextInput
                style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
                }}
                placeholder="First Speaker information"
                multiline={true}
                numberOfLines={1}
                placeholderTextColor='gray'
                onChangeText={(info1) => setInfo1(info1)}
                />
       </View>
      </View>
    )
 }
 if (numS==2){
  return (
    <View style={{
      alignContent:'center',
      justifyContent:'center',
    }}>
    <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.one}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="First Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers1) => setSpeakers1(speakers1)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="First Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info1) => setInfo1(info1)}
              />
     </View>
     <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.two}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="Second Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers2) => setSpeakers2(speakers2)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="Second Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info2) => setInfo2(info2)}
              />
     </View>

    </View>

  )
}
if (numS==3){
  return (
    <View style={{
      alignContent:'center',
      justifyContent:'center',
    }}>
    <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.one}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="First Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers1) => setSpeakers1(speakers1)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="First Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info1) => setInfo1(info1)}
              />
     </View>
     <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.two}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="Second Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers2) => setSpeakers2(speakers2)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="Second Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info2) => setInfo2(info2)}
              />
     </View>
     <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.three}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="Third Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers3) => setSpeakers3(speakers3)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="Third Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info3) => setInfo3(info3)}
              />
     </View>

    </View>

  )
}
if (numS==4){
  return (
    <View style={{
      alignContent:'center',
      justifyContent:'center',
    }}>
    <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.one}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="First Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers1) => setSpeakers1(speakers1)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="First Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info1) => setInfo1(info1)}
              />
     </View>
     <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.two}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="Second Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers2) => setSpeakers2(speakers2)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="Second Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info2) => setInfo2(info2)}
              />
     </View>
     <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.three}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="Third Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers3) => setSpeakers3(speakers3)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="Third Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info3) => setInfo3(info3)}
              />
     </View>
     <View style={{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'row',
      marginTop:'2%'
      
    }}>
    <Image
      source={icons.four}
      //resizeMode="cover"
      style={{
         width:30,
         height:30,
         tintColor:COLORS.primary,
         marginTop:'2%',marginLeft:'5%',
         alignSelf:'center',
         //flex:1,
      }}
  />
              <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
              }}
              placeholder="Fourth Speaker"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(speakers4) => setSpeakers4(speakers4)}
              />
              </View>

     <View style={{
         marginTop:'3%',
         flexDirection:'row',
         marginLeft:'12%'
     }}>
    
     
        <TextInput
              style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'90%'
              }}
              placeholder="Fourth Speaker information"
              multiline={true}
              numberOfLines={1}
              placeholderTextColor='gray'
              onChangeText={(info4) => setInfo4(info4)}
              />
     </View>
    </View>
  )
}
 
}
const [obj,setObj]=useState({});
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
      const createTwoButtonAlert = () =>{
        if (name==""){Alert.alert(
          "Invalid Input",
          "You should write event name!!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      return;}
      if (startDate=="Start Date"||endDate=="End Date"||startDateTime=="Time"||endDateTime=="Time"){Alert.alert(
        "Invalid Input",
        "You should select Date and Time for event !!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    return;}
    if (pay==""&&isEnabled==true){Alert.alert(
      "Invalid Input",
      "You should write your payment !!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
     return;}
        if (place==""){Alert.alert(
          "Invalid Input",
          "You should select place for event !!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      return;}
      if (des==""){Alert.alert(
        "Invalid Input",
        "You should put description for your event !!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    return;}
    if ((numS==1&&(speaker1==""||info1=="")))
    {Alert.alert(
      "Invalid Input",
      "You should put speakers and their information  !!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  return;}
  else if ((numS==2&&(
    (speaker1==""||info1=="")||(speaker2==""||info2==""))))
  {Alert.alert(
    "Invalid Input",
    "You should put speakers and their information  !!",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
return;}
else if ( (numS==3&&((speaker1==""||info1=="")||(speaker2==""||info2=="")||(speaker3==""||info3==""))))
{Alert.alert(
  "Invalid Input",
  "You should put speakers and their information  !!",
  [
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
);
return;}
else if ((numS==4&&((speaker1==""||info1=="")||(speaker2==""||info2=="")||(speaker3==""||info3=="")||(speaker4==""||info4==""))))
{Alert.alert(
  "Invalid Input",
  "You should put speakers and their information  !!",
  [
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
);
return;}
    else {
      const sd = startDate;
      const ss = sd.split(" ");
      const sday = parseInt(ss[2]);
      const smon = parsmon(ss[1]);
      const syear = parseInt(ss[3]);
      const ed = endDate;
      const dd = ed.split(" ");
      const eday = parseInt(dd[2]);
      const emon = parsmon(dd[1]);
      const eyear = parseInt(dd[3]);
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      if (syear>eyear){
        Alert.alert(
          "Invalid Input",
          "You should select Start Year less than End Year !!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      return;
      }
      else if (smon>emon&&syear==eyear){
        Alert.alert(
          "Invalid Input",
          "You should select Start Month less than End Month !!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      return;
      }
    else if (sday>eday&&smon==emon&&syear==eyear){
      Alert.alert(
        "Invalid Input",
        "You should select Start Day less than End Day !!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    return;
    }
    else if (sday<date&&syear<year&&smon<month){
      Alert.alert(
        "Invalid Input",
        "You should select Valid Date (not past date) !!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    return;
    }

    const st = startDateTime;
    const stt = st.split(':');
    const sh= parseInt(stt[0]);
    const smpa = stt[1];
    const smm = smpa.split(' ');
    const sm = parseInt(smm[0]);
    const spa = smm[1];
    const et = endDateTime;
    const ett = et.split(':');
    const eh= parseInt(ett[0]);
    const empa = ett[1];
    const emm = empa.split(' ');
    const em = parseInt(emm[0]);
    const epa = emm[1];
   // console.warn(epa);
    var shh=sh;
    var ehh=eh;
    if (sh==12&&spa=='am'){
      shh=0;
    }
    else if (sh==12){
      shh=12;
    }
    else if (spa=='pm'){
      shh=sh+12;
    }
    if (eh==12&&epa=='am'){
      ehh=0;
    }
    else if (eh==12){
      ehh=12;
    }
    else if (epa=='pm'){
      ehh=eh+12;
    }
   {/** 
    if (spa=='pm'){
        shh=sh+12;
      //  console.warn(shh);
    }
    if (spa=='am'&&sh==12){
      shh=0;
     // console.warn(shh);
    }
    if (epa=='pm'){
        ehh=eh+12;
    // console.warn(ehh);
  }
  if (epa=='am'&&eh==12){
      ehh=0;
   // console.warn(ehh);
  }
  */}

   // console.warn(ehh , shh);
  if (sday==eday&&smon==emon&&syear==eyear){
      if (ehh<shh||((ehh==shh)&&(sm<em))){
        Alert.alert(
          "Invalid Input",
          "You should select start time less than end for event in one day!! ",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      return;
      }
  }

    //console.warn(smm);
    if (sday==eday&&smon==emon&&syear==eyear&&startDateTime==endDateTime){
      Alert.alert(
        "Invalid Input",
        "You should select different times for start and end for event in one day !!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    return;
    }
  }

  Alert.alert(
    "Publish Event",
    "Are You Sure From Your Data",
    [
      {
        text: "Cancel",
        onPress: () => {return;}
      },
      { text: "OK", onPress: () =>{
      
        fetch("http://10.0.2.2:4000/Gethall")
        .then(res=>res.json())
        .then(results=>{
         for (let i =0;i<results.length;i++){
           if (results[i].collage==selVal){
             if(results[i].hall==place){
              var id = results[i]._id
              fetch("http://10.0.2.2:4000/add-rhall",{
                method :"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                   startDate:startDate,
                   endDate:endDate,
                   startTime:startDateTime,
                   endTime:endDateTime,
                   collage:selVal,
                   hall:place,
                   commId:route.params.name,
                   eventId:name
                })
            }).then(res=>res.json())
            .then (data=>{
                console.log(data)
            })
              fetch("http://10.0.2.2:4000/delete-hall",{
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
           }
         }
         
        })

        fetch("http://10.0.2.2:4000/send-data-event",{
          method :"post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            imag,
            name,
            startDate,
            endDate,
            startDateTime,
            endDateTime,
            pay,
            selVal,
            place,
            des,
            numS,
            speaker1,
            info1,
            speaker2,
            info2,
            speaker3,
            info3,
            speaker4,
            info4,
            people,
            comm: cm._id,
            stars:'0',
            commName:cm.name,
            accept:'true',
          })
      }).then(res=>res.json())
      .then (data=>{
          console.log(data)    
          fetch("http://10.0.2.2:4000/send-data-eventPeople",{
            method :"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              event:data._id,
              students:""
            })
        }).then(res=>res.json())
        .then (data=>{
            console.log(data)
        })
        fetch("http://10.0.2.2:4000/send-data-not",{
          method :"post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            eventId : data._id,
            startDate : data.startDate,
            commName:data.commName,
            eventName:data.name
          })
      }).then(res=>res.json())
      .then (data=>{
          console.log(data)
      })
        navigation.replace('eventProfile',data);
      })
      





      }
    
    
    }
    ]
  );
    
    } 
      function renderHalls(collage) {
        const renderItem = ({ item }) => {
            return (
               <TouchableOpacity style={{
                 width:200,
                 height:45,
                 backgroundColor:item.color,
                 //borderRadius:25,
                 borderWidth:3,
                 borderColor:'gray',
                 justifyContent:'center',
                 alignContent:'center',
                 marginBottom:'3%',
                 alignSelf:'center',
                 flex:1,
                 flexWrap:'wrap'
               }}
               onPress={() => {var s = item.hall;
               setPlace(s);}
               }
               >
                <Text style={{...FONTS.body3,
                    color:'gray',
                    alignSelf:'center',
                }}>
                {item.hall}
                </Text>
               </TouchableOpacity>
            );
        }

        return (
           
            <View style={{
              alignSelf:'center',
              alignContent:'center',
              justifyContent:'center'
            }}>
            <Text style={{
             alignSelf:'center',
             marginTop:'9%',
             //marginLeft:'6%',
             fontSize:SIZES.body3,
             //fontWeight:'bold',
             color:'gray',
             alignSelf:'center'
         }}>
        Choose Hall After Select Collage 
       </Text>
                <FlatList
                style={{alignSelf:'center'}}
                    data={collage}
                  // horizontal
                    //showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
      <View style={{flexDirection:'row',marginTop:'-2%',alignSelf:'center',alignContent:'center',justifyContent:'center',width:120}}>
       <Image
        source={icons.place}
        //resizeMode="cover"
        style={{
           width:30,
           height:30,
           tintColor:COLORS.primary,
           marginTop:'2%',marginLeft:'5%',
           alignSelf:'center',
           //flex:1,
        }}
    />
       <TextInput
            style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'2%',marginRight:'5%',borderBottomWidth:2,borderBottomColor:'gray',flex:5,height:50,alignContent:'center',justifyContent:'center',alignSelf:'center'}}
            editable={false}
            placeholder={place}
            placeholderTextColor={COLORS.primary}
           // onChangeText={(place) => setPlace(place)}
            /></View> 
              </View>
            
        )
    }
    function onSelectImage (){
 
    return (
          <TouchableOpacity
          style={{
              borderRadius:15,
              width:'50%',
              height:55,
              borderWidth:3,
              borderColor:'white',
              alignSelf:'center',
              alignContent:'center',
              justifyContent:'center'
          }}
          
       onPress={()=> uploadImage()}
                
          >
              <Text style={{...FONTS.body3,alignSelf:'center',
              color:'white'
              }}>Add Image</Text>
          </TouchableOpacity>
      );
    }
    


 function renderHeader() { 
        return (
            <View style={{ flexDirection: 'row', height: 50 , marginBottom:'5%',backgroundColor:COLORS.lightGray ,marginTop:'2%'}}>
          
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.replace("not")}
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
                        onPress={()=>navigation.navigate('search',{item :cm._id,s:search,type:'comm'})}
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
   
        function halls (){
          for (let s =0;s<items.length;s++){
            if (items[s].value==selVal){
              return renderHalls(items[s].table);
            }
          }
        }
       
     
    return (
      <View style={{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:COLORS.white
      }}>
      <SafeAreaView>
       <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{ justifyContent:'center',}}
       style={{
           alignContent:'center',
           backgroundColor:'white',
          
       }}
       refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
       >
       {renderHeader()}
        <Text style={{
             alignSelf:'flex-start',
             fontSize:SIZES.h2,
             fontWeight:'bold',
             color:COLORS.primary,
             marginBottom:'3%',
             marginLeft:'5%'
         }}>Create Event</Text>
<View>
{visibleImage&&<View style={
{
width:'90%',height:150,alignSelf:'center',backgroundColor:COLORS.primary,borderRadius:25,
alignContent:'center',justifyContent:'center'
}
}>
{onSelectImage()}
</View>}
{!visibleImage&&<Image
  source={{uri : imag}}
  resizeMode='contain'
  style={{
    alignSelf:'center',
    borderRadius:25,
    width:'90%',height:150,
  }}
/>}

            <TextInput
            style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'5%',marginRight:'5%',marginTop:'3%' ,borderBottomWidth:2,borderBottomColor:'gray'}}
            placeholder="Event Name"
            placeholderTextColor='gray'
            onChangeText={(name) => setName(name)}
            />
</View>



     <View style={{
         //  marginTop:'3%',
          // marginBottom:'15%',
       }}>
       <View style={{
          // backgroundColor:COLORS.lightGray,
           width:'90%',
           height:80,
           alignSelf:'center',
           //marginTop:'5%',
           //borderRadius:25,
          // borderWidth:3,
         //  borderColor:COLORS.secondary,
           flexDirection:'row',
          // padding:2

       }}>
          <Image
        source={icons.addevent}
        //resizeMode="cover"
        style={{
           width:30,
           height:30,
           tintColor:COLORS.primary,
           marginTop:'2%',marginRight:'3%',
           alignSelf:'center',
           //flex:1,
        }}
    />
        <TouchableOpacity style={{
            flex:1,
            alignSelf:'center',
            alignContent:'center',
            justifyContent:'center',
           // borderRadius:15,
            backgroundColor:COLORS.lightGray,
            marginRight:'5%',
            width:45,
            height:40,
            borderColor:startDateColer,
            borderWidth:3,
            alignContent:'center',
            justifyContent:'center'
        }}
        onPress={showDatePickerStart}>
        <Text style={{...FONTS.body3,color:startDateColer,alignSelf:'center'}}>{startDate}</Text>
        <DateTimePickerModal
            isVisible={isDatePickerVisibleStart}
            mode="date"
            onConfirm={handleConfirmStart}
            onCancel={hideDatePickerStart}
          />
    </TouchableOpacity>
    <TouchableOpacity style={{
            flex:1,
            alignSelf:'center',
            alignContent:'center',
            justifyContent:'center',
            //borderRadius:15,
            backgroundColor:COLORS.lightGray,
            marginRight:'1%',
            width:55,
            height:40,
            borderColor:startDateColerTime,
            borderWidth:3,
            alignContent:'center',
            justifyContent:'center'
        }}
        onPress={showDatePickerStartTime}>
        <Text style={{...FONTS.body3,color:startDateColerTime,alignSelf:'center'}}>{startDateTime}</Text>
        <DateTimePickerModal
            isVisible={isDatePickerVisibleStartTime}
            mode="time"
            onConfirm={handleConfirmStartTime}
            onCancel={hideDatePickerStartTime}
          />
    </TouchableOpacity>
       </View>
       </View> 
       
     <View style={{
           marginTop:'-5%',
          // marginBottom:'15%',
       }}>
       <View style={{
          // backgroundColor:COLORS.lightGray,
           width:'90%',
           height:80,
           alignSelf:'center',
           //marginTop:'5%',
           //borderRadius:25,
          // borderWidth:3,
         //  borderColor:COLORS.secondary,
           flexDirection:'row',
          // padding:2

       }}>
          <Image
        source={icons.addevent}
        //resizeMode="cover"
        style={{
           width:30,
           height:30,
           tintColor:COLORS.primary,
           marginTop:'2%',marginRight:'3%',
           alignSelf:'center',
           //flex:1,
        }}
    />
        <TouchableOpacity style={{
            flex:1,
            alignSelf:'center',
            alignContent:'center',
            justifyContent:'center',
           // borderRadius:15,
            backgroundColor:COLORS.lightGray,
            marginRight:'5%',
            width:65,
            height:40,
            borderColor:EndDateColer,
            borderWidth:3,
            alignContent:'center',
            justifyContent:'center'
        }}
        onPress={showDatePickerEnd}>
        <Text style={{...FONTS.body3,color:EndDateColer,alignSelf:'center'}}>{endDate}</Text>
        <DateTimePickerModal
        isVisible={isDatePickerVisibleEnd}
        mode="date"
        onConfirm={handleConfirmEnd}
        onCancel={hideDatePickerEnd}
      />
    </TouchableOpacity>
    <TouchableOpacity style={{
            flex:1,
            alignSelf:'center',
            alignContent:'center',
            justifyContent:'center',
          //  borderRadius:15,
            backgroundColor:COLORS.lightGray,
            marginRight:'1%',
            width:65,
            height:40,
            borderColor:EndDateColerTime,
            borderWidth:3,
            alignContent:'center',
            justifyContent:'center'
        }}
        onPress={showDatePickerEndTime}>
        <Text style={{...FONTS.body3,color:EndDateColerTime,alignSelf:'center'}}>{endDateTime}</Text>
        <DateTimePickerModal
        isVisible={isDatePickerVisibleEndTime}
        mode="time"
        onConfirm={handleConfirmEndTime}
        onCancel={hideDatePickerEndTime}
      />
    </TouchableOpacity>
    </View>
      <View style={
        {//marginLeft:'3%' ,
        flexDirection:'row',marginBottom:'5%',alignContent:'center',justifyContent:'center'}
      }>
       <Image
        source={icons.coin}
        //resizeMode="cover"
        style={{
           width:30,
           height:30,
           tintColor:COLORS.primary,
           marginTop:'2%',marginLeft:'5%',
           alignSelf:'center',
           //flex:1,
        }}
    />
        <Text style={{fontSize:SIZES.body3,
            // fontWeight:'bold',
             color:'gray',flex:4,alignSelf:'center',marginLeft:'2%'}}>Is the event paid?</Text>
        <Switch
        style={{marginRight:'7%',width:20,height:20,flex:1,alignSelf:'center'}}
        trackColor={{ false: "#767577", true: 'gray' }}
        thumbColor={isEnabled ? COLORS.primary : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
     
       </View>
       </View>
       {Editable&&(  <View >
       <TextInput
                style={{ ...FONTS.body3 , color:'#005e66' , flex:1,marginLeft:'15%',marginTop:'-3%',borderBottomWidth:2,marginBottom:'3%',borderBottomColor:'gray',marginRight:'30%',
                }}
                placeholder=" What is Your Payment?  "
                editable={Editable}
                placeholderTextColor='gray'
                onChangeText={(pay) => setPay(pay)}
                /></View>)}
  
<View style={{ flexDirection:'row'}}>
<Image
        source={icons.place}
        //resizeMode="cover"
        style={{
           width:30,
           height:30,
           tintColor:COLORS.primary,
           marginTop:'2%',marginLeft:'5%',
           alignSelf:'center',
           //flex:1,
        }}
    />
       <DropDownPicker
       style={
         {
          // backgroundColor:COLORS.lightGray,
           borderRadius:0,
           marginTop:'-3%',
           width:'80%',
           height:50,
           borderWidth:0,
           borderBottomWidth:2,
           borderColor:'gray',
           alignSelf:'center',
           marginRight:'17%'
         }
       }
      textStyle={{...FONTS.body4,
        fontSize:SIZES.body4,
        color:'gray',
      }}
      labelStyle={{...FONTS.body4,
        fontSize:SIZES.body4,
        color:COLORS.primary
      
      }}
      placeholder='select collage number'
      placeholderTextColor='gray'
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(value, label) => {
        console.log("selected value",value);
        setselVal(value);
        }}
     />
     
     </View>
    
     <View style={{alignContent:'center',justifyContent:'center'}}>
       <View
        
        style={{//margin:'5%',
         // borderRadius:25,
         // borderWidth:3,
          flexDirection:'row',
          flexWrap:'wrap',
          alignContent:'center',
          justifyContent:'center',
          alignSelf:'center'
         // borderColor:COLORS.lightGray,
         // backgroundColor:COLORS.lightGray,
         }}>
         {halls()}
         
        </View>
    
 
      </View> 
   
     
       <View style={{
           marginTop:'3%',
           flexDirection:'row'
       }}>
      <Image
        source={icons.edit}
        //resizeMode="cover"
        style={{
           width:30,
           height:30,
           tintColor:COLORS.primary,
           marginTop:'2%',marginLeft:'5%',
           alignSelf:'center',
           //flex:1,
        }}
    />
       
          <TextInput
                style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'80%'
                }}
                placeholder="Event Details "
                multiline={true}
                numberOfLines={1}
                placeholderTextColor='gray'
                onChangeText={(des) => setDes(des)}
                />
       </View>
       { speakersOn && (
         <View style={{
          alignContent:'center',
          justifyContent:'center',
         
       }}>
       <View style={{
           marginTop:'3%',
           flexDirection:'row'
       }}>
   
      <Image
        source={icons.mic}
        //resizeMode="cover"
        style={{
           width:30,
           height:30,
           tintColor:COLORS.primary,
           marginTop:'2%',marginLeft:'5%',
           alignSelf:'center',
           //flex:1,
        }}
    />
      
      <TextInput
                style={{ ...FONTS.body3 , color:'#005e66' , marginLeft:'3%', marginRight:'5%', borderBottomColor:'gray',borderBottomWidth:2,width:'50%'
                }}
                placeholder={numS.toString()+"Speakers" }
                editable={false}
                placeholderTextColor='gray'
                onChangeText={(numS) => setNumS(numS)}
                />
        <TouchableOpacity onPress={()=>{
        if (numS>1)setNumS(numS-1)}}
          style={{
            width:50,height:50,
            backgroundColor:COLORS.lightGray,
            borderTopLeftRadius:25,
            borderBottomLeftRadius:25,
            borderLeftWidth:3,
            borderTopWidth:3,
            borderBottomWidth:3,
            borderColor:'gray',
            alignContent:'center',justifyContent:'center',
          }}
          >
          <Image  source={icons.minus}
            style={{
              width:20,height:20,alignSelf:'center',
              tintColor:'gray'
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          if (numS<4)setNumS(numS+1)}}
        style={{
          width:50,height:50,
            backgroundColor:COLORS.lightGray,
            borderRightWidth:3,
            borderTopWidth:3,
            borderBottomWidth:3,
            borderColor:'gray',
            alignContent:'center',justifyContent:'center',borderTopRightRadius:25,
            borderBottomRightRadius:25,
          }}
        >
          <Image  source={icons.plus}
            style={{
              width:20,height:20,alignSelf:'center',
              tintColor:'gray'
            }}
          />
          
        </TouchableOpacity>   
       
       </View>   
       <TouchableOpacity onPress={()=>setSpeakersOn(false)}
        style={{
            width:150,height:50,backgroundColor:COLORS.lightGray,borderRadius:20,
            alignSelf:'center',
            marginTop:'3%',
            borderWidth:3,
            borderColor:'gray',
            alignContent:'center',justifyContent:'center'
          }}
        >
           <Text style={{
             fontSize:SIZES.body3,
             //fontWeight:'bold',
             color:'gray',
             alignSelf:'center'
           }
           }> Add Speakers </Text>
        </TouchableOpacity>  
       </View>  )}

       {(!speakersOn)&& (
         <View>
           {addSpeakers()}
         </View>
       )}
      

       <TouchableOpacity
       style={{
           marginTop:'10%',
           marginBottom:80,
           backgroundColor:COLORS.primary,
           borderRadius:15,
           borderWidth:3,
           borderColor:'gray',
           alignSelf:'center',
           marginBottom:100,
           width:"95%",
           height:60,
           alignContent:'center',
           justifyContent:'center'
       }}
       onPress={createTwoButtonAlert}>
       
           <Text style={{
             fontSize:SIZES.body3,
             //fontWeight:'bold',
             color:COLORS.white,
             alignSelf:'center'
           }
           }> Publish </Text>
          
       </TouchableOpacity>
     
       </ScrollView>
       </SafeAreaView>
       <View style={{
                backgroundColor:COLORS.white,
                width:'100%',
                height:45,
                alignContent:'center',
                justifyContent:'center',
                alignSelf:'center',
                alignItems:'center',
                margin:5,
                marginBottom:60,
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
                    height:55,
                    alignSelf:'center',
                    borderRadius:100,
                    //borderTopRightRadius:25,
                    alignContent:'center',
                    justifyContent:'center',
                  //  backgroundColor:COLORS.lightGray3
                }}>
                <Image
                            source={icons.addev}
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
       </View>
    )}

export default addEvent;