import mongoose,{Schema} from "mongoose";
import type{ Application } from "../../Domain/enitites/Application.js";
import { Status } from "../../Domain/enitites/Application.js";


const applicationSchema = new Schema<Application>({
    orgid:{
        type : String,
        required:true,
    },
    userid:{
        type : String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(Status)
    },
})

export const ApplicationModel = mongoose.model<Application>("Application",applicationSchema)