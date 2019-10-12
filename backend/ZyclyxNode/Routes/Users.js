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
    var company=req.body.company;
    var message=req.body.message;
    var mobile=req.body.mobile;
    var gender=req.body.gender;
    var DOB =req.body.DOB;
    var highQuali=req.body.highQuali;
    var YearOfPass=req.body.YearOfPass;
    var nationality=req.body.nationality;
    var Address=req.body.Address;
    var city=req.body.city;
    var state=req.body.state;
    var ZipCode=req.body.ZipCode;
    var Country=req.body.Country;
    var EmployeeType=req.body.EmployeeType;
    var AreaOfExpert=req.body.AreaOfExpert;
    var experience=req.body.experience;
    var CurrentCompany=req.body.CurrentCompany;
    var CurrentPosition=req.body.CurrentPosition;
    var CurrentAnualCTC=req.body.CurrentAnualCTC;
    var noticePeriod=req.body.noticePeriod;
    var file='http://localhost:3000/Images/'+req.file.originalname;
   
    var name=firstname+' '+lastname;
// var details={
//  'firstname':req.body.firstname,
//     'lastname':req.body.lastname,
//     'mail':req.body.mail,
//      'company':req.body.company,
//      'message':req.body.message
     
// }
//var name=firstname+' '+lastname;
    console.log(name,mail,company,message,mobile,gender,DOB,highQuali,YearOfPass,nationality,Address,city,state,ZipCode,Country,EmployeeType,AreaOfExpert,experience,CurrentCompany,CurrentPosition,CurrentAnualCTC,noticePeriod,file+'  details are')
    var appData = {
        "error": 1,
        "data": ""
    };
    database.connection.getConnection(function(err,connection){
        if(err){
            console.log('error in database');
        }
        else{
            connection.query('insert into register values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[mail,company,message,name,mobile,gender,DOB,highQuali,YearOfPass,nationality,Address,city,state,ZipCode,Country,EmployeeType,AreaOfExpert,experience,CurrentCompany,CurrentPosition,CurrentAnualCTC,noticePeriod,file],function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    console.log('values inserted')
                }
            })


            appData['error']=0;
            appData['data']='connected to database'

            res.status(200).json(appData)
            console.log('connected to database');
        }
    })
    


})

users.get('/data',function(req,res){
    console.log('redirected')
    res.send('redirected')
})


module.exports=users;
