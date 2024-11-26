import mysql, { ResultSetHeader } from "mysql2";

// Connection to the mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'travel_db',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

export default connection;