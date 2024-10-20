const mongoose = require("mongoose");
let isConnected = false;

export const connecttoDb = async()=>{
    mongoose.set("strictQuery")
    if(isConnected){
        console.log("Database is already connected");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
        });
        isConnected = true;
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
    }
}