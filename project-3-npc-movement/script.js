/**  @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const NUMBER_OF_ENEMIES = 10;
const enemiesArray = []



let gameFrame = 0;

class Enemy {
  constructor() {
    this.enemyImage = new Image();
    this.enemyImage.src = "../Assets/project-3/enemy1.png"
    this.spriteWidth = 293;
    this.spriteHeigth = 155;
    this.width = this.spriteWidth / 3.5;
    this.height = this.spriteHeigth / 3.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }

  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;

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