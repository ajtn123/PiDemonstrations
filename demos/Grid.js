function generateGrid() {
  const container = document.getElementById("gridContainer");
  container.innerHTML = '<div class="circle"></div>'; // Clear previous grid

  const gridSize = parseInt(document.getElementById("size").value);
  const size = 400 / gridSize;
  const radius = 200; // Circle radius

  let fullyInsideCount = 0;
  let partialCount = 0;
  let totalSquares = 0;

  let x = 0;
  let y = 0;
  for (let xI = 0; xI < gridSize; xI += 1) {
    y = 0;
    for (let yI = 0; yI < gridSize; yI += 1) {
      totalSquares++;

      // Check the 4 corners of the square
      const corners = [
        [x, y],
        [x + size, y],
        [x, y + size],
        [x + size, y + size],
      ];

      const insideCorners = corners.filter(([cx, cy]) => {
        return Math.sqrt((cx - radius) ** 2 + (cy - radius) ** 2) < radius;
      }).length;

      const square = document.createElement("div");
      square.className = "square";
      square.style.width = size + "px";
      square.style.height = size + "px";
      square.style.left = x + "px";
      square.style.top = y + "px";

      if (insideCorners === 4) {
        fullyInsideCount++; // Fully inside circle
        square.style.backgroundColor = "rgba(255, 0, 0, 0.6)"; // Darker red
      } else if (insideCorners > 0) {
        partialCount++; // Partially overlapping
        square.style.backgroundColor = "rgba(255, 165, 0, 0.6)"; // Orange
      }

      container.appendChild(square);
      y += size;
    }
    x += size;
  }

  // Lower bound (only fully inside squares)
  const lowerBoundOfPi = (fullyInsideCount / totalSquares) * 4;
  // Upper bound (fully inside + partial squares)
  const upperBoundOfPi = ((fullyInsideCount + partialCount) / totalSquares) * 4;

  document.getElementById("result").innerText = `Fully Inside: ${fullyInsideCount}/${totalSquares};
  Partially Inside: ${partialCount}/${totalSquares};
  Calculation: π = Inside Area / Total Area * 4;
  Estimated π Range: ${lowerBoundOfPi.toFixed(4)} - ${upperBoundOfPi.toFixed(4)}`;
}

generateGrid(); // Initial call

document.getElementById("size").addEventListener("input", (event) => {
  generateGrid();
});
