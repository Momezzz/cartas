const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

let board = document.getElementById('board');
let attempts = 0;
let attemptsSpan = document.getElementById('attempts');
let restartButton = document.getElementById('restartButton');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards() {
    const shuffledCards = shuffleCards(cardValues);

    for (let i = 0; i < shuffledCards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = shuffledCards[i];
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    }
}

function flipCard(event) {
    if (lockBoard) return; 
    if (event.target === firstCard) return;

    event.target.classList.add('flipped');
    event.target.innerText = event.target.dataset.value;

    if (!firstCard) {
        firstCard = event.target;
    } else {
        secondCard = event.target;
        attempts++;
        attemptsSpan.textContent = attempts;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 1000);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard = null;
    secondCard = null;

    const remainingCards = document.querySelectorAll('.card:not(.flipped)');
    if (remainingCards.length === 0) {
        alert('¡Felicidades! Has encontrado todos los pares.');
    }
}

function resetGame() {
    attempts = 0;
    attemptsSpan.textContent = attempts;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.innerText = '';
        card.addEventListener('click', flipCard);
    });

    board.replaceChildren();
    createCards();
}

createCards();
restartButton.addEventListener('click', resetGame);
