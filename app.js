const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = 5000;

app.use(bodyParser.json());

let secretNumber = Math.floor(Math.random() * 1000) + 1;
let attempts = 10;
let currentAttempt = 0;
const flag = process.env.FLAG1;

app.post('/guess', (req, res) => {
    const guess = req.body.guess;

    if (typeof guess !== 'number') {
        return res.status(400).json({ error: "Please provide a valid number." });
    }

    currentAttempt++;

    if (currentAttempt > attempts) {
        return res.json({ response: "Sorry, you've used all your attempts." });
    }

    if (guess < secretNumber) {
        return res.json({ response: "Your guess is too low!" });
    } else if (guess > secretNumber) {
        return res.json({ response: "Your guess is too high!" });
    } else {
        return res.json({ response: `Correct! The flag is: ${flag}` });
    }
});

app.listen(port, () => {
    console.log(`Guess the Number app listening at http://localhost:${port}`);
});
