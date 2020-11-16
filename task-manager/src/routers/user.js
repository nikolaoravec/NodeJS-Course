const express = require('express');
const User = require("../models/user")
const router = express.Router()


router.get('/test', (req, res) => {
    res.send('From a new file.')
})

router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})

router.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.sendStatus(404)
        }

        res.send(user)
    }).catch((e) => {
        res.sendStatus(500)
    })
})

router.patch('/users/:id', async (req,res) => {


    const updates = Object.key(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({'error' : ' Invalid updates'})
    }

    try {
        const user = await findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

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

router.post('/users', (req, res) => {
    const user = new User(req.body)
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

module.exports = router