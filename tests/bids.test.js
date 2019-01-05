const request = require('supertest');
const app = require('../index');

const token = require('./config').token;

//Bids tests
describe("Bids", function () {

    it('should return an list of bids for an item', function (done) {
        request(app)
            .get('/rest/bids/5c30b8a304707a59c38e6429')
            .set('JWT', token)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
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
                if (err) throw err;
            });
        done();
    })

});
