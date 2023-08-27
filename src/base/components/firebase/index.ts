// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCday__mljljrK1PPftyGPMvdsUWWjlKAA",
  authDomain: "cabo-backend-f8715.firebaseapp.com",
  databaseURL:
    "https://cabo-backend-f8715-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cabo-backend-f8715",
  storageBucket: "cabo-backend-f8715.appspot.com",
  messagingSenderId: "525461582701",
  appId: "1:525461582701:web:4e10f289bc96082348a064",
  measurementId: "G-29PY9M25SH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

export async function requestPermission() {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BCk1Yk3Xtei1x7kCKRICf3b3bCseU69mM96BbrxNQ9lxbBPKqWbgLiAmzoShOPbbQGh-BvXSrq8dBuwpJdvGzVo",
    });

    if (currentToken) {
      console.log("currentToken: ", currentToken);
    } else {
      console.log("faild!!");
    }

    return currentToken;
  } else {
    console.log("Denied!!");
  }
}

// requestPermission();

// export const getMessagingToken = async () => {
//   const token = await getToken(messaging, {
//     vapidKey:
//       "BCk1Yk3Xtei1x7kCKRICf3b3bCseU69mM96BbrxNQ9lxbBPKqWbgLiAmzoShOPbbQGh-BvXSrq8dBuwpJdvGzVo",
//   });

//   return token;
// };

export const onMessageListener = () => {
  const messaging = getMessaging();
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("🚀 ~ file: index.ts:69 ~ payload:", payload);
      resolve(payload);
    });
  });
};
