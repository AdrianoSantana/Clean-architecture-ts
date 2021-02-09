import request from 'supertest'
import app from '../config/app'

describe('signup Route', () => {
  test('Should enable cors', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
  })
})
