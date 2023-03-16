//const assert = require("assert");
const express =require("express");
const MongoClient= require("mongodb").MongoClient;
const app = express()
const path=require('path')
const mongoose=require("mongoose")

//routes
const homepage=require('./routes/home.js');
const profiles=require('./routes/profiles.js');
const LoginPage=require('./routes/login.js')
const doctorpage=require("./routes/doctor_user.js")
const appointment=require("./routes/appointments.js")
const report_patient=require("./routes/reports.js")
const canvas=require("./routes/canvas.js")

//connect to mongoose
const url= 'mongodb://127.0.0.1:27017/profile_2_db';
const connection = mongoose.connect(url);

//connection to mongoose
connection.then((db) => {
    console.log("Connected correctly to the mongoose server");
}, (err) => { console.log(err); });

//basic routes
app.use('/',homepage);
app.use('/login',LoginPage);
app.use('/doctors/:doctor_id/reports',report_patient);
app.use('/doctors/:doctor_id/appointments',appointment);
app.use('/doctors/:doctor_id/canvas',canvas);

app.get('/login/doctor/:doc_id/',(req,res,next)=>{
    let doc_id=req.params.doc_id;
    res.redirect('/doctor/'+doc_id);
})
app.use('/doctor',doctorpage);

app.listen(process.env.port || 3000,()=>{
    console.log('Web Server is listening at port '+ (process.env.port || 3000));
    
});


