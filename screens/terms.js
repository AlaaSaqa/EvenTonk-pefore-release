import React from "react";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
} from "react-native";


import {COLORS, FONTS } from '../constants'
const about = () => {
    return (
        <SafeAreaView>
     <View style={{
         backgroundColor:COLORS.secondary,
         width:'100%',
         height:70,
         alignContent:'center',
         justifyContent:'center',
     }}>
        <Text style={{...FONTS.h1,
        color:COLORS.primary,
        alignSelf:'center'
        }}>Terms & Conditions</Text>
     </View>
     <View style={{
         margin:'10%',
     }}>
        <Text style={{...FONTS.h4,
        color:'gray',
        alignSelf:'center'
        }}
        > It's essentially a contract between you and your customers.

        You make services available to your customers.
        In return for using these services, your customers promise they'll follow the rules you set out in your Terms and Conditions.
        Think of a Terms and Conditions agreement as a "one stop shop" for all the key information that customers need before they use your services or make a purchase.

        A Terms and Conditions agreement allows you to:

        Withdraw and cancel services
        Disable user accounts
        Manage customer expectations
        Set rules for user behavior</Text>
     </View>
     </SafeAreaView>
    );
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

export default about;