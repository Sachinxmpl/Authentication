const { User } = require("./db.js")
const LocalStrategy = require("passport-local").Strategy


exports.helper = (passport) => {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if (!user) return done(null, false)

            if (user.password != password) return done(null, false)
            return done(null, user)
        }
        catch (err) {
            return done(err, false)
        }
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async(id , done)=>{
        try{
            const user = await User.findById(id)
            done(null  , user)
        }
        catch(err){
            done (err , false) 
        }
    });

}

exports.isUser = (req,res,next)=>{
    if(req.user){
        return next()
    }
    res.redirect("/")
}