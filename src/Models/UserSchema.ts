import mongoose,{Schema} from 'mongoose'
interface UserSchema {
    name: string,
    email : string,
    password : string,
    createdAt : Date,
}

const userSchema = new Schema<UserSchema>({
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
    createdAt:{
        type:Date,
        default:Date.now
    },
})

 export const User = mongoose.model<UserSchema>("User",userSchema)
