const express = require("express");

const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) => {
    const post  = new Post({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content
    });
    console.log(post);
    post.save(post).then(newCreatedPost => {
      console.log(newCreatedPost);
      res.status(201).json({
        message: 'Post added Successfully',
        postId: newCreatedPost._id
      });
    });
  });
  //meanstack
  //@90mean
  
  router.put("/:id", (req,res, next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content
    })
    Post.updateOne({ _id: req.params.id}, post).then(result => {
      console.log(result);
      res.status(200).json({message:'Updating was a success!'})
    })
  });
  
  router.get("", (req, res, next) => {
    //THIS WAS THE MANUAL WAY OF DOING THINGS
    // const posts = [
    //   {
    //     id: "1",
    //     title: "The first post",
    //     description: "A short one",
    //     content: "The is where the content is for now, and it will grow"
    //   },
    //   {
    //     id: "2",
    //     title: "Number two of the posts",
    //     description: "Another one",
    //     content: "Again and Again, The is where the content is for now, and it will grow"
    //   }
    // ];
    //WE WILL BE USING THE MONGDB FROM NOW ON TO FETCH THE POSTS.
    Post.find().then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Success',
        posts: documents
      });
    });
  });
  
  router.get( "/:id", (req, res, next) =>{
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message:"No post with that ID"});
      }
    })
  
  });
  
  router.delete("/:id", (req, res, next) => {
    //CHECK WHICH ID IS DELETED FIRST
    console.log(req.params.id);
    //THE ACTUAL DELETE METHOD
    Post.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      //RETURN THE DELETED RESULT
      res.status(200).json({ message: "Post deleted"});
    });
  });

  module.exports = router;