document.getElementById('submitGuess').addEventListener('click', function() {
    const guess = document.getElementById('guessInput').value;

    fetch('/api/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess: parseInt(guess) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.response;
        document.getElementById('attempts').textContent = `Attempts left: ${data.attemptsLeft}`;
    })
    .catch(err => {
        console.error('Error:', err);
    });
});
