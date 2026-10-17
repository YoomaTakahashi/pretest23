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

//eva

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const score_member = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',score_member)

const score_commit = require('./routes/Eva/score_commit')
app.use('/api/Eva/score_commit',score_commit)

const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

//คอมมิท

const show_eva = require('./routes/Commit/show_eva')
app.use('/api/Commit/show_eva',show_eva)

const save_score = require('./routes/Commit/save_score')
app.use('/api/Commit/save_score',save_score)

const score_member2 = require('./routes/Commit/score_member')
app.use('/api/Commit/score_member',score_member2)

app.use((req,res)=> res.status(404).json({message:"Route not found"}))
app.listen(3001,()=>{

    console.log("Server Running On 3001");
    

})