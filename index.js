console.log("Hello");

const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

console.log("context", context);

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

console.log("collisionsMap", collisionsMap);

class Boundery {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    canvas.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const bounderies = [];

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if(symbol === 1025)
    bounderies.push(
      new Boundery({
        position: { x: j * Boundery.width, y: i * Boundery.height },
      })
    );
  });
});

console.log('bounderies', bounderies)

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
    context.drawImage(this.image, this.position.x, this.position.y);
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
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
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
  if (keys.w.pressed && lastKey === "w") {
    background.position.y += 3;
  } else if (keys.a.pressed && lastKey === "a") {
    background.position.x += 3;
  } else if (keys.s.pressed && lastKey === "s") {
    background.position.y -= 3;
  } else if (keys.d.pressed && lastKey === "d") {
    background.position.x -= 3;
  }
}

animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
  console.log("e");
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
  console.log("keys", keys);
});

console.log(canvas);
