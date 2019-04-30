const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  // res.status(200).json({
  //   posts: [
  //     {
  //       _id: '1',
  //       title: 'First Post',
  //       content: 'This is the first post!',
  //       imageUrl: 'images/showcase.jpg',
  //       creator: {
  //         name: 'Vyacheslav'
  //       },
  //       createdAt: new Date()
  //     }
  //   ]
  // });

  Post.find()
    .then(posts => {
      res.status(200).json({
        message: 'Fetched posts successfully.',
        posts: posts
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;

    // return res.status(422).json({
    //     message: 'Validation failed, entered data is incorrect.',
    //     errors: errors.array()
    // });
  }

  const title = req.body.title;
  const content = req.body.content;

  // Create post in db

  // res.status(201).json({
  //     message: 'Post created successfully!',
  //     post: {
  //         _id: new Date().toISOString(),
  //         title: title,
  //         content: content,
  //         creator: {
  //             name: 'Vyacheslav'
  //         },
  //         createdAt: new Date()
  //     }
  // });

  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/showcase.jpg',
    creator: {
      name: 'Vyacheslav'
    }
  });

  post.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    })
    .catch(err => {
      // console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Post fetched.',
        post: post
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
