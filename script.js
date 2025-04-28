const gameboard = (function () {
    const Gameboard = () => {
        const rows = 3;
        const columns = 3;
        const board = [];
        for(let i = 0; i < columns; i++) {
            board[i] = [];
            for(let j = 0; j < rows; j++) {
                board[i].push("");
            }
        }
        return board;
    }
    return {Gameboard};
  })();

  console.log(gameboard.Gameboard());

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

// constructor function for players
function createPlayer () {
    const getName = prompt("What's the player name?");
    const getSymbol = prompt("What's the player symbol?");
    return { getName, getSymbol };
  }

// constructor function for game logic 

/*
function createGame () {
    // this logic should go in the createPlayer constructor function
    const player1 = createPlayer (prompt("What's the player 1 name?"),prompt("And what's the player one symbol?"));
    console.log(player1);

    const player2 = createPlayer (prompt("What's the player 2 name?"),prompt("And what's the player two symbol?"));
    console.log(player2);
} 
  /*
while gameOn = true
  player1 turn - asks for input
  adds input to board (this is a method)
  checks for winner (this is a method)
    if winner => gameOn = false
    declares winner (this is a method)
    Resets board (this is a method)
  if not player2 turn
    adds input to board
  checks for winner
    if winner => gameOn = false
    declares winner
    Resets board
  */