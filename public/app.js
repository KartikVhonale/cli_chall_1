document.getElementById('submitGuess').addEventListener('click', function() {
    const guess = document.getElementById('guessInput').value;

    fetch('/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess: parseInt(guess) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.response;
    })
    .catch(err => {
        console.error('Error:', err);
    });
});
