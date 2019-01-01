const express = require('express');
const router = express.Router();
const getDb = require('../db').getDb;
const jwt = require("jsonwebtoken");

const jwt_secret = "secret_moj";

router.post('/register', function (req, res) {
    const db = getDb();
    db.collection("users").save(
        {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password
        },
        (err, result) => {
            if (err) return console.log(err);
            res.send("OK");
        }
    );
});

router.post('/login', function (req, res) {
    const db = getDb();
    const user = req.body;

    db.collection("users").findOne(
        { email: user.email, password: user.password },
        function (error, user) {
            if (error) {
                throw error;
            } else {
                if (user) {
                    var token = jwt.sign(user, jwt_secret, {
                        expiresIn: 20000
                    });

                    res.send({
                        success: true,
                        message: "Authenticated",
                        token: token
                    });
                } else {
                    res.status(401).send("Credentials are wrong.");
                }
            }
        }
    );
})

router.get('/all', function (req, res) {
    const db = getDb();
    db.collection("users")
        .find()
        .toArray((err, users) => {
            if (err) return console.log(err);
            res.setHeader("Content-Type", "application/json");
            res.send(users);
        });
})


module.exports = router;
