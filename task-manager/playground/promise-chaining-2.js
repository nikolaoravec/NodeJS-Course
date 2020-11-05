require('../src/db/mongoose')
const Task = require('../src/models/tasks')

Task.findByIdAndDelete('5fa2d12651c6af3cf459ad64').then((task) => {
    console.log(task);
    return Task.countDocuments({completed: false}).then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    })
})