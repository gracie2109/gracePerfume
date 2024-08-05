import { initializeApp } from "firebase/app";
import {getFirestore } from "@firebase/firestore";
import {
    getMessaging,
    getToken,
    isSupported,
    onMessage,
    type Messaging
} from "firebase/messaging";


export const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
});

const messaging = (await isSupported()) ? getMessaging() : false as Messaging | false;
export const requestForToken = () => {
    if(messaging){
        return getToken(messaging, {
            vapidKey: ``,
        })
            .then((currentToken) => {
                if (currentToken) {
                    return currentToken;
                    // Perform any other neccessary action with the token
                } else {
                    // Show permission request UI
                    console.log(
                        "No registration token available. Request permission to generate one."
                    );
                }
            })
            .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
            });
    }

};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
    messaging &&  new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

export const db = getFirestore(firebaseApp);

