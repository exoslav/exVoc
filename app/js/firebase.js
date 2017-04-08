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
export const db = app.database()
export const auth = app.auth()