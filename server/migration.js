const mysql = require('mysql2');
const migration = require('mysql-migrations');

require('dotenv').config();

const connection = mysql.createPool({
  connectionLimit : 10,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
});

migration.init(connection, __dirname + '/migrations');