const mysql = require('mysql2');

/**
 * @description LOCAL
 */

const config = {
   host: "localhost",
   user: "root",
   password: "",
   database: "securelogin"
};


const pool = mysql.createPool(config);

module.exports = pool;