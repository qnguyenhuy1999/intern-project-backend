const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../db-handler');
const { getUser } = require('../data/user');

const authMessages = require('../../helpers/message/auth.message');

describe('/api/auth/verify', () => {
  it('should not verify if code false', (done) => {
    const user = {
      ...getUser(1),
    };

    const data = {
      email: user.email,
      code: '123',
    };
    request(app)
      .post('/api/auth/verify')
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.VERIFY_FAIL);
        done();
      })
      .catch((err) => done(err));
  });

  it('should verify', (done) => {
    const data = {
      email: getUser(1).email,
      code: '1ABcd',
    };
    request(app)
      .post('/api/auth/verify')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.VERIFY_SUCCESS);
        done();
      })
      .catch((err) => done(err));
  });

  it('should not verify if email verified', (done) => {
    const user = {
      ...getUser(1),
    };

    const data = {
      email: user.email,
      code: '1ABcd',
    };
    request(app)
      .post('/api/auth/verify')
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.EMAIL_VERIFIED);
        done();
      })
      .catch((err) => done(err));
  });
});
