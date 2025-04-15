'use strict';

// -------------------------------------------------------------- VARIABLEN --------------
let canvas, ctx, snake, fruit, direction, score, speed, gameInterval, head , fruitColor;


// ------------------------------------------------------------- FUNKTIONEN --------------

// ------------------------------------------------------------- game
const game = () => {
    canvas = document.querySelector('#gameCanvas');
    ctx = canvas.getContext('2d');
    snake = [{ x: 300, y: 300 }];
    score = 0;
    speed = 200;
    fruitColor = '#8c1c13';
    document.querySelector('#score').innerHTML = score;
    direction = 'RIGHT';
    fruit = randomPosition();
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, speed);
};
// ------------------------------------------------------------- updateGame
const updateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFruit();
    crash();
}
 //--------------------------------------------------------------- drawSnake
 const drawSnake = () => {
    snake.forEach(segment => {
       ctx.fillStyle = '#f99046';
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
};
//--------------------------------------------------------------- drawFruit
const drawFruit = () => {
    ctx.fillStyle = fruitColor;
    //ctx.fillStyle = '#8c1c13';
    ctx.fillRect(fruit.x, fruit.y, 20, 20);
};

 //--------------------------------------------------------------- crash
const crash = () => {
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        showGameOverPopup();
        
        clearInterval(gameInterval);
    }
};
//--------------------------------------------------------------- fruit randomPosition
const createNumber = (min, max) => ~~(Math.random() * (max - min + 1) + min);
const randomPosition = () => {
    let x = createNumber(0, 29) * 20;
    let y = createNumber(0, 29) * 20;
    return { x, y };
};
 //--------------------------------------------------------------- fruit random color 
const changeFruitColor = ()=> {
    let r = createNumber(0, 255);
    let g = createNumber(0, 255);
    let b = createNumber(0, 255);
    // canvas background = rgb(22,105,122)
    return (`rgb(${r},${g},${b})` === `rgb(22,105,122)`) ? changeFruitColor() : `rgb(${r},${g},${b})`;

}

 //--------------------------------------------------------------- moveSnake
 const moveSnake = () => {
    head = { ...snake[0] };
    switch (direction) {
        case 'LEFT':
            head.x -= 20;
            break;
        case 'RIGHT':
            head.x += 20;
            break;
        case 'UP':
            head.y -= 20;
            break;
        case 'DOWN':
            head.y += 20;
            break;
    }
    snake.unshift(head);
    if (head.x === fruit.x && head.y === fruit.y) {
        score += 1;
        document.querySelector('#score').innerHTML = score;
        fruit = randomPosition();
        speed -= 10;
        fruitColor = changeFruitColor();
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, speed);
// ------------------------------------------------------------------ animation
       document.querySelector('#gameCanvas').classList.add('flash');
        setTimeout(() => {
        document.querySelector('#gameCanvas').classList.remove('flash');}, 500);

    } else {
        snake.pop();
    }
};
 //--------------------------------------------------------------- directions event
const handleKeyDown = (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 'ArrowUp':
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') direction = 'DOWN';
            break;
    }
}
 //--------------------------------------------------------------- gameOverPopup
const showGameOverPopup = () => {
    const popup = document.querySelector('#gameOverPopup');
    popup.style.display = 'block';
}

const hideGameOverPopup = () => {
    const popup = document.querySelector('#gameOverPopup');
    popup.style.display = 'none';
}
//---------------------------------------------------------------- Eventlisteners -----------
const appendEventlisteners = () => {
    document.addEventListener('keydown', handleKeyDown);
    document.querySelector('#restartBtn').addEventListener('click', () => {
    hideGameOverPopup();
    game();
    });
}

const init = () => {
    game();
    appendEventlisteners();
}

//------------------------------------------------------------------ INIT -----------------
init();
