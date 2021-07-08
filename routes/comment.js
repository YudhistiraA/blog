const router = require("express").Router();
const Post = require("../models/Post");
const com = require("../models/Comment");


// Route to get all 
router.get("/", function(req,res) {
  const Com = com.find({})
  .then(function(Com) {
    res.json(Com);
  })
  .catch(function(err) {
    res.json(err);
  })
});
// Route to post
router.post("/post/:id", function(req, res) {
  
   const Com = com.create(req.body)
     .then(function(Com) {
      
       const post = Post.findOneAndUpdate({ _id: req.params.id }, {$push: {comment: com._id}}, { new: true });
     })
     .then(function(Com) {
     
       res.json("succses");
     })
     .catch(function(err) {
       
       res.json(err);
     });
 });

 // Route to get all by id post
 router.get("/post/:id", async (req, res) => {
   try {
     const post = await com.findById(req.params.id).populate({path:"Comment" }).exec();
     res.status(200).json(post);
     console.log(post)
   } catch (err) {
     res.status(500).json(err);
   }
 });
//delete comment
 router.delete("/:id", async (req, res) => {
 
     const Com = await com.findById(req.params.id);
    try {
         await Com.delete();
         res.status(200).json("Post has been deleted...");
       } catch (err) {
         res.status(500).json(err);
       }
 });
//update comment
router.put("/:id", async (req, res) => {
   
     const Com = await com.findById(req.params.id);
      try {
         const updatedCom = await com.findByIdAndUpdate(
           req.params.id,
           {
             $set: req.body,
           },
           { new: true }
         );
         res.status(200).json(updatedCom);
       } catch (err) {
         res.status(500).json(err);
       }
    
 });
module.exports = router;