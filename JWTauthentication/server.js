if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const connectDb = require("./connectdb");
const User = require("./model.js")
const { v4: uuidv4 } = require("uuid")
const { setUser, getUser } = require("./auth.js")

connectDb(process.env.DB_URI)


app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

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

app.get("/secretpage", (req, res) => {
    res.render("secretpage.ejs")
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    await User.create({
        username,
        password
    })
    return res.redirect("/dashboard")
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username, password })
    if (!user) {
        return res.json({
            error: 'Invalid user '
        })
    }
    const sessionId = uuidv4()
    return res.redirect("/dashboard")
})

app.listen("4000", () => {
    console.log("server started")
})