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
const offset = {
  x: -740,
    y: -600,
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      bounderies.push(
        new Boundery({
          position: { x: j * Boundery.width + offset.x, y: i * Boundery.height + offset.y },
        })
      );
  });
});

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./img/Pellet Town.png";

const playerImage = new Image();

playerImage.src = "./img/playerDown.png";

class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
      console.log("this.width", this.width);
      console.log("this.height", this.height);
    };
  }
  draw() {
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

// canvas.width / 2 - this.image.width / 4 / 2,
// canvas.height / 2 - this.image.height / 2,

const background = new Sprite({
  position: {
    x: -740,
    y: -600,
  },
  image: image,
});

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
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

const movable = [background, ...bounderies];

function rectangularCollisions({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  player.draw();
  bounderies.forEach((boundery) => {
    boundery.draw();

    if (
      rectangularCollisions({
        rectangle1: player,
        rectangle2: boundery,
      })
    ) {
      console.log('collliding');
    }
  });



  if (keys.w.pressed && lastKey === "w") {
    movable.forEach((movable) => {
      movable.position.y += 3;
    });
  } else if (keys.a.pressed && lastKey === "a") {
    movable.forEach((movable) => {
      movable.position.x += 3;
    });
  } else if (keys.s.pressed && lastKey === "s") {
    movable.forEach((movable) => {
      movable.position.y -= 3;
    });
  } else if (keys.d.pressed && lastKey === "d") {
    movable.forEach((movable) => {
      movable.position.x -= 3;
    });
  }
}

animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
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
});
