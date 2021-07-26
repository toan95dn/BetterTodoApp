
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged
} from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";

// -----------------Link with firebase---------------------//

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-KTkKoCLeTWTRKKkjo1kKPysbXhlYnWg",
    authDomain: "todo-95d7e.firebaseapp.com",
    projectId: "todo-95d7e",
    storageBucket: "todo-95d7e.appspot.com",
    messagingSenderId: "623348448816",
    appId: "1:623348448816:web:6b0a6a3a6e952ea9b3f7f5",
    measurementId: "G-L6T216RN91"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const signIn = (() => {
    const signInEmailPassButton = document.querySelector('#signInButton');
    const signInGoogleButton = document.querySelector('#loginGoogleButton');
    const signInDemoButton = document.querySelector('#loginDemoButton');

    signInGoogleButton.addEventListener('click', () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                console.log(error.message);
            });
    })

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    })

})()



















// -----------------------------------------------//
const createLogin = (() => {
    // const loginScreen = document.createElement('div');
    // loginScreen.classList.add('loginContainer');

    // loginScreen.innerHTML = `
    //     <div class='imageContainer'>
    //         <img src="/src/todoImage.svg" alt="">
    //     </div>


    //     <form class='signInForm' action="">
    //         <div class="brandName"><span>T</span>
    //             <span class="material-icons">
    //                 task_alt
    //             </span>
    //             <span>DO</span>
    //             <span class="material-icons">
    //                 sentiment_very_satisfied
    //             </span>
    //         </div>

    //         <h2>Organize your life!</h2>

    //         <div class='emailpassInput'>
    //             <label for="email">Email</label>
    //             <input type="email" name="email" id="email" required>
    //         </div>

    //         <div class='emailpassInput'>
    //             <label for="password">Password</label>
    //             <input type="password" name="password" id="password" required>
    //         </div>

    //         <div class='signInUpButtons'><button id='signInButton'><span>Sign In</span></button>
    //             <button id='signUpButton'><span></span>Sign Up</button>
    //         </div>

    //         <div class='or'>-OR-</div>

    //         <div class='logInWithGGDemoContainer'>
    //             <button id='loginGoogleButton'><span>Sign In With Google</span></button>
    //             <button id='loginDemoButton'><span>Sign In With Demo</span></button>
    //         </div>
    //     </form>
    //     `
    // document.querySelector('body').append(loginScreen);
})()


const addSignUpEvent = (() => {
    const signUpButton = document.querySelector('#signUpButton');
    const signUpContainer = document.querySelector('.signUpContainer');
    const logInContainer = document.querySelector('.logInInputContainer');
    const confirmSignUpButton = document.querySelector('#confirmSignUpButton');
    const cancelSignUpButton = document.querySelector('#cancelSignUpButton');
    const gobackButton = document.querySelector('#backButton');
    const thankYouForSignUpContainer = document.querySelector('.thanksMessage');

    function switchSignUpAndLogIn() {
        signUpContainer.classList.toggle('active');
        logInContainer.classList.toggle('active');
    }

    function disPlayOneContainerAndTurnOffRest(displayContainer, ...turnOffContainers) {
        displayContainer.classList.add('active');
        turnOffContainers.forEach(container => container.classList.remove('active'));
    }

    signUpButton.addEventListener('click', () => {
        disPlayOneContainerAndTurnOffRest(signUpContainer, logInContainer, thankYouForSignUpContainer);
    })

    cancelSignUpButton.addEventListener('click', () => {
        disPlayOneContainerAndTurnOffRest(logInContainer, signUpContainer, thankYouForSignUpContainer);
    })

    confirmSignUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        disPlayOneContainerAndTurnOffRest(thankYouForSignUpContainer, logInContainer, signUpContainer);
    })

    gobackButton.addEventListener('click', () => {
        disPlayOneContainerAndTurnOffRest(logInContainer, signUpContainer, thankYouForSignUpContainer);
    })

})()














export { createLogin }