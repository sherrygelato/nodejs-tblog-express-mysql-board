// mysql 연결 
const mysqlConnObj = require('../config/mysql');
const mysqlConn = mysqlConnObj.init();
// mysqlConnObj.open(mysqlConn); // 정상적으로 연결되었는지 확인 

const bcrypt = require('bcrypt');
const saltRound = 10;

/** 
* 새로운 글을 작성하면 데이터베이스에 입력한다. 
* data : Input data received from the controller 
* cb : Callback function. After completing input, it returns to the controller * 
* @param data 
* @param cb 
*/

exports.insertData = (data, cb) => {
    bcrypt.genSalt(saltRound, (err, salt) => {
        if (err) throw new Error(err);
        
        bcrypt.hash(data.password, salt, (err, hash) => {
            if (err) throw new Error(err);
            
            // 입력 구문 
            let now = new Date();
            let sql = 'INSERT INTO posts (name, email, password, subject, content, ip, created_at) VALUES (?, ?, ?, ?, ?, inet_aton(?), ?)';
            let bindParam = [
                data.name,
                data.email,
                hash, // 해싱된 비밀번호 
                data.subject,
                data.content,
                data.ip,
                now
            ];
            
            // 참고사이트 
            // https://www.npmjs.com/package/mysql 
            // https://github.com/gnipbao/express-mvc-framework/blob/master/controllers/task.js 
            // https://github.com/gnipbao/express-mvc-framework/blob/master/services/task.js 
            
            mysqlConn.query(sql, bindParam, (err, results, fields) => {
                if (err) {
                    console.error('Error code : ' + err.code);
                    console.error('Error Message : ' + err.message);
                    throw new Error(err);
                } else {
                    cb(JSON.parse(JSON.stringify(results)));
                }
            });
            
            /** 
            * 위 코드에서 result 의 값으로 넘어오는 것들 
            * 
            * fieldCount: 0, 
            * affectedRows: 1, // 성공한 개수 
            * insertId: 2,
            * serverStatus: 2, 
            * warningCount: 0, 
            * message: '', 
            * protocol41: true, 
            * changedRows: 0 
            */
        });
    });
};