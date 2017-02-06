// App.js

const Express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const routes = require('./routes/routes');
const routesDB = require('./routes/routesDB');

const app = Express();

app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(logger('dev'));


// change this line to use cookies or DB
app.use('/', routesDB);

const PORT = 8080;
app.listen(PORT, function() { console.log(`Server ON and listening on http://localhost:${PORT}`)});
