const db = require('../db/queries');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function signupNewUser(req, res) {
    const { username, fullname, password } = req.body;
    const success = await db.addUserToDB(username, fullname, password);
    if (success) {
        res.json({ message: "User added Successfully" });
    } else {
        res.status(500).json({ message: "User cant be added!" });
    }
};

async function issueJWTTokenForUserSignIn(req, res) {
    const payload = {
        sub:req.user.id,
        username: req.user.username,
        isAdmin: req.user.isAdmin
    };

    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({token: "Bearer "+token});
}

module.exports = {
    signupNewUser,
    issueJWTTokenForUserSignIn
}