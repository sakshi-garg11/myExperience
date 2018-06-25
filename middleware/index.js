var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware goes here
var middlewareObj = {}; 

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
      //is user loggen in?
    if(req.isAuthenticated()){
        
         Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Xperience not found");
                res.redirect("back");
            } else{
                //does user own the campground?
                //console.log(foundCampground.author.id);//object
                //console.log(req.user._id);//String
               // if(foundCampground.author.id === req.user._id )
               if(foundCampground.author.id.equals(req.user._id)){
                   next(); //will do depending in what route it is being called edit or update or delete
               }else{
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
            }
         });
    }else{
        req.flash("error", "You need to Login/SignUp to do that");
        res.redirect("back"); //take you to the previous page
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
      //is user logged in?
    if(req.isAuthenticated()){
        
         Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                //does user own the comment?
                //console.log(foundCampground.author.id);//object
                //console.log(req.user._id);//String
               // if(foundCampground.author.id === req.user._id )
               if(foundComment.author.id.equals(req.user._id)){
                   next(); //will do depending in what route it is being called edit or update or delete
               }else{
                    req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
            }
         });
    }else{
        req.flash("error", "You need to Login/SignUp to do that");
        res.redirect("back"); //take you to the previous page
    }
} 


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to Login/SignUp to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;