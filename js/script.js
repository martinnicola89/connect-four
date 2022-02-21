/*----- constants -----*/
const diagConditions = [
    {
        startingIndex: '20',
        rowInc: 1,
        colInc: 1,
    },
    {
        startingIndex: '10',
        rowInc: 1,
        colInc: 1,
    },
    {
        startingIndex: '00',
        rowInc: 1,
        colInc: 1,
    },
    {
        startingIndex: '01',
        rowInc: 1,
        colInc: 1,
    },
    {
        startingIndex: '02',
        rowInc: 1,
        colInc: 1,
    },
    {
        startingIndex: '03',
        rowInc: 1,
        colInc: 1,
    },
    {
        startingIndex: '26',
        rowInc: 1,
        colInc: -1,
    },
    {
        startingIndex: '16',
        rowInc: 1,
        colInc: -1,
    },
    {
        startingIndex: '06',
        rowInc: 1,
        colInc: -1,
    },
    {
        startingIndex: '05',
        rowInc: 1,
        colInc: -1,
    },
    {
        startingIndex: '04',
        rowInc: 1,
        colInc: -1,
    },
    {
        startingIndex: '03',
        rowInc: 1,
        colInc: -1,
    },
]

/*----- app's state (variables) -----*/
var board = [
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
];

var player = "Blue";
var row, col, winner;
var horizCount = 0;
var vertCount = 0;
var diagCount = 0;

/*----- cached element references -----*/
var cells = document.getElementsByClassName('cell');
var messageEl = document.querySelector('.message');
var resetBtnEl = document.getElementById('reset-btn');

/*----- event listeners -----*/
Array.from(cells).forEach(cell => cell.addEventListener("click", handleClick));
resetBtnEl.addEventListener('click', reset);

/*----- functions -----*/
function handleClick(evt) {
    if (!winner) {
        col = evt.target.id[1];
        if (!colFull(col)) {
            fillBoard(col, board);
            render()
            checkWin()
            if (winner) {
                messageEl.innerText = `Player ${winner} wins!`
            } else {
                messageEl.innerText = 'Keep Playing!'
            }
            player = player == "Blue" ? "Yellow" : "Blue";
        } else messageEl.innerText = `Player ${player}. Column ${parseInt(col) + 1} is full!`
    }
}

function fillBoard(col, board) {
    for (let i = 5; i > -1; i--) {
        if (!board[i][col]) {
            row = i
            board[row][col] = player;
            return;
        }
    }
}

function render() {
    id = row+col
    if (player == "Blue") document.getElementById(id).style.backgroundColor = "blue"
    else document.getElementById(id).style.backgroundColor = "yellow"
}

function checkWin() { 
    horizWin("Blue");
    horizWin("Yellow");
    vertWin("Blue");
    vertWin("Yellow");
    diagConditions.forEach(cond => {
        diagWin("Blue", parseInt(cond.startingIndex[0]), parseInt(cond.startingIndex[1]), cond.rowInc, cond.colInc)
        diagWin("Yellow", parseInt(cond.startingIndex[0]), parseInt(cond.startingIndex[1]), cond.rowInc, cond.colInc)
    })
}

function horizWin(incomingPlayer) {
    for (let rowNum = 0; rowNum < 6; rowNum++) {
        for (let colNum = 0; colNum < 6; colNum++) {
            if (board[rowNum][colNum] == board[rowNum][colNum+1] && board[rowNum][colNum] == incomingPlayer) {
                horizCount++;
            } 
        }
        if (horizCount == 3) {
            winner = incomingPlayer
        } 
        horizCount = 0;
    }
}

function vertWin(incomingPlayer) {
    for (let colNum = 0; colNum < 7; colNum++) {
        for (let rowNum = 0; rowNum < 5; rowNum++) {
            if (board[rowNum][colNum] == board[rowNum+1][colNum] && board[rowNum][colNum] == incomingPlayer) {
                vertCount++;
            } 
        }
        if (vertCount == 3) {
            winner = incomingPlayer
        } 
        vertCount = 0;
    }
}

function diagWin(incomingPlayer, startingRow, startingCol, rowInc, colInc) {
    let [rowNum, colNum] = [startingRow, startingCol];
    let [nextRow, nextCol] = [rowNum + rowInc, colNum + colInc];
    while (rowNum >= 0 && colNum >=0 && nextRow <= 5 && nextCol <= 6) {
        if (board[rowNum][colNum] == board[rowNum + rowInc][colNum + colInc] && board[rowNum][colNum] == incomingPlayer) {
            diagCount++;
        }
        [rowNum, colNum] = [rowNum + rowInc, colNum + colInc];
        [nextRow, nextCol] = [rowNum + rowInc, colNum + colInc];
    }
    if (diagCount == 3) {
        winner = incomingPlayer
    }
    diagCount = 0;
}

function colFull(col) {
    for (let i = 0; i < 6; i++) {
        if (!board[i][col]) return false; 
    }
    return true;
}

function reset() {
    board = [
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
    ];
    player = "Blue";
    Array.from(cells).forEach(cell => cell.style.backgroundColor = "white")
    messageEl.innerText = "Click on a Column to Begin"
}