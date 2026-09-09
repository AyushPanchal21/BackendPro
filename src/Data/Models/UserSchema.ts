import mongoose,{Schema} from 'mongoose'
import type { User } from '../../Domain/enitites/User.js'

const userSchema = new Schema<User>({
    name:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required : true,
        unique:true,
    },
    orgOwner:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

 export const UserModel = mongoose.model<User>("User",userSchema)
