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

  users.post('/ResetPasswordSet',upload.single(''),function(req,res){
      var email=req.body.email;
      var password=req.body.password;
      var confirmpassword=req.body.confirmpassword;
      if(password==confirmpassword){
    console.log(email,password,confirmpassword+' details are');
    database.connection.getConnection(function(err,connection){
        if(err){
            console.log(err)
            appData['data']='Problem while connecting to database'
            res.status(200).json(appData);
        }
        else{
            connection.query('select * from adminregister where username=?',[email],function(err,data){
                if(data.length>0){
                  console.log('ok')
                  connection.query('update adminregister set password=? where username=?',[bcrypt.hashSync(password,10),email],function(err,data){
                    if(err){
                        console.log(err)
                       
                        appData['data']='Please provide valid email'
                        res.status(200).json(appData)
                    }
                    else{
                        console.log('updated')
                        console.log(data[0])
                        appData['data']='Password updated';
                        res.status(201).json(appData)
                    }
                })

                }
                else{
                  console.log('not ok')
                  appData['data']='Email not found'
                  res.status(200).json(appData)
                }
      
              })
           
        }
    })
}
else{
    console.log('passwords not matching');
    appData['data']='Passwords are not matching'
    res.status(200).json(appData)
}
  })

  module.exports=users;