const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let backgroundSong;
let deathSound;
let coinSound;
let jumpSound;

let conyons = [];
let trees = [];
let enemies = [];
let collectables = [];
let mountains = [];

let score = 0;

let player = {
  x: 100,
  y: 600,
  grounded: true,
  yVelocity: 0,
  drawPlayer: function () {
    if (this.grounded) {
      if (keyIsDown(65) && !keyIsDown(68)) {
        fill(255, 228, 196);
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0);
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0);
        rect(this.x - 15, this.y + 20, 10, 30);
        rect(this.x + 5, this.y + 10, 10, 30);
      } else if (keyIsDown(68) && !keyIsDown(65)) {
        fill(255, 228, 196);
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0);
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0);
        rect(this.x - 15, this.y + 10, 10, 30);
        rect(this.x + 5, this.y + 20, 10, 30);
      } else {
        fill(255, 228, 196);
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0);
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0);
        rect(this.x - 10, this.y + 20, 10, 30);
        rect(this.x + 0, this.y + 20, 10, 30);
      }
    } else {
      if (keyIsDown(65) && !keyIsDown(68)) {
        fill(255, 228, 196);
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0);
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0);
        rect(this.x - 20, this.y, 10, 30);
        rect(this.x + 0, this.y, 10, 30);
      } else if (keyIsDown(68) && !keyIsDown(65)) {
        fill(255, 228, 196);
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0);
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0);
        rect(this.x - 10, this.y, 10, 30);
        rect(this.x + 10, this.y, 10, 30);
      } else {
        fill(255, 228, 196);
        ellipse(this.x, this.y - 30, 30, 30);
        fill(0);
        rect(this.x - 15, this.y - 20, 30, 40);
        fill(0);
        rect(this.x - 20, this.y + 10, 10, 30);
        rect(this.x + 10, this.y + 10, 10, 30);
      }
    }
  },
  gravity: function () {
    this.y += this.yVelocity;
    if (this.y > 750) {
      inConyoun = false;
      conyons.forEach((element) => {
        if (element.checkInConyon(this.x)) {
          inConyoun = true;
        }
      });
      if (!inConyoun) {
        this.grounded = true;
        this.y = 750;
        this.yVelocity = 0;
      }
    } else {
      this.grounded = false;
    }
    this.yVelocity += 2;
  },
  jump: function () {
    if (this.grounded) this.yVelocity -= 20;
  },
  move: function (x) {
    this.x += x;
  },
  control: function () {
    if (this.y > 1000) {
      this.reset();
      score -= 5;
    }
    if (this.y > 750) {
      inConyoun = false;
      conyons.forEach((element) => {
        if (element.checkInConyon(this.x)) {
          inConyoun = true;
        }
      });
      if (inConyoun) {
        return;
      }
    }
    movementSpeed = 10;
    if (keyIsDown(65)) {
      this.move(-movementSpeed);
    }
    if (keyIsDown(68)) {
      this.move(movementSpeed);
    }
    if (keyIsDown(87)) {
      this.jump();
    }
    this.detectCollectables();
    this.detectEnemies();
  },
  detectCollectables: function () {
    let range = 20;
    for (let i = 0; i < collectables.length; i++) {
      if (
        this.x - range < collectables[i].x &&
        this.x + range > collectables[i].x &&
        this.y - range < collectables[i].y &&
        this.y + range > collectables[i].y
      ) {
        collectables.splice(i, 1);
        generateCollectable();
        score += 1;
        coinSound.play();
      }
    }
  },
  detectEnemies: function () {
    let range = 25;
    for (let i = 0; i < enemies.length; i++) {
      if (
        !enemies[i].dead &&
        this.x - range < enemies[i].x &&
        this.x + range > enemies[i].x &&
        this.y < 750 &&
        this.y > 730
      ) {
        enemies[i].death();
        score += 2;
        deathSound.play();
      } else if (
        !enemies[i].dead &&
        this.x - range < enemies[i].x &&
        this.x + range > enemies[i].x &&
        this.y > 749
      ) {
        this.reset();
        score -= 5;
      }
    }
  },
  reset: function () {
    this.x = 100;
    this.y = 600;
    generateCollectables();
    generateMountains();
    generateTrees();
    deathSound.play();
  },
};

function setup() {
  lines = [];
  for (let i = 0; i < 100; i++) {
    lines.push(0);
  }
  generateConyouns();
  generateMountains();
  generateTrees();
  generateCollectables();
  generateEnemies();
  initMusic();
}

async function initMusic() {
  backgroundSong = loadSound("1383729_Wintry.mp3");
  jumpSound = loadSound("jump.ogg");
  deathSound = loadSound("hit2.ogg");
  coinSound = loadSound("money.ogg");
  await delay(1000);
  backgroundSong.play();
}

function generateEnemies() {
  enemies = [];
  enemies.push({
    x: 800,
    y: 740,
    dead: false,
    movingRight: true,
    death: async function () {
      this.dead = true;
      await delay(5000);
      this.dead = false;
    },
    move: function () {
      if (this.x > 900) this.movingRight = false;
      if (this.x < 600) this.movingRight = true;
      if (this.movingRight == true) this.x += 2;
      else this.x -= 2;
    },
  });
}

function generateCollectables() {
  collectables = [];
  for (let i = 0; i < 7; i++) {
    collectables.push({
      x: random(100, 900),
      y: random(650, 750),
    });
  }
}

function generateCollectable() {
  collectables.push({
    x: random(100, 900),
    y: random(650, 750),
  });
}

function generateTrees() {
  trees = [];
  for (let i = 0; i < 7; i++) {
    if (i != 2 && i != 3) {
      trees.push({
        x: random(0, 50) + i * 150,
        y: random(800, 900),
      });
    }
  }
}

function generateMountains() {
  mountains = [];
  mountains.push({
    x: 0,
    y: random(300, 600),
  });
  mountains.push({
    x: 100,
    y: random(300, 600),
  });
}

function generateConyouns() {
  conyons = [];
  conyons.push({
    x: 250,
    drawConyon: function () {
      fill(100);
      rect(this.x, 800, 60, 200);
    },
    checkInConyon: function (x) {
      if (x <= this.x + 60 && x >= this.x + 10) return true;
      return false;
    },
  });
  conyons.push({
    x: 500,
    drawConyon: function () {
      fill(100);
      rect(this.x, 800, 60, 200);
    },
    checkInConyon: function (x) {
      if (x <= this.x + 50 && x >= this.x + 10) return true;
      return false;
    },
  });
}

function drawCollectable(x, y) {
  fill(224, 189, 13);
  ellipse(x, y, 30, 30);
  fill(0);
  textSize(25);
  text("$", x - 7, y + 8);
}

function drawCollectables() {
  for (let i = 0; i < collectables.length; i++) {
    drawCollectable(collectables[i].x, collectables[i].y);
  }
}

function drawTree(x, y) {
  fill(139, 69, 19);
  rect(x, y, 20, 60);
  fill(34, 139, 34);
  ellipse(x + 10, y - 40, 60, 60);
  ellipse(x - 10, y - 10, 60, 60);
  ellipse(x + 30, y - 10, 60, 60);
}

function drawEnemy(x, y, right) {
  x -= 20;
  fill(0, 0, 19);
  rect(x, y, 40, 60);
  fill(255);
  if (right) {
    rect(x + 28, y + 3, 10, 10);
    rect(x + 13, y + 3, 10, 10);
  } else {
    rect(x + 1, y + 3, 10, 10);
    rect(x + 15, y + 3, 10, 10);
  }
}

function drawTrees() {
  for (let i = 0; i < trees.length; i++) {
    drawTree(trees[i].x, trees[i].y);
  }
}

function drawEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    if (!enemies[i].dead)
      drawEnemy(enemies[i].x, enemies[i].y, enemies[i].movingRight);
  }
}

function drawMountain(x, y) {
  fill(169, 169, 169);
  triangle(100 + x, 800, 300 + x, 100 + y, 500 + x, 800);
}

function drawLandscape() {
  createCanvas(1000, 1000); // 600 400
  background(135, 206, 235);
  fill(34, 139, 34);
  rect(0, 800, 1000, 200);
  for (let i = 0; i < mountains.length; i++) {
    drawMountain(mountains[i].x, mountains[i].y);
  }
  conyons.forEach((element) => {
    element.drawConyon();
  });
  fill(255, 223, 0);
  ellipse(500, 100, 80, 80);
}

function drawSnow() {
  stroke("white");
  strokeWeight(5);
  for (let i = 0; i < lines.length; i++) {
    lines[i] += random(0, 100);
    if (lines[i] > 1000) {
      lines[i] = 0;
    }
    line(lines[i], i * 10, lines[i] + 10, i * 10);
  }
  stroke("black");
  strokeWeight(1);
}

function draw() {
  drawLandscape();
  drawSnow();

  player.drawPlayer();
  player.gravity();
  player.control();

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
  }

  drawEnemies();
  drawTrees();
  drawCollectables();

  fill("black");
  textSize(50);
  text("score: " + score.toString(), 350, 50);
}
