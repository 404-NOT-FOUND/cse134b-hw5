
(function() {
    var config = {
        apiKey: "AIzaSyDgNzcJS-zqj-I3yUUXJp7EXp-6Vd6XsOo",
        authDomain: "boardex-b8a9e.firebaseapp.com",
        databaseURL: "https://boardex-b8a9e.firebaseio.com",
        storageBucket: "boardex-b8a9e.appspot.com",
        messagingSenderId: "762957983152"
    };
    firebase.initializeApp(config);

    const auth = firebase.auth();

    const _email = document.getElementById("usr_email");
    const _password = document.getElementById("usr_password");
    const _passwordCheck = document.getElementById("usr_password_check");
    const _signupBtn = document.getElementById("signup_btn");

    _signupBtn.addEventListener('click', e => {
        const email = _email.value;
        const password = _password.value;
        const passwordCheck = _passwordCheck.value;

        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));

        promise.then(onFulfilled, onRejected);

        function onFulfilled(value) {
            document.location.href = 'index.html';
        }
        function onRejected(error) {
            alert(error.message);
        }
    });

}());

