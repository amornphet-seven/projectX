const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mysql_nodejs",
  password: "",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database =", err);
    return;
  }
  console.log("Successfully Connnected!!");
});

require("./routes/api")(app, connection);


app.get("*", (req, res) => {
  console.log("unhandled GET request");
  res.status(403).send("unhandled GET request");
});

app.post("*", (req, res) => {
  console.log("unhandled POST request");
  res.status(403).send("unhandled POST request");
});

app.listen(PORT, () => {
  console.log(`Server is starting on PORT ${PORT}`);
});
