const Direction = {
    Up: 1,
    Down: 2,
    Left: 3,
    Right: 4,
  };
  
  const GameConfig = {
    gridSize: 30,
    tileSize: 10,
    gameSpeed: 90,
  };
  
  class Game {
    constructor() {
      this.snake = new Snake(this);
      this.apple = new Apple(this);
      this.gameOver = false;
      this.gameWindow = document.getElementById("game-window");
      this.ctx = this.gameWindow.getContext("2d");
      this.scoreTag = document.getElementById("score");
      this.updateScore();
    }
  
    tick() {
      setInterval(() => {
        if (this.gameOver) return;
        this.snake.move();
      }, GameConfig.gameSpeed);
    }
  
    renderTick() {
      setInterval(() => {
        this.ctx.clearRect(0, 0, this.gameWindow.width, this.gameWindow.height);
        this.snake.draw(this.ctx);
        this.apple.render(this.ctx);
      }, 1000 / 60);
    }
  
    updateScore() {
      this.scoreTag.innerText = `${this.snake.getLength() - 1} ${
        !this.gameOver ? "" : "(GAME OVER!)"
      }`;
    }
  
    checkWallCollision(position) {
      const { gridSize } = GameConfig;
      return (
        position.getX() < 0 ||
        position.getY() < 0 ||
        position.getX() >= gridSize ||
        position.getY() >= gridSize
      );
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
  
    draw(ctx) {
      const { tileSize } = GameConfig;
      this.tailPositions.forEach((pos, i) => {
        ctx.beginPath();
        ctx.rect(pos.getX() * tileSize, pos.getY() * tileSize, tileSize - 1, tileSize - 1);
        ctx.fillStyle = i === 0 ? "brown" : "green";
        ctx.fill();
      });
    }
  
    move() {
      const nextPosition = this.getNextPositionDir(this.direction);
  
      if (this.collideCheck(nextPosition)) {
        this.game.gameOver = true;
        this.game.updateScore();
        return;
      }
  
      this.position = nextPosition;
      this.tailPositions.unshift(this.position);
  
      if (this.tailPositions.length > this.length) {
        this.tailPositions.pop();
      }
  
      if (this.position.equals(this.game.apple.position)) {
        this.grow();
        this.game.apple.move();
      }
    }
  
    grow() {
      this.length++;
      this.game.updateScore();
    }
  
    collideCheck(nextPosition) {
      const { gridSize } = GameConfig;
  
      return (
        this.game.checkWallCollision(nextPosition) ||
        this.tailPositions.some((pos) => pos.equals(nextPosition))
      );
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
  
    render(ctx) {
      const { tileSize } = GameConfig;
      ctx.beginPath();
      ctx.rect(this.position.getX() * tileSize, this.position.getY() * tileSize, tileSize, tileSize);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  
    move() {
      const { gridSize } = GameConfig;
      let newPosition;
      do {
        newPosition = new Position(
          Math.floor(Math.random() * gridSize),
          Math.floor(Math.random() * gridSize)
        );
      } while (this.game.snake.tailPositions.some((pos) => pos.equals(newPosition)));
  
      this.position = newPosition;
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
  
  document.addEventListener("keydown", (e) => {
    if (!game) return;
  
    let oldDirection = game.snake.direction;
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
      let pos = game.snake.getNextPositionDir(newDirection);
      if (!pos.equals(game.snake.tailPositions[1])) {
        game.snake.direction = newDirection;
      }
    }
  
    e.preventDefault();
  });
  
  let game = new Game();
  game.tick();
  game.renderTick();
  