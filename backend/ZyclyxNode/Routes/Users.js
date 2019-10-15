var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var users = express.Router();
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
var fs=require('fs');
var http=require('http');
users.use('/uploads',express.static('uploads'))
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/Images')
    },
    filename: function (req, file, cb) {
        var file=file.originalname;
      cb(null,file )
    }
  })
   
  var upload = multer({ storage: storage })

function onRequest(req,res){
    res.writeHead(200,{'content-type':'text/html'})
 // res.write('Index.html');
    fs.readFile('./Index.html',null,function(err,data){
        if(err){
            res.writeHead(404);
            res.write('page not found')
        }
        else{
           res.end(data);
          

        }
    })
    res.end();
}

users.post('/Register',upload.single('file'),function(req,res){

   var firstname= req.body.firstname;
   var lastname= req.body.lastname;
    var mail=req.body.mail;
    var phonenumber=req.body.phonenumber;
    var gender=req.body.gender;
    var country=req.body.country;
    var qualification=req.body.qualification;
    var expertise =req.body.expertise;
    var experienceyears=req.body.experienceyears;
    var experiencemonths=req.body.experiencemonths;
    var position=req.body.position;
    var currentcompany=req.body.currentcompany;
    var currentctc=req.body.currentctc;
    var expectedctc=req.body.expectedctc;
    var noticeperiod=req.body.noticeperiod;
    var currentlocation=req.body.currentlocation;
    var file='http://192.168.1.56:3000/Images/'+req.file.originalname;
    var additionalinformation=req.body.additionalinformation;

    
   
    var experience=experienceyears+'.'+experiencemonths;
    var name=firstname+' '+lastname;

    console.log(name,mail,phonenumber,gender,country,qualification,expertise,experience,position,currentcompany,currentctc,expectedctc,noticeperiod,currentlocation,file,additionalinformation+'details are')
    var appData = {
        "error": 1,
        "data": ""
    };
    database.connection.getConnection(function(err,connection){
        if(err){
            console.log('error in database');
        }
        else{
            connection.query('select  * from register where mail=?',[mail],function(err,rows){
                if(err){
                    console.log(err);
                    appData['data']='Error in database'
                    res.status(200).json(appData);
                }
                else if(rows.length>0)
                {
                    console.log('email already exists');
                    appData['data']='Email already exists';
                    res.status(200).json(appData)
                }
                else{
                    connection.query('insert into register values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[name,mail,phonenumber,gender,country,qualification,expertise,experience,position,currentcompany,currentctc,expectedctc,noticeperiod,currentlocation,file,additionalinformation],function(err,data){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log('values inserted')
                            appData['data']='values inserted'
                            res.status(201).json(appData);
                        }
                    })
        
                }
            })
            

        }
    })
    


})

users.get('/data',function(req,res){
    console.log('redirected')
    res.send('redirected')
})


module.exports=users;
