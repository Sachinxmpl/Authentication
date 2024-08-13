const {Schema , model} = require("mongoose")
const mongoose = require("mongoose")

const connectDb = (url) =>{
    mongoose.connect(url)
    .then((data)=>{
        console.log(`connected to ${data.connection.host}`)
    })
    .catch(e=>{
        console.log("Database connection failed")
    })
}


module.exports = connectDb