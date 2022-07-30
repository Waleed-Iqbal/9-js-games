let playerState = 'run';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
  playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '../Assets/project-1/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;


let gameFrame = 0
const staggerFrame = 4;
const spriteAnimations = {};
const animationStates = [{
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
];


animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({
      x: positionX,
      y: positionY
    })
  }
  spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations)


function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // to make the postion value between 0 and total number of key-frames
  let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;

  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  const drawImage = {
    image: playerImage,
    spriteXPositionInImage: frameX,
    spriteYPositionInImage: frameY,
    spriteWidthInImage: spriteWidth,
    spriteHeightImage: spriteHeight,
    spriteXPosition: 0,
    spriteYPosition: 0,
    spriteWidth: spriteWidth,
    spriteHeight: spriteHeight,
  }

  ctx.drawImage(...Object.values(drawImage))
  // ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);


  // if (gameFrame % staggerFrame === 0) {
  //   frameX = frameX < 6 ? frameX + 1 : 0;
  //   // frameY = frameY < 12 ? frameY + 1 : 0;
  //   gameFrame = 0
  // }


  ++gameFrame;
  requestAnimationFrame(animate)
}


animate()