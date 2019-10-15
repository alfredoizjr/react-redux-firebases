import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

// config firestore

const firebaseConfig  = {
    apiKey: "AIzaSyAv_66lCwzPCaTp2QmhImT5XgJWv65Psls",
    authDomain: "react-native-c6130.firebaseapp.com",
    databaseURL: "https://react-native-c6130.firebaseio.com",
    projectId: "react-native-c6130",
    storageBucket: "react-native-c6130.appspot.com",
    messagingSenderId: "1088044064632",
    appId: "1:1088044064632:web:a382e98c9060ab6180328d"
}

// initial firabases

firebase.initializeApp(firebaseConfig);

// config react redux

const rrfConfig = {
    userProfile: 'users',
    useFirestoreProfile: true
}

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
  })
  
  // Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState,compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;

