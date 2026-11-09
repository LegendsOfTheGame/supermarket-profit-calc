// ===============================
// GLOBAL STATE
// ===============================
let productsData = [];
let productsByName = new Map();
let selectedCategory = "Show All";
let selectedProfit = null;
let renderedCategory = null;

// ===============================
// ROUNDING FUNCTION (nearest nickel)
// ===============================
function roundToNickel(amount) {
  return Math.round(amount / 0.05) * 0.05;
}

// ===============================
// RENDER TABLE
// ===============================
function renderTable(products) {
  const tbody = document.getElementById("productTableBody");
  const fragment = document.createDocumentFragment();

  products.forEach(product => {
    const row = document.createElement("tr");
    row.dataset.product = product.name;
    row.innerHTML = `
      <td>
        <img src="assets/images/${product.image}"
             alt="${product.name}" width="60" height="60"
             decoding="async"
             loading="lazy"
             onerror="this.onerror=null;this.style.visibility='hidden'">
      </td>
      <td><strong>${product.name}</strong></td>
      <td>
        <input type="number"
               value="${product.cost.toFixed(2)}"
               step="0.01"
               class="cost-input"
               data-product="${product.name}">
      </td>
      <td class="pct"></td>
      <td class="sale"></td>
      <td class="profit"></td>
    `;
    fragment.appendChild(row);
  });

  tbody.replaceChildren(fragment);
  updatePrices();
}

function updatePrices() {
  const rows = document.querySelectorAll("#productTableBody tr");

  rows.forEach(row => {
    const product = productsByName.get(row.dataset.product);
    if (!product) return;

    const pctCell = row.querySelector(".pct");
    const saleCell = row.querySelector(".sale");
    const profitCell = row.querySelector(".profit");

    if (selectedProfit === null) {
      pctCell.textContent = "—";
      saleCell.textContent = "—";
      profitCell.textContent = "—";
      return;
    }

    const rawSalePrice = product.cost * (1 + selectedProfit / 100);
    const salePrice = roundToNickel(rawSalePrice);
    const profit = salePrice - product.cost;

    pctCell.textContent = selectedProfit.toFixed(1) + "%";
    saleCell.textContent = "$" + salePrice.toFixed(2);
    profitCell.textContent = "$" + profit.toFixed(2);
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
  selectedCategory = categories[0] || "Show All";
  categorySelect.value = selectedCategory;
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
function refreshTable(forceRender = false) {
  if (forceRender || selectedCategory !== renderedCategory) {
    const filtered = selectedCategory === "Show All"
      ? productsData
      : productsData.filter(p => p.category === selectedCategory);

    renderTable(filtered);
    renderedCategory = selectedCategory;
  } else {
    updatePrices();
  }
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
      productsByName = new Map(data.map(product => [product.name, product]));
      loadCategories(data);
      selectedProfit = 25;
      refreshTable();
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

    const product = productsByName.get(productName);
    if (product && !isNaN(newCost)) {
      product.cost = newCost;
      updatePrices();
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
      productsByName = new Map(data.map(product => [product.name, product]));

      // Reset state
      selectedCategory = "Show All";
      selectedProfit = 25;

      // Reset dropdown to default
      document.getElementById("categorySelect").value = "Show All";

      // Reset custom profit input
      document.getElementById("customProfit").value = "";

      // Re-render table
      refreshTable(true);
    })
    .catch(err => console.error("Failed to reload products.json:", err));
});

// ===============================
// START
// ===============================
loadProducts();
