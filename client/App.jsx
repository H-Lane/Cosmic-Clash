// Get the modals
var signInModal = document.getElementById("signInModal");
var signUpModal = document.getElementById("signUpModal");

// Get the buttons that open the modals
var signInBtn = document.getElementById("signInBtn");
var signUpBtn = document.getElementById("signUpBtn");

// Get the <span> elements that close the modals
var closeElements = document.getElementsByClassName("close");

// When the user clicks on the button, open the respective modal
signInBtn.onclick = function() {
    signInModal.style.display = "block";
}

signUpBtn.onclick = function() {
    signUpModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < closeElements.length; i++) {
    closeElements[i].onclick = function() {
        signInModal.style.display = "none";
        signUpModal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modals, close them
window.onclick = function(event) {
    if (event.target == signInModal) {
        signInModal.style.display = "none";
    }
    if (event.target == signUpModal) {
        signUpModal.style.display = "none";
    }
}

// Form submission event for Sign In
document.getElementById("signInForm").onsubmit = async function(event) {
    event.preventDefault();
    const username = document.getElementById("signInUsername").value;
    const password = document.getElementById("signInPassword").value;
// REPLACE  '/signin'  with actual route
    const response = await fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    alert(result.message);

    signInModal.style.display = "none";
}

// Form submission event for Sign Up
document.getElementById("signUpForm").onsubmit = async function(event) {
    event.preventDefault();
    const email = document.getElementById("signUpEmail").value;
    const username = document.getElementById("signUpUsername").value;
    const password = document.getElementById("signUpPassword").value;
// REPLACE  '/signup'  with actual route
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password })
    });

    const result = await response.json();
    alert(result.message);

    signUpModal.style.display = "none";
}