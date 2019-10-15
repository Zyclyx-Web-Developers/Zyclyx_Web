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

users.post('/HRNewJobPost',upload.single(''),function(req,res){
    var job=req.body.job;
    var jobtitle=req.body.jobtitle;
    var designation=req.body.designation;
    var department=req.body.department;
    var jobtype=req.body.jobtype;
    var positions=req.body.positions;
    var description=req.body.description;
    var skills=req.body.skills;
    var qualification=req.body.qualification;
    var startdate=req.body.startdate;
    var enddate=req.body.enddate;
    var experience=req.body.experience;
    var shifts=req.body.shifts;
    var workhours=req.body.workhours;
   // var jid='ZYX_'+id+'_'+00001
    console.log(jobtitle,designation,department,jobtype,positions,description,skills,qualification,startdate,enddate,experience,shifts,workhours+ ' job details are')
   var id=0;
    database.connection.getConnection(function(err,connection){
        if(err){
            console.log(err)
            res.send(err+' problem to connect database')
        }
        else
        {
            connection.query('select id from jobs order by id desc limit 1',function(err,data1){
                if(err){
                    console.log(err)
                }
                else{
                   // console.log(data1[0]);
                    
                    if(data1.length>0){
                        
                        id=data1[0].id+1;
                        console.log(id+' at else')
                        
                    }
                    else{
                        id=1;
                        console.log(id+' id at if')
                    }
                    var jid='ZYX_'+job+'_'+id;
                    console.log(id+' outside')
                    connection.query('insert into jobs values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[id,jid,jobtitle,designation,department,jobtype,positions,description,skills,qualification,startdate,enddate,experience,shifts,workhours,'active'],function(err,data){
                        if(err){
                            console.log(err+' error in query')
                            res.send('Query not valid')
                        }
                        else{
                            console.log('values inserted')
                            res.send('Values for new job inserted')
                        }
            
                    })
                }
            })
           
        }
    })
    
    
    //res.send(jobname)
    })
    module.exports=users;