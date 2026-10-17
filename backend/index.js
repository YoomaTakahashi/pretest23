require('dotenv').config({path:".env"})
const express = require('express')
const cors = require('cors')
const path = require('path')
const fileUp = require('express-fileupload')
const app = express()

app.use(cors({
    origin:`http://localhost:3000`,
    credentials: true
}))
app.use(fileUp())
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

const profile = require('./routes/profile')
app.use('/api/profile',profile)
const auth = require('./routes/auth')
app.use('/api/auth',auth)

//staff
const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const system = require('./routes/Staff/system')
app.use('/api/Staff/system',system)

const eva = require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

const commit = require('./routes/Staff/commit')
app.use('/api/Staff/commit',commit)



app.use((req,res)=> res.status(404).json({message:"Route not found"}))
app.listen(3001,()=>{

    console.log("Server Running On 3001");
    

})