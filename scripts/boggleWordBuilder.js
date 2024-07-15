document.addEventListener("DOMContentLoaded", function() {
  var playButton = document.getElementById("playButton");

  var handlePlayButtonClick = function() {
    var boggleWrapper = document.getElementById("boggleWrapper");
    document.getElementById("wordsTable").style.display = "table";
    boggleWrapper.style.display = "flex";
    boggleWrapper.style.flexDirection = "column"; 

    var wordInputContainer = document.createElement("div");
    wordInputContainer.id = "wordInputContainer";
    var wordInput = document.createElement("input");
    wordInput.type = "text";
    wordInput.id = "formedWord";
    wordInput.placeholder = "Palabra formada";
    wordInput.readOnly = true;
    wordInput.maxLength = 16;

    wordInputContainer.appendChild(wordInput);

    var boggleGrid = document.getElementById("boggleGrid");
    boggleWrapper.insertBefore(wordInputContainer, boggleGrid);

    var boggleCells = document.querySelectorAll(".boggleCell");

    var handleCellClick = function(event) {
      var letter = event.target.textContent;
      if (wordInput.value.length < 16 && isValidLetter) {
        wordInput.value += letter;
        updateSelectableCells(event.target);
      }
    };

    boggleCells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
    updateSelectableCells(null); 
  };

  playButton.addEventListener("click", handlePlayButtonClick);
});
