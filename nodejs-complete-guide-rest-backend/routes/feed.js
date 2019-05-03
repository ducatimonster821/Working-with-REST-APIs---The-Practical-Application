const express = require('express');
const {body} = require('express-validator/check');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', feedController.createPost);
// router.post('/post', [
//   body('title')
//     .trim()
//     .isLength({min: 5}),
//   body('title')
//     .trim()
//     .isLength({min: 5})
// ], feedController.createPost);

router.get('/post/:postId', feedController.getPost);

router.put('/post/:postId', feedController.updatePost);
// router.put('/post/:postId', [
//   body('title')
//     .trim()
//     .isLength({min: 5}),
//   body('title')
//     .trim()
//     .isLength({min: 5})
// ], feedController.createPost);

module.exports = router;