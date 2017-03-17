
(function() {

const _email          = document.getElementById("usr_email");
const _password       = document.getElementById("usr_password");
const _passwordCheck  = document.getElementById("usr_password_check");
const _signupBtn      = document.getElementById("signup_btn");
const _login          = document.getElementById("login");
const _emailAlert     = document.getElementById('emailAlert');
const _duplicateAlert = document.getElementById('duplicateAlert');
const _passwordAlert  = document.getElementById('passwordAlert');
const _matchAlert     = document.getElementById('matchAlert');


function checkEmail(email) {
    atpos =  email.indexOf('@');
    dotpos = email.lastIndexOf('.');

    if (atpos<1 || dotpos-atpos<2) {
        return false;
    } else {
        return true;
    }
}

_signupBtn.addEventListener('click', e => {
    const email         = _email.value;
    const password      = _password.value;
    const passwordCheck = _passwordCheck.value;

    _emailAlert.classList.add('hide');
    _passwordAlert.classList.add('hide');
    _matchAlert.classList.add('hide');
    _duplicateAlert.classList.add('hide');

    var isEmailValid = checkEmail(email);
    var isPasswordValid = password.length >= 6;
    var isPasswordMatched = password === passwordCheck;
    console.log(isPasswordValid);

    if (!isEmailValid){
        _emailAlert.classList.remove('hide');
    } else if (!isPasswordValid) {
        _passwordAlert.classList.remove('hide');
    } else if(!isPasswordMatched) {
        _matchAlert.classList.remove('hide');
        return;
    }

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    promise.then(onFulfilled, onRejected);
    
    function onFulfilled(value) {
        console.log('succesfully signed up');
    }
    function onRejected(error) {
        //alert(error.message);

        if (error.message == "The email address is already in use by another account." &&
            isEmailValid && isPasswordValid && isPasswordMatched) {
             _duplicateAlert.classList.remove('hide');
        }
        
    }

    
   
});

_login.addEventListener('click', e => {
    location.href = 'login.html' + location.search;
});

}());



