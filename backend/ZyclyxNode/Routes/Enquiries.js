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

  users.post('/Enquiries',upload.single(''),function(req,res){
      var name=req.body.name;
      var email=req.body.email;
      var message=req.body.message;
      console.log(name,email,message+'  details are')
      database.connection.getConnection(function(err,connection){
          if(err){
              console.log(err)
              res.send('Problem while connecting to database');
          }
          else{
              connection.query('insert into enquiries values(?,?,?)',[name,email,message],function(err,data){
                  if(err){
                      console.log(err)
                      res.send('Problem in database');
                  }
                  else{
                      console.log('data inserted');
                      res.send('Enquiry stored in database')
                  }
              })
          }
      })
  })
  module.exports=users;