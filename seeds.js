var mongoose =require("mongoose");
var Campground=require("./models/campground");
var Comment =require("./models/comment"); 

var data=[
    {
        name: "Cloud's Rest",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxwzuGX35ThMTpt-0qX6HJLTvVUjvrvPdW5A2vX7Prir289kE",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "desert Rest",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxwzuGX35ThMTpt-0qX6HJLTvVUjvrvPdW5A2vX7Prir289kE",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Florida's Best",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxwzuGX35ThMTpt-0qX6HJLTvVUjvrvPdW5A2vX7Prir289kE",
        description:"wateva........"
    }
]

function seedDB(){
    //Remove all campgrounds
  Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }else
        // console.log("removed campgrounds!");
        //   //add a few campgrounds
        // data.forEach(function(seed){
        //       Campground.create(seed, function(err, campground){
        //           if(err){
        //               console.log(err);
        //           }else{
        //               console.log("added a campground");
        //               //creat a comment 
        //               Comment.create(
        //                   {
        //                   text: "this place is great but no internet",
        //                   author: "Homer"
        //                   }, function(err,comment){
        //                       if(err){
        //                           console.log(err);
        //                       } else {
        //                          campground.comments.push(comment);
        //                          campground.save();
        //                          console.log("Created new comment");
        //                       }
                             
        //                   });
        //           }
        //       }) 
        // })
    });
  
    
    //add a few comments
}


module.exports = seedDB; 