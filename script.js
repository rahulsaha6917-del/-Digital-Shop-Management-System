let sales = JSON.parse(localStorage.getItem("sales")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addSale() {
  const amount = document.getElementById("saleAmount").value;
  if (amount === "") return alert("Enter sale amount");

  sales.push(Number(amount));
  localStorage.setItem("sales", JSON.stringify(sales));
  document.getElementById("saleAmount").value = "";
  updateUI();
}

function addExpense() {
  const title = document.getElementById("expenseTitle").value;
  const amount = document.getElementById("expenseAmount").value;

  if (title === "" || amount === "") return alert("Fill all fields");

  expenses.push({ title, amount: Number(amount) });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("expenseTitle").value = "";
  document.getElementById("expenseAmount").value = "";
  updateUI();
}

function updateUI() {
  const totalSales = sales.reduce((a, b) => a + b, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
  const netProfit = totalSales - totalExpenses;

  document.getElementById("totalSales").innerText = totalSales;
  document.getElementById("totalExpenses").innerText = totalExpenses;
  document.getElementById("netProfit").innerText = netProfit;

  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  sales.forEach((sale, index) => {
    const li = document.createElement("li");
    li.textContent = `Sale ${index + 1}: ₹${sale}`;
    historyList.appendChild(li);
  });

  expenses.forEach(exp => {
    const li = document.createElement("li");
    li.textContent = `Expense - ${exp.title}: ₹${exp.amount}`;
    historyList.appendChild(li);
  });
}

function resetData() {
  if (!confirm("Are you sure you want to reset all data?")) return;
  sales = [];
  expenses = [];
  localStorage.clear();
  updateUI();
}

function backupData() {
  const data = {
    sales,
    expenses
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "shop_backup.json";
  link.click();
}

updateUI();
let trendChart, compareChart;

function groupByMonth(data) {
  const map = {};
  data.forEach(item => {
    const month = item.date.slice(0, 7); // YYYY-MM
    map[month] = (map[month] || 0) + item.amount;
  });
  return map;
}

