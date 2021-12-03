const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// list 
router.get('/', postsController.getList);

// New Post Form 
router.get('/new', postsController.getPostForm);

// New Post Process 
router.post('/new', postsController.insertProcess);

// View Post 
router.get('/:id', postsController.getView);

// Edit Post Form - 글쓰기 폼을 공유해서 사용함 
router.get('/:id/edit', postsController.getEditForm);

// Edit Post Process 
router.put('/:id', postsController.updateProcess);

// Delete Post Process 
router.delete('/:id', postsController.deleteProcess);

module.exports = router;