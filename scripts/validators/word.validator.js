//Valida que la palabra formada tenga al menos 3 letras, en caso de que no lo tenga tira un error - Si la palabra es valida la agrega a la tabla y le calcula el puntaje
document.addEventListener("DOMContentLoaded", function() {
  var validarButton = document.getElementById("validarButton");

  var handleValidarButtonClick = async function() {
    var formedWord = document.getElementById("formedWord");
    var errorMessage = document.getElementById("errorMessage");

    if (errorMessage) {
      errorMessage.remove();
    }

    if (formedWord.value.length < 3) {
      var errorSpan = document.createElement("span");
      errorSpan.id = "errorMessage";
      errorSpan.textContent = "La palabra debe tener al menos 3 letras.";
      errorSpan.style.color = "red";
      errorSpan.style.display = "block";
      formedWord.parentNode.appendChild(errorSpan);
      clearGame();
    } else {
      const isValid = await validateWord(formedWord.value);
      addWordToTable(formedWord.value, isValid);
      if (isValid) {
        calculateScore(formedWord.value.length);
      }
    }
    formedWord.value = "";
  };

  validarButton.addEventListener("click", handleValidarButtonClick);
});
