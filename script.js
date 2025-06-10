const gameboard = (function () {
  const Gameboard = () => {
    const rows = 3;
    const columns = 3;
    let board = [];
    for (let i = 0; i < columns; i++) {
      board[i] = [];
      for (let j = 0; j < rows; j++) {
        board[i].push("");
      }
    }
    return board;
  };

  const board = Gameboard();

  const displayBoard = () => {
    console.table(board);
  };

  const setCell = (value, row, column) => {
    board[row][column] = value;
  };

  return { board, setCell, displayBoard };
})();

// factory function for players
function createPlayer() {
  const getName = prompt("What's the player name?");
  const getSymbol = prompt("What's the player symbol?");
  return { getName, getSymbol };
}

// factory function for game logic

/* TO DO
- bisogna gestire il "do you want to play again"
- bisogna gestire il playagain con altri players. Ma potrei dire di refreshare la pagina 

*/
function createGame() {
  const player1 = createPlayer();
  const player2 = createPlayer();

  const players = [player1, player2];

  let activePlayer = players[0];

  const GetActivePlayer = () => {
    return activePlayer;
  };

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const isWinner = (player) => {
    let flatBoard = gameboard.board.flat();

    const symbol = player.getSymbol;

    let mappedBoard = flatBoard.map((num) => {
      if (num == symbol) return 1;
      else return 0;
    });

    mappedBoard = mappedBoard.join("");

    const winningCombinations = [
      ["111000000"], // top row
      ["000111000"], // middle row
      ["000000111"], // bottom row
      ["100100100"], // left column
      ["010010010"], // middle column
      ["001001001"], // right column
      ["100010001"], // diagonal top-left to bottom-right
      ["001010100"], // diagonal top-right to bottom-left
    ];

    //TO DO bug sotto, perché controlla esattamente l'uguaglianza, bisogna farlo diversamente

    winningCombinations.forEach((element) => {
      if (element == mappedBoard) {
        console.log(`Game Over!\nThe winner is ${player.getName}`);
        resetBoard();
        displayController.cleanBoard();
      }
    });
  };

  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameboard.board[i][j] = "";
      }
    }
  };

  const nextTurn = (position) => {
    let playerChoiceColumn = "";
    let playerChoiceRow = "";

    switch (position) {
      case 1:
        playerChoiceColumn = 0;
        playerChoiceRow = 0;
        break;
      case 2:
        playerChoiceColumn = 1;
        playerChoiceRow = 0;
        break;
      case 3:
        playerChoiceColumn = 2;
        playerChoiceRow = 0;
        break;
      case 4:
        playerChoiceColumn = 0;
        playerChoiceRow = 1;
        break;
      case 5:
        playerChoiceColumn = 1;
        playerChoiceRow = 1;
        break;
      case 6:
        playerChoiceColumn = 2;
        playerChoiceRow = 1;
        break;
      case 7:
        playerChoiceColumn = 0;
        playerChoiceRow = 2;
        break;
      case 8:
        playerChoiceColumn = 1;
        playerChoiceRow = 2;
        break;
      case 9:
        playerChoiceColumn = 2;
        playerChoiceRow = 2;
        break;
    }

    gameboard.setCell(
      GetActivePlayer().getSymbol,
      playerChoiceRow,
      playerChoiceColumn
    )
    displayController.cleanBoard();
    displayController.displayBoard();
    isWinner(activePlayer);
    switchActivePlayer();
  };

  return { players, GetActivePlayer, switchActivePlayer, nextTurn, isWinner };
}

// di certo mi serve il check game over, ma quasi quasi posticipo pure quello a quando c'è UI

const displayController = (function () {
  const container = document.querySelector(".container");

  const displayBoard = () => {
    let flatBoard = gameboard.board.flat();
    let position = 0;
    flatBoard.forEach((element) => {
      const div = document.createElement("div");
      div.textContent = element;
      div.classList.add("cell");
      position += 1;
      div.setAttribute("id", `${position}`);
      container.appendChild(div);

      div.addEventListener("click", (e) => {
        if(e.target.textContent != "") {
          return;
        }
        let symbol = newGame.GetActivePlayer().getSymbol;
        e.target.textContent = symbol;
        let position = parseInt(e.target.id);
        newGame.nextTurn(position);
      });
    });
  };

  const cleanBoard = () => {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  };

  return { displayBoard, cleanBoard };
})();

const newGame = createGame();
displayController.displayBoard();
