const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`insert into tb_indicate(id_topic,name_indicate,detail_indicate,point_indicate,check_indicate) values(?,?,?,?,?)`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json(rows)
    } catch (error) {
        console.error("Error save",error);
        res.status(500).json({message:"Error save"})
        
    }
})

router.put('/update/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {id_indicate} = req.body
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`update tb_indicate set id_topic=?,name_indicate=?,detail_indicate=?,point_indicate=?,check_indicate=? where id_indicate=?`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate,id_indicate])
        res.json(rows)

        
    } catch (error) {
        console.error("Error update",error);
        res.status(500).json({message:"Error update"})
        
    }
})

router.delete('/delete/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {id_indicate} = req.params
        
        const [rows] = await db.query(`delete from tb_indicate where id_indicate=?`,[id_indicate])
        res.json(rows)
        
    } catch (error) {
        console.error("Error delete",error);
        res.status(500).json({message:"Error delete"})
        
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const [rows] = await db.query(`select * from tb_indicate i,tb_topic t where i.id_topic = t.id_topic order by id_indicate desc`)
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