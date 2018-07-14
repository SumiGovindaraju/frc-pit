import firebase from 'firebase/app';

export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: 'AIzaSyBbB47QbfJXsEViiCqwYUjWQLw0KNpROCc',
            authDomain: 'frc-pit-5cb1f.firebaseapp.com',
            databaseURL: "https://frc-pit-5cb1f.firebaseio.com",
            projectId: "frc-pit-5cb1f"
        });
    }
}