const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scoreSpan = document.querySelector("#score");

let box = 32;
let direction;
let snake = [];
let score = 0;
let maxWidth = 0;
let maxHeight = 0;

const maingame = document.querySelector(".main-game");
const userWidth = maingame.offsetWidth;
const userHeight = maingame.offsetHeight;

const snakeHead = new Image();
snakeHead.src = "Assest/Images/snakeHead.png";

const foodImg = new Image();
foodImg.src = "Assest/Images/apple.png";

for (let i = userWidth; i >= 0; i--) {
  if ((i / 32) % 2 == 0) {
    maxWidth = i - 32;
    break;
  }
}

for (let i = userHeight; i >= 0; i--) {
  if ((i / 32) % 2 == 0) {
    maxHeight = i - 32;
    break;
  }
}

snake[0] = {
  x: Math.floor(maxWidth / 2 / 32) * box,
  y: Math.floor(maxHeight / 2 / 32) * box,
};

let food = {
  x: Math.floor(Math.random() * (maxWidth / 32)) * box,
  y: Math.floor(Math.random() * (maxHeight / 32)) * box,
};

canvas.setAttribute("width", maxWidth);
canvas.setAttribute("height", maxHeight);

function groundDraw() {
  let y = 0;
  let rowColor = 0;
  while (y <= maxHeight) {
    for (let i = 0; i <= maxWidth - 32; i++) {
      if (rowColor % 2 == 0) {
        ctx.fillStyle = i % 2 == 0 ? "#273c75" : "#40739e";
        ctx.fillRect(i * 32, y, box, box);
      } else {
        ctx.fillStyle = i % 2 == 0 ? "#40739e" : "#273c75";
        ctx.fillRect(i * 32, y, box, box);
      }
    }
    rowColor += 1;
    y += 1 * 32;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 37 && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (e.keyCode === 38 && direction !== "DOWN") {
    direction = "UP";
  } else if (e.keyCode === 39 && direction !== "LEFT") {
    direction = "RIGHT";
  } else if (e.keyCode === 40 && direction !== "UP") {
    direction = "DOWN";
  }
});

var TO_RADIANS = Math.PI / 180;

function drawImage1(ctx, img, x, y, angle = 0, scale = 1) {
  ctx.save();
  ctx.translate(x + (img.width * scale) / 2, y + (img.height * scale) / 2);
  ctx.rotate(angle);
  ctx.translate(-x - (img.width * scale) / 2, -y - (img.height * scale) / 2);
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  ctx.restore();
}

function accident(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function restart() {
  clearInterval(game);
  snake = [];
  direction = null;
  score = 0;

  snake[0] = {
    x: Math.floor(maxWidth / 2 / 32) * box,
    y: Math.floor(maxHeight / 2 / 32) * box,
  };

  food = {
    x: Math.floor(Math.random() * (maxWidth / 32)) * box,
    y: Math.floor(Math.random() * (maxHeight / 32)) * box,
  };

  game = setInterval(draw, 100);
}

function draw() {
  groundDraw();
  scoreSpan.innerHTML = score;
  drawImage1(ctx, snakeHead, snake[0].x, snake[0].y, TO_RADIANS * 0);

  for (let i = 1; i < snake.length; i++) {
    ctx.fillStyle = "#CEDD36";
    ctx.fillRect(snake[i].x, snake[i].y, 32, 32);
  }

  ctx.drawImage(foodImg, food.x, food.y, 32, 32);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") {
    snakeX -= box;
    ctx.clearRect(snake[0].x, snake[0].y, snakeHead.width, snakeHead.height);
    drawImage1(ctx, snakeHead, snake[0].x, snake[0].y, TO_RADIANS * 90);
  }
  if (direction === "UP") {
    snakeY -= box;
    ctx.clearRect(snake[0].x, snake[0].y, snakeHead.width, snakeHead.height);
    drawImage1(ctx, snakeHead, snake[0].x, snake[0].y, TO_RADIANS * 180);
  }
  if (direction === "RIGHT") {
    snakeX += box;
    ctx.clearRect(snake[0].x, snake[0].y, snakeHead.width, snakeHead.height);
    drawImage1(ctx, snakeHead, snake[0].x, snake[0].y, TO_RADIANS * 270);
  }
  if (direction === "DOWN") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (maxWidth / 32)) * box,
      y: Math.floor(Math.random() * (maxHeight / 32)) * box,
    };
  } else {
    snake.pop();
  }

  if (
    snakeX >= maxWidth ||
    snakeX < 0 ||
    snakeY < 0 ||
    snakeY >= maxHeight ||
    accident(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game over!");
    restart();
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 100);
