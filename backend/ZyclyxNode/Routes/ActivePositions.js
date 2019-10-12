var express = require('express');
var users = express.Router();
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
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

  users.get('/ActivePositions',upload.single(''),function(req,res){
      database.connection.getConnection(function(err,connection){
          if(err){
              console.log('error while connecting DB');
              res.send('error while connecting Database');
          }
          else{
              console.log('connected to database')
              connection.query('select * from jobs where status=?',['active'],function(err,data){
                  if(err){
                      console.log(err)
                      res.send('Problem in database')
                  }
                console.log(data);
                res.send(data);
              })
              
          }
      })
  })
  module.exports=users;