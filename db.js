const assert = require("assert");
const client = require("mongodb").MongoClient;

let _db;

module.exports = {
    getDb,
    initDb
};

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    client.connect("mongodb://localhost:27017/test",
        (err, database) => {
            if (err) return console.log(err);
            _db = database;
            console.log("Connected to db");
        })
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}