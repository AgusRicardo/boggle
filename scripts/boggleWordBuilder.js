document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");

  const handlePlayButtonClick = () => {
    const boggleWrapper = document.getElementById("boggleWrapper");
    boggleWrapper.style.display = "flex";
    boggleWrapper.style.flexDirection = "column"; 

    const wordInputContainer = document.createElement("div");
    wordInputContainer.id = "wordInputContainer";
    const wordInput = document.createElement("input");
    wordInput.type = "text";
    wordInput.id = "formedWord";
    wordInput.placeholder = "Palabra formada";
    wordInput.readOnly = true;
    wordInput.maxLength = 16;

    wordInputContainer.appendChild(wordInput);

    const boggleGrid = document.getElementById("boggleGrid");
    boggleWrapper.insertBefore(wordInputContainer, boggleGrid);

    const boggleCells = document.querySelectorAll(".boggleCell");

    const handleCellClick = (event) => {
      const letter = event.target.textContent;
      if (wordInput.value.length < 16) {
        wordInput.value += letter;
      }
    };

    boggleCells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  };

  playButton.addEventListener("click", handlePlayButtonClick);
});
