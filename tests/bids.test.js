const request = require('supertest');
const app = require('../index');

const token = require('./config').token;

//Bids tests
describe("Bids", function () {

    it('should return an error if not jwt token is available', function (done) {
        request(app)
            .post('/rest/bids/create')
            .expect(401, "Unauthorized access")
            .end(function (err, res) {
//                if (err) console.log(err);
            });
        done();
    })

    it('should return an list of bids for an item', function (done) {
        request(app)
            .get('/rest/bids/5c30b3ba34fe5e4f46d9380b')
            .set('JWT', token)
            .expect(200)
            .end(function (err, res) {
//                if (err) console.log(err);
            });
        done();
    })

    it('should create a new bid for a certain item', function (done) {
        request(app)
            .post('/rest/bids/create')
            .set('JWT', token)
            .send({
                item_id: "5c30b8a304707a59c38e6429",
                amount: 120
            })
            .expect(200)
            .end(function (err, res) {
//                if (err) console.log(err);
            });
        done();
    })

    it('should return an error if a bid is created on a non existing item', function (done) {
        request(app)
            .post("/rest/bids/create")
            .set('JWT', token)
            .send({
                item_id: "5c30b8a304707a59c38e6328",
                amount: 120
            })
            .expect(500)
            .end(function (err, res) {
//                if (err) console.log(err);
            });
        done();

    })

    it('should return a message for making a bid lower than highest', function (done) {
        request(app)
            .post('/rest/bids/create')
            .set('JWT', token)
            .send({
                item_id: "5c30b8a304707a59c38e6429",
                amount: 100
            })
            .expect(200, "Bid lower than highest")
            .end(function (err, res) {
//                if (err) console.log(err);
            });
        done();
    })



});
