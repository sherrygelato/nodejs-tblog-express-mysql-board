const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// list 
router.get('/', postsController.getList);

// New Post Form 
router.get('/new', postsController.getPostForm);

// New Post Process 
router.post('/new', postsController.insertProcess);

module.exports = router;