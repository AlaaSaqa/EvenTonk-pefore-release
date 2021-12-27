import React from "react";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import {
    SafeAreaView,
    View,
    Text,
} from "react-native";


import { COLORS, FONTS } from '../constants'
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
        }}> About Us</Text>
     </View>
     <View style={{
         margin:'10%',
     }}>
        <Text style={{...FONTS.h4,
        color:'gray',
        alignSelf:'center'
        }}
        > The main problem you see on the average ecommerce About Us page is that it’s totally dedicated to talking about the company. An About Us page that focuses on your ecommerce brand – what a crazy idea!
         
        But consider this – an About Us page isn’t just about you or your company. It’s about why a customer should emotionally invest in your brand. It’s about why you’re the best person to solve your customer’s problem.

        And in the world of ecommerce, that’s what you’re doing – building trust and providing a product that solves a customer’s problem.

        This article will go over this idea in more detail, concentrating on:

        The role an About Us page plays in your brand image
        What you should and shouldn’t put on your About Us page
        Some killer About Us page examples
        So let’s jump straight in!</Text>
     </View>
     </SafeAreaView>
    );
}



export default about;