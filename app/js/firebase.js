import * as firebase from 'firebase/app'
// import auth from 'firebase/auth'
// import database from 'firebase/database'

// firebase config
const config = {
  apiKey: "AIzaSyCO018_uKCHxB9uX4iN5_IEfCv82sQk0es",
  authDomain: "exvoc-78cd2.firebaseapp.com",
  databaseURL: "https://exvoc-78cd2.firebaseio.com",
  projectId: "exvoc-78cd2",
  storageBucket: "exvoc-78cd2.appspot.com",
  messagingSenderId: "726077314715"
}

export const app = firebase.initializeApp(config)
export const auth = require('firebase/auth')
export const db = require('firebase/database')

// export const auth = require('firebase/auth')