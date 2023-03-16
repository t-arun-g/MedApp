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
    res.sendFile(path.join(__dirname,'../views/appointments.html'))
    
})

router.get('/doctor/:doctor_id',(req,res,next)=>{
    res.redirect('/doctor/'+req.params.doctor_id);
})

router.get('/getdata',(req,res,next)=>{  
    console.log(req.params.doctor_id)
    Profile.findById(req.params.doctor_id,(err,docs)=>{
        if(err) throw err;
            let doctor_email=docs.Email;
            console.log(doctor_email)
            Appointment.find({Doc_Email:doctor_email,Status:"In Process"},(err,docs)=>{
                let number=docs.length;
                let Name=[];
                let id=[];
                console.log(number);
               if(number!=0){ for(let i=0;i<number;i++){
                    Name[i]=docs[i].Name;
                    id[i]=docs[i].id;
                }
                res.json({Name:Name,number:number,id:id});}
                else res.json({number:0});
            })

    })})

  

router.post('/approved/:id',(req,res,next)=>{
    Appointment.findByIdAndUpdate(req.params.id,{Status:"Appointed"},(err,doc)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", doc);
             res.json({message:"success"})
        }
    })
})

router.post('/declined/:id',(req,res,next)=>{
    Appointment.findByIdAndUpdate(req.params.id,{Status:"Declined"},(err,doc)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", doc);
             res.json({message:"success"})
        }
    })
})

router.get('/appointed',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../views/appointed.html'))
})

router.get('/index1',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../views/index1.html'))
})

router.get('/approveddata',(req,res,next)=>{
    console.log('approveddata')
    Profile.findById(req.params.doctor_id,(err,docs)=>{
        if(err) throw err;
            let doctor_email=docs.Email;
            console.log(doctor_email)
            Appointment.find({Doc_Email:doctor_email,Status:"Appointed"},(err,docs)=>{
                let number=docs.length;
                let Name=[];
                console.log(number);
                for(let i=0;i<number;i++){
                    Name[i]=docs[i].Name;
                }
                res.json({Name:Name,number:number});
            })

    })

})


module.exports =router;