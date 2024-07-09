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

