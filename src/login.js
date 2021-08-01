import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider, onAuthStateChanged, signOut
} from "firebase/auth";
import { FireBaseManager } from "./FirebaseManager";

/*-------------------------------Generate log in page ------------------------------ */
const createLoginPage = (() => {
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('loginSignUpContainer', 'active');

    const loginContainerContent =
        `<div class='imageContainer'>
                    <img src="./Image/todoImage.svg" alt="">
                </div>

                <div class='allInputsContainer' action="">
                    <div class="brandHeader">
                        <div class="brandName"><span>T</span>
                            <span class="material-icons">
                                task_alt
                            </span>
                            <span>DO</span>
                            <span class="material-icons">
                                sentiment_very_satisfied
                            </span>
                        </div>

                        <h2>Organize your life!</h2>
                    </div>

                    <form class='logInInputContainer active'>
                        <div class='emailpassInput'>
                            <label for="emailSigninInput">Email</label>
                            <input type="email" name="emailSigninInput" id="emailSigninInput" required>
                        </div>

                        <div class='emailpassInput'>
                            <label for="passwordSigninInput">Password</label>
                            <input type="password" name="passwordSigninInput" id="passwordSigninInput" required>
                        </div>

                        <div class='signInUpButtons'><button id='signInButton'><span>Sign In</span></button>
                            <button id='signUpButton' type="button"><span></span>Sign Up</button>
                        </div>

                        <div class='or'>-OR-</div>

                        <div class='logInWithGGDemoContainer'>
                            <button id='loginGoogleButton' type="button"><span>Sign In With Google</span></button>
                            <button id='loginDemoButton' type="button"><span>Sign In With Demo</span></button>
                        </div>
                    </form>

                    <form action="" class="signUpContainer">
                        <div class='emailpassInput'>
                            <label for="emailSignup">Signup Email</label>
                            <input type="emailSignup" name="emailSignup" id="emailSignup" required>
                        </div>

                        <div class='emailpassInput'>
                            <label for="passwordSignUp">Password</label>
                            <input type="password" name="passwordSignUp" id="passwordSignUp" required>
                        </div>

                        <div class='emailpassInput'>
                            <label for="passwordConfirm">Confirm Password</label>
                            <input type="password" name="passwordConfirm" id="passwordConfirm" required>
                        </div>

                        <div class='signInUpButtons'><button id='confirmSignUpButton'>Confirm</button>
                            <button id='cancelSignUpButton' type="button">Cancel</button>
                        </div>
                    </form>
                </div>`;

    loginContainer.innerHTML = loginContainerContent;
    document.querySelector('body').append(loginContainer);
})()


/*-------------------------------Bind events with log in page ------------------------------ */
const bindEventWithLoginPage = (() => {
    const loginSignUpContainer = document.querySelector('.loginSignUpContainer');
    const appContainer = document.querySelector('.App');

    const signIn = (() => {
        const signInEmailPassButton = document.querySelector('#signInButton');
        const emailSigninInput = document.querySelector('#emailSigninInput');
        const passwordSigninInput = document.querySelector('#passwordSigninInput');

        const signInGoogleButton = document.querySelector('#loginGoogleButton');

        const signInDemoButton = document.querySelector('#loginDemoButton');

        const signOutButton = document.querySelector('#signOutButton');

        // -------------------Log in with Google ---------------------//
        signInGoogleButton.addEventListener('click', () => {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    console.log('Login with GG!')
                }).catch((error) => {
                    console.log(error.message);
                });
        })

        // -------------------Log in with Email + Password ---------------------//
        signInEmailPassButton.addEventListener('click', (event) => {
            event.preventDefault();
            const auth = getAuth();
            signInWithEmailAndPassword(auth, emailSigninInput.value, passwordSigninInput.value)
                .then((userCredential) => {
                    console.log('Login with email and password!')
                })
                .catch((error) => {
                    displayPassEmailErr();
                    setTimeout(clearShowingErrors, 3000);
                });
        })

        function displayPassEmailErr() {
            emailSigninInput.value = '';
            passwordSigninInput.value = '';
            emailSigninInput.placeholder = 'Invalid Email/Password';
            passwordSigninInput.placeholder = 'Invalid Email/Password';
        }

        function clearShowingErrors() {
            emailSigninInput.placeholder = '';
            passwordSigninInput.placeholder = '';
        }

        //--------------------Log in with Demo account, disable saving data ---------------------//
        signInDemoButton.addEventListener('click', (event) => {
            event.preventDefault();
            signInWithEmailAndPassword(auth, 'demoMail@gmail.com', 'demo123')
                .then((userCredential) => {
                    console.log('Login with Demo')
                })
                .catch((error) => {
                    console.log(error.message);
                });
        })

        signOutButton.addEventListener('click', () => {
            const auth = getAuth();
            signOut(auth).then(() => {
                appContainer.classList.remove('active');
                loginSignUpContainer.classList.add('active');
            }).catch((error) => {
                console.log(error.message)
            });
        })

        const auth = getAuth();
        onAuthStateChanged(auth,async (user) => {
            if (user) {
                loginSignUpContainer.classList.remove('active');
                appContainer.classList.add('active');
                const greetUserView = document.querySelector('#greetUser');
                const userEmail = user.email;
                const userName = userEmail.substring(0, userEmail.lastIndexOf('@'));
                greetUserView.innerText = 'Hi, ' + userName;
                await FireBaseManager.loadUserData(user);
            } else {
                // User is signed out
                // ...
            }
        })
    })()


    const signUp = (() => {
        const signUpButton = document.querySelector('#signUpButton');
        const signUpContainer = document.querySelector('.signUpContainer');
        const logInContainer = document.querySelector('.logInInputContainer');
        const cancelSignUpButton = document.querySelector('#cancelSignUpButton');

        function disPlayOneContainerAndTurnOffRest(displayContainer, ...turnOffContainers) {
            displayContainer.classList.add('active');
            turnOffContainers.forEach(container => container.classList.remove('active'));
        }

        signUpButton.addEventListener('click', () => {
            disPlayOneContainerAndTurnOffRest(signUpContainer, logInContainer);
            clearInputFields();
            showHintCreateAccount();
        })

        cancelSignUpButton.addEventListener('click', () => {
            disPlayOneContainerAndTurnOffRest(logInContainer, signUpContainer);
        })

        //Input values
        const signupEmailInput = document.querySelector('#emailSignup');
        const passwordSignupInput = document.querySelector('#passwordSignUp');
        const passwordConfirmInput = document.querySelector('#passwordConfirm');

        const confirmSignUpButton = document.querySelector('#confirmSignUpButton');
        confirmSignUpButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (passwordConfirmInput.value !== passwordSignupInput.value || passwordSignupInput.value.length < 6) {
                clearInputFields();
                showEmailPasswordError();
            }
            else {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, signupEmailInput.value, passwordSignupInput.value)
                    .then((userCredential) => {
                        clearInputFields();
                    })
                    .catch((error) => {
                        console.log(error.message);
                        showEmailPasswordError();
                    });
            }
        })

        const showEmailPasswordError = () => {
            signupEmailInput.placeholder = 'Email or password are not valid';
            passwordSignupInput.placeholder = 'Email or password are not valid';
            passwordConfirmInput.placeholder = 'Email or password are not valid';
        }

        const showHintCreateAccount = () => {
            signupEmailInput.placeholder = 'Example: demoMail@gmail.com';
            passwordSignupInput.placeholder = 'Must contain at least 6 characters';
            passwordConfirmInput.placeholder = 'Must contain at least 6 characters';
        }
        showHintCreateAccount();

        const clearInputFields = () => {
            signupEmailInput.value = '';
            passwordSignupInput.value = '';
            passwordConfirmInput.value = '';
        }
    })()
})()
