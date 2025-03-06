function calculatePolygons() {
  const n = parseInt(document.getElementById("sides").value);
  document.getElementById("sideCount").innerText = n;
  if (n < 3) return;

  const lowerBoundOfPi = n * Math.sin(Math.PI / n);
  const upperBoundOfPi = n * Math.tan(Math.PI / n);

  document.getElementById("result").innerHTML = `Estimated π Range: ${lowerBoundOfPi.toFixed(10)} - ${upperBoundOfPi.toFixed(10)}`;

  let scale = 7;
  if (n <= 6) scale = 4;

  drawPolygons(n, scale);
}

function drawPolygons(n, scale) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.lineWidth = 0.5;

  const cx = canvas.width / (scale * 2);
  const cy = canvas.height / (scale * 2);
  const r = 100;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
  ctx.stroke();

  drawPolygon(ctx, cx, cy, r, n, "rgba(255, 0, 0, 0.5)");
  drawPolygon(ctx, cx, cy, r / Math.cos(Math.PI / n), n, "rgba(0, 255, 0, 0.5)");
}

function drawPolygon(ctx, cx, cy, r, n, color) {
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const angle = (i * 2 * Math.PI) / n;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.stroke();
}

calculatePolygons();

document.getElementById("sides").addEventListener("input", calculatePolygons);
