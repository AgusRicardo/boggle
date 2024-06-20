function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function populateBoggleGrid() {
    const cells = document.querySelectorAll('.boggleGrid .boggleCell');
    cells.forEach(cell => {
        cell.textContent = getRandomLetter();
    });
}

//Call the function to populate the table when the page loads
document.addEventListener('DOMContentLoaded', populateBoggleGrid);