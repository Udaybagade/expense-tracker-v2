const loginForm =
document.getElementById("loginForm");

const messageBox =
document.getElementById("message");

loginForm.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    try{

        const response =
        await fetch(
        "http://localhost:8080/api/auth/login",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email:email,
                password:password
            })
        });

        if(!response.ok){
            throw new Error("Invalid Credentials");
        }

        const data =
        await response.json();

        localStorage.setItem(
        "token",
        data.token
        );

        messageBox.style.color =
        "green";

        messageBox.innerText =
        "Login Successful ✔";

        setTimeout(() => {

            window.location.href =
            "dashboard.html";

        },1000);

    }
    catch(error){

        console.error(error);

        messageBox.style.color =
        "red";

        messageBox.innerText =
        "Invalid Email or Password ❌";
    }
});