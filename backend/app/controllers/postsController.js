const postsModel = require('../models/postsModel');
const MarkdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
});
// 레퍼런스를 보고 마크다운에 HTML, link, 이미지등을 모두 사용한다로 설정

/** 
* 리스트 
@param req 
@param res 
*/ 
exports.getList = (req, res) => {
    postsModel.getList((result) => {
        if (result) {
            // console.log(result); 
            
            res.render('posts/list', {
                title: '게시판 리스트',
                posts: result
            });
        } else { res.redirect('/'); }
    });
};

/** 
* 글 작성 - 폼 
@param req 
@param res 
*/ 
exports.getPostForm = (req, res) => {
    res.render('posts/writeForm', {
        'title': '글 작성하기'
    });
};

/** 
* 글 입력 - 프로세스 
* ip 찾기 - https://wedul.site/520 
*
@param req 
@param res 
*/ 
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

/** 
* 글 읽기
*
@param req 
@param res 
*/
exports.getView = (req, res) => {
    let id = req.params.id;
    
    postsModel.getView(id, (result) => {
        if (result) {
            // let md = new MarkdownIt(); 
            result.content = MarkdownIt.render(result.content);
            
            res.render('posts/view', {
                title: result.subject,
                post: result
            });
        }
    });
};

/** 
 * 글 수정 - 폼 
 * 
 * @param req 
 * @param res 
 */
exports.getEditForm = (req, res) => {
    let id = req.params.id;
    
    postsModel.getEdit(id, (result) => {
        if (result) {
            // console.log(result); 
            
            res.render('posts/writeForm', {
                title: result.subject,
                mode: 'edit',
                post: result
            });
        }
    });
};

/** 
 * 글 수정 - 프로세스 
 * 
 * @param req 
 * @param res 
 **/
exports.updateProcess = (req, res) => {
    let id = req.params.id;
    
    let item = {
        'id': id,
        'name': req.body.name,
        'email': req.body.email,
        'password': req.body.password,
        'subject': req.body.subject,
        'content': req.body.content,
        'ip': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        'tags': req.body.tags
    };
    
    postsModel.updateData(item, (result) => {
        if (result) {
            // console.log(result); 
            if (result.affectedRows === 1) {
                res.redirect('/posts/' + id);
            } else {
                res.redirect('/posts/' + id + '/edit');
            }
        } else {
            res.send('<script>alert("수정 실패");history.back();</script>');
        }
    });
};

/** 
 * 글 삭제 - 프로세스 
 * 
 *  @param req 
 * @param res 
 */
exports.deleteProcess = (req, res) => {
    let item = {
        'id': req.params.id,
        'password': req.body.password
    };
    //console.log(item); 
    
    postsModel.deleteData(item, (result) => {
        if (result) {
            if (result.affectedRows === 1) {
                res.redirect('/posts/');
            } else {
                res.redirect('/posts/' + item.id);
            }
        } else {
            res.send('<script>alert("삭제 실패");history.back();</script>');
        }
    });
};
