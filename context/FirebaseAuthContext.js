import React,{ createContext, useEffect, useReducer } from 'react';

import firebase from '../utils/firebase';
import PropTypes from 'prop-types';
import {getMultiFactorResolver,multiFactor,TotpSecret,
  TotpMultiFactorGenerator} from "firebase/auth";
  

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }


  return state;
};

export const AuthContext = createContext({
  ...initialAuthState,
  method: 'Firebase',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);
 // const auth = getAuth(); 
  const [errormessage,seterrormessage] = React.useState();
 // let user = auth.currentUser;
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                jobtitle: 'Lead Developer',
                avatar: user.photoURL,
                email: user.email,
                name: user.displayName || user.email,
                role: 'admin',
                location: 'San Francisco, USA',
                username: 'admin',
                posts: '4',
                coverImg: '/static/images/placeholders/covers/1.jpg',
                followers: '5684',
                description:
                  'Lorem ipsum is placeholder text commonly used in the graphic.'
              }
            }
          });
        } else {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      }),
    [dispatch]
  );

  const signInWithEmailAndPassword = async(email, password) =>{
    try{
      console.log(`clicked signin with email ${email} and password ${password}`)
   let user = await firebase.auth().signInWithEmailAndPassword(email, password);
   console.log(`user obj in firebase auth is ${JSON.stringify(user)}`);
   /* console.log(`multifactor authentication startef`)
        const mfaResolver = getMultiFactorResolver(getAuth(), error);
        const enrolledFactors = mfaResolver.hints.map(info => info.displayName);
        switch (mfaResolver.hints[selectedIndex].factorId) {
          case TotpMultiFactorGenerator.FACTOR_ID:
              const otpFromAuthenticator = "1234";
              const multiFactorAssertion =
                  TotpMultiFactorGenerator.assertionForSignIn(
                      mfaResolver.hints[selectedIndex].uid,
                      otpFromAuthenticator
                  );
              try {
                  let usercredentials = await mfaResolver.resolveSignIn(
                      multiFactorAssertion
                  );
                  console.log(`totp user credentials are ${JSON.stringify(usercredentials)}`)
                  // Successfully signed in!
              } catch (error) {
                  // Invalid or expired OTP.
              }
              break;
          
          default:
              // Unsupported second factor?
              break;
      } */
      
   return user;
    }
    catch(err){
console.log(`eeror in signin firebaseauthcontext ${JSON.stringify(err)}`)
throw err;
    }
  }
 /*  const signInWithEmailAndPassword = async(user,email, password) =>{
    if(user.emailVerified){
      console.log(`email verified`);
   await firebase.auth().signInWithEmailAndPassword(email, password);
    }
    else{
      console.log(`email not verified`)
      await sendEmailVerification(user, actionCodeSettings);
      // Obtain code from the user.
      await applyActionCode(auth, code);
    }
  } */

  const signInWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();

   const user = await firebase.auth().signInWithPopup(provider);
   console.log(`user logged in is ${JSON.stringify(user)}`)
   /* console.log(`multifactor authentication startef`)
   const mfaResolver = getMultiFactorResolver(getAuth(), error);
   const enrolledFactors = mfaResolver.hints.map(info => info.displayName);
   switch (mfaResolver.hints[selectedIndex].factorId) {
     case TotpMultiFactorGenerator.FACTOR_ID:
         const otpFromAuthenticator = "1234";
         const multiFactorAssertion =
             TotpMultiFactorGenerator.assertionForSignIn(
                 mfaResolver.hints[selectedIndex].uid,
                 otpFromAuthenticator
             );
         try {
             let usercredentials = await mfaResolver.resolveSignIn(
                 multiFactorAssertion
             );
             console.log(`totp user credentials are ${JSON.stringify(usercredentials)}`)
             // Successfully signed in!
         } catch (error) {
             // Invalid or expired OTP.
         }
         break;
     
     default:
         // Unsupported second factor?
         break;
 }
 */
   return user;
  };
 

  /* const createUserWithEmailAndPassword = async (email, password) =>{
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(userobj){
      console.log(`starting verification`);
      if(userobj.user){
   console.log(`user returned ${JSON.stringify(userobj)}`);
      
      if(userobj.user.emailVerified === false){
        console.log(`user is not verified`)
        userobj.user.sendEmailVerification().then(function(){
          console.log("email verification sent to user");
        });
      }
      else{
        console.log(`email verified`)
      }
    }
    else{
      console.log(`user is not returned`)
    }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });

  }  */

  const createUserWithEmailAndPassword = async (email, password) =>{

const userobj = await firebase.auth().createUserWithEmailAndPassword(email, password)
console.log(`starting verification`);
if(userobj.user){
 
  if(userobj.user.emailVerified === false){
    console.log(`user is not verified`)

    userobj.user.sendEmailVerification()
    console.log("email verification sent to user");
  }
  else{
    console.log(`email verified`)
  }
}


  } 

  
  
  const logout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'Firebase',
        
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
