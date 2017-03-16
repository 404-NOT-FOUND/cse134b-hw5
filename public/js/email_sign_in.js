
(function() {

// Get elements
const _email         = document.getElementById('usr_email');
const _password      = document.getElementById('usr_pwd');
const _loginBtn      = document.getElementById('login_btn');
const _signupBtn     = document.getElementById('signup_btn');
const _emailAlert    = document.getElementById('emailAlert');
const _passwordAlert = document.getElementById('passwordAlert');

function checkEmail(email) {
    atpos =  email.indexOf('@');
    dotpos = email.lastIndexOf('.');

    if (atpos<1 || dotpos-atpos<2) {
        return false;
    } else {
        return true;
    }
}

// when loginBtn is clicked, collect user info
_loginBtn.addEventListener('click', e => {
    const email    = _email.value;
    const password = _password.value;

    const promise  = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));

    promise.then(onFulfilled, onRejected);

    function onFulfilled(value) {
        console.log('succesfully logged in');
    }
    function onRejected(error) {
        _emailAlert.classList.add('hide');
        _passwordAlert.classList.add('hide');

        if (!checkEmail(email)){
            _emailAlert.classList.remove('hide');
        } else if (error.message = "The password is invalid or the user does not have a password.") {
            _passwordAlert.classList.remove('hide');
        } 
    }
});

_signupBtn.addEventListener('click', e => {
    document.location.href = 'signup.html' + window.location.search;
});

}());

