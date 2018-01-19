var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/", function(req, res){
   res.render("landing");
})
 
// show register form route
router.get("/register", function(req, res){
   res.render("register");
});

// handles sign up logic route
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if(err){
         req.flash("error", err.message);
         return res.render("register", { error: req.flash("error") });
      }
      passport.authenticate("local")(req, res, function(){
         req.flash("success", "Welcome to YelpCamp " + user.username);
         res.redirect("/campgrounds");
      })
   })
});

// show login form route
router.get("/login", function(req, res){
   res.render("login");
});

// handling login logic route
router.post("/login", passport.authenticate("local", { failureRedirect: "/login"}) , function(req, res){
   req.flash("info", "Your are logged in! Thank you.");
   res.redirect("/campgrounds");
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You are logged out!");
   res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   res.redirect("/login");
}

module.exports = router;