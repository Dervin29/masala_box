import {getApp, getApps, initializeApp} from 'firebase/app'
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAKBfamxAVnPGMc8J6Ci25pqfAZh8f00x0",
    authDomain: "masalabox-fd1dc.firebaseapp.com",
    databaseURL: "https://masalabox-fd1dc-default-rtdb.firebaseio.com",
    projectId: "masalabox-fd1dc",
    storageBucket: "masalabox-fd1dc.appspot.com",
    messagingSenderId: "856296571839",
    appId: "1:856296571839:web:21e2003006864dd2cd970a",
    measurementId: "G-QKCZ2MZ9BM"
  };

//initialize the app only if there is no app, to avoid re-initialize 
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);

  const storage = getStorage(app);


  export {app, firestore, storage};