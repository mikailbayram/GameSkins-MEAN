const express = require('express');
const app = express();
const initDb = require("./db").initDb;
const bodyParser = require('body-parser')

require('dotenv').config();

//router imports
const user = require('./routes/user');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use('/user', user);

app.use('/', express.static('app'));

//initialize db
initDb();

app.listen(process.env.PORT, () => console.log('Example app listening on port ' + process.env.PORT));
