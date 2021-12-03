// import { createConnection } from 'mysql';
const mysql = require('mysql');

require("dotenv").config();

// mysql 연결 
const mysqlConnection = {
    init: function () {
        return mysql.createConnection({
            // host: "localhost",
            // port: "3306",
            // user: "root",
            // password: "adminadmin",
            // database: "MYSQL_DB",
            // charset: "utf8mb4"
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB,
            charset: process.env.MYSQL_CHARSET // Emoji - utf8mb4 
        });
    }, open: function (conn) {
        conn.connect(function (err) {
            if (err) {
                console.error('MySQL connection failed.');
                console.error('Error Code : ' + err.code);
                console.error('Error Message : ' + err.message);
            } else {
                console.log('MySQL connection successful.');
            }
        });
    },
    close: function (conn) {
        conn.end(function (err) {
            if (err) {
                console.error('MySQL Terminate failed.');
                console.error('Error Code : ' + err.code);
                console.error('Error Message : ' + err.message);
            } else {
                console.log("MySQL Terminate connection.");
            }
        });
    }
};

module.exports = mysqlConnection;
