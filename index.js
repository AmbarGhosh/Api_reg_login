const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express()

app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const route = require('./routes/route')
app.use('/api', route)

const dbDriver = "mongodb+srv://ambarghosh:5ySnzH5XPwXgtQ5Q@cluster0.a051rmr.mongodb.net/api_project"
const port = process.env.PORT || 6999
mongoose.connect(dbDriver,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(result => {
        app.listen(port, () => {
            console.log(`server is running at http://localhost:${port}`)
            console.log(`Mongo DB Connencted..!`)
        })
    }).catch(error => {
        console.log({ message: error })
    })