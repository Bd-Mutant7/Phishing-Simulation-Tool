const express = require('express');
const app = express();
const port = 3001; // Different port to avoid conflict

app.get('/', (req, res) => {
    res.send('Test server is working!');
});

app.listen(port, () => {
    console.log(`Test server running on http://localhost:${port}`);
});
