require('../src/db/mongoose')
const User = require("../src/models/user")

// 5fa2d07eddc44b3cb44e0373

User.findByIdAndUpdate('5fa2e895ba365438380099d4', { age: 1 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})
