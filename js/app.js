// ===============================
// RENDER TABLE
// ===============================
function renderTable(products, profitPercent = null) {
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = "";

  products.forEach(product => {
    const profit = profitPercent ? product.cost * (profitPercent / 100) : null;
    const salePrice = profitPercent ? product.cost + profit : null;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="assets/images/${product.image}" 
             alt="${product.name}" width="60"
             onerror="this.src='https://via.placeholder.com/60?text=No+Image';">
      </td>
      <td><strong>${product.name}</strong></td>
      <td>$${product.cost.toFixed(2)}</td>
      <td>${profitPercent ? profitPercent + "%" : "—"}</td>
      <td>${salePrice ? "$" + salePrice.toFixed(2) : "—"}</td>
      <td>${profit ? "$" + profit.toFixed(2) : "—"}</td>
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
// LOAD + RENDER
// ===============================
let productsData = [];
function updateStatus(selectedCategory) {
  const statusDiv = document.getElementById("showingStatus");
  if (selectedCategory === "Show All") {
    statusDiv.textContent = "Showing: All Products";
  } else {
    statusDiv.textContent = `Showing: ${selectedCategory}`;
  }
}

function loadAndRender(profitPercent = null) {
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      productsData = data;
      loadCategories(data);

      const selectedCategory = document.getElementById("categorySelect").value;
      let filtered = selectedCategory === "Show All"
        ? data
        : data.filter(p => p.category === selectedCategory);

      renderTable(filtered, profitPercent);
      updateStatus(selectedCategory);
    })
    .catch(err => console.error("Failed to load products.json:", err));
}

document.getElementById("categorySelect").addEventListener("change", () => {
  const selectedCategory = document.getElementById("categorySelect").value;
  let filtered = selectedCategory === "Show All"
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  renderTable(filtered);
  updateStatus(selectedCategory);
});


// ===============================
// PRESET PROFIT BUTTONS
// ===============================
document.querySelectorAll(".profit-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const percent = parseInt(btn.dataset.profit);
    loadAndRender(percent);
  });
});

// ===============================
// CUSTOM PROFIT INPUT
// ===============================
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

  loadAndRender(value);
});

// ===============================
// INITIAL LOAD
// ===============================
loadAndRender();
