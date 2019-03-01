const express = require('express');
const blogRouter = express.Router();
const allBlogPosts = require('./controllers/all_posts');
const wait = require('../../middleware/async');
const findPost = require('./controllers/find_post');

blogRouter.get('/posts/all', wait(allBlogPosts));
blogRouter.get('/posts/:id', wait(findPost))

module.exports = blogRouter;