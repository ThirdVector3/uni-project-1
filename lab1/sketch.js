function setup() {
    createCanvas(600, 400);
    background(135, 206, 235);
}

function drawTree(x, y) {
  fill(139, 69, 19); 
  rect(x, y, 20, 60);

  fill(34, 139, 34);
  ellipse(x + 10, y - 40, 60, 60); 
  ellipse(x - 10, y - 10, 60, 60); 
  ellipse(x + 30, y - 10, 60, 60);
}
function drawLandscape () {
  fill(34, 139, 34);
  rect(0, 300, 600, 100);

  fill(169, 169, 169);
  triangle(100, 300, 300, 100, 500, 300);
  triangle(200, 300, 400, 120, 600, 300);

  fill(255, 223, 0);
  ellipse(500, 100, 80, 80);

  drawTree(100, 250);
  drawTree(200, 280);
  drawTree(300, 260);
}

function draw() {
    drawLandscape();
}
