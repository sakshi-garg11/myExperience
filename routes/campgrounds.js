var express=require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

//INDEX-show all campgrounds
router.get("/", function(req,res){
    //console.log(req.user);
    //Get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    }); 
});


//CREATE- add new campgrounds to database
router.post("/", middleware.isLoggedIn, function(req,res){
   //get data from form and add to campgrounds array
   var name=req.body.name;
   
   var image=req.body.image;
   var desc=req.body.description;
    var author= {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground={name:name, image:image, description: desc, author: author  }
   console.log(req.user);
  
   //Create a new campground and save to database
   Campground.create(newCampground,function(err, newlyCreated){
       if(err){
           console.log(err);
       }else{
            //redirect back to campgrounds page
            console.log(newlyCreated);
           res.redirect("/campgrounds/");//by default it redirects to get /campgrounds 
       }
   });
  });
  
//NEW - show form to create new campground
//route to add new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new")
});
  
  
//SHOW - show more info about one campground  
router.get("/:id", function(req,res){
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           console.log(foundCampground);
           //render show template with that campground
           res.render("campgrounds/show",{campground: foundCampground});
          }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground}); 
    //if not, redirect
});
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else{
            req.flash("success", "Successfully Updated!")
           res.redirect("/campgrounds/" + req.params.id);
           
       }
   });
   //redirect somewhere(show page)
});

//DESTROY CAMPGROUND ROUTE

router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else{
        req.flash("success", "Successfully Deleted!");
        res.redirect("/campgrounds");  
      }
    })
});


//middleware



module.exports = router;