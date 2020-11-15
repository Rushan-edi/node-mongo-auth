const expect = require('chai').expect;
const chai = require('chai');
const should = chai.should();
const request = require('supertest');

const app = require('../../../app');
const conn = require('../../../migration/connection');
describe('Auth api test', () => {
    describe('Registration', () => {
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
        it('OK, should return 200 ok for successful user registration', (done) => {
            request(app).post('/api/v1/auth/register')
                .send({
                    email: 'test10@gmail.com',
                    password: 'abc123',
                    name: 'rushan',
                })
                .then((res) => {
                    const body = res.body;
                    expect(body).to.contain.property('user');
                    res.status.should.be.equal(200);
                    done();
                })
                .catch((err) => done(err));
        });
        it('should return 422 for already exists user registration', (done) => {
            request(app).post('/api/v1/auth/register')
                .send({
                    email: 'test10@gmail.com',
                    password: 'abc123',
                    name: 'rushan',
                })
                .then((res) => {
                    const body = res.body;
                    console.log('message: ', res.text);
                    res.status.should.be.equal(422);
                    done();
                })
                .catch((err) => done(err));
        });
    });
    describe('Login', () => {
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
                    password: 'abc123'
                })
                .then((res) => {
                    const body = res.body;
                    expect(body).to.contain.property('token');
                    res.status.should.be.equal(200);
                    done();
                })
                .catch((err) => done(err));
        });
        it('should return 422 for Invalid password', (done) => {
            request(app).post('/api/v1/auth/login')
                .send({
                    email: 'test10@gmail.com',
                    password: 'abc12311'
                })
                .then((res) => {
                    const body = res.body;
                    console.log('message: ', res.text);
                    res.status.should.be.equal(422);
                    done();
                })
                .catch((err) => done(err));
        });
        it('should return 422 for Invalid email', (done) => {
            request(app).post('/api/v1/auth/login')
                .send({
                    email: 'test00@gmail.com',
                    password: 'abc123'
                })
                .then((res) => {
                    const body = res.body;
                    console.log('message: ', res.text);
                    res.status.should.be.equal(422);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});