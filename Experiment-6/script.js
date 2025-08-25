const svg = document.getElementById("canvas");
let drawing = false;
let currentLine = null;

function getMousePosition(evt) {
  const rect = svg.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

svg.addEventListener("mousedown", (e) => {
  drawing = true;
  const pos = getMousePosition(e);
  currentLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  currentLine.setAttribute("stroke", "blue");
  currentLine.setAttribute("stroke-width", "2");
  currentLine.setAttribute("fill", "none");
  currentLine.setAttribute("points", `${pos.x},${pos.y}`);
  svg.appendChild(currentLine);
});

svg.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const pos = getMousePosition(e);
  let points = currentLine.getAttribute("points");
  points += ` ${pos.x},${pos.y}`;
  currentLine.setAttribute("points", points);
});

svg.addEventListener("mouseup", () => {
  drawing = false;
  currentLine = null;
});

svg.addEventListener("mouseleave", () => {
  drawing = false;
  currentLine = null;
});
