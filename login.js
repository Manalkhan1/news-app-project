document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("Username");
    const passwordInput = document.getElementById("Password");
    const rememberMeCheckbox = document.getElementById("rememberMe");
  
  // "Forgot Password" functionality
    const forgotPasswordLink = document.querySelector(".forgot-password");
    forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        const email = prompt("Enter your email to reset the password:");
        if (email) {
            alert(A password reset link has been sent to ${email}.);
        } else {
            alert("Email is required to reset the password.");
        }
    });
  
    // Handle "Continue Without Login" click
    const continueLink = document.querySelector(".continue-link");
    continueLink.addEventListener("click", () => {
        alert("Continuing as a guest...");
        window.location.href = "index.html"; // Redirect to news feed
    });
  
    // Login form submission handling
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
  
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
  
        // Simulate login logic
        if (username === "admin" && password === "1234") {
            alert("Login successful! Redirecting to your news feed...");
            if (rememberMeCheckbox.checked) {
                localStorage.setItem("username", username);
            }
            window.location.href = "index.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
  
    // Auto-fill username if "Remember Me" is checked
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;

    }
    // server.js (Node.js example)
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Validate username and password here (e.g., check against database)
    if (username === 'admin' && password === 'password') {
        res.send('Login successful!');
    } else {
        res.send('Invalid credentials');
    }
});

// Handle forgot password POST request
app.post('/reset-password', (req, res) => {
    const { email } = req.body;
    // Process password reset logic here
    res.send(Password reset instructions sent to ${email});
});

app.listen(port, () => {
    console.log(Server running at http://localhost:${port});
});

  });