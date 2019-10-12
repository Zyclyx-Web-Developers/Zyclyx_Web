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

  users.post('/ForgotPasswordSet',upload.single(''),function(req,res){
      var email=req.body.email;
      var password=req.body.password;
      var confirmpassword=req.body.confirmpassword;
      console.log(email,password,confirmpassword)
      if(password==confirmpassword){
          console.log('password matched')
      database.connection.getConnection(function(err,connection){

          if(err){
              console.log(err)
              appData['data']='Error occured while connecting to database';
              res.status(201).json(appData);
          }
          else{
              connection.query('update adminregister set password=? where username=?',[bcrypt.hashSync(password,10),email],function(err,data){
                  if(err){
                      console.log(err);
                      appData['data']='Problem in database'
                      res.status(201).json(appData);
                  }
                  else{
                      console.log('password updated');
                      appData['data']='Password updated succesfully';
                      res.status(200).json(appData)
                  }
              })
          }
      })
    }
    else{
        res.redirect('/ForgotPasswordSet')
            console.log('password and confirm password is not matching');
            res.send('password and confirm password is not matching');
    }
  })
  module.exports=users;