import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

const useFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCXSxwKiEqIfXDC1JPcRq022KT3Pv4g8WE',
    authDomain: 'doe-ja-d9676.firebaseapp.com',
    projectId: 'doe-ja-d9676',
    storageBucket: 'doe-ja-d9676.appspot.com',
    messagingSenderId: '592465039908',
    appId: '1:592465039908:web:3c5d67c655d03d60f3beb1',
  }

  const app = initializeApp(firebaseConfig)
  const storage = getStorage(app)

  return {
    app,
    storage,
  }
}

export default useFirebase
