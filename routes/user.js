const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controlers/user.js");
router.get("/signUp", (req, res) => {
    res.render("./users/signUp.ejs");
});


//sign up page
router.post("/signUp", wrapAsync(userController.signUpUser));


// login page
router.get("/login", userController.renderLoginPage);

router.post("/login", saveRedirectUrl, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}),
    userController.loginPage);

//  logout page   
router.get("/logOut",userController.logOutPage );
module.exports = router;
