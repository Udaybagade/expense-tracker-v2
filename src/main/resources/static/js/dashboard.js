document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");

    // CHECK LOGIN
    if (!token) {
        window.location.href = "/Html/login.html";
        return;
    }

    // PARSE JWT
    function parseJwt(token) {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url
                .replace(/-/g, "+")
                .replace(/_/g, "/");

            return JSON.parse(
                decodeURIComponent(
                    atob(base64)
                        .split("")
                        .map(c =>
                            "%" +
                            ("00" + c.charCodeAt(0).toString(16))
                                .slice(-2)
                        )
                        .join("")
                )
            );
        } catch (error) {
            return null;
        }
    }

    const payload = parseJwt(token);

    const headerActions =
        document.getElementById("headerActions");

    const footerActions =
        document.getElementById("footerActions");

    let allExpenses = [];
    let showingAll = false;

    // HANDLE API ERRORS
    async function fetchData(url) {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/Html/login.html";
            throw new Error("Session expired. Please log in again.");
        }

        if (!response.ok) {
            throw new Error(
                "Request failed: " +
                response.status +
                " - " +
                url
            );
        }

        return response.json();
    }

    // SHOW USER
    if (payload && payload.sub && headerActions) {
        const userBox = document.createElement("div");
        userBox.textContent = "👤 " + payload.sub;
        headerActions.appendChild(userBox);
    }

    // LOGOUT BUTTON
    if (footerActions) {
        const logoutBtn = document.createElement("button");
        logoutBtn.textContent = "🚪 Logout";

        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("token");
            window.location.href = "/Html/login.html";
        });

        footerActions.appendChild(logoutBtn);
    }

    // TOTAL EXPENSE
    fetchData("/api/expenses/total")
        .then(total => {
            const totalElement =
                document.getElementById("totalExpense");

            if (totalElement) {
                totalElement.textContent = "₹ " + total;
            }
        })
        .catch(error => {
            console.error("Error loading total expense:", error);
        });

    // TOTAL CATEGORIES
    fetchData("/api/categories")
        .then(categories => {
            const categoryElement =
                document.getElementById("totalCategories");

            if (categoryElement) {
                categoryElement.textContent =
                    Array.isArray(categories)
                        ? categories.length
                        : 0;
            }
        })
        .catch(error => {
            console.error("Error loading categories:", error);
        });

    // LOAD EXPENSES
    fetchData("/api/expenses")
        .then(expenses => {
            if (!Array.isArray(expenses)) {
                throw new Error("Unexpected expenses response.");
            }

            allExpenses = expenses;

            const countElement =
                document.getElementById("expenseCount");

            if (countElement) {
                countElement.textContent = expenses.length;
            }

            // CURRENT MONTH'S EXPENSES
            const now = new Date();

            const monthly = expenses
                .filter(e => {
                    if (!e.expenseDate) {
                        return false;
                    }

                    // Use the date portion to avoid timezone shifts.
                    const datePart = String(e.expenseDate).slice(0, 10);
                    const parts = datePart.split("-");

                    if (parts.length !== 3) {
                        return false;
                    }

                    const year = Number(parts[0]);
                    const month = Number(parts[1]);

                    return year === now.getFullYear() &&
                           month === now.getMonth() + 1;
                })
                .reduce((sum, e) => {
                    return sum + (Number(e.amount) || 0);
                }, 0);

            const monthlyElement =
                document.getElementById("monthlyExpense");

            if (monthlyElement) {
                monthlyElement.textContent =
                    "₹ " + monthly.toFixed(2);
            }

            renderExpenses(allExpenses.slice(0, 5));
        })
        .catch(error => {
            console.error("Error loading expenses:", error);
        });

    // DISPLAY EXPENSES
    function renderExpenses(list) {
        const recentList =
            document.getElementById("recentList");

        if (!recentList) {
            return;
        }

        if (!list.length) {
            recentList.textContent = "No expenses found.";
            return;
        }

        recentList.innerHTML = "";

        list.forEach(e => {
            const item = document.createElement("div");
            const title = document.createElement("strong");
            const details = document.createElement("small");

            title.textContent =
                (e.title || "Untitled Expense") +
                " - ₹" +
                (Number(e.amount) || 0).toFixed(2);

            details.textContent =
                "📂 " +
                (e.category?.name || "No Category") +
                " | 📅 " +
                (e.expenseDate || "No Date");

            item.appendChild(title);
            item.appendChild(document.createElement("br"));
            item.appendChild(details);

            recentList.appendChild(item);
        });
    }

    // VIEW ALL / SHOW LESS
    const toggleBtn = document.getElementById("toggleBtn");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            if (!showingAll) {
                renderExpenses(allExpenses);
                toggleBtn.textContent = "Show Less";
            } else {
                renderExpenses(allExpenses.slice(0, 5));
                toggleBtn.textContent = "View All Activities";
            }

            showingAll = !showingAll;
        });
    }

});