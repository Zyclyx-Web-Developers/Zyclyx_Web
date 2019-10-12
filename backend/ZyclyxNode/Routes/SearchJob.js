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


  // for testing of new line
  users.post('/sample',upload.single(''),function(req,res){
   // var lines=req.body.lines;
    //console.log(lines+' lines before')
    const phrase = 'I love my dog. Dogs are great'
    const stripped = phrase.replace(/. /gi, '!')
    console.log(stripped)
    res.send(stripped)

  })

  module.exports=users;