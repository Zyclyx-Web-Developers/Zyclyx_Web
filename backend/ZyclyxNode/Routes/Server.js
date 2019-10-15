var express = require('express');
var cors = require('cors');
var path=require('path');
var bodyParser = require("body-parser");
var app = express();
var http=require('http');
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static('./Routes'));
var bodyParser=require('body-parser');
var fs=require('fs');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/JobApplication',function(req,res){
        res.sendFile(path.join(__dirname+'/JobApplication.html'))
})
app.get('/AdminRegister',function(req,res){
    res.sendFile(path.join(__dirname+'/AdminRegister.html'))//Admin register
})
app.get('/AdminLogin',function(req,res){
    res.sendFile(path.join(__dirname+'/AdminLogin.html'))
})
app.get('/HRNewJobPost',function(req,res){
   res.sendFile(path.join(__dirname+'/HRNewJobPost.html'))//new job
})
app.get('/UpdateStatus',function(req,res){
    res.sendFile(path.join(__dirname+'/UpdateStatus.html'))//Update status
})
app.get('/Enquiries',function(req,res){
    res.sendfile(path.join(__dirname+'/Enquiries.html'))//Enquiries
})
app.get('/ForgotPassword', function(req,res){
    res.sendFile(path.join(__dirname+'/ForgotPassword.html'))//Forgot password
})
app.get('/ForgotPasswordSet',function(req,res){
    res.sendFile(path.join(__dirname+'/ForgotPasswordSet.html'))//ForgotPasswordSet
})
app.get('/ResetPassword', function(req,res){
    res.sendfile(path.join(__dirname+'/ResetPassword.html'))//reset password
})
app.get('/ResetPasswordSet',function(req,res){
    res.sendFile(path.join(__dirname+'/ResetPasswordSet.html'))//Reset password set
})
app.get('/AdminHome',function(req,res){
    res.sendFile(path.join(__dirname+'/AdminHome.html'))
})

var Users = require('./Users');
{
app.use('/users',Users);
}
 var AdminRegister=require('./AdminRegister');
{
 app.use('/AdminRegister', AdminRegister);
}
var AdminLogin=require('./AdminLogin');{
    app.use('/AdminLogin',AdminLogin)
}
var CandidateProfile=require('./CandidateProfile');{
    app.use('/CandidateProfile',CandidateProfile)
}
var HRNewJobPost=require('./HRNewJobPost');{
    app.use('/HRNewJobPost',HRNewJobPost)
}
var ActivePositions= require('./ActivePositions');{
app.use('/ActivePositions',ActivePositions)
}
var UpdateStatus=require('./UpdateStatus');{
    app.use('/UpdateStatus',UpdateStatus);
}
var AllJobs=require('./AllJobs');
{
    app.use('/AllJobs',AllJobs);
}
var Enquiries=require('./Enquiries');{
    app.use('/Enquiries',Enquiries);
}

var ForgotPassword=require('./ForgotPassword');
{
app.use('/ForgotPassword',ForgotPassword);
}
var ForgotPasswordSet= require('./ForgotPasswordSet');{
app.use('/ForgotPasswordSet',ForgotPasswordSet)
}
var ResetPassword=require('./ResetPassword');{
    app.use('/ResetPassword',ResetPassword)
}
var ResetPasswordSet=require('./ResetPasswordSet');{
    app.use('/ResetPasswordSet',ResetPasswordSet)
}
var SearchJob=require('./SearchJob');{
    app.use('/SearchJob',SearchJob)
}
var ViewEnquiries=require('./ViewEnquiries');{
    app.use('/ViewEnquiries',ViewEnquiries)
}

app.listen(port,'192.168.1.56',function(){
    console.log("Server is running on port: "+port);
})





