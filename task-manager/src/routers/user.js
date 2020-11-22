const express = require('express');
const User = require("../models/user")
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/users/me' ,auth , async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = User.findById(_id)
        if (!user) {
            return res.sendStatus(404)
        }
        res.send(user)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.patch('/users/:id', async (req,res) => {


    const updates = Object.key(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({'error' : ' Invalid updates'})
    }

    try {

        const user = await findById(req.params.id)
        updates.forEach((update) => {
            req.body[update] = updates[update]
        })

        user.save()
        // const user = await findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
 
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users',async (req, res) => {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    
    user.save().then(() => {
        res.status(201).send({user, token})
    }).catch((error) => {
        res.status(400).send(error)
    })
})

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send()
    }   
})

module.exports = router