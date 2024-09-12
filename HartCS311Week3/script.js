document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const matchesLeftElement = document.getElementById('matches-left');
    let firstCard = null;
    let secondCard = null;
    let matchesLeft = cards.length / 2;
    let busy = false; // Flag to prevent clicks while processing

    const handleClick = (event) => {
        const clickedCard = event.target;

        // Ignore clicks if busy, on already matched cards, or on the same card
        if (busy || clickedCard === firstCard || clickedCard.classList.contains('matched') || clickedCard.classList.contains('flipped')) {
            return;
        }

        // Reveal the card
        clickedCard.textContent = clickedCard.getAttribute('data-value');
        clickedCard.classList.add('flipped');

        if (!firstCard) {
            // Store the first card clicked
            firstCard = clickedCard;
        } else {
            // Store the second card clicked
            secondCard = clickedCard;

            // Set busy to true while processing
            busy = true;

            // Check if the two cards match
            if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
                // Cards match
                setTimeout(() => {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    firstCard = null;
                    secondCard = null;
                    matchesLeft -= 1;
                    updateMatchesLeft();
                    busy = false; // Reset busy flag
                }, 1000);
            } else {
                // Cards do not match
                setTimeout(() => {
                    firstCard.textContent = '';
                    secondCard.textContent = '';
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    firstCard = null;
                    secondCard = null;
                    busy = false; // Reset busy flag
                }, 1000);
            }
        }
    };

    const updateMatchesLeft = () => {
        matchesLeftElement.textContent = matchesLeft;
        if (matchesLeft === 0) {
            setTimeout(() => {
                alert('You win! You matched all the cards.');
            }, 100);
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', handleClick);
    });
});
