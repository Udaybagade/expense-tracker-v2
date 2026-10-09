const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error("Invalid Credentials");
        }

        const data = await response.json();

        if (!data.token) {
            throw new Error("Login response does not contain a token");
        }

        localStorage.setItem("token", data.token);

        messageBox.style.color = "green";
        messageBox.innerText = "Login Successful ✔";

        setTimeout(() => {
            window.location.href = "/Html/dashboard.html";
        }, 1000);

    } catch (error) {
        console.error("Login error:", error);

        messageBox.style.color = "red";
        messageBox.innerText =
            error.message === "Invalid Credentials"
                ? "Invalid Email or Password ❌"
                : "Login failed. Please try again.";
    }
});