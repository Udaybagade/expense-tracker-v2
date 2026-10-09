document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");

    // CHECK LOGIN
    if (!token) {
        window.location.href = "/Html/login.html";
        return;
    }

    const categoryDropdown =
        document.getElementById("categoryId");

    const expenseForm =
        document.getElementById("expenseForm");

    const messageBox =
        document.getElementById("message");

    // HANDLE API RESPONSES
    async function apiRequest(url, options = {}) {

        const response = await fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                "Authorization": "Bearer " + token
            }
        });

        if (response.status === 401 ||
            response.status === 403) {

            localStorage.removeItem("token");
            window.location.href = "/Html/login.html";

            throw new Error("Session expired. Please log in again.");
        }

        return response;
    }

    // SHOW MESSAGE
    function showMessage(message, type) {
        if (!messageBox) {
            return;
        }

        messageBox.className = "message " + type;
        messageBox.textContent = message;
    }

    // LOAD CATEGORIES DROPDOWN
    async function loadCategories() {

        if (!categoryDropdown) {
            console.error("Category dropdown not found.");
            return;
        }

        categoryDropdown.innerHTML =
            '<option value="">Loading categories...</option>';

        try {
            const response = await apiRequest(
                "/api/categories",
                {
                    method: "GET"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Unable to load categories. HTTP " +
                    response.status
                );
            }

            const categories = await response.json();

            categoryDropdown.innerHTML =
                '<option value="">Select Category</option>';

            if (!Array.isArray(categories) ||
                categories.length === 0) {

                categoryDropdown.innerHTML =
                    '<option value="">No categories available</option>';

                return;
            }

            categories.forEach(function (cat) {

                const option = document.createElement("option");

                option.value = cat.id;
                option.textContent = cat.name;

                categoryDropdown.appendChild(option);
            });

        } catch (error) {
            console.error("Error loading categories:", error);

            categoryDropdown.innerHTML =
                '<option value="">Failed to load categories</option>';

            showMessage(
                "Could not load categories. Please refresh the page.",
                "error"
            );
        }
    }

    // SUBMIT EXPENSE
    if (expenseForm) {

        expenseForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();

                const title =
                    document.getElementById("title").value.trim();

                const amount =
                    Number(document.getElementById("amount").value);

                const expenseDate =
                    document.getElementById("date").value;

                const description =
                    document.getElementById("description").value.trim();

                const categoryId =
                    Number(categoryDropdown.value);

                // VALIDATION
                if (!title) {
                    showMessage(
                        "Please enter an expense title.",
                        "error"
                    );
                    return;
                }

                if (!Number.isFinite(amount) || amount <= 0) {
                    showMessage(
                        "Please enter a valid amount greater than zero.",
                        "error"
                    );
                    return;
                }

                if (!expenseDate) {
                    showMessage(
                        "Please select an expense date.",
                        "error"
                    );
                    return;
                }

                if (!categoryDropdown.value ||
                    !Number.isInteger(categoryId)) {

                    showMessage(
                        "Please select a category.",
                        "error"
                    );
                    return;
                }

                const expense = {
                    title: title,
                    amount: amount,
                    expenseDate: expenseDate,
                    description: description,
                    categoryId: categoryId
                };

                // PREVENT DUPLICATE SUBMISSIONS
                const submitButton =
                    expenseForm.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );

                if (submitButton) {
                    submitButton.disabled = true;
                }

                try {

                    const response = await apiRequest(
                        "/api/expenses",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(expense)
                        }
                    );

                    if (!response.ok) {

                        const errorText = await response.text();

                        console.error(
                            "Save expense failed:",
                            response.status,
                            errorText
                        );

                        throw new Error(
                            "Unable to save expense. HTTP " +
                            response.status
                        );
                    }

                    showMessage(
                        "Expense saved successfully ✔",
                        "success"
                    );

                    expenseForm.reset();

                    // RELOAD THE EXPENSE PAGE
                    setTimeout(function () {
                        window.location.href = "/Html/expense.html";
                    }, 1000);

                } catch (error) {

                    console.error("Error saving expense:", error);

                    showMessage(
                        error.message ===
                        "Session expired. Please log in again."
                            ? error.message
                            : "Unable to save expense. Please try again.",
                        "error"
                    );

                } finally {

                    if (submitButton) {
                        submitButton.disabled = false;
                    }
                }
            }
        );
    }

    // INITIALIZE
    loadCategories();

});