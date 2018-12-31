const express = require('express');
const router = express.Router();
const getDb = require('../db').getDb;



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
