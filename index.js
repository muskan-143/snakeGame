// Variables and constant.

const moveSound = new Audio('music/move.mp3');
const foodEatSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameOver.mp3');
const gameSound = new Audio('music/music.mp3');

let lastTime = 0;
let score = 0;
let highScore = 0;
let inputDirection = { x: 0, y: 0 };
let snakeBody = [
    { x: 13, y: 15 }
];

let food = { x: 8, y: 10 };
let board = document.getElementById('board');
let scoreHtml = document.getElementById('score');
let highScoreHtml = document.getElementById('highScore');

// game functions.
i = 1;
// Creating the Game loop.
function main(currentTime) {
    // Since the requestAnimationFrame() will be called one time so we need to call it again here to create the game loop.
    window.requestAnimationFrame(main);
    // Since it will be called very frequently so we need to defined the second after which we want to continue the work.
    if ((currentTime - lastTime) / 1000 < 1 / 5) {
        return;
    }
    lastTime = currentTime;

    gameEngine();

}

function isCollide(snake) {
    // When the snake collide with itself.
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }

    // Checking if the snake collide with the wall or not.
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}


function gameEngine() {
    if (highScore < score) {
        highScore = score;
        highScoreHtml.innerHTML = `<h4>High Score: ${highScore}</h4>`;
    }
    // Making the snake move.

    // Condition if the snake collide.
    if (isCollide(snakeBody)) {
        score = 0;
        gameOverSound.play();
        gameSound.pause();
        alert("Game Over! Press 'Ok' to start again");
        inputDirection = { x: 0, y: 0 };
        snakeBody = [{ x: 13, y: 15 }];
        scoreHtml.innerHTML = `Score: ${score}`;
        gameSound.play();
    }
    // If the food is eaten.
    // Increment the score and regenerate the food randomly.
    // Since the snake will eat the food when the snake head co-ordinate(x,y) is equal to the co-ordinate(x,y) of the food.
    if (snakeBody[0].y === food.y && snakeBody[0].x === food.x) {
        // moving the head of the snake to the direction where the food was present.
        foodEatSound.play();
        snakeBody.unshift({ x: snakeBody[0].x + inputDirection.x, y: snakeBody[0].y + inputDirection.y })

        // Generating the food co - ordinate as the food is eaten by the snake.
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score++;
        scoreHtml.innerHTML = `Score: ${score}`;
        if (highScore < score) {
            highScore = score;
            highScoreHtml.innerHTML = `<h4>High Score: ${highScore}</h4>`;
        }
    }


    // Moving the snake
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;



    // Displaying the food and snake.
    board.innerHTML = "";

    // For displaying the snake.
    snakeBody.forEach((e, index) => {
        // Creating a new element;
        snakeBodyElement = document.createElement('div');
        // since in javaScript the origin start from the top left conner.
        // So the row will be consider as "Y-axis" and column will be consider as "X-axis"
        snakeBodyElement.style.gridRowStart = e.y;
        snakeBodyElement.style.gridColumnStart = e.x;
        // Making the head and the body of the snake different in color.
        if (index === 0) {
            snakeBodyElement.classList.add('snakeHead');
        } else {
            snakeBodyElement.classList.add('snakeBody');
        }
        board.appendChild(snakeBodyElement);

    });

    // For displaying the food Items.

    // Creating a new element;
    foodElement = document.createElement('div');
    // since in javaScript the origin start from the top left conner.
    // So the row will be consider as "Y-axis" and column will be consider as "X-axis"
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    // Adding the food color.
    foodElement.classList.add('food');
    board.appendChild(foodElement);



}

// Game Logic.

// Instead of using setinterval function we can use requestAnimationFrame which is more flexible and avoid the screen to get from flick.
// It will be called one time.
window.requestAnimationFrame(main);

// Adding event listener so that whenever the user press the key we get to know what key is pressed.

window.addEventListener('keydown', (e) => {
    // the cases where we will move the snake up ,down, left and right as per the key press.
    moveSound.play();
    gameSound.play();
    inputDirection = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow UP");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("Arrow Down");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("Arrow Left");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
})