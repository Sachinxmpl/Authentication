const mongoose = require("mongoose")
const express = require("express")

exports.connetMongoose = () =>{
    mongoose.connect("mongodb://localhost:27017/hi")
    .then(()=>{
        console.log("Databse connected successfully ")
    })
    .catch((e)=>{
        console.log(e)
    })
}

const userSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : true , 
        unique : true 
    } , 
    password : {
        type : String , 
        required : true 
    }
})

exports.User = mongoose.model("User",userSchema)