const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {name_topic} = req.body
        const [rows] = await db.query(`insert into tb_topic(name_topic) values(?)`,[name_topic])
        res.json(rows)
    } catch (error) {
        console.error("Error save",error);
        res.status(500).json({message:"Error save"})
        
    }
})

router.put('/update/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {id_topic} = req.body
        const {name_topic} = req.body
        const [rows] = await db.query(`update tb_topic set name_topic=? where id_topic=?`,[name_topic,id_topic])
        res.json(rows)

        
    } catch (error) {
        console.error("Error update",error);
        res.status(500).json({message:"Error update"})
        
    }
})

router.delete('/delete/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {id_topic} = req.params
        
        const [rows] = await db.query(`delete from tb_topic where id_topic=?`,[id_topic])
        res.json(rows)
        
    } catch (error) {
        console.error("Error delete",error);
        res.status(500).json({message:"Error delete"})
        
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const [rows] = await db.query(`select * from tb_topic order by id_topic desc`)
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