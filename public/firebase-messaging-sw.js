// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCday__mljljrK1PPftyGPMvdsUWWjlKAA",
  authDomain: "cabo-backend-f8715.firebaseapp.com",
  databaseURL:
    "https://cabo-backend-f8715-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cabo-backend-f8715",
  storageBucket: "cabo-backend-f8715.appspot.com",
  messagingSenderId: "525461582701",
  appId: "1:525461582701:web:4e10f289bc96082348a064",
  measurementId: "G-29PY9M25SH",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
