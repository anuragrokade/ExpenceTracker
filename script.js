const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

let expenses = {}; // To store expenses grouped by date

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value;

    if (!name || amount <= 0 || !date) {
        alert("Please fill in all fields with valid data!");
        return;
    }

    if (!expenses[date]) {
        expenses[date] = [];
    }
    expenses[date].push({ name, amount });

    updateExpenseList();
    updateTotal();

    form.reset();
});

function updateExpenseList() {
    expenseList.innerHTML = "";

    Object.keys(expenses).forEach((date) => {
        const dateHeading = document.createElement("div");
        dateHeading.classList.add("expense-date");
        dateHeading.textContent = `Date: ${date}`;
        expenseList.appendChild(dateHeading);

        expenses[date].forEach((expense, index) => {
            const li = document.createElement("li");
            li.textContent = `${expense.name}: ₹${expense.amount.toFixed(2)}`;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => {
                deleteExpense(date, index);
            };

            li.appendChild(deleteBtn);
            expenseList.appendChild(li);
        });
    });
}

function updateTotal() {
    let total = 0;
    Object.values(expenses).forEach((expenseArray) => {
        total += expenseArray.reduce((sum, expense) => sum + expense.amount, 0);
    });
    totalAmount.textContent = `₹${total.toFixed(2)}`;
}

function deleteExpense(date, index) {
    expenses[date].splice(index, 1);
    if (expenses[date].length === 0) {
        delete expenses[date];
    }
    updateExpenseList();
    updateTotal();
}
