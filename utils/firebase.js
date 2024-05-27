import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { stagefirebaseConfig,prodfirebaseConfig } from '../config';
import { getAuth } from "firebase/auth";

export let app;
let stage = process.env.NEXT_PUBLIC_BUILD;
console.log(`process.env.BUILD now in firebase is ********************************************************** ${stage}`)

//let config = process.env.FIREBASE_PATH
/* let config;
if(stage==="dev"){
  config=stagefirebaseConfig
}
else{
  config = prodfirebaseConfig
} */
//let config = stage==="stage"?stagefirebaseConfig:prodfirebaseConfig;

export const config = {
     apiKey:`${process.env.NEXT_PUBLIC_API_KEY}`,
    authDomain:`${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`,
    projectId:`${process.env.NEXT_PUBLIC_PROJECT_ID}`,
    storageBucket:`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`,
    messagingSenderId:`${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}`,
    appId:`${process.env.NEXT_PUBLIC_APP_ID}`,
    measurementId:`${process.env.NEXT_PUBLIC_MEASUREMENT_ID}` 
}; 

if (!firebase.apps.length) {
  app = firebase.initializeApp(config);

}
export const auth = getAuth(app);


export default firebase;
