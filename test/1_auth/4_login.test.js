const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../db-handler');
const { getUser } = require('../data/user');

const authMessages = require('../../helpers/message/auth.message');

describe('/api/auth/login', () => {
  it('should not login if email not exists', (done) => {
    const data = {
      email: 'haha@gmail.com',
      password: getUser(0).password,
    };
    request(app)
      .post('/api/auth/login')
      .send(data)
      .expect(404)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.EMAIL_NOT_EXIST);
        done();
      })
      .catch((err) => done(err));
  });

  it('should not login if email not verified', (done) => {
    const data = {
      email: getUser(0).email,
      password: getUser(0).password,
    };
    request(app)
      .post('/api/auth/login')
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.EMAIL_NOT_VERIFIED);
        done();
      })
      .catch((err) => done(err));
  });

  it('should not login if password not correct', (done) => {
    const data = {
      email: getUser(1).email,
      password: 'abcef',
    };
    request(app)
      .post('/api/auth/login')
      .send(data)
      .expect(401)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.LOGIN_FAIL);
        done();
      })
      .catch((err) => done(err));
  });

  it('should login', (done) => {
    const user = {
      ...getUser(1),
    };
    request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('token');
        done();
      })
      .catch((err) => done(err));
  });
});
