// import { FirebaseApp, initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   Firestore,
//   doc,
//   getDoc
// } from "firebase/firestore/lite";
// import { query, where } from "firebase/firestore";

// interface ICreatorsLocations {
//   id: string;
//   latitude: number;
//   longitude: number;
// }

// const firebaseConfig = {
//   apiKey: "AIzaSyCW2NI3OUhrOIBuxHCZWz6Ryfq7fPaH0QM",
//   authDomain: "bookfab-375ca.firebaseapp.com",
//   projectId: "bookfab-375ca",
//   storageBucket: "bookfab-375ca.appspot.com",
//   messagingSenderId: "568655225452",
//   appId: "1:568655225452:web:3c89ac0e36fafb6f356e49",
//   measurementId: "G-KRMDE34KDL",
// };

// let app: FirebaseApp;
// let db: Firestore;

// export const fbInit = () => {
//   app = initializeApp(firebaseConfig);
//   db = getFirestore(app);
// };
// export const fetchDataFromFS = async () => {
//   const query = collection(db, "creatorData");
//   const dataSnapshot = await getDocs(query);
//   const dataList = dataSnapshot.docs.map((doc) => doc.data());

//   if (dataList) {
//     return dataList;
//   } else {
//     return null;
//   };
// };

import { initializeApp, FirebaseApp } from "firebase/app";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getFirestore,
  where,
} from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  User,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCW2NI3OUhrOIBuxHCZWz6Ryfq7fPaH0QM",
  authDomain: "bookfab-375ca.firebaseapp.com",
  projectId: "bookfab-375ca",
  storageBucket: "bookfab-375ca.appspot.com",
  messagingSenderId: "568655225452",
  appId: "1:568655225452:web:3c89ac0e36fafb6f356e49",
  measurementId: "G-KRMDE34KDL",
};

let app: FirebaseApp;

export const fbInit = () => {
  app = initializeApp(firebaseConfig);
};

export const fetchDataFromFS = async () => {
  const db = getFirestore();
  const query = collection(db, "creatorData");
  const dataSnapshot = await getDocs(query);
  const dataList = dataSnapshot.docs.map((doc) => doc.data());

  if (dataList) {
    return dataList;
  } else {
    return null;
  }
};

export const getCurrentLogedInUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (user) {
    return user;
  } else {
    return user;
  }
};

export const registerUserInFirebase = async (
  displayName: string,
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getAuth();
  const createUserResponse = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const newUser: User = {
    ...createUserResponse.user,
    displayName: displayName,
  };

  newUser.email;

  await updateCurrentUser(auth, newUser);
  return createUserResponse;
};

export const logInToFirebase = async (email: string, password: string): Promise<UserCredential | undefined> => {
  const auth = getAuth();

  try {
      const credentialUser = await signInWithEmailAndPassword(auth, email, password);
      return credentialUser;
  } catch (error) {
    console.log('TAG error: ', error);
    
      return undefined;
  };
};
