import * as firebase from 'firebase/compat';


    const firebaseConfig = {
        apiKey: "AIzaSyCgDmjVmkw8_jwBDBPpOmSaGMC1-10VK7E",
        authDomain: "chat-25520.firebaseapp.com",
        projectId: "chat-25520",
        storageBucket: "chat-25520.appspot.com",
        messagingSenderId: "598020976184",
        appId: "1:598020976184:web:36a71f8ee59de4bc0400cd",
        measurementId: "${config.measurementId}"
      };

      if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
      }
export default firebase;



    
