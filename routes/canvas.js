const express =require("express");
const mongoose=require("mongoose");
const path=require('path');
let router = express.Router({ mergeParams: true });
const bodyParser = require("body-parser");
const assert=require('assert');
const mongodb=require('mongodb');
const jsdom=require('jsdom')


//jquery
const dom=new jsdom.JSDOM("")
const jquery=require('jquery')(dom.window)


//routes
const homepage=require('./home');


//models
const Profile =require('../models/profile.model');
const Patient=require("../models/patients.doc");
const Appointment=require("../models/appointments");
router.use(bodyParser.urlencoded({ extended: false }));

//get requested files for doctor_user page
router.use(express.static(path.join(__dirname,'../public')));
router.use(express.static(path.join(__dirname,'../node_modules')));


router.get('/',(req,res,next)=>{
    console.log(req.params.doctor_id)
    res.sendFile(path.join(__dirname,'../views/canvas.html'))
    
})


module.exports=router;