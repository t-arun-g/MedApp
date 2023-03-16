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
const LoginPage=require('./login');


//models
const Profile =require('../models/profile.model');
router.use(bodyParser.urlencoded({ extended: false }));



//get requested files for homepage
router.use(express.static(path.join(__dirname,'../public')));
router.use(express.static(path.join(__dirname,'../node_modules')));


//basic get request for homepage
router.get('/',(req,res,next)=>{
    //alert('You are on the homepage');
    res.sendFile(path.join(__dirname,'../views/index.html'))

})




router.get('/add_profile',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../views/login1.html'))
})

router.get('/index1.html',(req,res,err)=>{
    res.sendFile(path.join(__dirname,'../views/index1.html'))
})

router.post('/add_profile',(req,res,next)=>{
        res.sendFile(path.join(__dirname,'../views/index.html'));

       console.log(req.body);
        let lower_email=req.body.email.toLowerCase();
        let newpass = String(req.body.password);
        console.log(newpass);
        const users= new Profile({
            Name:req.body.Name,
            Email:lower_email,
            Designation:req.body.Designation,
            password:newpass
        });
            Profile.create(users);
       
})


router.get('/check_email',(req,res)=>{
        console.log(req.query);

        let message;
        Profile.findOne({Email:req.query.email},(err,result)=>{
            
        if(err)console.log(err);

        if(!result){
            message="user available";
            console.log(message);
            res.json({message:message});
        }
        else{
            message="user exists";
            console.log(message);
            res.json({message:message});
        }

        })
})





module.exports =router;