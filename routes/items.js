const express = require('express');
const router = express.Router();
const getDb = require('../db').getDb;
const MongoId = require("mongodb").ObjectID;

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
    if (!req.body.name) {
        res.status(422).send("Invalid Data");
        return;
    }
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

router.get("/:id", function (req, res) {
    console.log("evome");
    const db = getDb();
    db.collection("items").find({ _id: new MongoId(req.params.id) })
        .toArray(function (err, result) {
            if (err)
                throw err;
            res.send(result);
        })
});

router.put("/edit/:id", function (req, res) {
    const db = getDb();
    if (!req.body.name) {
        res.status(422).send("Invalid Data");
        return;
    }
    db.collection("items").findOneAndUpdate(
        { _id: new MongoId(req.params.id) },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                user_id: req.user_id
            }
        },
        (err, result) => {
            if (err) return res.send(err);
            res.send("OK");
        }
    );
})

router.delete("/delete/:id", function (req, res) {
    const db = getDb();
    db.collection("items").findOneAndDelete(
        { _id: new MongoId(req.params.id) },
        (err, result) => {
            if (err) return res.send(500, err);
            res.send("OK");
        }
    );
});

module.exports = router;
