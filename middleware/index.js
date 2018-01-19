var Campground = require("../models/campground");
var Comment = require("../models/comment");

// middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
   // function checkCampgroundOwnership(req, res, next){
      if(req.isAuthenticated()){
         Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
               req.flash("error", "Something went wrong!");
               res.redirect("back");
            } else {
               if(foundCampground.author.id.equals(req.user._id)){
                  next();
               } else {
                  req.flash("error", "You do not have permission to do that!");
                  res.redirect("back");
               }
            }
         })
      } else {
         req.flash("error", "Please Login First!");
         res.redirect("back");
      }
   // }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
   // function checkCommentOwnership(req, res, next){
      if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
               res.redirect("back");
            } else {
               // does the user own the comment??
               if(foundComment.author.id.equals(req.user._id)){
                  next();
               } else {
                  req.flash("error", "You do not have permission to do that!");
                  res.redirect("back");
               }
            }
         })
      } else {
         req.flash("error", "Please Login First!");
         res.redirect("back");
      }
   // }
}

middlewareObj.isLoggedIn = function(req, res, next){
   // function isLoggedIn(req, res, next){
      if(req.isAuthenticated()){
         return next();
      }
      req.flash("error", "Please Login First!");
      res.redirect("/login");
   // }
}

module.exports = middlewareObj;