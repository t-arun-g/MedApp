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
router.use(bodyParser.urlencoded({ extended: false }));


//redirect to index
router.get('/index.html',(req,res)=>{
        res.redirect(homepage);
})

router.get('/checklogin',(req,res)=>{
        console.log(req.query);

    let email=req.query.Email;
    let password=req.query.password;
    Profile.findOne({Email:email,password:password},(err,docs)=>{

        if(err)console.log(err);

        let message;
         if(!docs){
            message="Invalid";
            console.log(message);
            res.json({message:message});
        }
        else{
            message="Success";
            console.log(message)
            console.log(docs.Email);
            console.log(docs.id)   
            res.json({message:message, id:docs.id});

        }
        })

})


//get requested files for loginpage
router.use(express.static(path.join(__dirname,'../public')));
router.use(express.static(path.join(__dirname,'../node_modules')));


router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/login.html'))
})



module.exports=router;