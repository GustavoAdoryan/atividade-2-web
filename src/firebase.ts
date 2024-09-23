import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDIvSBMpxaMqH_iUA6iIGDyax1o41tY4tc",
    authDomain: "atividade-2-web.firebaseapp.com",
    projectId: "atividade-2-web",
    storageBucket: "atividade-2-web.appspot.com",
    messagingSenderId: "634264918236",
    appId: "1:634264918236:web:2d0b87cfd54290c410fc19"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
