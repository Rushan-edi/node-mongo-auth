const expect = require('chai').expect;
const chai = require('chai');
const should = chai.should();
const request = require('supertest');

const app = require('../../../app');
const conn = require('../../../migration/connection');
describe('User Profile api test', () => {
    var token;
    describe('Get User profile details', () => {
        before((done) => {
            conn.connect()
                .then(() => done())
                .catch((err) => done(err));
        })

        after((done) => {
            conn.close()
                .then(() => done())
                .catch((err) => done(err));
        })
        it('OK, should return 200 ok for successful login', (done) => {
            request(app).post('/api/v1/auth/login')
                .send({
                    email: 'test10@gmail.com',
                    password: 'abc123',
                })
                .then((res) => {
                    const body = res.body;
                    expect(body).to.contain.property('token');
                    const object = JSON.parse(res.text);
                    token = body.token;
                    res.status.should.be.equal(200);
                    done();
                })
                .catch((err) => done(err));
        });
        it('OK, should return 200 ok for get user profile details', (done) => {
            request(app)
                .get('/api/v1/users/profile')
                .set({ 'auth-token': token })
                .then((res) => {
                    res.status.should.be.equal(200);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});