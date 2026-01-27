// ===============================
// GLOBAL STATE
// ===============================
let productsData = [];
let selectedCategory = "Show All";
let selectedProfit = null;

// ===============================
// ROUNDING FUNCTION (nearest nickel)
// ===============================
function roundToNickel(amount) {
  return Math.round(amount / 0.05) * 0.05;
}

// ===============================
// RENDER TABLE
// ===============================
function renderTable(products, profitPercent = null) {
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = "";

  products.forEach(product => {
    let profit = null;
    let salePrice = null;

    if (profitPercent !== null) {
      const rawSalePrice = product.cost * (1 + profitPercent / 100);
      salePrice = roundToNickel(rawSalePrice);
      profit = salePrice - product.cost;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="assets/images/${product.image}" 
             alt="${product.name}" width="60"
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/60?text=No+Image';">
      </td>
      <td><strong>${product.name}</strong></td>
      <td>
        <input type="number" 
               value="${product.cost.toFixed(2)}" 
               step="0.01" 
               class="cost-input" 
               data-product="${product.name}">
      </td>
      <td>${profitPercent !== null ? profitPercent.toFixed(1) + "%" : "—"}</td>
      <td>${salePrice !== null ? "$" + salePrice.toFixed(2) : "—"}</td>
      <td>${profit !== null ? "$" + profit.toFixed(2) : "—"}</td>
    `;
    tbody.appendChild(row);
  });
}

// ===============================
// LOAD CATEGORIES
// ===============================
function loadCategories(products) {
  const categorySelect = document.getElementById("categorySelect");
  const categories = [...new Set(products.map(p => p.category))];

  categorySelect.innerHTML =
    `<option value="Show All">Show All</option>` +
    categories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
}

// ===============================
// STATUS LINE
// ===============================
function updateStatus() {
  const statusDiv = document.getElementById("showingStatus");
  if (selectedCategory === "Show All") {
    statusDiv.textContent = "Showing: All Products";
  } else {
    statusDiv.textContent = `Showing: ${selectedCategory}`;
  }
}

// ===============================
// REFRESH TABLE (uses both states)
// ===============================
function refreshTable() {
  let filtered = selectedCategory === "Show All"
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  renderTable(filtered, selectedProfit);
  updateStatus();
}

// ===============================
// INITIAL LOAD
// ===============================
function loadProducts() {
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      productsData = data;
      loadCategories(data);
      selectedProfit = 25;
      refreshTable(); // default: Show All + no profit
    })
    .catch(err => console.error("Failed to load products.json:", err));
}

// ===============================
// EVENT LISTENERS
// ===============================

// Category change
document.getElementById("categorySelect").addEventListener("change", e => {
  selectedCategory = e.target.value;
  refreshTable();
});

// Profit buttons
document.querySelectorAll(".profit-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedProfit = parseInt(btn.dataset.profit);
    refreshTable();
  });
});

// Custom profit input
const customProfitInput = document.getElementById("customProfit");
const profitWarning = document.getElementById("profitWarning");

customProfitInput.addEventListener("input", () => {
  let value = parseFloat(customProfitInput.value);
  if (isNaN(value)) return;

  if (value > 99.9) {
    value = 99.9;
    customProfitInput.value = 99.9;
    profitWarning.style.display = "block";
  } else {
    profitWarning.style.display = "none";
  }

  selectedProfit = value;
  refreshTable();
});

// Cost input updates (row-only)
document.addEventListener("input", e => {
  if (e.target.classList.contains("cost-input")) {
    const productName = e.target.dataset.product;
    const newCost = parseFloat(e.target.value);

    const product = productsData.find(p => p.name === productName);
    if (product && !isNaN(newCost)) {
      product.cost = newCost;

      // Update only this row
      const row = e.target.closest("tr");
      if (selectedProfit !== null) {
        const rawSalePrice = product.cost * (1 + selectedProfit / 100);
        const salePrice = roundToNickel(rawSalePrice);
        const profit = salePrice - product.cost;

        row.querySelector("td:nth-child(5)").textContent = "$" + salePrice.toFixed(2);
        row.querySelector("td:nth-child(6)").textContent = "$" + profit.toFixed(2);
      }
    }
  }
});

// Reset button listener
document.getElementById("resetBtn").addEventListener("click", () => {
  // Reload products.json to restore default costs
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      productsData = data;

      // Reset state
      selectedCategory = "Show All";
      selectedProfit = 25;

      // Reset dropdown to default
      document.getElementById("categorySelect").value = "Show All";

      // Reset custom profit input
      document.getElementById("customProfit").value = "";

      // Re-render table
      refreshTable();
    })
    .catch(err => console.error("Failed to reload products.json:", err));
});

// ===============================
// START
// ===============================
loadProducts();
