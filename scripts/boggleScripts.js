var selectedTime = null;
var timerInterval = null;
var foundWords = 0;
var scoreFoundWords = 0;

var timeButtons = document.getElementsByClassName('timeButton');
for (var i = 0; i < timeButtons.length; i++) {
  timeButtons[i].onclick = function() {
    selectedTime = parseInt(this.getAttribute('data-time'));
    for (var j = 0; j < timeButtons.length; j++) {
      timeButtons[j].style.backgroundColor = '';
    }
    this.style.backgroundColor = 'lightblue';
  };
}

document.getElementById('playButton').onclick = function() {
  var userName = document.getElementById('userName').value.trim();
  if (userName.length >= 3 && selectedTime !== null) {
    document.getElementById('userInputSection').style.display = 'none';
    document.getElementById('boggleGrid').style.display = 'grid';
    document.getElementById('timerDisplay').style.display = 'block';
    startTimer(selectedTime);
  } else {
    if (userName.length < 3) {
      window.showModal('Validación nombre:', 'Por favor, ingresa un nombre con al menos 3 letras.');
    }
    if (selectedTime === null) {
      window.showModal('Validación tiempo de juego:', 'Por favor, selecciona un tiempo de juego.');
    }
  }
};

function getRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function populateBoggleGrid() {
  const cells = document.querySelectorAll('#boggleGrid .boggleCell');
  cells.forEach(cell => {
    cell.textContent = getRandomLetter();
  });
}

function startTimer(minutes) {
  var remainingTime = minutes * 60;
  var timerDisplay = document.getElementById('timerDisplay');
  var alertSound = new Audio('./assets/sounds/alert.mp3');

  timerDisplay.textContent = '...'; 

  setTimeout(function() {
      timerInterval = setInterval(function() {
          var minutes = Math.floor(remainingTime / 60);
          var seconds = remainingTime % 60;
          timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

          if (remainingTime <= 10) {
              timerDisplay.style.color = 'red';
              if (remainingTime === 10) {
                  alertSound.play(); 
              }
          } else {
              timerDisplay.style.color = ''; 
          }

          if (remainingTime <= 0) {
              clearInterval(timerInterval);
              timerDisplay.style.color = 'black';
              timerDisplay.textContent = 'Tiempo terminado';
              window.showModal('Tiempo finalizado!', `<b>Palabras encontradas:</b> ${foundWords} 
                                                    </br> <b>Puntaje total:</b> ${scoreFoundWords} puntos.`);
          }

          remainingTime--;
      }, 1000);
  }, 100);
}

document.addEventListener('DOMContentLoaded', populateBoggleGrid);

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
  var tableBody = document.querySelector("#wordsTable tbody");
  var newRow = document.createElement("tr");

  var wordCell = document.createElement("td");
  wordCell.textContent = word;
  newRow.appendChild(wordCell);

  var scoreCell = document.createElement("td");
  if (isValid) {
    var score = calculateScore(word.length);
    scoreCell.textContent = score;
    scoreFoundWords += score;
    foundWords++;
  } else {
    scoreCell.textContent = "-1";
    scoreFoundWords = Math.max(0, scoreFoundWords - 1);
    scoreCell.classList.add("invalid-word");
  }
  newRow.appendChild(scoreCell);

  tableBody.appendChild(newRow);
}
