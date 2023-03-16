const mongoose=require("mongoose")



const profile_schema=mongoose.Schema({
    Name : {
        type:String,
        required:true,
    },
    Email : {
        type:String,
        required:true

    },
    Designation : {
        type:String,
        required:true

    },
    password :{
        type: String,
        require:true
    }
    
});




const profile=mongoose.model("profile",profile_schema);
module.exports=profile;

