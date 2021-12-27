import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet ,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';


const ChooseScreen = ({navigation}) => {

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#005e66' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>I am</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: ''
            }]}
        >
        
            <View style={styles.button}>
                <TouchableOpacity //Student
                    style={styles.student}
                    onPress={()=>navigation.replace('SignInScreenS')}

                >
                <LinearGradient
                    colors={['#fff', '#fff']}
                    style={styles.student}
                >
                    <Text style={[styles.textSign, {
                        color:'#098893'
                    }]}>Student</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity //Community
                    onPress={()=>navigation.replace('SignInScreenC')}
                    style={[styles.student, {
                        borderColor: '#fff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                     <LinearGradient
                    colors={['#fff', '#fff']}
                    style={styles.student}
                >
                    <Text style={[styles.textSign, {
                        color: '#098893'
                    }]}>Community</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default ChooseScreen;

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
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    student: {
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
