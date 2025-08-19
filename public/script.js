let budget = 0;
let totalExpenses = 0;

document.getElementById("budgetForm").addEventListener("submit", function (e) {
  e.preventDefault();
  budget = parseInt(document.getElementById("budget").value);
  document.getElementById("budgetDisplay").textContent = budget;
  updateRemaining();
});

document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = parseInt(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  if (amount > 0) {
    totalExpenses += amount;
    updateRemaining();

    const expenseList = document.getElementById("expenseList");

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${title}</td>
      <td>₹${amount}</td>
      <td>${date}</td>
      <td><button class="btn btn-danger btn-sm delete">❌</button></td>
    `;

    // Delete expense
    row.querySelector(".delete").addEventListener("click", function () {
      totalExpenses -= amount;
      updateRemaining();
      row.remove();
    });

    expenseList.appendChild(row);

    // Reset form
    document.getElementById("expenseForm").reset();
  }
});

function updateRemaining() {
  document.getElementById("totalExpenses").textContent = totalExpenses;
  document.getElementById("remaining").textContent = budget - totalExpenses;
}
