const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../db-handler');
const { getUser, populate } = require('../data/user');

const authMessages = require('../../helpers/message/auth.message');

before(async () => {
  await dbHandler.closeDatabase();
  await dbHandler.connect();
  populate();
});

after(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('/api/auth/register', () => {
  it('should create user', (done) => {
    const user = {
      ...getUser(0),
    };
    request(app)
      .post('/api/auth/register')
      .send(user)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.REGISTER_SUCCESS);
        done();
      })
      .catch((err) => done(err));
  });

  it('should not create user if email exists', (done) => {
    const user = {
      ...getUser(0),
    };
    request(app)
      .post('/api/auth/register')
      .send(user)
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(authMessages.EMAIL_EXIST);
        done();
      })
      .catch((err) => done(err));
  });

  it('should not create user if username is invalid', (done) => {
    const user = {
      ...getUser(0),
    };
    request(app)
      .post('/api/auth/register')
      .send({ ...user, email: 'haha@' })
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((err) => done(err));
  });

  it('should not create user if password is invalid', (done) => {
    const user = {
      ...getUser(0),
    };
    request(app)
      .post('/api/auth/register')
      .send({ ...user, password: '123' })
      .expect(400)
      .then((res) => {
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((err) => done(err));
  });
});
