var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var users = express.Router();
var bcrypt=require('bcrypt')
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
var validator=require('express-validator');
var fs=require('fs');
var http=require('http');

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
users.post('/AdminRegister',upload.single(''),function(req,res){
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var username=req.body.username;
    var password=req.body.password;
    var confirmpassword=req.body.confirmpassword;
     
    var name=firstname+' '+lastname;
   // req.checkBody('username','username is required').notEmpty();
    
    if(password==confirmpassword){

    console.log(username, password,'ok')
    console.log(name,username, password, bcrypt.hashSync(password, 10)+ 'input values are')
    database.connection.getConnection(function(err,connection){
        if(err){
            console.log(err)
            res.status(500).json(appData);
        }
        else{
            console.log('connected to database')
            connection.query('select username from adminregister where username=?',[username],function(err,rows){
                 if(rows.length>0)
                {
                console.log(rows+'data exists');
                appData['data']='Email already exists'
                res.status(200).json(appData)
                }
                else{

                
                connection.query('insert into adminregister values(?,?,?,?)',[username,bcrypt.hashSync(password, 10),'NULL',name],function(err,data){
                    if(err){
                        console.log(err)
                        appData['data']='Problem while connecting with database'
                        res.status(200).json(appData);
                    }
                    else{
                    appData['data']='details stored'
                    res.status(201).json(appData);
                    }
                     })   
                    }
            })
            
           
        }
    })
}
else{
    console.log('Password and confirm pasword not matching');
}
})
module.exports=users;