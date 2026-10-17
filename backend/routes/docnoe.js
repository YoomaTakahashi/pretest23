const express =require('express')
const db =require('../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../middleware/authmiddleware')

router.get('/',async (req,res) => {
    try {
        const [rows] = await db.query(`select * from tb_doc`)
        res.json(rows)
    } catch (error) {
        console.error('error get ',error)
    }
})
module.exports = router