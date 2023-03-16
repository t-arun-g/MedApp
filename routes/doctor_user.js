const express =require("express");
const mongoose=require("mongoose");
const path=require('path');
const router = express.Router();
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
router.use(bodyParser.urlencoded({ extended: false }));

//get requested files for doctor_user page
router.use(express.static(path.join(__dirname,'../public')));
router.use(express.static(path.join(__dirname,'../node_modules')));



router.get('/:doc_id',(req,res,next)=>{
    console.log("hello")
    res.sendFile(path.join(__dirname,'../views/index1.html'));
})

router.get('/getdata/:doc_id',(req,res,next)=>{
    console.log(req.params.doc_id);
    let doc_name;
    let email;
    let doc_id=req.params.doc_id;
    console.log(doc_id);

    Profile.findById(doc_id,(err,doc)=>{
    doc_name=doc.Name;
    email=doc.Email;
    console.log(email)
   
    let patients=[];
    let symptoms=[];
    
    let id=[];  

    Patient.find({Email:email},(err,docs)=>{
            console.log(docs);
            number=docs.length;
            j=0;
            for(let i=0;i<docs.length;i++){
                    patients[i]=docs[i].Patient;
                    id[i]=docs[i].id;
                        symptoms[j+i+0]=docs[i].Sym_1;
                        symptoms[j+i+1]=docs[i].Sym_2;
                        symptoms[j+i+2]=docs[i].Sym_3;
                        symptoms[j+i+3]=docs[i].Sym_4;
                        symptoms[j+i+4]=docs[i].Sym_5;   
                        j=j+4;                
            }
            res.json({Name:doc_name,Patients:patients,Symptoms:symptoms,number:number,id:id});

    })
})

}

)










module.exports=router;