//CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClinet = mongodb.MongoClient
// const obejectID = mongodb.obejectID

const { ObjectID, MongoClinet, MongoClient } = require('mongodb')

// const id = new ObjectID()

// console.log(id);
// console.log(id.getTimestamp());

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        _id: ObjectID('5fa187f89f76ef2c2cb71213')
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

    // db.collection('users').deleteMany({
    //     age: 19
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })


    /*     updateOne() AND updateMany()
    db.collection('users').updateOne({
        _id:ObjectID('5fa183938e7cad20e0224a6c')
    }, 
    {
        $set: {
            name: 'Nemanja'
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

    db.collection('tasks').updateMany({
            completed: false
        },{
            $set: {
                completed: true
            }
        } ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    */


    /*      find() AND findOne()
    db.collection('tasks').findOne({_id: ObjectID('5fa187f89f76ef2c2cb71215')}, (error, task) => {
        if (error) {
            console.log('Unable to fetch task!');
        }

        console.log(task);
    })

    db.collection('tasks').find({completed: false}).toArray( (error, tasks) => {
        if (error) {
            console.log('Unable to fetch tasks');
        }

        console.log(tasks);
    } )

    db.collection('users').find({name: 'Nikola'}).toArray((error,users) => {
        if (error) {
            console.log('Unable to fetch users!');
        }
        console.log(users);
    })

    db.collection('users').find({name: 'Nikola'}).count((error,count) => {
        if (error) {
            console.log('Unable to fetch users!');
        }
        console.log(count);
    })

    db.collection('users').findOne({_id: ObjectID('5fa185366582c01b3440ebe8')}, (error, user) => {
        if (error) {
            console.log('Unable to fetch data!');
        }

        console.log(user);
    })
    */
    /*     insert() AND inserOne()
    db.collection('users').insertOne({
        _id: id,
        name: 'Mark',
        age: 19
    }, (error, result) => {
        if (error) {
            return console.log('Unable to inser user!');
        }

        console.log(result.ops);
    })

    db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 22
        },
        {
            name: 'Nikola',
            age: 22
        },
        {
            name: 'Michael',
            age: 28
        }
    ], (error, result) => {
        if (error) {
            console.log('Unable to inser users!');
        }

        console.log(result.ops);
    })

    db.collection('tasks').insertMany([
        {
            description: 'Add 2 more task inside of tasks',
            completed: true
        },
        {
            description: 'Push code from course to GitHub',
            completed: false
        },
        {
            description: 'Finish the task-manager course project',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            console.log('Unable to insert tasks');
        }

        console.log(result.ops);
    })
    */
})