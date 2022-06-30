const mongoose = require("mongoose");
 
const Blog = mongoose.model('Blog', {
    Title: {
        type: String,
        required:true
        
        },
 Body: {
 trim: true,
 required: true,
 type: String,
 
 }

});
module.exports=Blog;
