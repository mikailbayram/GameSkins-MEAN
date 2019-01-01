const express = require('express');
const router = express.Router();
const getDb = require('../db').getDb;

//get all items of that user
router.get('/', function (req, res) {
    const db = getDb();
    db.collection("items")
        .find({ user_id: req.user_id })
        .toArray((err, items) => {
            if (err) return console.log(err);
            res.setHeader("Content-Type", "application/json");
            res.send(items);
        });
})

router.post('/create', function (req, res) {
    const db = getDb();
    db.collection("items").save(
        {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            user_id: req.user_id
        },
        (err, result) => {
            if (err) return console.log(err);
            res.send("OK");
        }
    );
})

module.exports = router;
