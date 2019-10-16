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
 var id;
   
  var upload = multer({ storage: storage })

  users.post('/GetCandidateJobs',upload.single(''),function(req,res){
      var title=req.body.title;
      console.log(title+' title')
      database.connection.getConnection(function(err,connection){
          if(err){
              console.log(err)
              appData['data']='Problem while connecting to database'
              res.status(200).json(appData)
          }
          else{
        connection.query('select * from jobs where jobtitle=?',[title],function(err,data){
            if(err)
            {
                console.log(err)
                appData['data']='Problem with databaase'
                res.status(200).json(appData)
            }
           
            else{
                console.log(data[0]+' else')
                appData['data']=data[0].jobtitle
                res.status(201).json(appData)
            }
        })
    }
      })
  })
  module.exports=users;
