var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var users = express.Router();
var bcrypt=require('bcrypt')
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
var path=require('path');
var fs=require('fs');
var http=require('http');
var jwt=require('jsonwebtoken')
users.use(express.static('./Routes'));
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
  users.post('/AdminLogin',upload.single(''),verifyToken,function(req,res){
    
      var username=req.body.username;
      var password=req.body.password;
    
      console.log(username,password+' auth ddetails are')
      database.connection.getConnection(function(err,connection){
          console.log(username)
          connection.query('select * from adminregister where username=?',[username],function(err,data){
              if(err){
                 console.log('data not retrieved')
                 console.log(err)
              }
              else{
                if(data.length>0){
                console.log('data retrieved'+data[0]);
              console.log(bcrypt.compareSync(password,data[0].password));
              if(bcrypt.compareSync(password,data[0].password)){
               let token=jwt.sign(data[0],process.env.secretkey,{
               
                   expiresIn:1440
                   
               })
             
               appData['data']=token;
             
                appData['data']=username;
                appData['data']='authentication done'
               
               console.log(token, username)
               console.log('authentication done')
               console.log(data[0].status)
               if(data[0].status=='new'){
                 console.log('in if new')
                connection.query('update adminregister set status=? where username=?',['old',username],function(err,data){
                  if(err){
                    console.log(err)
                   
                  }
                  else{
                    console.log('done')
                   res.redirect('/ResetPasswordSet')
    
                  }
                })
              }
            
              else{


                res.redirect('/AdminHome')
                            
                              }

              
                            }
         
        
              
            
              else{
                console.log('invalid password ')
                appData['data']='Invalid password '
                res.status(200).json(appData)
              }
            }
            else{
              console.log('Invalid email')
              appData['data']='invalid email'
              res.status(200).json(appData);
            }
            }
          });
        

      })

  })

  function verifyToken(req,res,next){
      var token=req.body.token || req.headers['token'];
      console.log(token+' token')
      if(token){
        
      jwt.verify(token,process.env.secretkey,function(err){
          if(err){
              appData['data']='invalid token';
              res.status(201).json(appData);
          }
          else{
            next();
             // appData['data']='Token verified';
             // res.status(200).json(appData);
              
          }
      })

      }
      else{
          appData['data']='Please send a token'
          res.status(403).json(appData)
      }
  }

  users.post('/data',upload.single(''),verifyToken,function(req,res){
      //var token=req.body.token|| req.header['token'];
console.log('Token verified');
res.send('Token verified');
  })

  module.exports=users;

