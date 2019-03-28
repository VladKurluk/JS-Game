let $start = document.querySelector('#start');
let $areaOverlay = document.querySelector('.game__overlay');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $gameTime = document.querySelector('#game-time');
let $computerResult = document.querySelector('#computer-result');
let $userResult = document.querySelector('#user-result');
let $finishResult = document.querySelector('#finish-result');
let $modalWindow = document.querySelector('#modal-window');
let $closeModal = document.querySelector('#modal-close');

let isGameStarted = false;
let clicked;

let randomBox = 0;
let $numberBox = null;

let computerScore = 0;
let userScore = 0;


window.addEventListener('load', renderBox);
$gameTime.addEventListener('input', setGameTime);
$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$closeModal.addEventListener('click', hideModal);


function startGame () {

    resetScore();

    setGameTime();
    $gameTime.setAttribute('disabled',true);

    isGameStarted = true;
    $areaOverlay.classList.add('hide');
    $start.classList.add('hide');
    

    let intervalGame = setInterval (function () {
        let time = parseFloat($time.textContent)
        

        if (time <= 0 || computerScore == 10 || userScore == 10) {
            clearInterval(intervalGame);
            clearInterval(intervalRender);
            endGame(userScore);
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100);
       
    let intervalRender = setInterval (renderColorSquare, 1000);
    
}



function setGameTime () {
    var time = parseInt($gameTime.value);

    $time.textContent = time.toFixed(1);
}

function renderColorSquare () {
    randomBox = getRandom (1, 100);
    $numberBox = document.querySelector('[data-box="' + randomBox + '"]');

    if ($numberBox.dataset.colored !== true) {
        $numberBox.style.backgroundColor = 'yellow';
        $numberBox.setAttribute('data-colored', true);
    }

    clicked = setTimeout(handleBoxNotClick, 999);
}

    

function handleBoxClick (event) {

    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box == randomBox) {
        userScore++;
        $numberBox.style.backgroundColor = 'green';
        $userResult.textContent = userScore;

        clearTimeout(clicked);
    }

}

function handleBoxNotClick () {
    computerScore++;
    $numberBox.style.backgroundColor = 'red';
    $computerResult.textContent = computerScore;
}


function endGame (user) {
    isGameStarted = false;
    
    clearTimeout(clicked);

    $areaOverlay.classList.remove('hide');
    $start.classList.remove('hide');
    $gameTime.removeAttribute('disabled');

    $finishResult.textContent = user;
    $modalWindow.classList.remove('hide');
    
    let sq = document.querySelectorAll("#game > div");
    for (let i = 0; i < sq.length; i++) {
        sq[i].removeAttribute('style');
        sq[i].removeAttribute('data-colored');
    }
}


function resetScore () {
    userScore = 0;
    $userResult.textContent = 0;
    computerScore = 0;
    $computerResult.textContent = 0;
}


function renderBox () {
    for(let i = 0; i < 100; i++){
        let $square = document.createElement("div");
        $square.classList.add("square");
        $square.innerText =" ";
        $square.setAttribute('data-box', i+1);
        $square.setAttribute('data-colored', false);
        $game.appendChild($square);
    }  
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function  hideModal () {
    $modalWindow.classList.add('hide');
}