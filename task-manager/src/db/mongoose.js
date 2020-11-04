const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'

mongoose.connect(connectionURL+'/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// myTask.save().then(() => {
//     console.log(myTask);
// }).catch((error) => {
//     console.log('Error:' + error);
// })

// const myTask = new Task({
//     description: '                     Finish the 3rd edition of NodeJS course          ',
// })

// const me = new User({
//     name: 'Nikola',
//     email: 'NIKOLAa@gmail.com',
//     age: 21,
//     password: '           password123    '
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error);
// })