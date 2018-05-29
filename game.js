"use strict";
const game = {
  winClickCounter: 0,
  totalClickCounter: 0,
  timer: 0,
  flagCount: 0,
  flagOutput: document.getElementById('flagOutput'),
  timerOutput: document.getElementById('timerOutput'),
  resetButtonImage: document.getElementById('imgWrap'),

  handleLeftMouseClick: function (event) {
  
    game.totalClickCounter++;
    if (game.totalClickCounter === 1) {
      game.handleTimer();
      game.timerInterval = setInterval(game.handleTimer, 1000);
    }

    console.log(game.totalClickCounter)
    let clickedCellButton = event.currentTarget;
    let rowIndex = Number(clickedCellButton.dataset.rowIndex);
    let columnIndex = Number(clickedCellButton.dataset.columnIndex);

    if (board.buttons[rowIndex][columnIndex].dataset.isMine) {
      const clickedCellButtonParentDiv = board.buttons[rowIndex][columnIndex].parentElement;
      // if (game.totalClickCounter === 1) {
      //   board.moveMineIfFirstClick(rowIndex, columnIndex)
        
      //   board.drawNumbers()
      //   board.buttons[rowIndex][columnIndex].style.visibility = 'hidden'
      // } else {
        clickedCellButtonParentDiv.style.outline = '3px inset red';
        clickedCellButtonParentDiv.style.zIndex = '3';
        game.resetButtonImage.style.backgroundImage = 'url(pics/dissaprovingKanye.png)'
        board.clearBoard();
      }
     else {
      board.revealNumbers(rowIndex, columnIndex);

    }

  },
  
  handleRightMouseClick: function (event) {
    let clickedCellButton = event.currentTarget
      clickedCellButton.classList.toggle('rightClicked');
      event.preventDefault();
      game.handleFlagCount(clickedCellButton);
      game.checkWinner(clickedCellButton);
      //console.log(game.winClickCounter);
      return false;
    },
  
  
  handleTimer: function () {
    if (game.timer <= 999) {
      game.timer++;
      game.timerOutput.textContent = game.timer;
    }
  },

handleFlagCount: function(currentButton){
  if (currentButton.classList.contains('rightClicked')) game.flagCount += 1;
  else  game.flagCount -=1;
  game.flagOutput.textContent = game.flagCount;

},

  checkWinner: function (currentButton) {
    if (currentButton.classList.contains('rightClicked') && currentButton.parentElement.classList.contains('cell-type-X')) {
      game.winClickCounter += 1;
    } else if (!currentButton.classList.contains('rightClicked') && currentButton.parentElement.classList.contains('cell-type-X')) {
      game.winClickCounter -= 1;
    }
    if (game.winClickCounter === board.mines) {
      outDiv.firstElementChild.textContent = 'You Win';
      outDiv.style.visibility = 'visible';
     
    }
  }


}
