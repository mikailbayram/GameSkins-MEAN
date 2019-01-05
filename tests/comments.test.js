const request = require('supertest');
const app = require('../index');

const token = require('./config').token;

//Registration tests
describe("Comments", function () {

    it('should return an error if item is not find', function (done) {
        request(app)
            .get('/rest/comments/1')
            .set('JWT', token)
            .expect(500)
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

    it('should return comments of that item', function (done) {
        request(app)
            .get('/rest/comments/5c30b8a304707a59c38e6429')
            .set('JWT', token)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

    it('should create a new comment', function (done) {
        request(app)
            .post('/rest/comments/create')
            .set('JWT', token)
            .send({
                item_id: "5c30b8a304707a59c38e6429",
                comment: "a new comment for test"
            })
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

    it('should edit a comment', function (done) {
        request(app)
            .put('/rest/comments/edit/5c3106440d935b7ac5ab0ecd')
            .set('JWT', token)
            .send({
                comment: "a new comment for test edited"
            })
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

    it('should delete a comment', function (done) {
        request(app)
            .delete('/rest/comments/delete/5c310c8cd5603b7fc68e4302')
            .set('JWT', token)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

});
