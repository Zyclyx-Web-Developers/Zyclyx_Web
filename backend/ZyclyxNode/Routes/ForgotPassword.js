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

  users.post('/ForgotPassword',upload.single(''),function(req,res){
      var email=req.body.email;
      console.log(email);
      database.connection.getConnection(function(err,connection){
          if(err){
              console.log(err);
             // appData['data']='Please provide valid email';
              //res.status(201).json(appData);
              res.send('error at database')
          }
          else{
            connection.query('select * from adminregister where username=?',[email],function(err,data){
              if(err){
                console.log(err)
                res.status(201).json('Email not exist')
              }
              else{
                var newData=data[0].username;
                if(email==newData)
                {
                  console.log('ok')
                  res.redirect('/ForgotPasswordSet');
                 // res.send('ok')
                }
                else{
                  console.log('not ok')
                  res.send('not ok')
                }

                console.log(data[0]);
                res.send[data]

              }
           
            
            
            })
          }
          
      })
  })

  module.exports=users;