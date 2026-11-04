const mysql = require('mysql2/promise');

const conn = mysql.createPool(
    {
       host:"localhost",
       password:"",
       user:"root",
       port:3306,
       database:"whatsapp"
    }
)

module.exports = conn;