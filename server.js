
const express  = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/data.js');

mongoose.connect(configDB.url); 

require('./config/passport')(passport) 

app.use(express.static('public'));
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'ejs')

app.use(session({ secret: 'this isent the real secret' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./app/routes.js')(app, passport)

app.listen(port);
console.log('listening on port ' + port);


