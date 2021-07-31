const PageManager = (() => {
    const loginContainer = document.createElement('div');

    const createLoginPage = () => {
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
    }

    const clearLoginPage = () => {
        loginContainer.remove();
    }

    return { createLoginPage, clearLoginPage }
})()

export { PageManager }