const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const { checkUserExistence } = require('../db/queries');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await checkUserExistence(username);
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const isAMatch = await bcrypt.compare(password, user.password_hash);
            if (!isAMatch) {
                return done(null, false, { message: "Incorrect password" });
            }
            
            // console.log(user);

            const{password_hash, created_at, full_name, ...safeUser} = user;
            console.log(safeUser);
            return done(null, safeUser);
        } catch (error) {
            return done(error);
        }
    })
);
