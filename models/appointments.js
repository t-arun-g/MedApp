const mongoose= require('mongoose');

const appointments_schema= mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Sex:{
        type:String,
        required:true
    },
    Age:{
        type:String,
        required:true
    },
    Doc_Email:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    }
});

const appointment=mongoose.model("appointment",appointments_schema)
module.exports=appointment;