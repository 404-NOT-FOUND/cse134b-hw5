
(function() {

const _email         = document.getElementById("usr_email");
const _password      = document.getElementById("usr_password");
const _passwordCheck = document.getElementById("usr_password_check");
const _signupBtn     = document.getElementById("signup_btn");
const _login         = document.getElementById("login");

_signupBtn.addEventListener('click', e => {
    const email         = _email.value;
    const password      = _password.value;
    const passwordCheck = _passwordCheck.value;

    var isPasswordMatched = password === passwordCheck;
    if(!isPasswordMatched) {
        alert('Passwords do not match.');
        return;
    }

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    promise.then(onFulfilled, onRejected);

    function onFulfilled(value) {

        if(location.search == '?newgame'){
            location.href = 'newgame.html';
        } else {
            location.href = 'index.html';
        }
    }
    function onRejected(error) {
        alert(error.message);
    }
});

_login.addEventListener('click', e => {
    location.href = 'login.html' + location.search;
});

}());

