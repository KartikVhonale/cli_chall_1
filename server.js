const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();  // Load environment variables

app.use(express.json());  // To handle JSON requests
app.use(express.static(path.join(__dirname, 'public')));  // Serve static HTML and JS

let secretNumber = Math.floor(Math.random() * 1000) + 1;
let attempts = 10;
let currentAttempt = 0;

app.post('/guess', (req, res) => {
    const guess = req.body.guess;
    const flag = process.env.FLAG;

    if (typeof guess !== 'number' || guess < 1 || guess > 1000) {
        return res.status(400).json({ response: "Please provide a valid number between 1 and 1000." });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    