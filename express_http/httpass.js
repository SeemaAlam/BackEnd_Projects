const { response } = require("express");

const express = require("express");

const app = express();

const fs = require('fs');

const users=require('./users11.json')

app.get("/", (req, res) => {
  res.write("<h1>Welcome to the home page</h1>");
  res.write("<h1>Welcome again</h1>");
  res.end();
  //res.send;
});

app.get('/users',function(req,res){
  return res.send({data:users})
});

app.post('/users', (req, res) => {
  const user1 = req.body;
  users.push(user1);
  fs.writeFile('users11.json', JSON.stringify(users), (err) => {
    return res.send('One User added'); 
  }); 
});

app.patch('/users/:id', (req, res) => {
  let id = req.params.id;
  return res.send(`User with id ${id} updated`);
});

app.delete('/users/:id', (req, res) => {
  let id = req.params.id;
  return res.send(`User with id ${id} deleted`);
});


var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://", host, port);
});
