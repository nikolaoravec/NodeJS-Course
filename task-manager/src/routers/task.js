const express = require('express');
const { findByIdAndUpdate, findById } = require('../models/tasks');
const Task = require("../models/tasks");
const { route } = require('./user');
const router = express.Router()

router.get('/tasks', (req, res) => {

    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.sendStatus(500)
    })

})

router.get('/tasks/:id', (req, res) => {

    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.sendStatus(404)
        }

        res.send(task)
    }).catch((e) => {
        res.sendStatus(500)
    })
})

router.patch('/tasks/:id', async (req,res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isUpdateAllowed = updates.every((update) => {allowedUpdates.includes(update)})

    if (!isUpdateAllowed) {
        return res.status(400).send({'error': 'Invalid Update in Tasks'})
    }

    try {

        const task = await findById(req.params.id)
        updates.forEach((update) => {
            req.body[update] = updates[update]
        })

        task.save()

        // const task = await findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

module.exports = router