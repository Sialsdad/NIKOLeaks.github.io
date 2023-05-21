// Constants for direction
const Direction = {
    Up: 1,
    Down: 2,
    Left: 3,
    Right: 4
  };
  
  class Game {
    constructor() {
      this.snake = new Snake(this);
      this.apple = new Apple(this);
      this.gameOver = false;
      this.scoreElement = document.getElementById("score");
      this.gameWindow = document.getElementById("game-window");
      this.context = this.gameWindow.getContext("2d");
      this.registerEventListeners();
      this.tick();
      this.renderTick();
    }
  
    registerEventListeners() {
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      this.gameWindow.addEventListener("click", this.handleGameWindowClick.bind(this));
    }
  
    handleKeyDown(event) {
      if (this.gameOver) return;
  
      const oldDirection = this.snake.direction;
      let newDirection = -1;
  
      switch (event.key) {
        case "ArrowDown":
          newDirection = Direction.Down;
          break;
        case "ArrowUp":
          newDirection = Direction.Up;
          break;
        case "ArrowLeft":
          newDirection = Direction.Left;
          break;
        case "ArrowRight":
          newDirection = Direction.Right;
          break;
        default:
          return;
      }
  
      if (oldDirection !== newDirection) {
        const nextPosition = this.snake.getNextPositionDir(newDirection);
        if (!nextPosition.equals(this.snake.tailPositions[1])) {
          this.snake.direction = newDirection;
        }
      }
  
      event.preventDefault();
    }
  
    handleGameWindowClick() {
      if (this.gameOver) {
        this.restart();
        this.updateScore();
      }
    }
  
    tick() {
      setInterval(() => {
        if (this.gameOver) return;
        this.snake.move();
      }, 150); // Increased interval to 150ms
    }
  
    renderTick() {
      setInterval(() => {
        this.clearCanvas();
        this.snake.draw();
        this.apple.render();
        if (this.gameOver) {
          this.drawGameOver();
        }
      }, 1000 / 30); // Increased interval to 30fps (33.33ms)
    }
  
    clearCanvas() {
      this.context.clearRect(0, 0, this.gameWindow.width, this.gameWindow.height);
    }
  
    drawGameOver() {
      const ctx = this.context;
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("GAME OVER!", 100, 200);
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Retry", 180, 240);
    }
  
    restart() {
      this.snake = new Snake(this);
      this.apple = new Apple(this);
      this.gameOver = false;
    }
  
    updateScore() {
      this.scoreElement.innerText = `${this.snake.getLength() - 1} ${!this.gameOver ? "" : "(GAME OVER!)"}`;
    }
  }
  
  class Snake {
    constructor(game) {
      this.game = game;
      this.length = 0;
      this.position = new Position(0, 0);
      this.tailPositions = [];
      this.direction = Direction.Right;
    }
  
    draw() {
      const ctx = this.game.context;
      this.tailPositions.forEach((pos, i) => {
        ctx.beginPath();
        ctx.rect(pos.getX() * 10, pos.getY() * 10, 9, 9);
        ctx.fillStyle = i === 0 ? "brown" : "green";
        ctx.fill();
      });
    }
  
    move() {
      const nextPosition = this.getNextPositionDir(this.direction);
  
      if (this.collidesWithWall(nextPosition) || this.collidesWithTail(nextPosition)) {
        this.game.gameOver = true;
        return;
      }
  
      this.position = nextPosition;
  
      if (this.collidesWithApple()) {
        this.grow();
        this.game.apple.move();
      }
  
      const temp = [];
      for (let x = 0; x < this.tailPositions.length; x++) {
        temp[x + 1] = this.tailPositions[x];
      }
      this.tailPositions = temp;
  
      this.position = new Position((this.position.getX() + 30) % 30, (this.position.getY() + 30) % 30);
      this.tailPositions[0] = this.position;
      this.tailPositions = this.tailPositions.filter((v, i) => i <= this.length);
    }
  
    collidesWithWall(position) {
      return position.getX() < 0 || position.getY() < 0 || position.getX() >= 30 || position.getY() >= 30;
    }
  
    collidesWithTail(position) {
      return this.tailPositions.some((v) => v.equals(position));
    }
  
    collidesWithApple() {
      return this.position.equals(this.game.apple.position);
    }
  
    grow() {
      this.length++;
    }
  
    getNextPositionDir(dir) {
      switch (dir) {
        case Direction.Down:
          return this.position.add(0, 1);
        case Direction.Up:
          return this.position.add(0, -1);
        case Direction.Right:
          return this.position.add(1, 0);
        case Direction.Left:
          return this.position.add(-1, 0);
      }
    }
  
    getPosition() {
      return this.position;
    }
  
    getLength() {
      return this.length;
    }
  
    getTail() {
      return this.tailPositions;
    }
  }
  
  class Apple {
    constructor(game) {
      this.game = game;
      this.move();
    }
  
    render() {
      const ctx = this.game.context;
      ctx.beginPath();
      ctx.rect(this.position.getX() * 10, this.position.getY() * 10, 10, 10);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  
    move() {
      this.position = new Position(Math.floor(Math.random() * 30), Math.floor(Math.random() * 30));
    }
  
    onCollide(snake) {
      snake.grow();
      this.move();
    }
  }
  
  class Position {
    constructor(xPos, yPos) {
      this.x = xPos;
      this.y = yPos;
    }
  
    add(xAdd, yAdd) {
      return new Position(this.x + xAdd, this.y + yAdd);
    }
  
    getX() {
      return this.x;
    }
  
    getY() {
      return this.y;
    }
  
    equals(pos) {
      return pos && this.x === pos.getX() && this.y === pos.getY();
    }
  }
  
  // Create a new instance of the Game class
  const game = new Game();
  