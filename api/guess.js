const { NowRequest, NowResponse } = require('@vercel/node');

let secretNumber = Math.floor(Math.random() * 1000) + 1;
let attempts = 10;
let currentAttempt = 0;

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const guess = req.body.guess;
        const flag = process.env.FLAG1;

        if (typeof guess !== 'number' || guess < 1 || guess > 1000) {
            return res.status(400).json({ response: "Please provide a valid number between 1 and 1000." });
        }

        currentAttempt++;

        const attemptsLeft = attempts - currentAttempt;

        if (currentAttempt > attempts) {
            return res.json({ response: "Sorry, you've used all your attempts.", attemptsLeft: 0 });
        }

        if (guess < secretNumber) {
            return res.json({ response: "Your guess is too low!", attemptsLeft });
        } else if (guess > secretNumber) {
            return res.json({ response: "Your guess is too high!", attemptsLeft });
        } else {
            return res.json({ response: `Correct! The flag is: ${flag}`, attemptsLeft });
        }
    } else {
        return res.status(405).json({ response: "Method not allowed. Use POST." });
    }
};
