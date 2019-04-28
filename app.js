var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
  next();
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

var dbConfig = {
  user: 'sa',
  password: '<password>',
  server: 'localhost\\SQLEXPRESS',
  database: 'SampleDB'
};

var executeQuery = function (res, query) {
  sql.connect(dbConfig, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.send(err);
    }
    else {
      var request = new sql.Request();
      request.query(query, function (err, result) {
        if (err) {
          console.log("Error while querying database :- " + err);
          res.send(err);
        }
        else {
          res.send(result);
        }
      });
    }
  });
}

//GET API
app.get("/api/user", function (req, res) {
  var query = "select * from users";
  executeQuery(res, query);
});

//POST API
app.post("/api/user", function (req, res) {
  var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password";
  executeQuery(res, query);
});

//PUT API
app.put("/api/user/:id", function (req, res) {
  var query = "UPDATE [user] SET Name= " + req.body.Name + " , Email=  " + req.body.Email + "  WHERE UserId= " + req.params.id;
  executeQuery(res, query);
});

// DELETE API
app.delete("/api/user /:id", function (req, res) {
  var query = "DELETE FROM [user] WHERE UserId=" + req.params.id;
  executeQuery(res, query);
});