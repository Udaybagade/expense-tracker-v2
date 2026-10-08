const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/Html/login.html";
}

const messageBox = document.getElementById("message");
const categoryForm = document.getElementById("categoryForm");

categoryForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document
        .getElementById("categoryName")
        .value
        .trim();

    if (!name) {
        messageBox.style.color = "red";
        messageBox.innerText = "Please enter a category name.";
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:8080/api/categories",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add category");
        }

        messageBox.style.color = "green";
        messageBox.innerText =
            "Category Added Successfully ✔";

        categoryForm.reset();

        await loadCategories();

    } catch (error) {
        console.error("Error:", error);

        messageBox.style.color = "red";
        messageBox.innerText =
            "Failed To Add Category ❌";
    }
});


async function loadCategories() {

    try {
        const response = await fetch(
            "http://localhost:8080/api/categories",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to load categories");
        }

        const data = await response.json();

        const categoryList =
            document.getElementById("categories");

        categoryList.innerHTML = "";

        data.forEach(function (category) {

            const li = document.createElement("li");

            li.innerHTML = `
                <span>${category.name}</span>
                <strong>#${category.id}</strong>
            `;

            categoryList.appendChild(li);
        });

    } catch (error) {

        console.error("Error loading categories:", error);

        document.getElementById("categories").innerHTML =
            "<li>Unable To Load Categories</li>";
    }
}


loadCategories();