var selectedTime = null;
var timerInterval = null;
var foundWords = 0;
var scoreFoundWords = 0;
var words = [];
var selectedWord = '';
var isValidLetter = true;

var timeButtons = document.getElementsByClassName("timeButton");
for (var i = 0; i < timeButtons.length; i++) {
  timeButtons[i].onclick = function () {
    selectedTime = parseInt(this.getAttribute("data-time"));
    for (var j = 0; j < timeButtons.length; j++) {
      timeButtons[j].style.backgroundColor = "";
    }
    this.style.backgroundColor = "lightblue";
  };
}

document.getElementById("playButton").onclick = function () {
  var userName = document.getElementById("userName").value.trim();
  if (userName.length >= 3 && selectedTime !== null) {
    document.getElementById("userInputSection").style.display = "none";
    document.getElementById("boggleGrid").style.display = "grid";
    document.getElementById("timerDisplay").style.display = "block";
    startTimer(selectedTime);
  } else {
    if (userName.length < 3) {
      window.showModal(
        "Validación nombre:",
        "Por favor, ingresa un nombre con al menos 3 letras."
      );
    }
    if (selectedTime === null) {
      window.showModal(
        "Validación tiempo de juego:",
        "Por favor, selecciona un tiempo de juego."
      );
    }
  }
};

function getRandomLetter() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function populateBoggleGrid() {
  var cells = document.querySelectorAll("#boggleGrid .boggleCell");
  cells.forEach((cell, index) => {
    const randomLetter = getRandomLetter();
    cell.textContent = randomLetter;
    cell.dataset.row = Math.floor(index / 4); 
    cell.dataset.column = index % 4; 
    cell.onclick = randomLetterClicked;
  });
}

function saveScore(userName, score) {
  var scores = JSON.parse(localStorage.getItem("boggleScores")) || [];
  var currentDate = new Date().toLocaleDateString("es-ES");
  scores.push({ userName: userName, score: score, date: currentDate });
  localStorage.setItem("boggleScores", JSON.stringify(scores));
}

document.getElementById("showScoresButton").onclick = function () {
  var scores = JSON.parse(localStorage.getItem("boggleScores")) || [];

  scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var scoresTableBody = document.getElementById("scoresTableBody");
  var scoresHtml = "";
  for (var i = 0; i < scores.length; i++) {
    scoresHtml += "<tr>";
    scoresHtml += "<td>" + scores[i].userName + "</td>";
    scoresHtml += "<td>" + scores[i].date + "</td>";
    scoresHtml += "<td>" + scores[i].score + "</td>";
    scoresHtml += "</tr>";
  }
  scoresTableBody.innerHTML = scoresHtml;

  var modal = document.getElementById("scoresModal");
  modal.style.display = "block";

  var closeButton = modal.querySelector(".close");
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

function startTimer(minutes) {
  var remainingTime = minutes * 60;
  var timerDisplay = document.getElementById("timerDisplay");
  var alertSound = new Audio("./assets/sounds/alert.mp3");

  timerDisplay.textContent = "...";

  setTimeout(function () {
    timerInterval = setInterval(function () {
      var minutes = Math.floor(remainingTime / 60);
      var seconds = remainingTime % 60;
      timerDisplay.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

      if (remainingTime <= 10) {
        timerDisplay.style.color = "red";
        if (remainingTime === 10) {
          alertSound.play();
        }
      } else {
        timerDisplay.style.color = "";
      }

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        timerDisplay.style.color = "black";
        timerDisplay.textContent = "Tiempo terminado";
        saveScore(
          document.getElementById("userName").value.trim(),
          scoreFoundWords
        );
        window.showModal(
          "Tiempo finalizado!",
          "<b>Palabras encontradas:</b> " + foundWords + " </br> <b>Puntaje total:</b> " + scoreFoundWords + " puntos."
        );
        document.getElementById("validarButton").style.display = "none";
        document.getElementById("boggleGrid").style.display = "none";
        document.getElementById("wordInputContainer").style.display = "none";
        document.getElementById("volverAJugarButton").style.display = "block";
      }
      remainingTime--;
    }, 1000);
  }, 1000);
}

document.addEventListener("DOMContentLoaded", populateBoggleGrid);

function calculateScore(wordLength) {
  if (wordLength >= 8) {
    return 11;
  } else if (wordLength == 7) {
    return 5;
  } else if (wordLength == 6) {
    return 3;
  } else if (wordLength == 5) {
    return 2;
  } else if (wordLength == 3 || wordLength == 4) {
    return 1;
  }
  return 0;
}

function addWordToTable(word, isValid) {
  var formedWord = document.getElementById("formedWord");
  var tableBody = document.querySelector("#wordsTable tbody");
  var newRow = document.createElement("tr");
  var errorWordExist = document.getElementById("errorWordExist");

  if (errorWordExist) {
    errorWordExist.remove();
  }

  var wordCell = document.createElement("td");
  wordCell.textContent = word;
  newRow.appendChild(wordCell);

  var scoreCell = document.createElement("td");
  if (isValid) {
    var existing = words.indexOf(word) !== -1;
    if (!existing) words.push(word);

    if (existing) {
      var errorWordExist = document.createElement("span");
      errorWordExist.id = "errorWordExist";
      errorWordExist.textContent = "Palabra ya encontrada anteriormente.";
      errorWordExist.style.color = "yellow";
      errorWordExist.style.display = "block";
      return formedWord.parentNode.appendChild(errorWordExist);
    }
    var score = calculateScore(word.length);
    scoreCell.textContent = score;
    scoreFoundWords += score;
    foundWords++;
  } else {
    scoreCell.textContent = "-1";
    scoreFoundWords = Math.max(0, scoreFoundWords - 1);
    scoreCell.classList.add("invalid-word");
  }
  clearGame();
  newRow.appendChild(scoreCell);

  tableBody.appendChild(newRow);
}

function randomLetterClicked(event) {
  var clickedCell = event.target;
  var clickedLetter = clickedCell.textContent;

  var selectedCells = document.querySelectorAll('#boggleGrid .boggleCell.selected');
  var lastSelectedCell = selectedCells[selectedCells.length - 1];
  
  if (isCellSelectable(lastSelectedCell, clickedCell)) {
    selectedCells.forEach(cell => cell.classList.remove('selected'));
    
    selectedWord += clickedLetter;  
    clickedCell.classList.add('selected'); 
    isValidLetter = true;
  } else {
    clickedCell.classList.add('invalid-selection');
    isValidLetter = false;

    setTimeout(function() {
      clickedCell.classList.remove('invalid-selection');
    }, 1000);
  }
}

document.getElementById("volverAJugarButton").onclick = function () {
  selectedTime = null;
  clearInterval(timerInterval);
  foundWords = 0;
  scoreFoundWords = 0;
  words = [];
  selectedWord = '';
  isValidLetter = true;

  document.getElementById("userInputSection").style.display = "block";
  document.getElementById("boggleGrid").style.display = "none";
  document.getElementById("timerDisplay").style.display = "none";
  document.getElementById("volverAJugarButton").style.display = "none";

  clearGame();

  document.getElementById("formedWord").textContent = "";

  window.location.href = "index.html";
};

function clearGame(){
  selectedWord = '';
  var selectedCells = document.querySelectorAll('#boggleGrid .boggleCell.selected');
  var selectableCells = document.querySelectorAll('#boggleGrid .boggleCell.selectable');
  selectedCells.forEach(cell => cell.classList.remove('selected'));
  selectableCells.forEach(cell => cell.classList.remove('selectable'));
}