// Function to generate a random code
function generateSecretCode() {
    const colors = ['Red', 'Green', 'Blue'];
    let code = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        code.push(colors[randomIndex]);
    }
    return code;
}

// Function to compare guess with the secret code and generate feedback
function generateFeedback(guess, secretCode) {
    const feedback = [];
    const guessCopy = [...guess]; // Make a copy of guess array
    const secretCodeCopy = [...secretCode]; // Make a copy of secretCode array

    // Check for black pegs (correct color and position)
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secretCode[i]) {
            feedback.push('Black');
            guessCopy[i] = null; // Mark peg as already matched
            secretCodeCopy[i] = null; // Mark peg as already matched
        }
    }

    // Check for white pegs (correct color but wrong position)
    for (let i = 0; i < guess.length; i++) {
        if (guessCopy[i] !== null) {
            const index = secretCodeCopy.indexOf(guessCopy[i]);
            if (index > -1) {
                feedback.push('White');
                secretCodeCopy[index] = null; // Mark peg as already matched
            }
        }
    }

    return feedback;
}


module.exports = { generateSecretCode, generateFeedback };