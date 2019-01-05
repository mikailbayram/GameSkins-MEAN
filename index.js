const express = require('express');
const app = express();
const initDb = require("./db").initDb;
const getDb = require("./db").getDb;
const bodyParser = require('body-parser')

const jwt = require("jsonwebtoken");
const jwt_secret = "secret_moj";
const MongoId = require("mongodb").ObjectID;

require('dotenv').config();

//router imports
const user = require('./routes/user');
const items = require('./routes/items');
const bids = require('./routes/bids');
const comments = require('./routes/comments');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/rest/", function (request, response, next) {
    const db = getDb();
    jwt.verify(request.get("JWT"), jwt_secret, function (error, decoded) {
        if (error) {
            response.status(401).send("Unauthorized access");
        } else {
            db.collection("users").findOne(
                { _id: new MongoId(decoded._id) },
                function (error, user) {
                    if (error) {
                        throw error;
                    } else {
                        if (user) {
                            //pass user id through middleware
                            request.body.user_id = user._id;
                            request.user_id = user._id;
                            next();
                        } else {
                            response.status(401).send("Credentials are wrong.");
                        }
                    }
                }
            );
        }
    });
})

app.use('/user', user);
app.use('/rest/items/', items);
app.use('/rest/bids/', bids);
app.use('/rest/comments/', comments);

app.use('/', express.static('app'));

//initialize db
initDb();

app.listen(process.env.PORT, () => console.log('Example app listening on port ' + process.env.PORT));

module.exports = app;