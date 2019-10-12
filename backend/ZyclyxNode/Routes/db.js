var http=require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var mysql=require('mysql');

var port = process.env.PORT || 3000;
var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'candidate'

})

module.exports.connection=connection;