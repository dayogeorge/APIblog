var express = require('express');
var router = express.Router();

let blogArray = [];
let id = 1;


router.get('/read/:id',function(req, res, next) {
	let blogContent = blogArray.find(item => item.id == req.params.id)
	res.send(blogContent);
});

router.put('/update',function(req, res, next) {
	let postId = req.body.id - 1;
	blogArray[postId] = req.body;
	 res.send('Update done!');
});


router.get('/all',function(req, res, next) {
	res.send(blogArray);
});

router.post('/create',function(req, res, next) {
	let blogPost = req.body;
	blogPost.id = id;
	id += 1;

	blogArray.push(blogPost);
	res.send('Post made successfully!');
});


module.exports = router;
