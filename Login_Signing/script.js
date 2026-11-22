function showSignup() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("signupForm").classList.remove("hidden");
    document.getElementById("forgotForm").classList.add("hidden");
    clearMessage();
}

function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("forgotForm").classList.add("hidden");
    clearMessage();
}

function showForgot() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("forgotForm").classList.remove("hidden");
    clearMessage();
}

// Signup
async function signup() {
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    console.log("HELLO");

    if(name === "" || email === "" || password === "") {
        showMessage("All fields are required!", true);
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {
        const response = await fetch('signup.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        showMessage(data.message, !data.success);
        if (data.success) {
            showLogin();
        }
    } catch (error) {
        showMessage("Error: " + error.message, true);
    }
}

// Login
async function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    console.log("HELLO wefew");
    if(email === "" || password === "") {
        showMessage("Email and password required!", true);
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log("data", data);
        showMessage(data.message, !data.success);
        console.log("AFTER", data);
        if (data.success) {
            console.log("Redirecting to:", data.redirect);
            if (data.redirect) {
                setTimeout(() => {
                    window.location.href = `./${data.redirect}`;
                }, 1500); // 1.5s delay to see message
            } else {
                console.log("No redirect field");
            }
        }
    } catch (error) {
        showMessage("Error: " + error.message, true);
    }
}

// Forgot Password
async function resetPassword() {
    let email = document.getElementById("forgotEmail").value;

    if(email === "") {
        showMessage("Email required!", true);
        return;
    }

    const formData = new FormData();
    formData.append('email', email);

    try {
        const response = await fetch('reset.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        showMessage(data.message, !data.success);
    } catch (error) {
        showMessage("Error: " + error.message, true);
    }
}

function showMessage(msg, isError = false) {
    let message = document.getElementById("message");
    console.log("message", message);
    message.innerText = msg;
    message.className = isError ? "message error" : "message";
}

function clearMessage() {
    document.getElementById("message").innerText = "";
}
