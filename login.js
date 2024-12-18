document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("Username");
    const passwordInput = document.getElementById("Password");
    const rememberMeCheckbox = document.getElementById("rememberMe");

    const forgotPasswordLink = document.querySelector(".forgot-password");
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            const email = prompt("Enter your email to reset the password:");
            if (email) {
                alert(`A password reset link has been sent to ${email}.`);
            } else {
                alert("Email is required to reset the password.");
            }
        });
    }

    const continueLink = document.querySelector(".continue-link");
    if (continueLink) {
        continueLink.addEventListener("click", () => {
            alert("Continuing as a guest...");
            window.location.href = "index.html"; 
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = usernameInput?.value.trim();
            const password = passwordInput?.value.trim();

            if (!username || !password) {
                alert("Please enter both username and password.");
                return;
            }

            if (username === "admin" && password === "1234") {
                alert("Login successful! Redirecting to your news feed...");
                if (rememberMeCheckbox?.checked) {
                    localStorage.setItem("username", username);
                }
                window.location.href = "index.html";
            } else {
                alert("Invalid username or password. Please try again.");
            }
        });
    }

    const savedUsername = localStorage.getItem("username");
    if (savedUsername && usernameInput) {
        usernameInput.value = savedUsername;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }
});

const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    if (username === "admin" && password === "password") {
        res.send("Login successful!");
    } else {
        res.send("Invalid credentials");
    }
});

app.post("/reset-password", (req, res) => {
    const { email } = req.body;
    
    res.send(`Password reset instructions sent to ${email}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
