const mongoose = require("mongoose")
const express = require("express")
const bcrypt = require("bcrypt")

exports.connetMongoose = (url) =>{
    mongoose.connect(url)
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
        required : true  , 

    }
} , {
    timestamps : true
})


userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})

exports.User = mongoose.model("User",userSchema)