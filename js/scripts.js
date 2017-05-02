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
// const blog1 = new Blog({
// 	author: 'Tristan',
// 	title: 'Tristan\'s Blog',
// 	url: 'http://tristansblog.com'
// });

// const blog2 = new Blog({
// 	author: 'Chewie',
// 	title: 'Chewie\'s Blog',
// 	url: 'http://chewiesblog.com'
// });

// instantiate a Collection
const blogs = new Blogs();

// Backbone Views
const BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize() {
		this.template = _.template($('.blogs-list-template').html());
	},
	render() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

const BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize() {
		this.model.on('add', this.render, this);
	},
	render() {
		const self = this;
		this.$el.html('');
		_.each(this.model.toArray(), blog => {
			self.$el.append((new BlogView({ model: blog })).render().$el);
		});
		return this;
	}
});

const blogsView = new BlogsView();

$(document).ready(() => {
	$('.add-blog').on('click', () => {
		const blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		});
		$('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');
		console.log(blog.toJSON());
		blogs.add(blog);
	});
});

