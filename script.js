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

function createPlayer(player) {
  const player_name = document.querySelector(`#${player}_name`)
  const player_symbol = document.querySelector(`#${player}_symbol`)
  const getName = player_name.value;
  const getSymbol = player_symbol.value;
  player_name.value = "";
  player_symbol.value = "";
  return { getName, getSymbol };
}

// factory function for game logic
function createGame() {
  const player1 = createPlayer("player1");
  const player2 = createPlayer("player2");
  displayController.displayBoard();

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

    const winningCombinations = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left col
      [1, 4, 7], // middle col
      [2, 5, 8], // right col
      [0, 4, 8], // diag TL-BR
      [2, 4, 6], // diag TR-BL
    ];

    //checks flattened board for matching with winning combinations indexes

    if (
      winningCombinations.some((combination) =>
        combination.every((index) => mappedBoard[index] === 1)
      )
    ) {
      displayController.displayWinner(player.getName);
      resetBoard();
      displayController.cleanBoard();
    }
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
    );
    displayController.cleanBoard();
    displayController.displayBoard();
    isWinner(activePlayer);
    switchActivePlayer();
  };

  return { players, GetActivePlayer, switchActivePlayer, nextTurn, isWinner };
}

const displayController = (function () {
  const container = document.querySelector(".container");
  const resultDiv = document.querySelector(".result");

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
        if (e.target.textContent != "") {
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

  const displayWinner = (playerName) => {
      const div = document.createElement("div");
      div.classList.add("result");
      div.textContent = `Game Over!\nThe winner is ${playerName}`;
      resultDiv.appendChild(div);
  }

  return { displayBoard, cleanBoard, displayWinner};
})();

const newGameButton = document.querySelector("button.new-game");
newGameButton.addEventListener("click", () => { 
  const resultDiv = document.querySelector(".result");
  if(resultDiv.firstChild) resultDiv.removeChild(resultDiv.firstChild);
  return newGame = createGame();
})