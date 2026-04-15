const corridorData = [
  { origin: "Asia", destination: "Europe", flow: 52, uncertainty: 0.18, theme: "labour", color: "#356cb4" },
  { origin: "Latin America", destination: "North America", flow: 47, uncertainty: 0.11, theme: "economy", color: "#2d8b70" },
  { origin: "Africa", destination: "Europe", flow: 33, uncertainty: 0.22, theme: "conflict", color: "#e07d2f" },
  { origin: "Asia", destination: "North America", flow: 28, uncertainty: 0.14, theme: "education", color: "#7a56b3" },
  { origin: "Middle East", destination: "Europe", flow: 24, uncertainty: 0.26, theme: "conflict", color: "#c95e47" },
  { origin: "Africa", destination: "Middle East", flow: 15, uncertainty: 0.20, theme: "climate", color: "#4f7aa6" }
];

const barContainer = document.getElementById("barContainer");
const detailBox = document.getElementById("detailBox");
const themeSelect = document.getElementById("themeSelect");

function corridorLabel(row) {
  return `${row.origin} → ${row.destination} (${row.flow})`;
}

function detailText(row) {
  return `
    <strong>${row.origin} → ${row.destination}</strong><br>
    Flow index: ${row.flow}<br>
    Theme: ${row.theme}<br>
    Uncertainty: ${(row.uncertainty * 100).toFixed(0)}%<br>
    Interpretation note: This corridor is shown using aggregated public data. Values are intended
    for comparison and public understanding, not for precise prediction.
  `;
}

function renderBars() {
  const selectedTheme = themeSelect.value;
  const filtered = corridorData.filter(row => selectedTheme === "all" || row.theme === selectedTheme);

  barContainer.innerHTML = "";

  filtered.forEach(row => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.background = row.color;
    bar.style.width = `${Math.max(42, row.flow * 8)}px`;
    bar.textContent = corridorLabel(row);

    bar.addEventListener("mouseenter", () => {
      detailBox.innerHTML = detailText(row);
    });

    barContainer.appendChild(bar);
  });

  if (filtered.length === 0) {
    detailBox.textContent = "No corridors match the current filter.";
  }
}

themeSelect.addEventListener("change", renderBars);
renderBars();
