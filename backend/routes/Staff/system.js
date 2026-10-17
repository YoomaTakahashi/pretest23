const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`insert into tb_system(day_open,day_out,round_sys,year_sys,status_sys) values(?,?,?,?,?)`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json(rows)
    } catch (error) {
        console.error("Error save",error);
        res.status(500).json({message:"Error save"})
        
    }
})

router.put('/update/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {id_sys} = req.body
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`update tb_system set day_open=?,day_out=?,round_sys=?,year_sys=?,status_sys=? where id_sys=?`,[day_open,day_out,round_sys,year_sys,status_sys,id_sys])
        res.json(rows)

        
    } catch (error) {
        console.error("Error update",error);
        res.status(500).json({message:"Error update"})
        
    }
})

router.delete('/delete/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {id_sys} = req.params
        
        const [rows] = await db.query(`delete from tb_system where id_sys=?`,[id_sys])
        res.json(rows)
        
    } catch (error) {
        console.error("Error delete",error);
        res.status(500).json({message:"Error delete"})
        
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const [rows] = await db.query(`select * from tb_system where status_sys='y' order by id_system desc`)
        res.json(rows)
        
    } catch (error) {
        console.error("Error get",error);
        res.status(500).json({message:"Error get"})
        
    }
})

// router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
//     try {
        
//         const [rows] = await db.query(`select * from tb_member where role='กรรมการประเมิน' order by id_member desc`)
//         res.json(rows)
        
//     } catch (error) {
//         console.error("Error get",error);
//         res.status(500).json({message:"Error get"})
        
//     }
// })

module.exports = router