// App.js

const Express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const routes = require('./routes/routes');
const routesDB = require('./routes/routesDB');
const routesSession = require('./routes/routesSession');

const app = Express();

// Use this for first 2 routes
app.use(cookieParser());

// Use this for 3rd router
// app.use(session({
//   secret: 'keyboard kitty',
//   resave: true,
//   saveUninitialized: true
// }));


app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, 'public')));



app.use(bodyParser.urlencoded({ extended: false}));
app.use(logger('dev'));


// change this line to use cookies or DB
app.use('/', routes);

const PORT = 8080;
app.listen(PORT, function() { console.log(`Server ON and listening on http://localhost:${PORT}`)});
