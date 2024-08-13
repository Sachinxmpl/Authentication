if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require('express');
const app = express();
const port = 5000;
const { connetMongoose, User } = require("./db.js")

const passport = require("passport")
const { helper, isUser } = require("./passport.js")

const session = require("express-session")
const flash = require("connect-flash")
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false , 
    cookie: {
        expire: Date.now() +  1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24 , 
        httpOnly: true
    }
}))


app.use(passport.initialize())
app.use(passport.session())
helper(passport)
app.use(flash())





const dburl = process.env.DB_URL;
connetMongoose(dburl);


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });


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
    res.render("dashboard.ejs")
})


app.post("/register", async (req, res) => {
    try {
        const { username,  password } = req.body
        const newUser = new User({
            username,
            password
        })
        newUser.save()
        req.flash("success", "User registered successfully")
        res.redirect("/dashboard")
    }
    catch(e){
        req.flash("error", "Something went wrong")
        res.redirect("/register")
    }
})

app.post("/login" , passport.authenticate('local' , {
    successRedirect : "/dashboard" ,
    failureRedirect : "/register" ,
    failureFlash : true , 
    successFlash : true
}))


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});