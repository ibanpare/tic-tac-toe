const gameboard = (function () {
    const Gameboard = () => {
        const rows = 3;
        const columns = 3;
        const board = [];
        for(let i = 0; i < columns; i++) {
            for(let j = 0; j < rows; j++) {
                board.push("0");
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