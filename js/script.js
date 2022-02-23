/*----- constants -----*/
const winConditions = [
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
    {
        startingIndex: '00',
        rowInc: 0,
        colInc: 1,
    },
    {
        startingIndex: '10',
        rowInc: 0,
        colInc: 1,
    },
    {
        startingIndex: '20',
        rowInc: 1,
        colInc: 0,
    },
    {
        startingIndex: '30',
        rowInc: 0,
        colInc: 1,
    },
    {
        startingIndex: '40',
        rowInc: 0,
        colInc: 1,
    },
    {
        startingIndex: '50',
        rowInc: 0,
        colInc: 1,
    },
    {
        startingIndex: '00',
        rowInc: 1,
        colInc: 0,
    },
    {
        startingIndex: '01',
        rowInc: 1,
        colInc: 0,
    },
    {
        startingIndex: '02',
        rowInc: 1,
        colInc: 0,
    },
    {
        startingIndex: '03',
        rowInc: 1,
        colInc: 0,
    },
    {
        startingIndex: '04',
        rowInc: 1,
        colInc: 0,
    },
    {
        startingIndex: '05',
        rowInc: 1,
        colInc: 0,
    },
    {
        startingIndex: '06',
        rowInc: 1,
        colInc: 0,
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
var row, col;
var winner = false;
var count = 0;

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
    winConditions.forEach(cond => {
        analyzeBoard("Blue", parseInt(cond.startingIndex[0]), parseInt(cond.startingIndex[1]), cond.rowInc, cond.colInc)
        analyzeBoard("Yellow", parseInt(cond.startingIndex[0]), parseInt(cond.startingIndex[1]), cond.rowInc, cond.colInc)
    })
}

function analyzeBoard(incomingPlayer, startingRow, startingCol, rowInc, colInc) {
    let [rowNum, colNum] = [startingRow, startingCol];
    let [nextRow, nextCol] = [rowNum + rowInc, colNum + colInc];
    while (rowNum >= 0 && colNum >=0 && nextRow <= 5 && nextCol <= 6) {
        if (board[rowNum][colNum] == board[rowNum + rowInc][colNum + colInc] && board[rowNum][colNum] == incomingPlayer) {
            count++;
        }
        [rowNum, colNum] = [rowNum + rowInc, colNum + colInc];
        [nextRow, nextCol] = [rowNum + rowInc, colNum + colInc];
    }
    if (count == 3) {
        winner = incomingPlayer
    }
    count = 0;
}

function colFull(col) {
    for (let i = 0; i < 6; i++) {
        if (!board[i][col]) return false; 
    }
    return true;
}

function reset() {
    winner = false;
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