const fs = require("fs");
const mysql = require('mysql2');

const saveToDb = (db) => {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(db, null, 2), {
        encoding: "utf8",
    });
}

const connection = mysql.createConnection({
  host: process.env.USER_HOST,
  user: process.env.USER_NAME,
  password: process.env.USER_PASS,
  port: process.env.USER_PORT,
  database: process.env.USER_DB
});

connection.connect((err) => {
  if (err) { 
    console.log(err);
    throw err;
  }
  console.log('Connected DataBase!');
});

// connection.end((err) => {
//     if (err) throw err;
//     console.log('Connection closed.');
// });

module.exports = { connection };