// Select DOM elements
const budgetInput = document.getElementById("budget-input");
const setBudgetBtn = document.getElementById("set-budget");
const totalBudgetEl = document.getElementById("total-budget");
const totalSpentEl = document.getElementById("total-spent");
const totalSavingsEl = document.getElementById("total-savings");
const budgetProgress = document.getElementById("budget-progress");

const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");
const addExpenseBtn = document.getElementById("add-expense");
const expenseListEl = document.getElementById("expense-list");

// Chart element
const ctx = document.getElementById("expenseChart").getContext("2d");

// Global variables
let budget = 0;
let expenses = [];
let categories = {
  "Groceries": 0,
  "Medicines": 0,
  "Travel": 0,
  "Entertainment": 0,
  "Other": 0
};

// Chart.js Pie Chart
const ctxx = document.getElementById("expenseChart").getContext("2d");
const expenseChart = new Chart(ctxx, {
  type: "pie",
  data: {
    labels: ["Food", "Travel", "Shopping"],
    datasets: [{
      data: [500, 300, 200],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"]
    }]
  },
  options: {
    responsive: false,   // 👈 disable auto-resize
    maintainAspectRatio: false
  }
});


// Function: Update Summary
function updateSummary() {
  let totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  let totalSavings = budget - totalSpent;

  totalBudgetEl.textContent = `₹${budget}`;
  totalSpentEl.textContent = `₹${totalSpent}`;
  totalSavingsEl.textContent = `₹${totalSavings < 0 ? 0 : totalSavings}`;

  // Update progress bar
  let percent = budget > 0 ? (totalSpent / budget) * 100 : 0;
  budgetProgress.style.width = `${Math.min(percent, 100)}%`;
  budgetProgress.textContent = `${Math.min(percent, 100).toFixed(0)}%`;

  if (percent < 50) {
    budgetProgress.className = "progress-bar bg-success fw-bold";
  } else if (percent < 80) {
    budgetProgress.className = "progress-bar bg-warning fw-bold";
  } else {
    budgetProgress.className = "progress-bar bg-danger fw-bold";
  }

  // Update chart
  expenseChart.data.datasets[0].data = Object.values(categories);
  expenseChart.update();
}

// Function: Render Expense List
function renderExpenses() {
  expenseListEl.innerHTML = "";
  expenses.forEach((exp, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${exp.name}</td>
      <td>₹${exp.amount}</td>
      <td><span class="badge bg-primary">${exp.category}</span></td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteExpense(${index})">❌</button></td>
    `;

    expenseListEl.appendChild(row);
  });
}

// Function: Add Expense
function addExpense() {
  let name = expenseNameInput.value.trim();
  let amount = parseInt(expenseAmountInput.value);
  let category = expenseCategoryInput.value;

  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense details.");
    return;
  }

  // Save expense
  expenses.push({ name, amount, category });

  // Update category spending
  categories[category] += amount;

  // Clear inputs
  expenseNameInput.value = "";
  expenseAmountInput.value = "";

  renderExpenses();
  updateSummary();
}

// Function: Delete Expense
function deleteExpense(index) {
  let exp = expenses[index];
  categories[exp.category] -= exp.amount; // Deduct from category
  expenses.splice(index, 1);
  renderExpenses();
  updateSummary();
}

// Function: Set Budget
function setBudget() {
  let newBudget = parseInt(budgetInput.value);
  if (isNaN(newBudget) || newBudget <= 0) {
    alert("Please enter a valid budget.");
    return;
  }
  budget = newBudget;
  budgetInput.value = "";
  updateSummary();
}

// Event Listeners
setBudgetBtn.addEventListener("click", setBudget);
addExpenseBtn.addEventListener("click", addExpense);
