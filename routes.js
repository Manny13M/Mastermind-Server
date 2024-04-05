//routes.js file
const express = require('express');
const router = express.Router();
const { generateFeedback } = require('./gameLogic');


// Define a function to create and configure routes
function configureRoutes(secretCode) {

    // Make a copy of the secretCode to keep the original intact
    const originalSecretCode = [...secretCode];

    // Initialize records to store guesses and key pegs
    const turnRecords = [];

    // Handle POST request for submitting a guess
    router.post('/guess', (req, res) => {
        
        // Receive the guess from the client
        const guess = req.body.guess;
        console.log(guess);

        // Generate feedback for the guess
        const feedback = generateFeedback(guess, secretCode);

        turnRecords.push({ guess, feedback });

        // Send feedback back to the client
        res.json({ originalSecretCode, turnRecords });

        // Check if the guess is correct
        const isCorrectGuess = feedback.filter(peg => peg === 'Black').length === 4;
        if (isCorrectGuess) {
            console.log('Code-breaker wins!');
            // Optionally, you can send a response to the client indicating the win
        } 
        // Check the number of turns taken
        else if (turnRecords.length >= 10) {
            console.log('Code-maker wins! Maximum turns reached.');
        }
    });

    return router;
}

module.exports = configureRoutes;