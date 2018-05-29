"use strict"
const board = {
  mines: 0,
  output: document.getElementById('boardWrapper'),
  width: 0,
  height: 0,
  size: 0,
  grid: [],
  buttons: [],
  documentCellDivs: [],
  offsets: {
    left: [0, -1],
    right: [0, 1],
    top: [-1, 0],
    bottom: [1, 0],
    topRight: [1, 1],
    topLeft: [-1, 1],
    bottomRight: [1, -1],
    bottomLeft: [-1, -1],
  },

  randomRowInt: function () {
    return Math.round(Math.random(this.height) * (this.height - 1));
  },
  randomColInt: function () {
    return Math.round(Math.random(this.width) * (this.width - 1));
  },

  makeGrid: function (height, width) {
    this.height = height;
    this.width = width;
    return this.grid = Array(this.height).fill().map((a) => Array(this.width).fill(0));

  },

  drawMines: function (numberOfMines) {
    this.mines = numberOfMines;
    for (let i = 1; i <= this.mines; i++) {
      const randomIndex1 = this.randomRowInt();
      const randomIndex2 = this.randomColInt();
      if (this.grid[randomIndex1][randomIndex2] === 0 && this.grid[randomIndex1][randomIndex2] !== 'X') {
        this.grid[randomIndex1][randomIndex2] = 'X';
      } else if (this.grid[randomIndex1][randomIndex2] === 'X') {
        i--;
        console.log('duplicate location');
      }
    }
    console.log('current grid', this.grid);

  },

  drawNumbers: function (rowIndex, colIndex) {
    let numberOfNeighborsWithMines = 0;
    if (this.grid[rowIndex][colIndex] !== 'X') {
      Object.values(this.offsets).forEach((offset) => {
        const [rowOffset, colOffset] = offset;
        const row = this.grid[rowIndex + rowOffset];
        if (row) {
          const cell = row[colIndex + colOffset];
          if (cell === "X") numberOfNeighborsWithMines++;
        }
      })

      this.grid[rowIndex][colIndex] = numberOfNeighborsWithMines;
    }

  },
  moveMineIfFirstClick: function(rowIndex, columnIndex){
    const clickedCell = board.buttons[rowIndex][columnIndex]
    
    const clickedDiv = board.buttons[rowIndex][columnIndex].parentElement
    if(clickedCell.dataset.isMine) {
      console.log('clickedDiv', clickedDiv)
      clickedCell.dataset.isMine = false
      clickedDiv.classList.remove('cell-type-X')
  
 
    }
  },

  revealCellIfNotMine: function (rowIndex, columnIndex) {
    const rowOfButtons = this.buttons[rowIndex];

    const button = rowOfButtons && rowOfButtons[columnIndex];
    if (button && !button.dataset.isMine) button.style.visibility = 'hidden';
  },

  revealNumbers: function (clickedRowIndex, clickedColumnIndex) {
    let queue = [];
    queue.push([clickedRowIndex, clickedColumnIndex]);

    while (queue.length) {
      const [thisRowIndex, thisColumnIndex] = queue.shift();
      this.revealCellIfNotMine(thisRowIndex, thisColumnIndex);

      Object.values(this.offsets).forEach((offset) => {
        const [rowOffset, colOffset] = offset;
        const neighborRowIndex = Number(thisRowIndex) + rowOffset;
        const neighborColumnIndex = Number(thisColumnIndex) + colOffset;

        if (this.grid[neighborRowIndex] && this.buttons[neighborRowIndex][neighborColumnIndex] && this.buttons[neighborRowIndex][neighborColumnIndex].style.visibility !== "hidden" && this.grid[thisRowIndex][thisColumnIndex] === 0) {
          if (this.grid[neighborRowIndex][neighborColumnIndex] === 0) {
            queue.push([neighborRowIndex, neighborColumnIndex]);
          } else if (this.grid[neighborRowIndex][neighborColumnIndex] !== 0) {
            this.revealCellIfNotMine(neighborRowIndex, neighborColumnIndex);
          }
        }
      })
    }
  },

  drawBoard: function () {
    for (let r = 0; r < this.height; r++) {
      const rowDiv = document.createElement('div');

      rowDiv.classList.add('row');
      board.output.appendChild(rowDiv);
      this.buttons.push([]);
      this.documentCellDivs.push([]);

      for (let c = 0; c < board.grid[r].length; c++) {
        this.drawNumbers(r, c);
        const cellDiv = document.createElement('div');
        const button = document.createElement('button');
        const textContentSpanElement = document.createElement('span');
        this.buttons[r].push(button);
        this.documentCellDivs[r].push(textContentSpanElement);

        cellDiv.classList.add('cell');
        button.classList.add('button');
        button.dataset.rowIndex = r;
        button.dataset.columnIndex = c;
        if (this.grid[r][c] === 'X') button.dataset.isMine = 1;
        rowDiv.appendChild(cellDiv);
        textContentSpanElement.textContent = board.grid[r][c];
        cellDiv.classList.add('cell-type-' + board.grid[r][c]);
        cellDiv.appendChild(textContentSpanElement);
        cellDiv.appendChild(button);
      }
    }
    console.log(this.buttons)
  },

  clearBoard: function () {
    board.buttons.forEach((row) =>
      row.forEach((btn) => {
        if (btn.dataset.isMine) btn.style.visibility = 'hidden'
          btn.style.pointerEvents = 'none'
      })
    )
    clearInterval(game.timerInterval);
    return;
  },

  addMouseEventListeners: function () {
    board.buttons.forEach((row) =>
      row.forEach((btn) => {
      btn.addEventListener('click', game.handleLeftMouseClick);
      btn.addEventListener('contextmenu', game.handleRightMouseClick);
      }  )
  )}
  
}