
(function() {
    const auth = firebase.auth();

    const _email = document.getElementById("usr_email");
    const _password = document.getElementById("usr_password");
    const _passwordCheck = document.getElementById("usr_password_check");
    const _signupBtn = document.getElementById("signup_btn");
    const _login = document.getElementById("login");

    console.log(window.location.search);

    _signupBtn.addEventListener('click', e => {
        const email = _email.value;
        const password = _password.value;
        const passwordCheck = _passwordCheck.value;

        var matchPassword = false;
        if(password === passwordCheck) {
            matchPassword = true;
        } else {
            matchPassword = false;
            alert('Passwords do not match.')
        }

        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
        promise.then(onFulfilled, onRejected);

        if( matchPassword == true ) {
            const promise = auth.createUserWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));

            promise.then(onFulfilled, onRejected);

            function onFulfilled(value) {
                args = parseArgs();
                if (!args.hasOwnProperty('from')) {
                    location.href = 'index.html';
                } else if(args['from'] === 'editgame') {
                    location.href = 'editgame.html';
                }
            }
            function onRejected(error) {
                alert(error.message);
            }
        }
        
    });

    _login.addEventListener('click', e => {
        document.location.href = 'login.html' + window.location.search;
    });

}());

