const mongoose=require('mongoose')

const report_schema=mongoose.Schema({
    ID:{
        type:String,
        required:true,
    },
    Details:{
        type:Map,
        required:true
    },
    Doctors:{
        type:Map,
        required:true
    }
})

const report=mongoose.model("report",report_schema);
module.exports=report;
