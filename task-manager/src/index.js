const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5fc91c2de37588363481f2c7')
    // await task.populate('user').execPopulate()
    // console.log(task.user);
    const user = await User.findById('5fc91159c742592158f15d78')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks);
}

main()
app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})