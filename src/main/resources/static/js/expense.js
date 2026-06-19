const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/Html/login.html";
}

const categoryDropdown = document.getElementById("categoryId");

/* =========================
   LOAD CATEGORIES DROPDOWN
========================= */
async function loadCategories() {
    try {
        const response = await fetch("http://localhost:8080/api/categories", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const categories = await response.json();

        categoryDropdown.innerHTML =
            `<option value="">Select Category</option>`;

        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            categoryDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading categories:", error);
        categoryDropdown.innerHTML =
            `<option value="">Failed to load categories</option>`;
    }
}

loadCategories();

/* =========================
   SUBMIT EXPENSE
========================= */
document.getElementById("expenseForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const messageBox = document.getElementById("message");

    const expense = {
        title: document.getElementById("title").value.trim(),
        amount: parseFloat(document.getElementById("amount").value),
        expenseDate: document.getElementById("date").value,
        description: document.getElementById("description").value.trim(),
        categoryId: parseInt(categoryDropdown.value)
    };

    try {
        const response = await fetch("http://localhost:8080/api/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            throw new Error("Failed to save expense");
        }

        messageBox.className = "message success";
        messageBox.innerText = "Expense Saved Successfully ✔";

        setTimeout(() => {
            window.location.href = "/Html/expense.html";
        }, 1000);

    } catch (error) {
        console.error(error);

        messageBox.className = "message error";
        messageBox.innerText = "Unable to save expense ❌";
    }
});