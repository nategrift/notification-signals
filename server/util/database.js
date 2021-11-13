const mysql = require('mysql2');

const pool = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,

})

module.exports = pool.promise();