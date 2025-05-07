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
        if (board[row][column] != "") {
            return "busy cell";
        }
        board[row][column] = value;
    }

    return {board, setCell, displayBoard};
  })();

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
        const player1 = createPlayer();
        const player2 = createPlayer();

        const players = [player1, player2];
        
        let activePlayer = players[0];

        const GetActivePlayer = () => {
            return activePlayer;
        }

        const switchActivePlayer = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        }

        const checkWinner = () => {
          let flatBoard = gameboard.board.flat();
          console.log(flatBoard);
          if (
            ((flatBoard[0] == flatBoard[3]) == flatBoard[6] &&
              flatBoard[0] != "") ||
            ((flatBoard[0] == flatBoard[1]) == flatBoard[2] &&
              flatBoard[0] != "") ||
            ((flatBoard[3] == flatBoard[4]) == flatBoard[5] &&
              flatBoard[3] != "") ||
            ((flatBoard[6] == flatBoard[7]) == flatBoard[8] &&
              flatBoard[6] != "") ||
            ((flatBoard[1] == flatBoard[4]) == flatBoard[7] &&
              flatBoard[1] != "") ||
            ((flatBoard[2] == flatBoard[5]) == flatBoard[8] &&
              flatBoard[2] != "") ||
            ((flatBoard[0] == flatBoard[4]) == flatBoard[8] &&
              flatBoard[0] != "") ||
            ((flatBoard[2] == flatBoard[4]) == flatBoard[6] &&
              flatBoard[2] != "")
          ) {
            console.log("we have a winner");

///penserei meglio all'algoritmo perché è un po' un pippone di lunghezza qua, forse con filter? map? 
// inotlre ora è buggato perché il check != "" non è sufficiente

            /*
  THEN THE PLAYER WHOSE SIGN IS THERE WINS
  ELSE IT'S A TIE
  */
          }
        };

        const nextTurn = () => {
            let keepGoing = true;

            while (keepGoing) {
                let playerChoiceColumn = parseInt(prompt("What's your column choice? (0 | 1 | 2)"));
                let playerChoiceRow = parseInt(prompt("What's your row choice? (From 0 top, to 2 bottom)"));
    
                if(gameboard.setCell(GetActivePlayer().getSymbol,playerChoiceRow,playerChoiceColumn) == "busy cell") {
                    console.log("You can't pick that spot, choose another one.");
                } else {
                    keepGoing = false;
                }
            }
            gameboard.displayBoard();
            checkWinner();
            switchActivePlayer();
        } 

        return {GetActivePlayer, switchActivePlayer, nextTurn};
    } 

const newGame = createGame()