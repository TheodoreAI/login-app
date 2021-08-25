
const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

// @TODO add auth middleware
// @TODO add registration page

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;
const localhost = "127.0.0.1";
app.listen(PORT, () => console.log(`Web App running at http://${localhost}:${PORT}/ Press Ctrl-C to terminate`));