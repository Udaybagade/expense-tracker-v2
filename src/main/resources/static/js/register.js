document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");
    const messageBox = document.getElementById("message");

    if (!form || !messageBox) {
        console.error("Registration form or message box not found.");
        return;
    }

    // DISPLAY FIELD ERRORS SAFELY
    function showFieldError(id, message) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = message;
        }
    }

    // DISPLAY GENERAL MESSAGE
    function showMessage(message, color) {
        messageBox.style.color = color;
        messageBox.textContent = message;
    }

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        // CLEAR OLD ERRORS
        showFieldError("nameError", "");
        showFieldError("emailError", "");
        showFieldError("passwordError", "");
        showMessage("", "red");

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        let valid = true;

        // NAME VALIDATION
        if (name === "") {
            showFieldError("nameError", "Name is required");
            valid = false;
        }

        // EMAIL VALIDATION
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            showFieldError("emailError", "Email is required");
            valid = false;
        } else if (!emailPattern.test(email)) {
            showFieldError(
                "emailError",
                "Please enter a valid email address"
            );
            valid = false;
        }

        // PASSWORD VALIDATION
        if (password.length < 6) {
            showFieldError(
                "passwordError",
                "Password must contain at least 6 characters"
            );
            valid = false;
        }

        if (!valid) {
            return;
        }

        // PREVENT DUPLICATE SUBMISSIONS
        const submitButton = form.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {

            // RELATIVE URL WORKS ON RENDER AND LOCALLY
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const responseText = await response.text();

            if (!response.ok) {
                console.error(
                    "Registration failed:",
                    response.status,
                    responseText
                );

                if (response.status === 409) {
                    throw new Error(
                        "This email may already be registered."
                    );
                }

                throw new Error(
                    responseText ||
                    "Registration failed. HTTP " + response.status
                );
            }

            showMessage(
                "Registration successful! Redirecting to login...",
                "green"
            );

            form.reset();

            setTimeout(function () {
                window.location.href = "/Html/login.html";
            }, 1500);

        } catch (error) {

            console.error("Registration error:", error);

            if (error instanceof TypeError) {
                showMessage(
                    "Unable to connect to the server. Please try again.",
                    "red"
                );
            } else {
                showMessage(
                    error.message || "Registration failed.",
                    "red"
                );
            }

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });

});