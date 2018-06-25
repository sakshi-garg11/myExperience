var express=require("express");
var router = express.Router();
var passport = require("passport");
var User =  require("../models/user");


//root route
router.get("/",function(req,res){
    res.render("landing") 
});


//===============
//AUTH ROUTES
//===============

//show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
     if(err){
        //  console.log("hiiiii=======");
        //req.flash("error", err.message);
        console.log(err);
        //return res.render("register");
        return res.render("register", {"error": err.message});
     } 
         //console.log("hiiiii=======");
      passport.authenticate("local")(req, res, function(){
         req.flash("success", "Welcome to myXperience " + user.username);
         res.redirect("/campgrounds");
     });   
  });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
})

//handling login logic
//middleware
router.post("/login", passport.authenticate("local",
    {
         successRedirect: "/campgrounds",
         failureRedirect: "/login"
    }), function(req, res){
});

//add logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

// //middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;