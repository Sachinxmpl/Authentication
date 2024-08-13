const express = require("express")
const app = express()

const passport = require("passport")
const session = require("express-session")
const path = require("path")
const { connetMongoose, User } = require("./db.js")
const { helper } = require("./passport.js")

connetMongoose();
helper(passport);


const sessionOptions = {
    secret: "this is secret to learn coding ",
    resave: false,
    saveUninitialized: true,
}

app.use(express.urlencoded({
    extended : true 
}))
app.use(express.json())
app.use(session(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.render("home.ejs")
})


app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/register", async (req, res) => {
    console.log(req.body)
    console.log("check")
    const tuser = await User.findOne({ username: req.body.username })
    if (tuser) {
        return res.status(200).send("User alreday exsists")
    }

    const newUser = new User(req.body)
    await newUser.save()
    res.redirect("/")
})


app.post("/login" , passport.authenticate("local" , {
    failureRedirect : "/register" , 
    successRedirect : "/"
}), async(req,res)=>{
    
})

app.listen(3000, () => {
    console.log("Listening to port 3000")
})