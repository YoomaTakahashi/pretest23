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

const auth = require('./routes/auth')
app.use('/api/auth',auth)
const profile = require('./routes/profile')
app.use('/api/profile',profile)

//staff
const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

app.use((req,res)=> res.status(404).json({message:"Route not found"}))
app.listen(3001,()=>{

    console.log("Server Running On 3001");
    

})