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
