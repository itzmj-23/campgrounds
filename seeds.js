var mongoose = require("mongoose"),
   Campground  = require("./models/campground"),
   Comment     = require("./models/comment");

var data = [
   {
      name: "Grassland Campsite",
      image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
      description: "Donec vitae sapien purus. Donec vestibulum, erat et elementum ullamcorper, ex nulla interdum velit, ut mattis ante erat eu leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sapien eros, vestibulum et sapien nec, fringilla molestie ligula. Nullam dictum vel ipsum varius vestibulum. Nam urna felis, egestas rutrum justo et, tempor consectetur odio. Nunc rutrum tellus sed justo vehicula, pharetra bibendum urna pulvinar. Pellentesque facilisis ipsum ligula, sit amet rhoncus massa lobortis condimentum. Sed ac leo at est viverra accumsan vitae scelerisque justo. Suspendisse suscipit eu ipsum at gravida. Mauris feugiat purus et congue facilisis. Nunc id velit fermentum erat egestas volutpat ut ut neque. Nulla congue, nisi id euismod pellentesque, ipsum dolor viverra metus, eget malesuada sapien tortor eu massa. Donec nec libero leo. Fusce odio lorem, laoreet at dolor tincidunt, tristique euismod odio. Aenean imperdiet dapibus facilisis."
   },
   {
      name: "Along the Forest",
      image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg",
      description: "In vitae consectetur lacus. Aliquam sagittis metus purus, at tempus ipsum placerat in. Vivamus eget nibh libero. Curabitur bibendum facilisis lorem, et euismod mauris consectetur at. Phasellus in neque venenatis augue molestie facilisis et at enim. In convallis diam sit amet libero ultricies, vel varius lorem condimentum. Donec et augue mi. Duis finibus placerat mi, et pellentesque turpis tincidunt a. In aliquam nisi ac risus aliquet posuere. Sed blandit bibendum risus, non finibus neque gravida id. Suspendisse varius purus vitae eros laoreet, vel malesuada elit efficitur. Morbi ex eros, tincidunt feugiat magna ut, aliquam pellentesque purus. Integer finibus erat a tellus tempus accumsan. Nullam blandit, lorem in rutrum suscipit, turpis lacus tempus magna, sit amet placerat risus urna quis purus. Donec egestas consequat orci, ac egestas nisi ultricies sed."
   },
   {
      name: "Sky Above Camp",
      image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
      description: "Morbi eu massa urna. Pellentesque et pulvinar lorem. Pellentesque fermentum ullamcorper tellus a facilisis. Quisque non pulvinar mi. Donec egestas malesuada hendrerit. Cras diam nisi, consequat id ante in, vehicula elementum odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed mollis augue at ex auctor consequat. Maecenas sit amet vehicula purus. Etiam ultricies, diam at mollis ultricies, sapien urna ultrices neque, et aliquet justo justo sit amet diam. Vivamus in porta purus. Quisque congue sagittis sagittis. Curabitur dolor lacus, volutpat vitae elit sit amet, vulputate efficitur felis."
   }
]

function seedDB(){
   // Remove all campgrounds
   Campground.remove({}, function(err){
      if(err){
         console.log(err);
      }
      console.log("removed campgrounds!");

      // Add few campgrounds
      data.forEach(function(seed){
         Campground.create(seed, function(err, campground){
            if(err){
               console.log(err);
            } else {
               console.log("added a campground!");
               // create a comment
               Comment.create(
                  {
                     text: "This camp site is great! There are so many grass on it!",
                     author: "Mike"
                  }, function(err, comment){
                     if(err){
                        console.log(err);
                     } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("create a new comment");
                     }
                     
                  });
            }
         })
      })

   });

}

module.exports = seedDB;