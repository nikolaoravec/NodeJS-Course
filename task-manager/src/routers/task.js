const express = require('express');
const Task = require("../models/tasks")
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