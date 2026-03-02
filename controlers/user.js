const User = require("../models/user.js");

module.exports.signUpUser = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!!");
            res.redirect("/listings");
        })

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signUp")
    }

};

module.exports.renderLoginPage = (req, res) => {
    res.render("./users/login.ejs");
};

module.exports.loginPage = async (req, res) => {
        req.flash("success", "you have successfully logged in!!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }

module.exports.logOutPage = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "you have been logged out!!");

        res.redirect("/listings");
    })
};    


