const Direction = {
    Up: 1,
    Down: 2,
    Left: 3,
    Right: 4
}

class Game {
    constructor() {
        this.snake = new Snake();
        this.apple = new Apple();
        this.gameOver = false;
    }

    tick() {
        setInterval(() => {
            if (this.gameOver) return;
            this.snake.move();
        }, 90);
    }

    renderTick() {
        setInterval(() => {
            ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
            this.snake.draw(ctx);
            this.apple.render(ctx);
        }, 1000 / 60);
    }
}

class Snake {
    constructor(game) {
        this.game = game;
        this.lenght = 0;
        this.position = new Position(0, 0);
        this.tailPositions = [];
        this.direction = Direction.Right;
    }

    draw(ctx) {
        this.tailPositions.forEach((pos, i) => {
            ctx.beginPath();
            ctx.rect((pos.getX() * 10), (pos.getY() * 10), 9, 9);
            ctx.fillStyle = i == 0 ? "brown" : "green";
            ctx.fill();
        });
    }

    move() {
        this.position = this.getNextPositionDir(this.direction);

        this.collideCheck();

        let temp = [];
        for (let x = 0; x < this.tailPositions.length; x++)temp[x + 1] = this.tailPositions[x];
        this.tailPositions = temp;

        this.position = new Position((this.position.getX() + 30) % 30, (this.position.getY() + 30) % 30);
        this.tailPositions[0] = this.position;
        this.tailPositions = this.tailPositions.filter((v, i) => i <= this.lenght);
    }

    grow() {
        this.lenght++;
        updateScore();
    }

    collideCheck() {
        if (this.position.equals(game.apple.position)) {
            game.apple.onCollide(this);
        }

        if (this.tailPositions.some((v, i) => i != 0 && v.equals(this.position))) {
            game.gameOver = true;
            updateScore();
        };
    }

    getNextPositionDir(dir) {
        switch (dir) {
            case Direction.Down: return this.position.add(0, 1);
            case Direction.Up: return this.position.add(0, -1);
            case Direction.Right: return this.position.add(1, 0);
            case Direction.Left: return this.position.add(-1, 0);
        }
    }

    getPosition() {
        return this.position;
    }

    getLength() {
        return this.lenght;
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
        this.x = xPos
        this.y = yPos
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
        return pos && this.x == pos.getX() && this.y == pos.getY();
    }
}

let updateScore = () => {
    scoreTag.innerText = `${game.snake.getLength() - 1} ${!game.gameOver ? "" : "(GAME OVER!)"}`;
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

    if (oldDirection != newDirection) {
        let pos = game.snake.getNextPositionDir(newDirection);
        if (!pos.equals(game.snake.tailPositions[1])) {
            game.snake.direction = newDirection;
        }
    }

    e.preventDefault();
});

let scoreTag = document.getElementById("score");
let gameWindow = document.getElementById("game-window");
let ctx = gameWindow.getContext("2d");

let game = new Game();
game.tick();
game.renderTick();