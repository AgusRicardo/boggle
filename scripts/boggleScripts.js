var selectedTime = null;
var timerInterval = null;

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
    timerDisplay.textContent = '...'; 
  
    setTimeout(function() {
      timerInterval = setInterval(function() {
        var minutes = Math.floor(remainingTime / 60);
        var seconds = remainingTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          timerDisplay.textContent = 'Tiempo terminado';
        }
  
        remainingTime--;
      }, 1000);
    }, 100);
  }

document.addEventListener('DOMContentLoaded', populateBoggleGrid);
