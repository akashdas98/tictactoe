const Gameboard = (() => {
  let gameBoard = [];

  function changeBoard(choice, index) {
    gameBoard[index] = choice;
  }

  function checkWin(player) {
    return winCondition(player.choice)
  }

  function winCondition(choice) {
    return (
      (choice == gameBoard[0] && choice == gameBoard [1] && choice == gameBoard[2]) ||
      (choice == gameBoard[3] && choice == gameBoard [4] && choice == gameBoard[5]) ||
      (choice == gameBoard[6] && choice == gameBoard [7] && choice == gameBoard[8]) ||
      (choice == gameBoard[0] && choice == gameBoard [3] && choice == gameBoard[6]) ||
      (choice == gameBoard[1] && choice == gameBoard [4] && choice == gameBoard[7]) ||
      (choice == gameBoard[2] && choice == gameBoard [5] && choice == gameBoard[8]) ||
      (choice == gameBoard[0] && choice == gameBoard [4] && choice == gameBoard[8]) ||
      (choice == gameBoard[2] && choice == gameBoard [4] && choice == gameBoard[6])
    );
  }

  return{checkWin, changeBoard};

})();

function playerFactory(name, choice) {
  this.name = name;
  this.choice = choice;
  return {name, choice};
}

