const gameboard = (function () {
    const Gameboard = () => {
        const rows = 3;
        const columns = 3;
        let board = [];
        for(let i = 0; i < columns; i++) {
            board[i] = [];
            for(let j = 0; j < rows; j++) {
                board[i].push("");
            }
        }
        return board;
    }

    const board = Gameboard()

    const displayBoard = () => {
        console.log(board)
    }

    const setCell = (value, row, column) => {
        board[row][column] = value;
    }

    return {board, setCell, displayBoard};
  })();

  // comments for game logic
  /*
IF 0, 3, 6 
  OR 0, 1, 2
  OR 3, 4, 5
  OR 6, 7, 8
  OR 1, 4, 7
  OR 2, 5, 8
  OR 0, 4, 8
  OR 2, 4, 6
  ARE EQUAL
  THEN THE PLAYER WHOSE SIGN IS THERE WINS
  ELSE IT'S A TIE
  */

// factory function for players
function createPlayer () {
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

function createGame () {
        const gameInit = () => {
            const player1 = createPlayer();
            const player2 = createPlayer();
            cleanBoard;
            return {player1, player2};
        }

        const nextTurn = () => {
            const activePlayer = "X";
            let playerChoiceColumn = parseInt(prompt("What's your column choice? (From 1 left, to 3 right)"));
            console.log(playerChoiceColumn)
            let playerChoiceRow = parseInt(prompt("What's your row choice? (From 1 top, to 3 bottom)"));
            console.log(playerChoiceColumn);

            gameboard.setCell(activePlayer,playerChoiceRow,playerChoiceColumn);
            gameboard.displayBoard();

        } 

        return { gameInit, nextTurn};
    } 

const newGame = createGame()