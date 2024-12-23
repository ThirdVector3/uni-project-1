let conyons = [];
let trees = [
  {
    x: 100,
    y: 250
  },
  {
    x: 200,
    y: 280
  },
  {
    x: 350,
    y: 260
  },
  {
    x: 460,
    y: 240
  }
];
let mountains = [
  {
    x: 0,
    y: 0
  },
  {
    x: 100,
    y: 50
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
    if (this.y > 250){
      inConyoun = false;
      conyons.forEach(element => {
        if (element.checkInConyon(this.x)){
          inConyoun = true;
        }
      });
      if (!inConyoun){
        this.grounded = true;
        this.y = 250;
        this.yVelocity = 0;
      }
    }
    else{
      this.grounded = false;
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
    if (this.y > 250){
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
        rect(this.x, 300, 60, 100);
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
        rect(this.x, 300, 60, 100);
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

function drawMountain(x, y){
  fill(169, 169, 169);
  triangle(100 + x, 300, 300 + x, 100 + y, 500 + x, 300);
}

function drawLandscape () {
  createCanvas(600, 400);
  background(135, 206, 235);
  fill(34, 139, 34);
  rect(0, 300, 600, 100);
  for (let i = 0; i < mountains.length; i++){
    drawMountain(mountains[i].x,mountains[i].y);
  }
  conyons.forEach(element => {
    element.drawConyon();
  });
  fill(255, 223, 0);
  ellipse(500, 100, 80, 80);
  for (let i = 0; i < trees.length; i++){
    drawTree(trees[i].x,trees[i].y);
  }

}

function drawSnow(){
  stroke('white');
  strokeWeight(5);
  for (let i = 0; i < 100; i++){
    lines[i] += random(0, 30);
    if (lines[i] > 600){
      lines[i] = 0;
    }
    line(lines[i], i * 4, lines[i] + 10, i * 4);
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
}