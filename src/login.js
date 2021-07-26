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
    const cancelSignUpButton = document.querySelector('#cancelSignUpButton');

    function switchSignUpAndLogIn() {
        signUpContainer.classList.toggle('active');
        logInContainer.classList.toggle('active');
    }

    signUpButton.addEventListener('click', () => {
        switchSignUpAndLogIn();
    })

    cancelSignUpButton.addEventListener('click', () => {
        switchSignUpAndLogIn();
    })

})()

export { createLogin }