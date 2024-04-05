//server.js file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configureRoutes = require('./routes');
const { generateSecretCode} = require('./gameLogic');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Generate the secret code at server startup
const secretCode = generateSecretCode();

app.use('/api', configureRoutes(secretCode));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});