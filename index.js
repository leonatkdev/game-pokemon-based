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

const bounderies = [];

const offset = {
  x: -740,
  y: -600,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      bounderies.push(
        new Boundery({
          position: {
            x: j * Boundery.width + offset.x,
            y: i * Boundery.height + offset.y,
          },
        })
      );
  });
});

context.fillStyle = 'rgba(255, 0, 0, 0.0)';
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./img/Pellet Town.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/foregroundObjects.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2 ,
    y: canvas.height / 2 - 68 / 4,
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

const movable = [background, foreground ,...bounderies];

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
  foreground.draw()
  bounderies.forEach((boundery) => {
    boundery.draw();
  });
  let moving = true;
  player.moving = false;

  if (keys.w.pressed && lastKey === "w") {
    player.moving = true
    for (let i = 0; i < bounderies.length; i++) {
      const boundery = bounderies[i];
      if (
        rectangularCollisions({
          rectangle1: player,
          rectangle2: {
            ...boundery,
            position: {
              x: boundery.position.x,
              y: boundery.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movable.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.moving = true
    for (let i = 0; i < bounderies.length; i++) {
      const boundery = bounderies[i];
      if (
        rectangularCollisions({
          rectangle1: player,
          rectangle2: {
            ...boundery,
            position: {
              x: boundery.position.x + 3,
              y: boundery.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movable.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.moving = true
    for (let i = 0; i < bounderies.length; i++) {
      const boundery = bounderies[i];
      if (
        rectangularCollisions({
          rectangle1: player,
          rectangle2: {
            ...boundery,
            position: {
              x: boundery.position.x,
              y: boundery.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movable.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.moving = true
    for (let i = 0; i < bounderies.length; i++) {
      const boundery = bounderies[i];
      if (
        rectangularCollisions({
          rectangle1: player,
          rectangle2: {
            ...boundery,
            position: {
              x: boundery.position.x - 3,
              y: boundery.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
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
