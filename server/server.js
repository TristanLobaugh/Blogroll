const express = require('express');
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

const blog = new Blog({
	author: 'Tristan',
	title: 'Tristan\'s Blog',
	url: 'http://tristanlobaugh.com'
});

blog.save();

const app = express();

app.use(express.static(`${__dirname}/public`));

const port = 3000;

app.listen(port);
console.log(`Server running on port ${port}`);
