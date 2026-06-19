const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const users = require('../users')

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "mysecretkey";

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if ( users.checkCredentials( username, password ) ) {
        const token = jwt.sign({ username: username }, SECRET_KEY);
        res.json({ token: token });
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: `Welcome ${decoded.username}!` });
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
});

app.get('/admin', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: `Welcome ${decoded.username}!` });
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

