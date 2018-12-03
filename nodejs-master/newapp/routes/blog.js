var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blog_db';
var objectId = require('mongodb').ObjectId;

let db;

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
 
  db = client.db(dbName);
 
});

router.get('/read',function(req, res, next) {
	db.collection('article').find({"_id": objectId("5c011384d2e6dc1610ba5107")}).toArray(function(err, result) {
    	console.log("Found the following records");
    	console.log(result)
    	res.send(result);
  	});
});

router.put('/update',function(req, res, next) {
	db.collection('article').update({"_id": objectId(req.body._id)}, {$set:{ 
		title: req.body.title, 
		author: req.body.author, 
		content: req.body.content}}, (function(err, result) {
    	console.log("Record has been successfully updated.");
    	console.log(result)
    	res.send(result);
  	}));
});

router.get('/all', function(req, res, next) {
	db.collection('article').find({}).toArray(function(err, result) {
    	console.log("Found the following records");
    	console.log(result)
    	res.send(result);
  	});
});

router.post('/create',function(req, res, next) {
	db.collection('article').insert(req.body, function(err, result) {
		console.log(err, result)
		res.send(result);
	});
});

router.delete('/delete', function(req, res, next) {
	db.collection('article').remove({"_id": objectId(req.body._id)}, function(err, result) {
		console.log(err, result)
		res.send(result);
	});
});

router.post('/signup',function(req, res, next) {
	db.collection('users').insert(req.body, function(err, result) {
		console.log(err, result)
		res.send(result);
	});
});


//I did tried to do it dynamically, but couldn't get it fixed.
// router.post('/auth/login', function(req, res, next){
// 	db.collection('users').find({"email": req.body.email}).toArray(function(err, result) {
// 		if(docs && docs[0]) {
// 			var user = docs[0];
			
// 			if(req.body.password == user.password){
// 				res.status[200].send("Authentication success");
// 			} else {
// 				res.status[401].send("Invalid login credentials!");
// 			}
// 			res.send(result);
// 		}
// 	});
// });

router.post('/auth/login', function(req, res, next){
	var post = req.body;
  if (post.email === '1234@mail.com' && post.password === 'you') {
    res.send("Authentication success");
  } else {
    res.send("Invalid login credentials!");
  }
});

router.get('/users', function(req, res, next) {
	db.collection('users').find({}).toArray(function(err, result) {
    	console.log("Found the following records");
    	console.log(result)
    	res.send(result);
  	});
});

module.exports = router;
