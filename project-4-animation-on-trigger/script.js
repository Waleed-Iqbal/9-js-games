/**  @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
const explosions = [];

let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    
    // multipication is faster than division
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    
    this.x = x;
    this.y = y;

    this.image = new Image();
    this.image.src = '../Assets/project-4/boom.png';

    this.frame = 0;
    this.timer = 0;
    this.anlge = Math.random() * 6.2;
  }

  update() {
    ++this.timer;
    if(this.timer % 8 === 0)  ++this.frame;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.anlge);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width * 0.5,
      0 - this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

window.addEventListener('click', createAnimation);

function createAnimation (e) {
  const positionX = e.x - canvasPosition.left;
  const positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  explosions.forEach(explosion => {
    explosion.update();
    explosion.draw();

    if(explosion.frame > 5) explosions.splice(explosions.indexOf(explosion), 1)
  })


  requestAnimationFrame(animate)
}


animate()