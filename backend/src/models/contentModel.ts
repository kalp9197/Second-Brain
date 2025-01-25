import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({

    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId :[{type:mongoose.Types.ObjectId, ref:'User',required:true}]
})

const contentModel = mongoose.model('contentModel',contentSchema)

export default contentModel
