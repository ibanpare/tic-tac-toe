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
        console.table(board)
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

        // io direi di fare una funziona che genera board vincenti, prendendo in input simboli dei player e board vuota. poi con check winner fai loop tra le vincenti e se ne trovi una dichiari il vincitore corretto
// aggiornamento, c'ero quasi mi sa, ho notato su reddit che fanno le board vincenti, ma le ottimizzano molto convertendo in binario, e lo fanno per ogni player, quindi sarebbero due chiamate alla funzione + da una parte c'è un'array con le combinazioni vincenti

            /*
  THEN THE PLAYER WHOSE SIGN IS THERE WINS
  ELSE IT'S A TIE
  */

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
            if(element == mappedBoard) {
                console.log("we have a winner");
            }
          })
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
            isWinner(activePlayer);
            // magari qui da mettere un if che dice chi vince? o gestirla con active player
            switchActivePlayer();
        } 

        return {players, GetActivePlayer, switchActivePlayer, nextTurn, isWinner};
    } 

const newGame = createGame()