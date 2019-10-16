var express = require('express');
var users = express();
var port = process.env.PORT || 3000;
var database=require('../Routes/Database/DBConnections');
var multer=require('multer');
process.env.secretkey='zyclyx';
users.set('ViewEngine','ejs')


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

  users.get('/ViewEnquiries',upload.single(''),function(req,res){

    database.connection.getConnection(function(err,connection){
        if(err){
            console.log(err)
            appData['data']='Error while connecting to database'
            res.status(200).json(appData)
        }
        else{
            connection.query('select * from enquiries',function(err,data){
                if(err){
                    console.log('Something went wrong please try later')
                    appData['data']='Something went wrong please try later'
                    res.status(200).json(appData)
                }
                else{
                    console.log(data)
                    appData['data']=data[3].name;
                    res.render('./ViewEnquiries.ejs',appData)
                    //res.status(201).json(appData)
                }
            })
        }
    })

  })
  module.exports=users;