import React, {useState, useEffect, useCallback} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { images, COLORS, FONTS } from '../constants'
import { IconButton } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';


const ChatScreen = ({ navigation ,route}) => {
  const [messages, setMessages] = useState([]);

  // const commId= route.params.commId; //myself mongo id
  // const comm = route.params.comm; //who i want to send him a message
  const max = route.params.max;
  const min = route.params.min;
  const sender = route.params.sender;
  const reciver = route.params.reciver;
// alert(thread[0]._id);
 //alert(comm.email) alaa email

 async function handleSend(messages) {
  const text = messages[0].text;

  firestore()
    .collection('THREADS')
    .doc(max+':'+min)
    .collection('MESSAGES')
    .add({
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: sender,
       email: ''
      }
    });

  await firestore()
    .collection('THREADS')
    .doc(max+':'+min)
    .set(
      {
        latestMessage: {
          text,
          createdAt: new Date().getTime()
        }
      },
      { merge: true }
    );
}







  useEffect(() => {

    const messagesListener = firestore()
    .collection('THREADS')
    .doc(max+':'+min)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      const messages = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: '',
          createdAt: new Date().getTime(),
          ...firebaseData
        };

        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.email
          };
        }

        return data;
      });

      setMessages(messages);
    });

  // Stop listening for updates whenever the component unmounts
  return () => messagesListener();

  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#005e66'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#005e66' />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#005e66' />
        </View>
      </Send>
    );
  }
  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#005e66' />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }


  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: sender }}
      placeholder='Type your message here...'
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );

};


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#005e66',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});
export default ChatScreen;