function drawGrid() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const gridSize = parseInt(document.getElementById("size").value);
  document.getElementById("gridSize").innerText = `${gridSize} X ${gridSize}`;
  const size = 400 / gridSize;
  const radius = 200;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let fullyInsideCount = 0;
  let partialCount = 0;
  let totalSquares = 0;

  // Draw the squares
  let x = 0;
  let y = 0;
  for (let xI = 0; xI < gridSize; xI += 1) {
    y = 0;
    for (let yI = 0; yI < gridSize; yI += 1) {
      totalSquares++;

      const corners = [
        [x, y],
        [x + size, y],
        [x, y + size],
        [x + size, y + size],
      ];

      const insideCorners = corners.filter(([cx, cy]) => {
        return Math.sqrt((cx - radius) ** 2 + (cy - radius) ** 2) < radius;
      }).length;

      if (insideCorners === 4) {
        fullyInsideCount++;
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      } else if (insideCorners > 0) {
        partialCount++;
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
      }
      ctx.fillRect(x, y, size, size);

      y += size;
    }
    x += size;
  }

  // Draw the circle
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.stroke();

  const lowerBoundOfPi = (fullyInsideCount / totalSquares) * 4;
  const upperBoundOfPi = ((fullyInsideCount + partialCount) / totalSquares) * 4;

  document.getElementById("result").innerText = `Fully Inside: ${fullyInsideCount}/${totalSquares};
  Partially Inside: ${partialCount}/${totalSquares};
  Estimated π Range: ${lowerBoundOfPi.toFixed(4)} - ${upperBoundOfPi.toFixed(4)}`;
}

drawGrid();

document.getElementById("size").addEventListener("input", drawGrid);
