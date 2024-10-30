// Update threshold label as slider is moved
function updateThresholdLabel(value) {
    document.getElementById("thresholdLabel").innerText = `${value}%`;
    filterCostFluctuations(value);
}

// Filter the table based on the threshold
function filterCostFluctuations(threshold) {
    const rows = document.querySelectorAll("#costFluctuationTable tbody tr");
    rows.forEach(row => {
        const change = parseFloat(row.querySelector("td[data-change]").getAttribute("data-change"));
        // Show or hide row based on the threshold
        if (change >= threshold) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Initial filter based on default threshold
document.addEventListener("DOMContentLoaded", () => {
    const initialThreshold = document.getElementById("threshold").value;
    filterCostFluctuations(initialThreshold);
});

function updateParStatus() {
    const rows = document.querySelectorAll("#parGuideTable tbody tr");
    rows.forEach(row => {
        const currentStock = parseInt(row.cells[1].innerText);
        const parLevel = parseInt(row.cells[2].innerText);
        const statusCell = row.cells[3];
        if (currentStock < parLevel) {
            statusCell.innerText = "Below Par";
            statusCell.classList.add("below-par");
            statusCell.classList.remove("above-par");
        } else {
            statusCell.innerText = "Above Par";
            statusCell.classList.add("above-par");
            statusCell.classList.remove("below-par");
        }
    });
}

// Call this function after loading the page or updating data
document.addEventListener("DOMContentLoaded", updateParStatus);
