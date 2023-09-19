//Game board module
const gameBoard = (() => {
  let gameOver = false;
  let playerTurn = 1;
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const updateBoard = (row, col) => {

    //Check if game is over
    if (gameOver) {
        return;
    }

    if (playerTurn === 1) {
      board[row][col] = "X";
    } else if (playerTurn === 2) {
      board[row][col] = "O";
    }

    //Check for win
    checkForWin();
    //Refresh board
    displayDriver.displayBoard();
  };

  const resetBoard = () => {
    playerTurn = 1;
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const checkForWin = () => {
    // Check rows for wins
    for (let i = 0; i < 3; i++) {
      let matches = 0;
      for (let j = 1; j < 3; j++) {
        if (board[i][0] == board[i][j] && board[i][0] != "") {
          matches++;
        }
      }
      if (matches >= 2) {
        displayDriver.setEndDisplay("Player " + playerTurn + " wins!");
        return;
      }
    }

    //Check collumns for wins
    for (let i = 0; i < 3; i++) {
      let matches = 0;
      for (let j = 1; j < 3; j++) {
        if (board[0][i] == board[j][i] && board[0][i] != "") {
          matches++;
        }
      }
      if (matches >= 2) {
        displayDriver.setEndDisplay("Player " + playerTurn + " wins!");
        return;
      }
    }

    //Check diags for wins
    let leftMatches = 0;
    let rightMatches = 0;
    for (let i = 1; i < 3; i++) {
      if (board[0][0] === board[i][i] && board[0][0] != "") leftMatches++;
      if (board[0][2] === board[i][2 - i] && board[0][2] != "") rightMatches++;
    }
    if (leftMatches >= 2) {
      displayDriver.setEndDisplay("Player " + playerTurn + " wins!");
      return;
    }
    if (rightMatches >= 2) {
      displayDriver.setEndDisplay("Player " + playerTurn + " wins!");
      return;
    }

    //Check if board is full
    let full = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          full = false;
        }
      }
    }
    //Board is full, Cat's game
    if (full) {
      displayDriver.setEndDisplay("Cat's game!");
      return;
    }

    //No win, no full board, continue and switch player turn
    if (playerTurn === 1) {
        playerTurn = 2;
      } else if (playerTurn === 2) {
        playerTurn = 1;
      }
  };

  //Module responsible for displaying the board
  const displayDriver = (() => {
    const displayBoard = () => {
      const cellElements = document.getElementsByClassName("cell");
      Array.from(cellElements).forEach((element) => {
        let id = element.id;
        document.getElementById("cell-" + id[5] + "-" + id[7]).innerHTML =
          gameBoard.getBoard()[id[5]][id[7]];
      });
    };

    const setEndDisplay = (message) => {
      document.getElementById("end-game-message").innerHTML = message;
      document.getElementById("end-game-container").style.display = "block";
      gameOver = true;
    };

    return { displayBoard, setEndDisplay };
  })();

  return { getBoard, updateBoard, resetBoard, checkForWin, displayDriver };
})();

// Cell Action listeners
const cellElements = document.getElementsByClassName("cell");
Array.from(cellElements).forEach((element) => {
  element.addEventListener("click", () => {
    //Get ID string of element
    let id = element.id;
    if (gameBoard.getBoard()[id[5]][id[7]] === "") {
      gameBoard.updateBoard(id[5], id[7]);
    }
  });
});

// New game action listener
document.getElementById("new-game-button").addEventListener("click", () => {
  gameBoard.resetBoard();
  gameBoard.displayDriver.displayBoard();
  document.getElementById("end-game-container").style.display = "none";
  gameBoard.gameOver = false;
});
