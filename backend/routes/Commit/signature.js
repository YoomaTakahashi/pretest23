const express = require('express')
const path = require('path')
const fs = require('fs')
const db = require('../../db')
const { verifyToken, requireRole } = require('../../middleware/authmiddleware')
const router = express.Router()
const uploadDir = path.join(__dirname,'../../uploads/signature')

router.get('/:id_eva',verifyToken,requireRole('กรรมการประเมิน'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const [rows] = await db.query(`select signature from tb_commit where id_eva=? and id_member=?`,[id_eva,id_member])
        res.json(rows[0])
    } catch (error) {
        console.error("Error get",error);
        res.status(500).json({message:"Error get"})
    }
})

router.post('/:id_eva',verifyToken,requireRole('กรรมการประเมิน'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const file = req.files?.file
        const filename = Date.now() + path.extname(file.name)
        await file.mv(path.join(uploadDir,filename))
        await db.query(`update tb_commit set signature=? where id_eva=? and id_member=?`,[filename,id_eva,id_member])
        const [SumCommit] = await db.query(`select * from tb_commit where status_commit=? and signature!='${null}' and id_eva=?`,['y',id_eva])
        if(SumCommit.length === 3){
            await db.query(`update tb_eva set status_eva=? where id_eva=?`,[3,id_eva])
        }
        res.status(201).json({message:'Uploads Success'})
    } catch (error) {
        console.error("Error Uploads",error);
        res.status(500).json({message:"Error Uploads"})
    }
})

router.delete('/:id_eva',verifyToken,requireRole('กรรมการประเมิน'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const [[row]] = await db.query(`select signature from tb_commit where id_eva=? and id_member=?`,[id_eva,id_member])
        if (!row) {
            return res.status(404).json({message:'Committee assignment not found'})
        }
        if (row.signature) {
            const filePath = path.join(uploadDir,row.signature)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        }
        await db.query(`update tb_commit set signature=? where id_eva=? and id_member=?`,[null,id_eva,id_member])
        res.json({message:'Signature deleted'})
    } catch (error) {
        console.error("Error delete signature",error)
        res.status(500).json({message:"Error delete signature"})
        
    }
})

module.exports = router