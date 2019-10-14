var express = require('express');
var users = express.Router();
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
var bcrypt=require('bcrypt');
var nademailer=require('nodemailer');
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

 

  users.post('/ForgotPassword',upload.single(''),function(req,res){
    var email=req.body.email;
   //var status=req.body.status;
    var secret=randomString.generate(8);

    console.log(email,secret+' parameters');
    database.connection.getConnection(function(err,connection){
      if(err){
        console.log(err)
        appData['data']='Problem while conecting with database'
        res.status(200).json(appData)
      }
      else{
        console.log(secret)
        connection.query('select * from adminregister where username=?',[email],function(err,data){
if(data.length>0){
console.log('ok')
connection.query('update adminregister set password=?,status=? where username=?',[bcrypt.hashSync(secret,10),'new',email],function(err,data){
  console.log(secret)
  console.log(data)
  if(err){
    console.log(err)
    
  }
  else{
    console.log('New password updated in database')
    appData['data']='Password updated succesfully'
    var mail=nademailer.createTransport({
      service:'gmail',
      auth:{
        user:'sampathkumar0078@gmail.com',
        pass:'$@mp@th586'
      }
    })
    var mailOptions={
      from:'sampathkumat0078@gmail.com',
      to:'sampathkumat0078@gmail.com',
      subject:'New password for resetting account',
      text:'Password to reset your account is '+secret+('\n')+'Please reset your password after logged in with new password.'
    }
    mail.sendMail(mailOptions,function(err,data){
      if(err){
        console.log(err);
        appData['data']='Something wrong please try again later'
        res.status(200).json(appData)
      }
      else{
        console.log('Password resetted succesfully')
        appData['data']='Password resetted succesfully'
        res.redirect('/AdminLogin')
       // res.status(201).json(appData)
      }
    })

    
  }
})

}
else{
  console.log('email not exists')
  appData['data']='Email does not exists'
    res.status(200).json(appData)
}

        })
        
      }
    })
  })

  module.exports=users;