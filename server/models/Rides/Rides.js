import mongoose from 'mongoose';


let customerSchema = new mongoose.Schema({
    Destination:{
        type:String,
   
    },
    Pickup:{
        type:String,
      
    },
    user_id:{
        type:String,
   
    },
    rider_id:{
        type:String,
 
    },
    fare:{
        type:String
    }

},{timestamps:true})


let ridesModel = mongoose.model("Rides",customerSchema)

export default ridesModel