var express = require('express');
var router = express.Router();

// mysql 연결 
const mysqlConnObj = require('../config/mysql').default;
const mysqlConn = mysqlConnObj.init();
mysqlConnObj.open(mysqlConn); // 정상적으로 연결되었는지 확인


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 
post로 넘어온 값은 req.body 로 받을 수 있다. 
get 으로 넘어온 값은 req.query 로 받을 수 있다. 
*/
router.post('/signUp', function (req, res, next) {
  const user = {
    'userid': req.body.user.userid,
    'name': req.body.user.name,
    'password': req.body.user.password
  };
  
  // 값 이스케이프 처리 
  let query = 'SELECT userid FROM users WHERE userid = ?';
  let bindParam = [
    user.userid
  ];
  
  mysqlConn.query(query, bindParam, function (err, results, fields) {
    if (err) throw err;
    if (results[0] === undefined) { // 동일한 아이디가 없을 경우 
      //const salt = bcrypt.genSaltSync(); 
    } else { }
  });
});

module.exports = router;
