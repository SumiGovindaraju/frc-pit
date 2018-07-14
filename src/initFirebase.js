import firebase from 'firebase/app';

export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: 'AIzaSyBz37G6A-g7ewkBwjrHEfueHGH4XDZwefI',
            authDomain: 'frc-pit-dev.firebaseapp.com',
            databaseURL: "https://frc-pit-dev.firebaseio.com",
            projectId: "frc-pit-dev"
        });
    }
}