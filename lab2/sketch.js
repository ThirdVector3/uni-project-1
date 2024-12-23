let characterState = 'standing';

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

    characterXPos = 280;
    characterYPos = 250;

    if (characterState === 'standing') {
      drawCharacterStandingFront(characterXPos, characterYPos);
    } else if (characterState === 'jumping') {
      drawCharacterJumpingFront(characterXPos, characterYPos - 50);
    } else if (characterState === 'walkingLeft') {
      drawCharacterWalkingLeft(characterXPos, characterYPos);
    } else if (characterState === 'walkingRight') {
      drawCharacterWalkingRight(characterXPos, characterYPos);
    } else if (characterState === 'jumpingLeft') {
      drawCharacterJumpingLeft(characterXPos - 30, characterYPos - 50);
    } else if (characterState === 'jumpingRight') {
      drawCharacterJumpingRight(characterXPos + 30, characterYPos - 50);
    }
}
function drawCharacterStandingFront(x, y) {
  fill(255, 228, 196);
  ellipse(x, y - 30, 30, 30);

  fill(0);
  rect(x - 15, y - 20, 30, 40);

  fill(0);
  rect(x - 10, y + 20, 10, 30);
  rect(x + 0, y + 20, 10, 30);
}

function drawCharacterJumpingFront(x, y) {
  fill(255, 228, 196); 
  ellipse(x, y - 30, 30, 30);

  fill(0); 
  rect(x - 15, y - 20, 30, 40)

  fill(0); 
  rect(x - 20, y + 10, 10, 30);
  rect(x + 10, y + 10, 10, 30);
}

function drawCharacterWalkingLeft(x, y) {
  fill(255, 228, 196); 
  ellipse(x, y - 30, 30, 30);

  fill(0); 
  rect(x - 15, y - 20, 30, 40);

  fill(0); 
  rect(x - 15, y + 20, 10, 30);
  rect(x + 5, y + 10, 10, 30);
}

function drawCharacterWalkingRight(x, y) {
  fill(255, 228, 196); 
  ellipse(x, y - 30, 30, 30);

  fill(0); 
  rect(x - 15, y - 20, 30, 40);

  fill(0); 
  rect(x - 15, y + 10, 10, 30);
  rect(x + 5, y + 20, 10, 30);
}

function drawCharacterJumpingLeft(x, y) {
  fill(255, 228, 196); 
  ellipse(x, y - 30, 30, 30);

  fill(0); 
  rect(x - 15, y - 20, 30, 40);

  fill(0); 
  rect(x - 20, y, 10, 30);
  rect(x + 0, y, 10, 30);
}

function drawCharacterJumpingRight(x, y) {
  fill(255, 228, 196); 
  ellipse(x, y - 30, 30, 30);

  fill(0); 
  rect(x - 15, y - 20, 30, 40);

  fill(0); 
  rect(x - 10, y, 10, 30);
  rect(x + 10, y, 10, 30);
}

function keyPressed() {
  if (key === ' ') {
    characterState = 'jumping';
  } else if (key === 'a') {
    characterState = 'walkingLeft';
  } else if (key === 'd') {
    characterState = 'walkingRight';
  } else if (key === 'q') {
    characterState = 'jumpingLeft';
  } else if (key === 'e') {
    characterState = 'jumpingRight';
  } else {
    characterState = 'standing';
  }
}
function keyReleased() {
  if (key === ' ' && characterState == 'jumping') {
    characterState = 'standing';
  } else if (key === 'a' && characterState == 'walkingLeft') {
    characterState = 'standing';
  } else if (key === 'd' && characterState == 'walkingRight') {
    characterState = 'standing';
  } else if (key === 'q' && characterState == 'jumpingLeft') {
    characterState = 'standing';
  } else if (key === 'e' && characterState == 'jumpingRight') {
    characterState = 'standing';
  } else {
    characterState = 'standing';
  }
}