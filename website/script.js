document.addEventListener("DOMContentLoaded", () => {
    // Check the current page and call the respective function
    if (window.location.pathname.endsWith("dashboard.html")) {
        renderDashboardInventory(); // Call this for the dashboard
        populateFluctuations();     // Call to populate cost fluctuations if on dashboard
    } else if (window.location.pathname.endsWith("inventory.html")) {
        renderFullInventory(); // Call this for the full inventory page
    } else if (window.location.pathname.endsWith("cost-fluctuations.html")) {
        // Initialize the threshold slider and label for cost fluctuations page
        const thresholdInput = document.getElementById("threshold");
        document.getElementById("thresholdLabel").innerText = `${thresholdInput.value}%`;

        // Add event listener to update the threshold label and filter rows dynamically
        thresholdInput.addEventListener("input", function () {
            updateThresholdLabel(this.value);
        });

        // Apply the initial filter based on the default threshold value
        filterCostFluctuations(thresholdInput.value);
    }

    // Prevent click and focus on order quantity input fields from triggering navigation
    const orderQtyInputs = document.querySelectorAll(".order-qty-input");
    orderQtyInputs.forEach(input => {
        input.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevents navigation when clicking in the input
        });
    });
});

// Function to update the threshold label and apply filtering
function updateThresholdLabel(value) {
    document.getElementById("thresholdLabel").innerText = `${value}%`;
    filterCostFluctuations(value); // Optional: call filter function if required
}

// Optional filter function to apply threshold filtering on data
function filterCostFluctuations(threshold) {
    const rows = document.querySelectorAll("#costFluctuationTable tbody tr");
    rows.forEach(row => {
        const change = parseFloat(row.querySelector("td[data-change]").getAttribute("data-change"));
        row.style.display = change >= threshold ? "" : "none";
    });
}

function navigateToPage(page) {
    window.location.href = page;
}

// Function to populate cost fluctuations
function populateFluctuations() {
    const priceDropsList = document.getElementById("priceDrops");
    const priceIncreasesList = document.getElementById("priceIncreases");

    const priceDrops = [
        { item: "Almond Milk", change: "-10%" },
        { item: "Spinach", change: "-8%" }
    ];

    const priceIncreases = [
        { item: "Broccoli", change: "+15%" },
        { item: "Carrot", change: "+5%" }
    ];

    priceDrops.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.item} ${item.change}`;
        priceDropsList.appendChild(li);
    });

    priceIncreases.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.item} ${item.change}`;
        priceIncreasesList.appendChild(li);
    });
}

// Inventory item constructor
function InventoryItem(id, name, currentQty, par, cost, status, unit) {
    this.id = id;
    this.name = name;
    this.currentQty = currentQty;
    this.par = par;
    this.cost = cost;
    this.status = status;
    this.unit = unit;
}

// Sample inventory array for testing
let inventory = [
    new InventoryItem("14323", "Almond Milk", 8, 10, 3.00, "up", "lbs"),
    new InventoryItem("10158", "Broccoli", 15, 10, 5.00, "down", "unit"),
    new InventoryItem("14323", "Almond Milk", 8, 10, 3.00, "up", "lbs"),
    new InventoryItem("10158", "Broccoli", 15, 10, 5.00, "down", "unit"),
    new InventoryItem("16234", "More Broc!", 34, 10, 5.00, "up", "sheckles"),
    new InventoryItem("1236890", "Big Broc", 55, 987, 5.00, "down", "oz"),
    new InventoryItem("1354", "Short Broc", 8, 10, 5.00, "down", "floz"),
    new InventoryItem("3", "Butts", 68888, 1, 5.00, "up", "bricks"),
    new InventoryItem("98762100", "Donkeys", 15, 2000, 8.00, "down", "bushel"),
    new InventoryItem("1215000", "Angry Santa", 15, 10, 565.00, "up", "lbs"),
    new InventoryItem("10158", "A really long name", 15, 10, 5.00, "down", "ft"),
    new InventoryItem("654", "Scoops", 1251, 10, 5.00, "down", "oz"),
    new InventoryItem("68798", "Gresh Borc", 15, 10, 5.00, "up", "lbs"),
    new InventoryItem("10158", "Messy Toast BDSM", 54, 10, 5.23687, "down", "lbs"),
    new InventoryItem("654", "Angry Hot Dog", 655, 10, 5.00, "up", "door knobs"),
    new InventoryItem("10158", "Nasty Butler", 15, 10, 5.00, "up", "lbs"),
    new InventoryItem("55555", "Filthy Wiffle Bat", 5, 10, 5.00, "up", "buttload"),
    new InventoryItem("54651", "A semi charmed kindda life", 15, 10, 5.00, "down", "lbs"),
    new InventoryItem("10158", "Fresh Broc", 15, 25, 5.00, "up", "thumbs"),
    new InventoryItem("98765", "Broccoli", 15, 10, 5.00, "down", "in"),
    new InventoryItem("10158", "Broccoli", 15, 10, 5.00, "down", "unit"),
    new InventoryItem("16234", "More Broc!", 34, 10, 5.00, "up", "sheckles"),
    new InventoryItem("1236890", "Big Broc", 55, 987, 5.00, "down", "oz"),
    new InventoryItem("1354", "Short Broc", 8, 10, 5.00, "down", "floz"),
    new InventoryItem("3", "Butts", 68888, 1, 5.00, "up", "bricks"),
    new InventoryItem("98762100", "Donkeys", 15, 2000, 8.00, "down", "bushel"),
    new InventoryItem("1215000", "Angry Santa", 15, 10, 565.00, "up", "lbs"),
    new InventoryItem("10158", "A really long name", 15, 10, 5.00, "down", "ft"),
    new InventoryItem("654", "Scoops", 1251, 10, 5.00, "down", "oz"),
    new InventoryItem("68798", "Gresh Borc", 15, 10, 5.00, "up", "lbs"),
    new InventoryItem("10158", "Messy Toast BDSM", 54, 10, 5.23687, "down", "lbs"),
    new InventoryItem("654", "Angry Hot Dog", 655, 10, 5.00, "up", "door knobs"),
    new InventoryItem("10158", "Nasty Butler", 15, 10, 5.00, "up", "lbs"),
    new InventoryItem("98762100", "Donkeys", 15, 2000, 8.00, "down", "bushel"),
    new InventoryItem("1215000", "Angry Santa", 15, 10, 565.00, "up", "lbs"),
    new InventoryItem("10158", "A really long name", 15, 10, 5.00, "down", "ft"),
    new InventoryItem("654", "Scoops", 1251, 10, 5.00, "down", "oz"),
    new InventoryItem("68798", "Gresh Borc", 15, 10, 5.00, "up", "lbs"),
    new InventoryItem("10158", "Messy Toast BDSM", 54, 10, 5.23687, "down", "lbs"),
    new InventoryItem("654", "Angry Hot Dog", 655, 10, 5.00, "up", "door knobs"),
    new InventoryItem("10158", "Nasty Butler", 15, 10, 5.00, "up", "lbs")
    // Add more items as needed
];

// Render functions
function renderDashboardInventory() {
    const inventoryTable = document.querySelector(".inventory-table tbody");
    inventoryTable.innerHTML = ""; // Clear existing rows

    inventory.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.currentQty}</td>
            <td>${item.par}</td>
            <td>$${item.cost.toFixed(2)}</td>
            <td class="price-indicator ${item.status}">${item.status === "up" ? "Up" : "Down"}</td>
            <td><input type="number" min="0" class="order-qty-input" /></td>
        `;
        inventoryTable.appendChild(row);
    });
}

function renderFullInventory() {
    const inventoryTable = document.querySelector(".full-inventory-table tbody");
    inventoryTable.innerHTML = ""; // Clear existing rows

    inventory.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.unit}</td>
            <td>${item.currentQty}</td>
            <td>${item.par}</td>
            <td>$${item.cost.toFixed(2)}</td>
            <td class="price-indicator ${item.status}">${item.status === "up" ? "Up" : "Down"}</td>
            <td><input type="number" min="0" class="order-qty-input" /></td>
        `;
        inventoryTable.appendChild(row);
    });



}
