/**  @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const NUMBER_OF_ENEMIES = 3;
const enemiesArray = []



let gameFrame = 0;

class Enemy {
  constructor() {
    this.enemyImage = new Image();
    this.enemyImage.src = "../Assets/project-3/enemy3.png"
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeigth = 177;
    this.width = this.spriteWidth / 3.5;
    this.height = this.spriteHeigth / 3.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 1.5 + 0.5;
    this.curve = Math.random() * 200 + 50;
  }

  update() {
    this.x = canvas.width/2 * Math.sin(this.angle * Math.PI/90) + (canvas.width/2 - this.width/2);
    this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/180) + (canvas.height/2 - this.height/2);
    this.angle = this.angel > 1 || this.angel < -1 ? 0 : this.angle + this.angleSpeed;

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