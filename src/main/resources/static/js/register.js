const form =
document.getElementById("registerForm");

const messageBox =
document.getElementById("message");

form.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    messageBox.innerText = "";

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value;

    let valid = true;

    if(name === ""){
        document.getElementById("nameError")
        .innerText = "Name is required";
        valid = false;
    }

    if(email === ""){
        document.getElementById("emailError")
        .innerText = "Email is required";
        valid = false;
    }

    if(password.length < 6){
        document.getElementById("passwordError")
        .innerText =
        "Password must contain at least 6 characters";
        valid = false;
    }

    if(!valid){
        return;
    }

    try{

        const response =
        await fetch(
        "http://localhost:8080/api/auth",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                name:name,
                email:email,
                password:password
            })
        });

        const data =
        await response.text();

        if(!response.ok){
            throw new Error(data);
        }

        messageBox.style.color = "green";
        messageBox.innerText =
        "Registration Successful ✔";

        setTimeout(() => {

            window.location.href =
            "login.html";

        }, 1500);

    }
    catch(error){

        messageBox.style.color = "red";

        messageBox.innerText =
        error.message || "Registration Failed ❌";
    }
});