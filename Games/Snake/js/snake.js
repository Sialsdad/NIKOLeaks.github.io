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
        this.gameWindow = document.getElementById("game-window");
        this.ctx = this.gameWindow.getContext("2d");
        this.scoreTag = document.getElementById("score");

        document.addEventListener("keydown", (e) => {
            this.handleKeyPress(e);
        });
    }

    start() {
        this.tick();
        this.renderTick();
    }

    tick() {
        setInterval(() => {
            if (this.gameOver) return;
            this.snake.move();
        }, 90);
    }

    renderTick() {
        setInterval(() => {
            this.ctx.clearRect(0, 0, this.gameWindow.width, this.gameWindow.height);
            this.snake.draw(this.ctx);
            this.apple.render(this.ctx);
        }, 1000 / 60);
    }

    handleKeyPress(e) {
        if (!this.snake) return;

        let oldDirection = this.snake.direction;
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

        if (oldDirection != newDirection) {
            let pos = this.snake.getNextPositionDir(newDirection);
            if (!pos.equals(this.snake.tailPositions[1])) {
                this.snake.direction = newDirection;
            }
        }

        e.preventDefault();
    }

    updateScore() {
        this.scoreTag.innerText = `${this.snake.getLength() - 1} ${!this.gameOver ? "" : "(GAME OVER!)"}`;
    }

    gameOverHandler() {
        this.gameOver = true;
        this.updateScore();
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
        this.position = this.getNextPositionDir(this.direction);

        if (this.collideWithWalls() || this.collideWithTail()) {
            this.game.gameOverHandler();
            return;
        }

        this.collideWithApple();

        let temp = [];
        for (let x = 0; x < this.tailPositions.length; x++) {
            temp[x + 1] = this.tailPositions[x];
        }
        this.tailPositions = temp;

        this.position = new Position((this.position.getX() + 30) % 30, (this.position.getY() + 30) % 30);
        this.tailPositions[0] = this.position;
        this.tailPositions = this.tailPositions.filter((v, i) => i <= this.length);
    }

    grow() {
        this.length++;
        this.game.updateScore();
    }

    collideWithApple() {
        if (this.position.equals(this.game.apple.position)) {
            this.game.apple.onCollide(this);
        }
    }

    collideWithWalls() {
        const maxX = this.game.gameWindow.width / 10;
        const maxY = this.game.gameWindow.height / 10;

        return (
            this.position.getX() < 0 ||
            this.position.getY() < 0 ||
            this.position.getX() >= maxX ||
            this.position.getY() >= maxY
        );
    }

    collideWithTail() {
        return this.tailPositions.some((v, i) => i !== 0 && v.equals(this.position));
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
        const maxX = this.game.gameWindow.width / 10;
        const maxY = this.game.gameWindow.height / 10;

        this.position = new Position(Math.floor(Math.random() * maxX), Math.floor(Math.random() * maxY));
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

let game = new Game();
game.start();
