var selectedTime = null;

var timeButtons = document.getElementsByClassName('timeButton');
for (var i = 0; i < timeButtons.length; i++) {
    timeButtons[i].onclick = function() {
    selectedTime = this.getAttribute('data-time');
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
    } else {
    if (userName.length < 3) {
        window.showModal('Validación nombre:', 'Por favor, ingresa un nombre con al menos 3 letras.');
    }
    if (selectedTime === null) {
        window.showModal('Validación tiempo de juego:','Por favor, selecciona un tiempo de juego.');
    }}
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

document.addEventListener('DOMContentLoaded', populateBoggleGrid);