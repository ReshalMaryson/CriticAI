const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },


    language:{
        type:String,
        required:true
    },


    code:{
        type:String,
        required:true
    },


    result:{
        type:Object,
        required:true
    },


    usage:{
        inputTokens:Number,
        outputTokens:Number,
        totalTokens:Number
    },


    model:{
        type:String,
        default:"gemini-3.5-flash"
    },


    createdAt:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model("Review", reviewSchema);