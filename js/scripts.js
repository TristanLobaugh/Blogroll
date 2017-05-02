// Backbone Model
const Blog = Backbone.Model.extend({
	default: {
		author: '',
		title: '',
		url: '',
	}
});

// Backbone Collection

const Blogs = Backbone.Collection.extend({});

// instantiate 2 blogs
const blog1 = new Blog({
	author: 'Tristan',
	title: 'Tristan\'s Blog',
	url: 'http://tristansblog.com'
});

const blog2 = new Blog({
	author: 'Chewie',
	title: 'Chewie\'s Blog',
	url: 'http://chewiesblog.com'
});

// instantiate a Collection
const blogs = new Blogs([blog1, blog2]);
