const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../db-handler');
const { getUser } = require('../data/user');

const authMessages = require('../../helpers/message/auth.message');

describe('/api/auth/resend-mail-verify', () => {
  it('should not resend code if email not exists', (done) => {
    const data = {
      email: 'test@gmail.com',
    };
    request(app)
      .post('/api/auth/resend-mail-verify')
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.EMAIL_NOT_EXIST);
        done();
      })
      .catch((err) => done(err));
  });

  it('should not resend code if email is verified', (done) => {
    const data = {
      email: getUser(1).email,
    };
    request(app)
      .post('/api/auth/resend-mail-verify')
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.EMAIL_VERIFIED);
        done();
      })
      .catch((err) => done(err));
  });

  it('should resend-mail-verify', (done) => {
    const data = {
      email: getUser(0).email,
    };
    request(app)
      .post('/api/auth/resend-mail-verify')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.RESEND_CODE_SUCCESS);
        done();
      })
      .catch((err) => done(err));
  });
});
