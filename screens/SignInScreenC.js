import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper-navigation-theme-context';
import Users from '../model/users';

const SignInScreen = ({navigation,route}) => {
const [name,setName]=useState("")
const [password,setPassword]=useState("")
const [email,setEmail]=useState("")
const [number,setNumber]=useState("")
const [phone,setPhone]=useState("")
const [confirmPassword,setConfirmPassword]=useState("")
const [datas,setDatas] = useState([])
const [datac,setDatac] = useState([])

useEffect(()=>{

    fetch("http://10.0.2.2:4000/signInC")
    .then(res=>res.json())
    .then(results=>{
        setDatac(results)
    })
},[])
function submitData (){
   var v =0;
        for(let i =0;i<datac.length;i++){
            const obj = datac[i];
            if (obj.email==number&&password==obj.password){
                  v=1;
                  navigation.replace('HomeC',datac[i]) ;
            }
        }
       
    if (v == 0 )
     Alert.alert(
            "Invalid Input",
            "Email or password not valid!!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
}


    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const textInputChange = (val) => {
        setNumber(val)
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setPassword(val)
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
            
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        setNumber(val)
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
           
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
                }
       // signIn(foundUser);
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#005e66' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: ''
            }]}
        >
            <Text style={[styles.text_footer, {
                color: "white"
            }]}>Email </Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#fff"
                    size={20}
                />
                <TextInput 
                  //  placeholder="Your Register number"
                   // placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: 'white'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="white"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Register number must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: "white",
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="white"
                    size={20}
                />
                <TextInput 
                 //   placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: 'white'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="white"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="white"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: 'grey', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity //sign in button
                    style={styles.signIn}
                    onPress={()=>submitData()}
                >
                <LinearGradient
                    colors={['#fff', '#fff']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#098893'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity //sign up
                    onPress={() => navigation.navigate('SignUpScreenC')}
                    style={[styles.signIn, {
                        borderColor: '#fff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#fff'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#005e66'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
