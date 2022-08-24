import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'

import 'firebase/compat/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAVTB-VAQVUz-mIWJldH0reZxIcqY6n2bc',
  authDomain: 'netflix-a0d43.firebaseapp.com',
  projectId: 'netflix-a0d43',
  storageBucket: 'netflix-a0d43.appspot.com',
  messagingSenderId: '606909579352',
  appId: '1:606909579352:web:fb0d359c99e9d2e6be8a2d',
})

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export { auth }
export default db
