var express = require('express');
var users = express.Router();
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
var nodemailer=require('nodemailer');
var randomString=require('randomstring');
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

  users.post('/Searchjob',upload.single(''),function(req,res){
      var job=req.body.job;
      database.connection.getConnection(function(err,connection){
          if(err){
              console.log(err)
              appData['data']='Problem while connecting to database'
              res.status(200).json(appData)
          }
          else{
          connection.query('select * from jobs where jid like ?',['%'+job+'%'],function(err,data){
            
              if(err){
                  console.log(err)
                  appData['data']='Problem in database';
                  res.status(200).json(appData)
              }
              else{
                  console.log(data[0]);
                  res.status(201).json(data)
              }
          })
        }
      })

  })



  users.post('/sample',upload.single(''),function(req,res){
  // var username= req.body.username;
  //var password=req.body.password;

  const secret=randomString.generate(7);
  console.log(secret+' random string')

  // var mail= nodemailer.createTransport({
  //    service:'gmail',
  //    auth:{
  //      user:username,
  //      pass:password
       
  //    }
 

  //  })
  //  console.log(username,password)
  //  var mailOptions=  {
  //   from:'sampathkumar0078@gmail.com',
  //   to:'sampathkumar0078@gmail.com',
  //   subject:'Hello world',
  //   text:'sample mail code using nodejs'
  // };
  // mail.sendMail(mailOptions,function(err,data){
  //   if(err){
  //     console.log(err);
  //     appData['data']='Please provide valid username and password'
  //     res.status(200).json(appData);

  //   }
  //   else{
  //     console.log('mail sent')
  //     appData='mail sent'
  //     res.status(201).json(appData)
  //   }

  // })

   
  })

  module.exports=users;