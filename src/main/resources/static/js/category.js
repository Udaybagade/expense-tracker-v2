document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");

    // CHECK LOGIN
    if (!token) {
        window.location.href = "/Html/login.html";
        return;
    }

    const messageBox = document.getElementById("message");
    const categoryForm = document.getElementById("categoryForm");
    const categoryList = document.getElementById("categories");

    // SHOW MESSAGE
    function showMessage(message, color) {
        if (messageBox) {
            messageBox.style.color = color;
            messageBox.textContent = message;
        }
    }

    // SEND API REQUEST
    async function apiRequest(url, options = {}) {

        const response = await fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                "Authorization": "Bearer " + token
            }
        });

        // HANDLE AUTHENTICATION ERRORS
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/Html/login.html";

            throw new Error("Session expired. Please log in again.");
        }

        return response;
    }

    // ADD CATEGORY
    if (categoryForm) {

        categoryForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            const categoryNameInput =
                document.getElementById("categoryName");

            const name = categoryNameInput.value.trim();

            if (!name) {
                showMessage(
                    "Please enter a category name.",
                    "red"
                );
                return;
            }

            const submitButton = categoryForm.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
            }

            try {

                const response = await apiRequest(
                    "/api/categories",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: name
                        })
                    }
                );

                if (!response.ok) {

                    const errorText = await response.text();

                    console.error(
                        "Add category failed:",
                        response.status,
                        errorText
                    );

                    throw new Error(
                        "Failed to add category. HTTP " +
                        response.status
                    );
                }

                showMessage(
                    "Category added successfully ✔",
                    "green"
                );

                categoryForm.reset();

                await loadCategories();

            } catch (error) {

                console.error("Error adding category:", error);

                if (error.message !==
                    "Session expired. Please log in again.") {

                    showMessage(
                        "Failed to add category. Please try again.",
                        "red"
                    );
                }
            } finally {

                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    }

    // LOAD CATEGORIES
    async function loadCategories() {

        if (!categoryList) {
            console.error("Category list element not found.");
            return;
        }

        try {

            const response = await apiRequest(
                "/api/categories",
                {
                    method: "GET"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load categories. HTTP " +
                    response.status
                );
            }

            const data = await response.json();

            categoryList.innerHTML = "";

            if (!Array.isArray(data) || data.length === 0) {

                const li = document.createElement("li");
                li.textContent = "No categories found.";

                categoryList.appendChild(li);
                return;
            }

            data.forEach(function (category) {

                const li = document.createElement("li");

                const nameSpan = document.createElement("span");
                nameSpan.textContent = category.name || "Unnamed Category";

                const idStrong = document.createElement("strong");
                idStrong.textContent = "#" + category.id;

                li.appendChild(nameSpan);
                li.appendChild(document.createTextNode(" "));
                li.appendChild(idStrong);

                categoryList.appendChild(li);
            });

        } catch (error) {

            console.error("Error loading categories:", error);

            categoryList.innerHTML = "";

            const li = document.createElement("li");
            li.textContent = "Unable to load categories.";

            categoryList.appendChild(li);
        }
    }

    // INITIAL LOAD
    loadCategories();

});