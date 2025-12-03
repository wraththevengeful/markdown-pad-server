const { Router } = require("express");
const userControllers = require('../controllers/usersControllers');
const passport = require("passport");
const userRouter = Router();

userRouter.post("/signup", userControllers.signupNewUser);
userRouter.post('/login',passport.authenticate('local',{session:false}), userControllers.issueJWTTokenForUserSignIn);

module.exports = userRouter;