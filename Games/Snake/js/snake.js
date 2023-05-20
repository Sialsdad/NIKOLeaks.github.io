const Direction = {
    Up: 1,
    Down: 2,
    Left: 3,
    Right: 4
  };
  
  class Game {
    constructor() {
      this.snake = new Snake();
      this.apple = new Apple();
      this.gameOver = false;
      this.canvas = document.getElementById("game-window");
      this.context = this.canvas.getContext("2d");
      this.scoreTag = document.getElementById("score");
    }
  
    start() {
      this.tick();
      this.renderTick();
      this.setupEventListeners();
    }
  
    tick() {
      if (this.gameOver) return;
      this.snake.move();
      this.checkCollision();
      this.updateScore();
      setTimeout(() => this.tick(), 90);
    }
  
    renderTick() {
      this.clearCanvas();
      this.snake.draw(this.context);
      this.apple.render(this.context);
      requestAnimationFrame(() => this.renderTick());
    }
  
    clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    checkCollision() {
      if (this.snake.getPosition().equals(this.apple.position)) {
        this.snake.grow();
        this.apple.move();
      }
  
      if (this.snake.getTail().some((pos, i) => i !== 0 && pos.equals(this.snake.getPosition()))) {
        this.gameOver = true;
      }
    }
  
    updateScore() {
      this.scoreTag.innerText = `${this.snake.getLength() - 1} ${this.gameOver ? "(GAME OVER!)" : ""}`;
    }
  
    setupEventListeners() {
      document.addEventListener("keydown", (e) => {
        if (this.gameOver) return;
  
        const oldDirection = this.snake.direction;
        let newDirection = -1;
  
        switch (e.key) {
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
          const pos = this.snake.getNextPositionDir(newDirection);
          if (!pos.equals(this.snake.getTail()[1])) {
            this.snake.direction = newDirection;
          }
        }
  
        e.preventDefault();
      });
    }
  }
  
  class Snake {
    constructor() {
      this.length = 0;
      this.position = new Position(0, 0);
      this.tailPositions = [];
      this.direction = Direction.Right;
    }
  
    draw(ctx) {
      this.tailPositions.forEach((pos, i) => {
        ctx.beginPath();
        ctx.rect(pos.getX() * POSITION_SIZE, pos.getY() * POSITION_SIZE, POSITION_SIZE - 1, POSITION_SIZE - 1);
        ctx.fillStyle = i === 0 ? "brown" : "green";
        ctx.fill();
      });
    }
  
    move() {
      this.position = this.getNextPositionDir(this.direction);
  
      const temp = [this.position, ...this.tailPositions.slice(0, this.length)];
      this.tailPositions = temp.slice(0, this.length + 1);
  
      this.position = new Position(
        (this.position.getX() + GRID_SIZE) % GRID_SIZE,
        (this.position.getY() + GRID_SIZE) % GRID_SIZE
      );
      this.tailPositions[0] = this.position;
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
    constructor() {
      this.move();
    }
  
    render(ctx) {
      ctx.beginPath();
      ctx.rect(this.position.getX() * POSITION_SIZE, this.position.getY() * POSITION_SIZE, POSITION_SIZE, POSITION_SIZE);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  
    move() {
      this.position = new Position(
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      );
    }
  }
  
  class Position {
    constructor(x, y) {
      this.x = x;
      this.y = y;
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
  
  // Constants
  const GRID_SIZE = 30;
  const POSITION_SIZE = 10;
  
  // Create and start the game
  const game = new Game();
  game.start();
  