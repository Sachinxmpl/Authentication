if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const connectDb = require("./connectdb");
const User = require("./model.js")
const { v4: uuidv4 } = require("uuid")


connectDb(process.env.DB_URI)


app.use(cookieParser())
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))


const verifyToken = (req,res,next) =>{
    const token = req.cookies.token 
    if(!token){
        return res.redirect("/")
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded.username
        return next()
    }catch(err){
        return res.redirect("/")
    }
}





app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.get("/dashboard", (req, res) => {
    res.locals.username = req.user 
    console.log(req.user)
    res.render("dashboard.ejs")
})

app.get("/secretpage",verifyToken ,  (req, res) => {
    res.render("secretpage.ejs")
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password })
    await user.save()

    const token = jwt.sign({ username }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        samesite: lax 
    })
    return res.redirect("/dashboard")
})

app.post("/logout" , (req,res)=>{
    console.log(req.user)
    res.clearCookie("token")
    return res.redirect("/")
})


app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username})
    if (!user) {
        return res.json({
            error: 'Something went wrong'
        })
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.json({
                error: 'Something went wrong'
            })
        }
        if (result) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET)
            res.cookie("token", token, {
                httpOnly: true
            })
            return res.redirect("/dashboard")
        }
        return res.json({
            error: 'Something went wrong'
        })
    })
})




app.listen("4000", () => {
    console.log("server started")
})