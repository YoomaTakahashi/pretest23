const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        const {id_eva} = req.params
        await db.query(`delete from tb_commit where id_eva = ?`,[id_eva])
        const m = req.body
        const v = m.map(p=>[id_eva,p.id_member,'n',p.role])
        const [rows] = await db.query(`insert into tb_commit(id_eva,id_member,status_commit,level_commit) values ?`,[v])
        res.json(rows)
    } catch (error) {
        console.error("Error save",error);
        res.status(500).json({message:"Error save"})
        
    }
})

// router.put('/update/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
//     try {
        
//         const {id_eva} = req.body
//         const {id_member,id_sys,day_eva} = req.body
//         const [rows] = await db.query(`update tb_eva set id_member=?,id_sys=?,day_eva=? where id_eva=?`,[id_member,id_sys,day_eva,id_eva])
//         res.json(rows)

        
//     } catch (error) {
//         console.error("Error update",error);
//         res.status(500).json({message:"Error update"})
        
//     }
// })

router.delete('/delete/:id_commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {id_commit} = req.params
        
        const [rows] = await db.query(`delete from tb_commit where id_commit=?`,[id_commit])
        res.json(rows)
        
    } catch (error) {
        console.error("Error delete",error);
        res.status(500).json({message:"Error delete"})
        
    }
})

router.get('/header/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_eva e,tb_member m,tb_system s where e.id_eva=? and e.id_member = m.id_member and e.id_sys = s.id_sys order by id_eva desc`,[id_eva])
        res.json(rows[0])
        
    } catch (error) {
        console.error("Error get",error);
        res.status(500).json({message:"Error get"})
        
    }
})

router.get('/member/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        const {id_eva} = req.params
        const [pick] = await db.query(`select id_member,concat(fname,' ',lname)as fullname_commit from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        const [picked] = await db.query(`select m.id_member,fname,lname,id_commit,level_commit as role from tb_member m,tb_commit c,tb_eva e where c.id_eva = ? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json({pick,picked})
        
    } catch (error) {
        console.error("Error get",error);
        res.status(500).json({message:"Error get"})
        
    }
})

module.exports = router