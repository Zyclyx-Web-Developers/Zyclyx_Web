var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var users = express.Router();
var bcrypt=require('bcrypt')
var port = process.env.PORT || 3000;
var database=require('./Database/DBConnections');
var multer=require('multer');
var fs=require('fs');
var http=require('http');
var jwt=require('jsonwebtoken')
process.env.secretkey='zyclyx';
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


users.get('/CandidateProfile',upload.single(''),function(req,res){
database.connection.getConnection(function(err,connection){
  if(err){
    console.log('Not connected to database');
    res.send('Not connected to database');
  }
  else{
  connection.query('select name from register',function(err,data){
      if(err){
        console.log('err')
        res.send('problem in database')
      }
      else{
        console.log('details retrieved'+data);
        res.send(data)
      }
  });
}
})

})

module.exports=users;