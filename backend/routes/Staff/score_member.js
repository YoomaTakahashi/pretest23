const express =require('express')
const db = require('../../db')
const path = require('path')
const router = express.Router()
const uploadDir = path.join(__dirname,'../../uploads/file_eva')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')


router.get('/topic/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        const {id_eva} = req.params
        const [topics] = await db.query(`select * from tb_topic`)
        const [indicates] = await db.query(`select * from tb_indicate i,tb_evadetail d where d.id_indicate and d.id_indicate=i.id_indicate and status_eva in (1) and id_eva=?`,[id_eva])
        const result = topics.map(t=>({
            ...t, indicates:indicates.filter((i)=> i.id_topic === t.id_topic)
        }))
        res.json(result)
    } catch (error) {
        console.error('error get topic',error)
        res.status(500).json({message:'error get topic'})
    }
})

router.get('/user/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_eva=? and e.id_member=m.id_member and e.id_sys=s.id_sys order by e.id_eva desc`,[id_eva])
        res.json(rows[0])
    } catch (error) {
        console.error('error get profile',error)
        res.status(500).json({message:'error get profile'})
    }
})



module.exports = router