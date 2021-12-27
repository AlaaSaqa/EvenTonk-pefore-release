import React from 'react';
import { 
    View,  
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#005e66' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="zoomIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        
        
            <Animatable.View 
            style={styles.button}
            animation="fadeInUpBig"
            >
            <TouchableOpacity onPress={()=>navigation.replace('ChooseScreen')}>
                <LinearGradient
                    colors={['#005e66', '#005e66']}
                >
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={40}
                    />
                </LinearGradient>
            </TouchableOpacity>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.34;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#005e66'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },

  logo: {
      width: height_logo,
      height: height_logo
  },

  button: {
      alignItems: 'flex-end',
      marginTop: 30
  }
});
