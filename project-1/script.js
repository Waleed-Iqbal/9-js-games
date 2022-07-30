const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '../Assets/project-1/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let frameX = 0;
let frameY = 0;
let gameFrame = 0
const staggerFrame = 4;



function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const drawImage = {
    image: playerImage,
    spriteXPositionInImage: frameX * spriteWidth,
    spriteYPositionInImage: frameY * spriteHeight,
    spriteWidthInImage: spriteWidth,
    spriteHeightImage: spriteHeight,
    spriteXPosition: 0, 
    spriteYPosition: 0,
    spriteWidth: spriteWidth,
    spriteHeight: spriteHeight,
  }
  ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)


  if (gameFrame % staggerFrame === 0) {
    frameX = frameX < 6 ? frameX + 1 : 0;
    // frameY = frameY < 12 ? frameY + 1 : 0;
    gameFrame = 0
  }


  ++gameFrame;
  requestAnimationFrame(animate)
}


animate()