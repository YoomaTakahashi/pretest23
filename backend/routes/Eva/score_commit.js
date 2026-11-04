const express =require('express')
const db= require('../../db')
const router =express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')
const path = require('path')
const uploadDir = path.join(__dirname,'../../uploads/file_eva')

router.get('/commit',verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s,tb_commit c where c.id_member=? and c.id_member=m.id_member and c.id_eva=e.id_eva and e.id_sys=s.id_sys order by e.id_eva desc`,[id_member])
        res.json(rows)
    } catch (error) {
        console.error('Error get commit',error)
        res.status(500).json({message:'Error get commit'})
    }
})


router.get('/scores',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try {
        const id_member =req.user.id_member
        const [[evaRow]] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_member=? and e.id_member=m.id_member and e.id_sys=s.id_sys order by e.id_eva desc`,[id_member])
        const id_eva = evaRow.id_eva
        const [rows] = await db.query(`select * from tb_indicate i,tb_evadetail d where d.id_indicate=i.id_indicate and status_eva in (2,3,4) order by d.id_eva=?`,[id_eva])
        const scores = {}
        rows.map(row=>{
            const id = row.id_indicate
            const status = row.status_eva
            const point = row.point_indicate
            const score = row.score_commit
            if(!scores[id]){
                scores[id]={
                    a:null,
                    b:null,
                    c:null,
                }
            }
            if(status === 2)scores[id].a = score*point
            if(status === 3)scores[id].b = score*point
            if(status === 4)scores[id].c = score*point
        })
        res.json(scores)
    } catch (error) {
        console.error("Error get",error);
        res.status(500).json({message:"Error get"})
    }
})
module.exports = router