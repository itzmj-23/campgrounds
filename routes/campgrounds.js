var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", function(req, res){
   Campground.find({}, function(err, allCampgrounds){
      if(err){
         console.log("Error!");
      } else {
         console.log("Fetched!");
         res.render("campgrounds/index", {campgrounds: allCampgrounds});
      }
   })
})

// CREATE - create new campground
router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username
   }
   var newCampground = {name: name, price: price, image: image, description: description, author: author}

   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
         console.log(err);
      } else {
         console.log(newlyCreated);
         res.redirect("/campgrounds");
      }
   })

   //get data from form and add to campgrounds array
   //redirect back to campgrounds page
})

// NEW - show new campground form
router.get("/new", middleware.isLoggedIn, function(req,res){
   res.render("campgrounds/new");
})

// SHOW - show specific campground
router.get("/:id", function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
         console.log(err);
      } else {
         // console.log(foundCampground);
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });

   // find the campground with provided ID
   // 
})

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
   });
});


// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground){
      if(err){
         res.redirect("/campgrounds");
      } else {
         res.redirect("/campgrounds/" + req.params.id);
      }
   })
})

// DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
      if(err){
         res.redirect("/campgrounds");
      } else {
         res.redirect("/campgrounds");
      }
   })
});

// MIDDLEWARE




module.exports = router;