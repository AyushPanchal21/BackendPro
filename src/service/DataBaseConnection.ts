import mongoose from "mongoose";

export const DBConnect = async () => {
    try {
        const uri = process.env.MONGODBURI
        if(!uri){
            console.log("mongo didn't connect properly")
            throw new Error("MongoDB URI is missing");
        }
       await mongoose.connect(uri);
       console.log("connected to mongo");
    } catch (err) {
        console.log(err)
    }
}
