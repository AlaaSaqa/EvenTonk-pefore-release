import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import {commPage,commPageC, eventPage ,studentPage,chat,not, conversation, SplashScreen,SignInScreenS,SignInScreenC, SignUpScreenS,SignUpScreenC,ChooseScreen,
    communities,commProfile,HomeC,Home,
    eventwait,star,eventProfile,EventShowScreen,addEvent,terms,settings,about,EventShowScreenC,
    studentPageC,communitiesC,search,editEvent, studentProfile,chatS, settingsS,notc} from './screens'

const Stack = createStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'SplashScreen'}
            >
                 <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
                <Stack.Screen name="SignInScreenS" component={SignInScreenS} />
                <Stack.Screen name="SignInScreenC" component={SignInScreenC} />
                <Stack.Screen name="SignUpScreenC" component={SignUpScreenC} />
                <Stack.Screen name="SignUpScreenS" component={SignUpScreenS} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Home" component={Home}  />
                <Stack.Screen name="HomeC" component={HomeC} />
                <Stack.Screen name="communities" component={communities} />
                <Stack.Screen name="commProfile" component={commProfile} />
                <Stack.Screen name="star" component={star} />
                <Stack.Screen name="addEvent" component={addEvent} />
                <Stack.Screen name="eventwait" component={eventwait} />
                <Stack.Screen name="commPageC" component={commPageC} />
                <Stack.Screen name="communitiesC" component={communitiesC} />
                <Stack.Screen name="commPage" component={commPage} />
                <Stack.Screen name="EventShowScreen" component={EventShowScreen} />
                <Stack.Screen name="EventShowScreenC" component={EventShowScreenC} />
                <Stack.Screen name="studentPageC" component={studentPageC} />
                <Stack.Screen name="eventPage" component={eventPage} />
                <Stack.Screen name="search" component={search} />
                <Stack.Screen name="studentPage" component={studentPage} />
                <Stack.Screen name="not" component={not} />
                <Stack.Screen name="notc" component={notc} />
                <Stack.Screen name="conversation" component={conversation} />
                <Stack.Screen name="chat" component={chat} />
                <Stack.Screen name="eventProfile" component={eventProfile} />
                <Stack.Screen name="about" component={about} />
                <Stack.Screen name="settings" component={settings} />
                <Stack.Screen name="settingsS" component={settingsS} /> 

                <Stack.Screen name="terms" component={terms} />
                <Stack.Screen name="editEvent" component={editEvent} />
                <Stack.Screen name="studentProfile" component={studentProfile} />
                <Stack.Screen name="chatS" component={chatS} />
                
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}

export default App;