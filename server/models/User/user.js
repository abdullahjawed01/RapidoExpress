import mongoose from 'mongoose';


let customerSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        unique:true,
        trim:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        require:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    isActive:{
        type:Boolean,
        require:true,
        trim:true,
        default:true
    },
    isVerified:{
        email:{
            type:Boolean,
            default:false
        },
        phone:{
            type:Boolean,
            default:false
         }
    },
    isVerifiedToken:{
        emailToken:{
            type:String,
            default:null
        },
        phoneToken:{
            type:String,
            default:null
        }
    },
    address:{
        type:String,
        require:true,
        trim:true
    },
    currentride:{
        type:String,
        default:null
    }
},{timestamps:true,strict:false})


let userModel = mongoose.model("User",customerSchema)

export default userModel