/**  @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 900;
const NUMBER_OF_ENEMIES = 30;
const enemiesArray = []



let gameFrame = 0;

class Enemy {
  constructor() {
    this.enemyImage = new Image();
    this.enemyImage.src = "../Assets/project-3/enemy4.png"
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213;
    this.spriteHeigth = 213;
    this.width = this.spriteWidth / 3.5;
    this.height = this.spriteHeigth / 3.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.newX = Math.random() * (canvas.width - this.width);
    this.newY = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update() {
    if(gameFrame % this.interval === 0) {
      gameFrame = 0;
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;

    this.x -= dx/70;
    this.y -= dy/70;
    //this.x = 0;
    //this.y = 0;
    if(this.x + this.width < 0) this.x = canvas.width;

    if(gameFrame % this.flapSpeed == 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++;
    }
  }

  draw() {
    ctx.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeigth, this.x, this.y, this.width, this.height);
  }
}

for (let i = 0; i < NUMBER_OF_ENEMIES; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  enemiesArray.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });

  gameFrame++;

  requestAnimationFrame(animate)
}


animate()