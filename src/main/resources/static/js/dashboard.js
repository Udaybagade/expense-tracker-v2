document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/Html/login.html";
        return;
    }

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
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

    // USER
    if (payload && payload.sub) {
        const userBox = document.createElement("div");
        userBox.innerHTML = "👤 " + payload.sub;
        headerActions.appendChild(userBox);
    }

    // LOGOUT
    const logoutBtn = document.createElement("button");
    logoutBtn.innerText = "🚪 Logout";

    logoutBtn.onclick = function () {
        localStorage.removeItem("token");
        window.location.href = "/Html/login.html";
    };

    footerActions.appendChild(logoutBtn);

    // TOTAL EXPENSE
    fetch("http://localhost:8080/api/expenses/total", {
        headers: { Authorization: "Bearer " + token }
    })
    .then(res => res.json())
    .then(total => {
        document.getElementById("totalExpense").innerText = "₹ " + total;
    });

    // CATEGORIES
    fetch("http://localhost:8080/api/categories", {
        headers: { Authorization: "Bearer " + token }
    })
    .then(res => res.json())
    .then(categories => {
        document.getElementById("totalCategories").innerText = categories.length;
    });

    // EXPENSES
    fetch("http://localhost:8080/api/expenses", {
        headers: { Authorization: "Bearer " + token }
    })
    .then(res => res.json())
    .then(expenses => {

        allExpenses = expenses;

        document.getElementById("expenseCount").innerText =
            expenses.length;

        // MONTHLY
        const now = new Date();

        const monthly = expenses
            .filter(e => {
                const d = new Date(e.expenseDate);
                return d.getMonth() === now.getMonth() &&
                       d.getFullYear() === now.getFullYear();
            })
            .reduce((sum, e) => sum + Number(e.amount), 0);

        document.getElementById("monthlyExpense").innerText =
            "₹ " + monthly.toFixed(2);

        renderExpenses(expenses.slice(0, 5));
    });

    // RENDER
    function renderExpenses(list) {

        const recentList = document.getElementById("recentList");

        if (!list.length) {
            recentList.innerHTML = "<p>No expenses found</p>";
            return;
        }

        recentList.innerHTML = list.map(e => `
            <div>
                <strong>${e.title}</strong> - ₹${e.amount}
                <br>
                <small>
                    📂 ${e.category?.name || "No Category"} |
                    📅 ${e.expenseDate}
                </small>
            </div>
        `).join("");
    }

    // TOGGLE BUTTON
    document.getElementById("toggleBtn").addEventListener("click", function () {

        const btn = document.getElementById("toggleBtn");

        if (!showingAll) {
            renderExpenses(allExpenses);
            btn.innerText = "Show Less";
        } else {
            renderExpenses(allExpenses.slice(0, 5));
            btn.innerText = "View All Activities";
        }

        showingAll = !showingAll;
    });

});