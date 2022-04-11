//css selektor
const mainBoard = document.querySelector("#canvasContainer");
//return value of DOMRect object
const { width, height } = mainBoard.getBoundingClientRect();
//canvas
const ctx = mainBoard.getContext("2d");

const creditBoard = document.querySelector("#creditBoard");
const creditBoardCtx = creditBoard.getContext("2d");

const controlBoard = document.querySelector("#controlBoard");
const controlBoardCtx = controlBoard.getContext("2d");

const icon = {
    SIZE: 200
};

const spinningSpeed = {
    FAST: "fast",
    MID: "middle",
    SLOW: "slow"
};

const animationSpeed = 8.5;

const sounds = {
    COINS: new Sound('coins', 'mp3'),
    JACKPOT: new Sound('jackpot', 'mp3'),
    SPIN: new Sound('spin', 'mp3'),
    CLICK: new Sound('click', 'mp3'),
};

const moneyOnStart = 2000;

const bet = {
    MAX_BET: 2000,
    MIN_BET: 100
}



