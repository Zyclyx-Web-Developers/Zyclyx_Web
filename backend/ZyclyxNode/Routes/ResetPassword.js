var express = require('express');
var users = express.Router();
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
var bcrypt=require('bcrypt');
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

  users.post('/ResetPassword',upload.single(''),function(req,res){
      var email=req.body.email;
      var password=req.body.password;
      console.log(email,password);
      database.connection.getConnection(function(err,connection){
          if(err){
              console.log(err)
              appData['data']='problem while conecting to database';
              res.status(200).json(appData)
          }
          else{
              connection.query('select * from adminregister where username=?',[email],function(err,data){
                  if(err){
                      console.log(err)
                      appData['data']='Problem in database';
                      res.status(200).json(appData)
                  }
                  else{
                   var encrypt= bcrypt.compareSync(password,data[0].password)
                      console.log(encrypt+' encrypted')
                      if(encrypt){
                          console.log('ok compared')
                          res.redirect('/ResetPasswordSet')
                         // appData['data']='compared'
                          //res.status(201).json(appData)
                      }
                      else{
                          console.log('not compared')
                          appData['data']='email and password are not matching'
                          res.status(200).json(appData);
                      }

                  }
              })
          }
      })
  })
  module.exports=users;