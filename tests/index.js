const chai = require("chai");
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');


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
    })
});