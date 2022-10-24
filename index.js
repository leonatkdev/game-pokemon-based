console.log("Hello");

const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

console.log("context", context);

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./img/Pellet Town.png";

console.log("image", image);
const playerImage = new Image();

playerImage.src = "./img/playerDown.png";

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprite({
  position: {
    x: -740,
    y: -600,
  },
  image: image, 
});

const keys = {
  w:{
    pressed: false
  },
  a:{
    pressed: false
  },
  s:{
    pressed: false
  },
  d:{
    pressed: false
  },
}

function animate() {
  window.requestAnimationFrame(animate);
 background.draw() 
  context.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );
  if(key.w.pressed){
    background.position.y = background.position.y - 5
  }
}

animate();

window.addEventListener("keydown", (e) => {
  console.log("e");
  switch (e.key) {
    case "w":
      keys.w.pressed = true
      break;
    case "a":
      keys.a.pressed = true
    break;
    case "s":
      keys.s.pressed = true
      break;
    case "d":
      keys.d.pressed = true
      break;
  }
  console.log('keys', keys)
});

window.addEventListener("keyup", (e) => {
  console.log("e");
  switch (e.key) {
    case "w":
      keys.w.pressed = false
      break;
    case "a":
      keys.a.pressed = false
    break;
    case "s":
      keys.s.pressed = false
      break;
    case "d":
      keys.d.pressed = false
      break;
  }
  console.log('keys', keys)
});


console.log(canvas);
