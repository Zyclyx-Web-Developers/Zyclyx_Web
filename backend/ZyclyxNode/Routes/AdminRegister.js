var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var users = express.Router();
var bcrypt=require('bcrypt')
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
var fs=require('fs');
var http=require('http');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/Images')
    },
    filename: function (req, file, cb) {
        var file=file.originalname;
      cb(null,file )
    }
  })
  var appData={
      "error":1,
      "data":""
  }
   
  var upload = multer({ storage: storage })
users.post('/AdminRegister',upload.single(''),function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    console.log(username, password)
    console.log(username, password, bcrypt.hashSync(password, 10)+ 'input values are')
    database.connection.getConnection(function(err,connection){
        if(err){
            console.log(err)
            res.status(500).json(appData);
        }
        else{
            console.log('connected to database')
            connection.query('insert into adminregister values(?,?)',[username,bcrypt.hashSync(password, 10)])
            appData['data']='details stored'
            res.status(200).json(appData);
        }
    })
})
module.exports=users;