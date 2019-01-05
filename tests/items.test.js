const request = require('supertest');
const app = require('../index');

const token = require('./config').token;

//Registration tests
describe("Items", function () {

    it('should return an error if not jwt token is available', function (done) {
        request(app)
            .post('/rest/items/create')
            .expect(401, "Unauthorized access")
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

    it('should create a new item', function (done) {
        request(app)
            .post('/rest/items/create')
            .set('JWT', token)
            .send({
                name: "test item",
                user_id: "5c30b3ba34fe5e4f46d9380b"
            })
            .expect(200, "OK")
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

    it("should throw an error if no name is sent", function (done) {
        request(app)
            .post('/rest/items/create')
            .set('JWT', token)
            .send({
                user_id: "5c30b3ba34fe5e4f46d9380b"
            })
            .expect(422, "Invalid Data")
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

    it("should edit a existing item", function (done) {
        request(app)
            .put('/rest/items/edit/5c30b7799d2c88572bbfda83')
            .set('JWT', token)
            .send({
                name: "test edit"
            })
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

    it("should delete an existing item", function (done) {
        request(app)
            .delete('/rest/items/delete/5c30b7799d2c88572bbfda83')
            .set('JWT', token)
            .expect(200, "OK")
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

});
