const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a word document.'))
        }
        cb(undefined, true)
    }
})

app.post('/upload',upload.single('upload') , (req,res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
}

main()
app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})