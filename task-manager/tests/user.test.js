const request = require('supertest')
const jwt = require('jsonwebtoken')
const User = require('../src/models/user')
const app = require('../src/app')
const mongoose = require('mongoose')

const user1Id = new mongoose.Types.ObjectId()
const userOne = {
    _id: user1Id,
    name: 'Nemanja',
    email: 'nemanja@gmail.com',
    password: 'nemanja98',
    tokens: [{
        token: jwt.sign({ _id: user1Id }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
   const response = await request(app)
        .post('/users')
        .send({
            name: 'Nikola',
            email: 'nikola@gmail.com',
            password: 'nikola98'
        })
        .expect(201)

        

        const user = await User.findById(response.body._id)
        expect(user).not.toBeNull()
        
        console.log(user)
        expect({
            user: {
                 email: 'nikola@gmail.com',
                 name: 'Nikola',
                 token: user.tokens[0].token
             }
         }).toMatchObject(user)
})

test('Should login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)
})

test('Should not login nonexisting user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'nikola@gmail.com',
            password: 'user1.password'
        })
        .expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unautheticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete account for unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

