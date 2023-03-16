const mongoose =require("mongoose")

const patients_schema=mongoose.Schema({
    Patient:{
        type: String,
        required:true,
    },
    Sym_1:{
        type:String,
        required:false
    },
    Sym_2:{
        type:String,
        required:false
    },
    Sym_3:{
        type:String,
        required:false
    },
    Sym_4:{
        type:String,
        required:false
    },
    Sym_5:{
        type:String,
        required:false
    },
    Email:{
        type:String,
        required:true
    },
    Doctor:{
        type:String,
        required:true
    }}
   
);

const Patient=mongoose.model("Patient",patients_schema);
module.exports=Patient;
