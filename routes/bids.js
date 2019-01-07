const express = require('express');
const router = express.Router();
const getDb = require('../db').getDb;
const MongoId = require("mongodb").ObjectID;

//get all bids of that item
router.get('/:item_id', function (req, res) {
    const db = getDb();

    db.collection("items").findOne({ _id: new MongoId(req.params.item_id) }, function (err, result) {
        if (err) throw err;
    });

    db.collection("bids")
        .find({ item_id: req.params.item_id })
        .toArray((err, bids) => {
            if (err) return console.log(err);
            // res.setHeader("Content-Type", "application/json");
            res.send(bids);
        });
})

router.post('/create', function (req, res) {
    const db = getDb();
    db.collection("items")
        .find({ _id: new MongoId(req.body.item_id) })
        .toArray((err, items) => {
            if (items.length === 0) {
                return;
            }
        });
    db.collection("bids").save(
        {
            item_id: req.body.item_id,
            user_id: req.user_id,
            amount: req.body.amount,
        },
        (err, result) => {
            if (err) return console.log(err);
            res.send(result);
        }
    );
})


module.exports = router;
