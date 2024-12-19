const mongoose=require("mongoose");
const validator=require("validator");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide the name field"],
        minlength:3,
        maxlength:50
    },
    email:{
        unique:true,
        type:String,
        required:[true,"Please provide the email"],
        validate:{
            validator:validator.isEmail,
            message:"Please provide a valid email"
        }
    },
    password:{
        type:String,
        required:["true","Please provide password"],
        minlength:6
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

module.exports=mongoose.model("User",UserSchema);