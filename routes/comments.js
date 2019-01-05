const express = require('express');
const router = express.Router();
const getDb = require('../db').getDb;
const MongoId = require("mongodb").ObjectID;

//get all comments of that item
router.get('/:item_id', function (req, res) {
    const db = getDb();
    db.collection("comments")
        .find({ item_id: req.params.item_id })
        .toArray((err, comments) => {
            if (err) return console.log(err);
            res.setHeader("Content-Type", "application/json");
            res.send(comments);
        });
})

router.post('/create', function (req, res) {
    const db = getDb();
    
    db.collection("comments").save(
        {
            comment: req.body.comment,
            user_id: req.user_id,
            item_id: req.body.item_id,
        },
        (err, result) => {
            if (err) return console.log(err);
            res.send("OK");
        }
    );
})

router.put("/comment/:id", function (request, response) {
    item = request.body;
    db.collection("comments").findOneAndUpdate(
        { _id: new MongoId(req.params.id) },
        {
            $set: {
                comment: req.body.comment,
            }
        },
        (err, result) => {
            if (err) return res.send(err);
            response.send("OK");
        }
    );
})

router.delete("/delete/:id", function (req, res) {
    const db = getDb();
    db.collection("comments").findOneAndDelete(
        { _id: new MongoId(req.params.id) },
        (err, result) => {
            if (err) return res.send(500, err);
            res.send("OK");
        }
    );
});

module.exports = router;
