const postsModel = require('../models/postsModel');

// 리스트 
exports.getList = (req, res) => {
    res.render('posts/list', { 'title': '게시판 리스트' });
};

// 글 작성 - 폼 
exports.getPostForm = (req, res) => {
    res.render('posts/writeForm', { 'title': '글 작성하기' });
};

// 글 입력 - 프로세스 
// ip 찾기 - https://wedul.site/520 
exports.insertProcess = (req, res) => {
    let item = {
        'name': req.body.name,
        'email': req.body.email,
        'password': req.body.password,
        'subject': req.body.subject,
        'content': req.body.content,
        'ip': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        'tags': req.body.tags
    };
    
    postsModel.insertData(item, (result) => {
        if (result) {
            // console.log(result); 
            if (result.affectedRows === 1) {
                res.redirect('/posts');
            } else { 
                res.redirect('/posts/new'); }
        }
    });
};