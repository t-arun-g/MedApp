const express =require("express");
const mongoose=require("mongoose");
const path=require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const assert=require('assert');
const mongodb=require('mongodb');
const jsdom=require('jsdom')


//get requested files for doctor_user page
router.use(express.static(path.join(__dirname,'../public')));
router.use(express.static(path.join(__dirname,'../node_modules')));

router.get('/:patients',(req,res,next)=>{
    console.log(req.params.doctor_id)
    res.sendFile(path.join(__dirname,'../views/add_patients.html'))
    
})
router.get('/index.html',(req,res)=>{
    res.redirect(homepage);
})
router.get('/patients',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'./index1.html'))
})

router.get('/appointements',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'./appointments.html'))
})

module.exports=router;