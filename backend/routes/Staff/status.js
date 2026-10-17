const express =require('express')
const db = require('../../db')
const path = require('path')
const router = express.Router()
const uploadDir = path.join(__dirname,'../../uploads/file_eva')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.get('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s,tb_commit c where c.id_eva=? and c.id_member=m.id_member and c.id_eva=e.id_eva and e.id_sys=s.id_sys order by e.id_eva desc`,[id_eva])
        res.json(rows)
    } catch (error) {
        console.error('error get profile',error)
        res.status(500).json({message:'error get profile'})
    }
})

module.exports = router