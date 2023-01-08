let board = document.getElementsByClassName('board');
let currentPlayerr = document.getElementById('playerTurn');
let tiles = Array.from(document.getElementsByClassName('tiles'));
let btnrestart = document.getElementById('restart');

const letter_O ='O';
const letter_X = 'X';
let playerTurn = letter_X;
let spaces = Array(9).fill(null);

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function startGame(){
    tiles.forEach(tile=>tile.addEventListener('click', tileClicked))
    currentPlayerr.innerText=playerTurn;
    currentPlayerr.innerText=`It is ${playerTurn} turn.`;
}


function tileClicked(e){
    const id = e.target.id-1

    if(!spaces[id]){
        spaces[id] = playerTurn;
        e.target.innerText = playerTurn;


        if(PlayerHasWon() !== false){
            currentPlayerr.innerText = `${playerTurn} has won`;
            let winningBlock = PlayerHasWon();
            console.log(winningBlock)
            winningBlock.map(box => tiles[box].style.backgroundColor = '#ebe7fc')
            return;
        }
        playerTurn = playerTurn == letter_X ? letter_O : letter_X;
        currentPlayerr.innerText=`It is ${playerTurn} turn.`;

    }
}

function PlayerHasWon(){
    for (const combo of winningCombos){
        let [a, b, c] = combo;
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a, b, c];
        }
    }
    return false;
}


btnrestart.addEventListener('click', restart)

function restart(){
    spaces.fill(null);

    tiles.forEach(tile => {tile.innerText = '',
    tile.style.backgroundColor=''})
    playerTurn = letter_X;
    currentPlayerr.innerText=`It is ${playerTurn} turn.`;

}

startGame();