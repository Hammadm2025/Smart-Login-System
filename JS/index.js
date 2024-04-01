var signupNameInput = document.getElementById("signupName");
var signupEmailInput = document.getElementById("signupEmail");
var signupPasswordInput = document.getElementById("signupPassword");
var signUpBtn = document.getElementById("signUpBtn");
var signinEmailInput = document.getElementById("signinEmail");
var signinPasswordInput = document.getElementById("signinPassword");

var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);
// Check if input is empty or Full
function isEmpty() {
    if (signupNameInput.value == "" || signupEmailInput.value == "" || signupPasswordInput.value == "") {
        return true;
    } else {
        return false;
    }
}

// Signup array
var signupArray = [];
if (localStorage.getItem("usersName") == null) {
    signupArray = [];
} else {
    signupArray = JSON.parse(localStorage.getItem("usersName"));
}

// Signup Function
function signup() {
    if (isEmpty()) {
        document.getElementById("exist").innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    // Check if email exists
    if (mailExist()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return;
    }

    // Create new user object
    var newUser = {
        name: signupNameInput.value,
        email: signupEmailInput.value,
        password: signupPasswordInput.value
    };

    // Add the new user to the array
    signupArray.push(newUser);

    // Store the updated array in local storage
    localStorage.setItem('usersName', JSON.stringify(signupArray));

    // Display success message
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
}

// Check if email already exists
function mailExist() {
    for (var i = 0; i < signupArray.length; i++) {
        if (signupArray[i].email.toLowerCase() === signupEmailInput.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}



// login Check
// check input login
function loginEmpty(){
    if (signinEmailInput.value == "" || signinPasswordInput.value == "") {
        return false;
    } else {
        return true;
    }
}

function login(){
    if (loginEmpty() == false){
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
        console.log("add");
    }
    var email = signinEmailInput.value;
    var password = signinPasswordInput.value;
    var foundUser = false;
    for (var i = 0; i < signupArray.length; i++) {
        if (signupArray[i].email.toLowerCase() == email.toLowerCase() && signupArray[i].password.toLowerCase() == password.toLowerCase()) {
            foundUser = true;
            localStorage.setItem('info', signupArray[i].name);
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html');
            } else {
                location.replace(baseURL + '/home.html');
            }
            break; // Exit the loop once a matching user is found
        }
    }
    
    if (!foundUser) {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>';
    }
    
}




// when login
var username = localStorage.getItem('info')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}


// for logout
function logout() {
    localStorage.removeItem('info')
}



