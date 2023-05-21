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
    }
  
    tick() {
      setInterval(() => {
        if (this.gameOver) return;
        this.snake.move();
      }, 150); // Increased interval to 150ms
    }
  
    renderTick() {
      setInterval(() => {
        ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
        this.snake.draw(ctx);
        this.apple.render(ctx);
        if (this.gameOver) {
          ctx.font = "30px Arial";
          ctx.fillStyle = "red";
          ctx.fillText("GAME OVER!", 100, 200);
          ctx.font = "20px Arial";
          ctx.fillStyle = "white";
          ctx.fillText("Retry", 180, 240);
        }
      }, 1000 / 30); // Increased interval to 30fps (33.33ms)
    }
  
    restart() {
      this.snake = new Snake(this);
      this.apple = new Apple(this);
      this.gameOver = false;
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
        game.gameOver = true;
        return;
      }
  
      this.position = nextPosition;
  
      if (this.collidesWithApple()) {
        this.grow();
        game.apple.move();
      }
  
      const temp = [null, ...this.tailPositions];
      this.tailPositions = temp.slice(0, this.length + 1);
  
      this.position = new Position((this.position.getX() + 30) % 30, (this.position.getY() + 30) % 30);
      this.tailPositions[0] = this.position;
    }
  
    collidesWithWall(position) {
      return position.getX() < 0 || position.getY() < 0 || position.getX() >= 30 || position.getY() >= 30;
    }
  
    collidesWithTail(position) {
      return this.tailPositions.some((v) => v.equals(position));
    }
  
    collidesWithApple() {
      return this.position.equals(game.apple.position);
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
  
    render(ctx) {
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
  
  const updateScore = () => {
    scoreTag.innerText = `${game.snake.getLength() - 1} ${!game.gameOver ? "" : "(GAME OVER!)"}`;
  };
  
  document.addEventListener("keydown", (e) => {
    if (!game) return;
  
    const oldDirection = game.snake.direction;
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
      const pos = game.snake.getNextPositionDir(newDirection);
      if (!pos.equals(game.snake.tailPositions[1])) {
        game.snake.direction = newDirection;
      }
    }
  
    e.preventDefault();
  });
  
  const scoreTag = document.getElementById("score");
  const gameWindow = document.getElementById("game-window");
  const ctx = gameWindow.getContext("2d");
  
  const game = new Game();
  game.tick();
  game.renderTick();
  
  gameWindow.addEventListener("click", () => {
    if (game.gameOver) {
      game.restart();
      updateScore();
    }
  });
  