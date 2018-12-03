const request = require('supertest');
const app = require('../app');
const assert = require('assert');

describe('Blog Tests', function() {
	
	it ('should create blog', function (done) {
		let blog = {
			title: 'Class Awesome',
			author: 'Temi',
			content: 'pay attention to details'

		}
		request(app)
			.post('/blog/create')
			.send(blog)
			.set('Accept', 'application/json')
			.expect(201)
			.end(function(err, res) {
				if (err) return done(err);
				console.log(res.body);
				assert.equal(res.body.ops[0]._id.length, 24);
				done();
			});

	});

});		