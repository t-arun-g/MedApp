const express =require("express");

const path=require('path');
const router = express.Router();
const assert=require('assert');
const MongoClient = require('mongodb').MongoClient;

//setting up the url
const url ='mongodb://0.0.0.0:27017/';
const dbname='MedRepo_db';

MongoClient.connect(url,(err,client)=>{
assert(err,null);
console.log('connected to mongodb server');
})

router.get('/',(req,res,next)=>{
res.send('homepage');
console.log(path.join(__dirname,'../public'))

})

module.exports =router;