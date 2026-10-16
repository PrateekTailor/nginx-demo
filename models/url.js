const mongoose = require("mongoose"); // 1 db
const { timeStamp } = require("node:console");
const { type } = require("node:os");

const urlschema = new mongoose.Schema({ // 2 db
    shortId :{
        type : String,
        required : true,
        unique:true,
    },
    redirecturl:{
        type : String,
        required : true,
    },
    visithistory:[{timeStamp:{type:Number}}],
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }

},{timestamps:true})

const URL = mongoose.model("url",urlschema) // 3 db

module.exports = URL; // 4 db