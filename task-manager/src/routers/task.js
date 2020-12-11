const express = require('express');
const Task = require("../models/task");
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = express.Router()

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        user: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user._id})
        // await user.populate('tasks').execPopulate()

        res.send(tasks)
    
        
    } catch (error) {
        return res.status(500).send()
    }
})
 
router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, user: req.user._id })
        console.log(task);
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req,res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isUpdateAllowed = updates.every((update) => {allowedUpdates.includes(update)})

    if (isUpdateAllowed) {
        return res.status(400).send({'error': 'Invalid Update in Tasks'})
    }

    try {

        const task = await Task.findOne({ _id: req.params.id , user: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

// router.post('/tasks', (req, res) => {
//     const task = new Task(req.body)

//     task.save().then(() => {
//         res.status(201).send(task)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

module.exports = router