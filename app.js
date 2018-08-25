
var attributes=require("./Attributes.json")
var ancestries=require("./Ancestry.json")
var backgrounds=require("./Background.json")
var classes=require("./Class.json")

var http = require('http');
var express = require('express');
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('server-key.pem', 'utf8');
var certificate = fs.readFileSync('server-crt.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var app = express();


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

httpServer.listen(18080);
httpsServer.listen(10443);

app.get('/', function (req, res) {
    res.header('Content-type', 'text/html');
    return res.end('<h1>Hello, Secure World!</h1>');
});

app.get('/attributes', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(attributes, null, 3));
});

app.get('/attribute/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var i;
    var results;
    for(i = 0; i < attributes.length; i++) {
        if (attributes[i].ShortName===req.params.id) {
            results=attributes[i]
        }
    }
    return res.send(JSON.stringify(results, null, 3));
});

app.get('/ancestries', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(ancestries, null, 3));
});

app.get('/ancestry/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var i;
    var results;
    for(i = 0; i < ancestries.length; i++) {
        if (ancestries[i].Ancestry===req.params.id) {
            results=ancestries[i]
        }
    }
    return res.send(JSON.stringify(results, null, 3));
});

app.get('/backgrounds', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(backgrounds, null, 3));
});

app.get('/background/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var i;
    var results;
    for(i = 0; i < backgrounds.length; i++) {
        if (backgrounds[i].Background===req.params.id) {
            results=backgrounds[i]
        }
    }
    return res.send(JSON.stringify(results, null, 3));
});

app.get('/classes', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(classes, null, 3));
});

app.get('/class/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var i;
    var results;
    for(i = 0; i < classes.length; i++) {
        if (classes[i].Class===req.params.id) {
            results=classes[i]
        }
    }
    return res.send(JSON.stringify(results, null, 3));
});



