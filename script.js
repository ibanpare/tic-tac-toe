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
    if (board[row][column] != "") {
      return "busy cell";
    }
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

/* 

how the game works
one turn each
in each turn the player picks a position
the game write she symbol on the board in that position
the game checks if there's a winner
IF YES
  game ends
IF NO
  repeat

quindi se gioco dalla console chiamo 
nextTurn, per avere il prossimo turno dove il giocatore esegue la scelta
checkWinner per capire se il gioco continua o meno

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
      [111000000], // top row
      [000111000], // middle row
      [000000111], // bottom row
      [100100100], // left column
      [010010010], // middle column
      [001001001], // right column
      [100010001], // diagonal top-left to bottom-right
      [001010100], // diagonal top-right to bottom-left
    ];

    winningCombinations.forEach((element) => {
      if (element == mappedBoard) {
        console.log(`Game Over!\nThe winner is ${player.getName}`);
      }
    });
  };

  const nextTurn = () => {
    let keepGoing = true;

    while (keepGoing) {
      let playerChoiceColumn = parseInt(
        prompt("What's your column choice? (0 | 1 | 2)")
      );
      let playerChoiceRow = parseInt(
        prompt("What's your row choice? (From 0 top, to 2 bottom)")
      );

      if (
        gameboard.setCell(
          GetActivePlayer().getSymbol,
          playerChoiceRow,
          playerChoiceColumn
        ) == "busy cell"
      ) {
        console.log("You can't pick that spot, choose another one.");
      } else {
        keepGoing = false;
      }
    }
    gameboard.displayBoard();
    isWinner(activePlayer);
    switchActivePlayer();
  };

  return { players, GetActivePlayer, switchActivePlayer, nextTurn, isWinner };
}

const newGame = createGame();
// da qualche parte il while che continua a chiedere next turn? O forse non serve per quando ci sarà UI
// di certo mi serve il check game over, ma quasi quasi posticipo pure quello a quando c'è UI

/* Once you have a working console game, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).


quindi praticamente quest'oggetto fa:
displayBoard
e viene chiamato immediatamente come IIFE

displayboard
loop through flatboard
crea un div con textcontent il valore e con classe specifica così da stilare bene poi
stilero con flexbox o grid mandando a capo con questo modo

SetCell 
da capire se va nell'oggetto sopra o no, forse no
è un eventListener che al click sul div casella 
controlla se la cella è vuota
capisce chi è active player (quindi è dentro la game function)
mette marker apposito
chiama setcell per aggiornare anche l'array
*/

const displayController = (function () {
  const container = document.querySelector(".container");

  const displayBoard = () => {
    let flatBoard = gameboard.board.flat();
    flatBoard.forEach((element) => {
      const div = document.createElement("div");
      div.textContent = element;
      div.classList.add("cell")
      container.appendChild(div);
    });
  };

  const cleanBoard = () => {
    while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  }

  return {displayBoard, cleanBoard};
})();
