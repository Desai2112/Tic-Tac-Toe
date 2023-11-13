console.log("Hello");

let music = new Audio("music.mp3");
let turnaudio = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameOver = false;
let player1Name = "Player 1"
let player2Name = "Player 2"
// Function for changing the turn
const changeTurn = () => (turn === "X" ? "O" : "X");

// Function for winning
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxText');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector('.info').innerText =
  (boxtext[e[0]].innerText === 'X' ? player1Name : player2Name) + " Won";

            isgameOver = true;
            gameover.play();
            document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width =
                "200px";
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector('.line').style.width="20vw";
        }
    });
};

// Main game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxText');
    element.addEventListener('click', () => {
        music.play();
        if (!isgameOver && boxtext.innerText === '') {
            
            boxtext.innerHTML = turn;
            turn = changeTurn();
            turnaudio.play();
            checkWin();
            if (isgameOver !== true) {
                document.querySelector('.info').innerText = "Turn for " + (turn === 'X' ? player1Name : player2Name);

            }
        }
    });
});

// Reset button functionality
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxText');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    document.querySelector('.info').innerText = "Turn for " + (turn === 'X' ? player1Name : player2Name);
    isgameOver = false;
    document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.line').style.width="0vw";

});
