const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/blogroll');

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
	author: String,
	title: String,
	url: String
});

mongoose.model('Blog', BlogSchema);

const Blog = mongoose.model('Blog');

// const blog = new Blog({
// 	author: 'Tristan',
// 	title: 'Tristan\'s Blog',
// 	url: 'http://tristanlobaugh.com'
// });

// blog.save();

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));


// ROUTES
app.get('/api/blogs', (req, res) => {
	Blog.find((err, docs) => {
		docs.forEach(item => {
			console.log(`Recieved a GET request for _id: ${item._id}`);
		});
		res.send(docs);
	});
});

app.post('/api/blogs', (req, res) => {
	console.log('Recieved a POST request');
	for (const key in req.body) {
		console.log(`${key}: ${req.body[key]}`);
	}
	const blog = new Blog(req.body);
	blog.save((err, doc) => {
		res.send(doc);
	});
});

app.delete('/api/blogs/:id', (req, res) => {
	console.log(`Recieved a DELETE request for _id: ${req.params.id}`);
	Blog.remove({ _id: req.params.id }, err => {
		res.send({ _id: req.params.id });
	});
});

app.put('/api/blogs/:id', (req, res) => {
	console.log(`Recieved an update request for _id: ${req.params.id}`);
	Blog.update({ _id: req.params.id }, req.body, err => {
		res.send({ _id: req.params.id });
	});
});

const port = 3000;

app.listen(port);
console.log(`Server running on port ${port}`);
