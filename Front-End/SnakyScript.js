let score = 0;
const endScore = document.getElementById("score");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const celSize = 20;
let snake, apple, game, velocity = {x: 0, y: 0};

function createApple() {
    apple = {
        x: Math.floor(Math.random() * (canvas.width/celSize)) * celSize,
        y: Math.floor(Math.random() * (canvas.height/celSize)) * celSize
    };
}

function initGame() {
    snake = [{
        x: Math.floor(canvas.width / 2 / celSize) * celSize,
        y: Math.floor(canvas.height / 2 / celSize) * celSize
    }];
    createApple();
    velocity = {x: 0, y: 0};
    score = 0;
}

function updateSnake() {
    let head = {
        x: snake[0].x + velocity.x * celSize,
        y: snake[0].y + velocity.y * celSize
    };
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        score += 10;
        createApple();
    }
    else
        snake.pop();
}

function checkCollison() {
    let head = snake[0];

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height)
        endGame();

    for (let i = 1; i < snake.length; i++)
        if (snake[i].x === head.x && snake[i].y === head.y) {
            endGame();
            break;
        }
}

function draw() {
    ctx.fillStyle = "#006707";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, celSize, celSize);

    for (let i = 0; i < snake.length; i++) {
        i === 0 ? ctx.fillStyle = "blue" : ctx.fillStyle = "lightblue";
        ctx.fillRect(snake[i].x, snake[i].y, celSize, celSize);
    }
}

document.addEventListener("keydown", e => {
    switch (e.key.toLowerCase()) {
        case "arrowleft":
        case "a":
            if (velocity.x === 0) velocity = {x: -1, y: 0};
            break;
        case "arrowright":
        case "d":
            if (velocity.x === 0) velocity = {x: 1, y: 0};
            break;
        case "arrowup":
        case "w":
            if (velocity.y === 0) velocity = {x: 0, y: -1};
            break;
        case "arrowdown":
        case "s":
            if (velocity.y === 0) velocity = {x: 0, y: 1};
            break;
    }
});

function gameLoop() {
    updateSnake();
    checkCollison();
    draw();
}

function startGame() {
    initGame();
    if (game) clearInterval(game);
    game = setInterval(gameLoop, 100);
}

function endGame() {
    clearInterval(game);
    endScore.textContent = score;
    showGameOver();
}

function showGameOver(){
    gameScrean.classList.remove("visible");
    gameOverScrean.classList.add("visible");
}

const startBtn = document.getElementById("Start");
const menuBtn = document.getElementById("Menu");

const menuScrean = document.getElementById("MenuScrean");
const gameScrean = document.getElementById("GameScrean");
const gameOverScrean = document.getElementById("GameOverScrean");

startBtn.addEventListener("click", ()=>{
    menuScrean.classList.remove("visible");
    gameScrean.classList.add("visible");
    startGame();
});

menuBtn.addEventListener("click", () => {
    gameScrean.classList.remove("visible");
    menuScrean.classList.add("visible");
    if (game) clearInterval(game);
});