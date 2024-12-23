let conyons = [];
let trees = [
  {
    x: 100,
    y: 800
  },
  {
    x: 200,
    y: 780
  },
  {
    x: 350,
    y: 810
  },
  {
    x: 460,
    y: 820
  },
  {
    x: 600,
    y: 760
  },
  {
    x: 760,
    y: 850
  },
];
let enemies = [
  {
    x: 800,
    y: 740,
    dead: false
  },

];
let mountains = [
  {
    x: 0,
    y: 500
  },
  {
    x: 100,
    y: 450
  }
];
let player = {
  x: 100,
  y: 100,
  grounded: true,
  yVelocity: 0,
  drawPlayer: function(){
    if (this.grounded){
      if (keyIsDown(65) && !keyIsDown(68)){
        fill(255, 228, 196); 
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0); 
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0); 
        rect(this.x - 15, this.y + 20, 10, 30);
        rect(this.x + 5, this.y + 10, 10, 30);
      }
      else if (keyIsDown(68) && !keyIsDown(65)){
        fill(255, 228, 196); 
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0); 
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0); 
        rect(this.x - 15, this.y + 10, 10, 30);
        rect(this.x + 5, this.y + 20, 10, 30);
      }
      else{
        fill(255, 228, 196);
        ellipse(this.x, this.y - 30, 30, 30); 
        fill(0);
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0);
        rect(this.x - 10, this.y + 20, 10, 30);
        rect(this.x + 0, this.y + 20, 10, 30);
      }
    }
    else{
      if (keyIsDown(65) && !keyIsDown(68)){
        fill(255, 228, 196); 
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0); 
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0); 
        rect(this.x - 20, this.y, 10, 30);
        rect(this.x + 0, this.y, 10, 30);
      }
      else if (keyIsDown(68) && !keyIsDown(65)){
        fill(255, 228, 196); 
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0); 
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0); 
        rect(this.x - 10, this.y, 10, 30);
        rect(this.x + 10, this.y, 10, 30);
      }
      else{
        fill(255, 228, 196); 
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0); 
        rect(this.x - 15, this.y - 20, 30, 40)
        fill(0); 
        rect(this.x - 20, this.y + 10, 10, 30);
        rect(this.x + 10, this.y + 10, 10, 30);
      }
    }
  },
  gravity: function(){
    this.y += this.yVelocity;
    if (this.y > 750){
      inConyoun = false;
      conyons.forEach(element => {
        if (element.checkInConyon(this.x)){
          inConyoun = true;
        }
      });
      if (!inConyoun){
        this.grounded = true;
        this.y = 750;
        this.yVelocity = 0;
      }
    }
    else{
      this.grounded = false;
    }
    for (let i = 0; i < enemies.length; i++){
      if (!enemies[i].dead && this.x - 10 < enemies[i].x && this.x + 10 > enemies[i].x && this.y > 740)
        enemies[i].dead = true;
    }
    this.yVelocity += 2;
  },
  jump: function(){
    if (this.grounded)
      this.yVelocity -= 20;
  },
  move: function(x){
    this.x += x;
  },
  control: function(){
    if (this.y > 750){
      inConyoun = false;
      conyons.forEach(element => {
        if (element.checkInConyon(this.x)){
          inConyoun = true;
        }
      });
      if (inConyoun){
        return;
      }
    }
    movementSpeed = 10
    if (keyIsDown(65)){
      this.move(-movementSpeed);
    }
    if (keyIsDown(68)){
      this.move(movementSpeed);
    }
    if (keyIsDown(87)){
      this.jump();
    }
  }
};

function setup() {
    lines = []
    for (let i = 0; i < 100; i++){
      lines.push(0);
    }
    conyons.push({
      x: 250,
      drawConyon: function(){
        fill(100); 
        rect(this.x, 800, 60, 200);
      },
      checkInConyon: function(x){
        if (x <= this.x + 60 && x >= this.x + 10)
          return true;
        return false;
      }
    })
    conyons.push({
      x: 500,
      drawConyon: function(){
        fill(100); 
        rect(this.x, 800, 60, 200);
      },
      checkInConyon: function(x){
        if (x <= this.x + 50 && x >= this.x + 10)
          return true;
        return false;
      }
    })
}

function drawTree(x, y) {
  fill(139, 69, 19); 
  rect(x, y, 20, 60);
  fill(34, 139, 34);
  ellipse(x + 10, y - 40, 60, 60); 
  ellipse(x - 10, y - 10, 60, 60); 
  ellipse(x + 30, y - 10, 60, 60);
}

function drawEnemy(x, y) {
  fill(0, 0, 19); 
  rect(x, y, 20, 60);
}

function drawTrees() {
  for (let i = 0; i < trees.length; i++){
    drawTree(trees[i].x,trees[i].y);
  }
}

function drawEnemies() {
  for (let i = 0; i < enemies.length; i++){
    if (!enemies[i].dead)
      drawEnemy(enemies[i].x,enemies[i].y);
  }
}

function drawMountain(x, y){
  fill(169, 169, 169);
  triangle(100 + x, 800, 300 + x, 100 + y, 500 + x, 800);
}

function drawLandscape () {
  createCanvas(1000, 1000); // 600 400
  background(135, 206, 235);
  fill(34, 139, 34);
  rect(0, 800, 1000, 200);
  for (let i = 0; i < mountains.length; i++){
    drawMountain(mountains[i].x,mountains[i].y);
  }
  conyons.forEach(element => {
    element.drawConyon();
  });
  fill(255, 223, 0);
  ellipse(500, 100, 80, 80);

}

function drawSnow(){
  stroke('white');
  strokeWeight(5);
  for (let i = 0; i < lines.length; i++){
    lines[i] += random(0, 100);
    if (lines[i] > 1000){
      lines[i] = 0;
    }
    line(lines[i], i * 10, lines[i] + 10, i * 10);
  }
  stroke('black');
  strokeWeight(1);
}

function draw() {
  drawLandscape();
  drawSnow();

  player.drawPlayer();
  player.gravity();
  player.control();

  drawTrees();
  drawEnemies();
}