const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://meanstack:%4090mean@cluster0.katxueu.mongodb.net/mean-db?retryWrites=true")
.then(() => {
  console.log('Connection Successful!');
})
.catch(() => {
  console.log('Connection failed!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", 
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
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
app.get("/api/posts", (req, res, next) => {
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

app.delete("/api/posts/:id", (req, res, next) => {
  //CHECK WHICH ID IS DELETED FIRST
  console.log(req.params.id);
  //THE ACTUAL DELETE METHOD
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    //RETURN THE DELETED RESULT
    res.status(200).json({ message: "Post deleted"});
  });
});


module.exports = app;

