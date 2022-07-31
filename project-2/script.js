const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 10;

const slider = document.getElementById('slider');
const showGameSpeed = document.getElementById('showGameSpeed');

slider.value = gameSpeed;
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener('change', function(e) {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = gameSpeed;
});

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;

    if (this.x <= -this.width) {
      this.x = 0;
    }

    this.x = Math.floor(this.x - this.speed);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}


const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();
backgroundLayer1.src = '../Assets/project-2/backgroundLayers/layer-1.png';
backgroundLayer2.src = '../Assets/project-2/backgroundLayers/layer-2.png';
backgroundLayer3.src = '../Assets/project-2/backgroundLayers/layer-3.png';
backgroundLayer4.src = '../Assets/project-2/backgroundLayers/layer-4.png';
backgroundLayer5.src = '../Assets/project-2/backgroundLayers/layer-5.png';

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);


const gameObjects = [layer1, layer2, layer3, layer4, layer5];


function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


  gameObjects.forEach((object) => {
    object.update();
    object.draw();
  })


  requestAnimationFrame(animate)
}

animate()