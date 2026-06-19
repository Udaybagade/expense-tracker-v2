const token = localStorage.getItem("token");

if (!token) {
window.location.href = "/Html/login.html";
}

const messageBox =
document.getElementById("message");

document
.getElementById("categoryForm")
.addEventListener(
"submit",
async function(e){

```
e.preventDefault();

const name =
    document
    .getElementById("categoryName")
    .value
    .trim();

try{

    const response =
        await fetch(
        "http://localhost:8080/api/categories",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },

            body:JSON.stringify({
                name:name
            })
        });

    if(!response.ok){
        throw new Error("Failed");
    }

    messageBox.style.color="green";
    messageBox.innerText =
        "Category Added Successfully ✔";

    document
    .getElementById("categoryForm")
    .reset();

    loadCategories();

}catch(error){

    messageBox.style.color="red";
    messageBox.innerText =
        "Failed To Add Category ❌";

    console.error(error);
}
```

});

async function loadCategories(){

```
try{

    const response =
        await fetch(
        "http://localhost:8080/api/categories",
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });

    const data =
        await response.json();

    const categoryList =
        document.getElementById("categories");

    categoryList.innerHTML = "";

    data.forEach(category => {

        const li =
            document.createElement("li");

        li.innerHTML = `
            <span>${category.name}</span>
            <strong>#${category.id}</strong>
        `;

        categoryList.appendChild(li);
    });

}catch(error){

    console.error(error);

    document.getElementById(
        "categories"
    ).innerHTML =
    "<li>Unable To Load Categories</li>";
}
```

}

loadCategories();
