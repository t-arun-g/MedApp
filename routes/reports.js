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
const Report=require("../models/patient.history");
router.use(bodyParser.urlencoded({ extended: false }));

//get requested files for doctor_user page
router.use(express.static(path.join(__dirname,'../public')));
router.use(express.static(path.join(__dirname,'../node_modules')));


router.get('/:patient_id',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../views/report.html'))           
})

// router.get("/:patient_id/getit",(req,res,next)=>{
//     res.json({Name:"Name"})
// })

router.get('/:patient_id/getdata',(req,res,next)=>{
    const doctor_id=req.params.doctor_id;
    console.log(doctor_id)
    let patient_id=req.params.patient_id;

    Report.findOne({ID:patient_id},(err,docs)=>{
              if(err) throw err;
         const Name=docs.Details.get('Name');
         console.log(Name);
         const Age=docs.Details.get('Age');
         const Sex=docs.Details.get('Sex');
         let symptoms=[[]];
         let doc_names=[];
         let numbers=[];
        let i=0;
        docs.Doctors.forEach((value, key) => {
            symptoms[i]=value.Symptoms;
            doc_names[i]=value.Name;
            numbers[i]=key;
            i++;
          });
          res.json({Name:Name,Age:Age,Sex:Sex,Symptoms:symptoms,docnames:doc_names,docnumbers:numbers,many:i});


   })
})



module.exports=router;