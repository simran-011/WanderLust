const express = require("express");
const app = express();
let  session = require('express-session');
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let flash = require('connect-flash');

let sessionOptions = {
    secret: "devilsQueen",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req,res) => {
    let {name = "simran"} = req.query;
    req.session.name = name;
    if(req.session.name === "simran") {
        req.flash("failure", "No user registered");
        
    } else {
        req.flash("success", "User registered successfully");
    }
    
    res.redirect("/hello")
    // console.log(req.session.name);

})

app.get("/hello", (req,res)=> {
    res.locals.name = req.session.name;
    res.locals.successMsg = req.flash("success");
    res.locals.failureMsg = req.flash("failure");
    res.render("page.ejs");
})

// app.get("/countReq", (req,res)=> {
//     if(req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
        
//     }
//     res.send(`you have send a request on this route for ${req.session.count} times`);
     
// })


app.listen(3000, ()=> {
    console.log("server is listening to the port 3000");
});


