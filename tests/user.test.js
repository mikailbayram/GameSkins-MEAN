const chai = require("chai");
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');

//Registration tests
describe("Register", function () {
    it('should create a new user', function (done) {
        request(app)
            .post('/user/register')
            .send({ name: 'Mikail', surname: "Bayram", email: "mikailb@mail.com", password: "123456" })
            .expect(200, "OK")
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    }),
        it('should return an error if no email', function (done) {
            request(app)
                .post('/user/register')
                .send({ name: 'Mikail', surname: "Bayram", password: "123456" })
                .expect(422, "Invalid Data")
                .end(function (err, res) {
                    if (err) throw err;
                });
            done();
        }),
        it('should return an error if no password', function (done) {
            request(app)
                .post('/user/register')
                .send({ name: 'Mikail', surname: "Bayram", email: "mikailb@mail.com" })
                .expect(422, "Invalid Data")
                .end(function (err, res) {
                    if (err) throw err;
                });
            done();
        })
});


//Login Tests
describe("Login", function () {
    it("should return an error if creditentials are not ok", function (done) {
        request(app)
            .post('/user/login')
            .send({ email: "mikailb@123.com", password: "123123123123" })
            .expect(401, "Credentials are wrong.")
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })
    it("should return a token if creditentials are ok", function (done) {
        request(app)
            .post('/user/login')
            .send({ email: "mikailb@mail.com", password: "123456" })
            .expect({ success: true })
            .end(function (err, res) {
                if (err) throw err;
            });
        done();
    })

})
