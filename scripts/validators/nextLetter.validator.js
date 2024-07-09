function isCellSelectable(lastSelectedCell, currentCell) {
  if (!lastSelectedCell) return true;  

  var lastIndex = Array.prototype.indexOf.call(lastSelectedCell.parentNode.children, lastSelectedCell);
  var currentIndex = Array.prototype.indexOf.call(currentCell.parentNode.children, currentCell);

  var lastRow = Math.floor(lastIndex / 4);
  var lastCol = lastIndex % 4;
  var currentRow = Math.floor(currentIndex / 4);
  var currentCol = currentIndex % 4;

  return Math.abs(lastRow - currentRow) <= 1 && Math.abs(lastCol - currentCol) <= 1;
}

function updateSelectableCells(currentCell) {
  var boggleCells = document.querySelectorAll(".boggleCell");
  
  for (var i = 0; i < boggleCells.length; i++) {
    boggleCells[i].classList.remove("selectable");
  }

  if (!currentCell) return;

  var currentIndex = Array.prototype.indexOf.call(currentCell.parentNode.children, currentCell);
  var currentRow = Math.floor(currentIndex / 4);
  var currentCol = currentIndex % 4;

  var possibleMoves = [
    [currentRow - 1, currentCol - 1], [currentRow - 1, currentCol], [currentRow - 1, currentCol + 1],
    [currentRow, currentCol - 1],                            [currentRow, currentCol + 1],
    [currentRow + 1, currentCol - 1], [currentRow + 1, currentCol], [currentRow + 1, currentCol + 1]
  ];

  for (var i = 0; i < possibleMoves.length; i++) {
    var newRow = possibleMoves[i][0];
    var newColumn = possibleMoves[i][1];
    var cell = document.querySelector('.boggleCell[data-row="' + newRow + '"][data-column="' + newColumn + '"]');
    if (cell) {
      cell.classList.add("selectable");
    }
  }
}