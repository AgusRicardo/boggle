document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");

  const handlePlayButtonClick = () => {
    const boggleWrapper = document.getElementById("boggleWrapper");
    boggleWrapper.style.display = "flex";

    const wordInputContainer = document.createElement("div");
    wordInputContainer.id = "wordInputContainer";
    const wordInput = document.createElement("input");
    wordInput.type = "text";
    wordInput.id = "formedWord";
    wordInput.placeholder = "Palabra formada";
    wordInput.readOnly = true;
    wordInput.maxLength = 16;

    wordInputContainer.appendChild(wordInput);
    boggleWrapper.appendChild(wordInputContainer);

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
