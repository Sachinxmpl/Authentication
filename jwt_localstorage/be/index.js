const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()
const app = express()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

app.use(express.json())
app.use(cors())

const users = [
            {
                        username: "sachin",
                        password: "password"
            },
]

app.post("/login", (req, res) => {
            const { username, password } = req.body;
            console.log(username , password)
            const user = users.find((user) => {
                        return (
                                    user.username == username
                        )
            })

            if (!user || password !=user.password) {
                        return res.json({
                                    "message": "incalid credentials",
                                    "status": "failure"
                        })
            }

            const token = jwt.sign({ username, password }, process.env.JWT_SECRET, { expiresIn: "1h" })

            res.json({
                            "message": "user logged in successfully",
                             "status": "success", 
                             "token":token
            })
})

const authenticateToken = (req,res,next)=>{
            console.log("hi")
            console.log(req.headers)
            console.log("_____________________")
            console.log(req.header("Authorization"))
            const token = req.header('Authorization')?.split(' ')[1]; 
            if(!token) {
                        return res.json({
                                    "message": "No token provided"
                        })
            }

            try{
                        const decoded = jwt.verify(token , process.env.JWT_SECRET);
                        console.log(decoded) ;
                        req.user = decoded ; 
                        next() ; 
            }catch(e){
                        return res.json({
                                    "message" : "Error verifying the token"
                        })
            }

}


app.post("/profile" , authenticateToken,(req,res)=>{
            res.json({
                        "message" : `Hello ${req.user.username} , this is your profile `, 
                        "user" : req.user
            })
})

app.listen(8000, () => {
            console.log("to port 8000 ")
})