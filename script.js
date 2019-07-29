const Gameboard = (() => {
  let gameBoard = ['','','','','','','','',''];
  
  const boxes = document.querySelectorAll('.box');

  function changeBoard(player, index) {
    gameBoard[index] = player.choice;
    updateBoard(index);
  }

  function updateBoard(index) {
    boxes[index].innerHTML = gameBoard[index];
  }

  function checkWin(player) {
    return winCondition(player.choice)
  }

  function reset() {
    gameBoard = ['','','','','','','','',''];
    gameBoard.forEach((box, index) => updateBoard(index));
  }

  function boxIsFull() {
    let ret = true;
    gameBoard.forEach(box => {
      if(box == '') ret = false;
    })
    return ret;
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

  return{checkWin, changeBoard, boxes, reset, boxIsFull};

})();

function playerFactory(name, choice) {
  this.name = name;
  this.choice = choice;
  return {name, choice};
}

function game() {
  const player1 = playerFactory('Player 1', '&times;');
  const player2 = playerFactory('Player 2', '&cir;');
  const display = document.querySelector('.text');
  display.innerHTML = `Playing`;

  let playing = true;
  let currentPlayer = player1;

  function switchplayer() {
    currentPlayer = currentPlayer == player1? player2 : player1;
  }

  function restart() {
    Gameboard.reset();
    playing = true;
    display.innerHTML = `Playing`;
    display.removeEventListener('click', restart);
  }

  function checkGameOver() {
    if(Gameboard.checkWin(currentPlayer)) {
      playing = false;
      display.innerHTML = `${currentPlayer.name} wins!`;
      display.addEventListener('click', restart);
      currentPlayer = player1;
    } else if(Gameboard.boxIsFull()) {
      playing = false;
      display.innerHTML = `It's a draw!`;
      display.addEventListener('click', restart);
      currentPlayer = player1;
    } else switchplayer();
  }

  Gameboard.boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      if(box.innerHTML || !playing) return;
      Gameboard.changeBoard(currentPlayer, index);
      checkGameOver();
    }); 
  });  
}

game();