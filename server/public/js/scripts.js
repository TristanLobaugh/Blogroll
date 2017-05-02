Backbone.Model.prototype.idAttribute = '_id';

// Backbone Model
const Blog = Backbone.Model.extend({
	default: {
		author: '',
		title: '',
		url: '',
	}
});

// Backbone Collection
const Blogs = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/blogs'
});

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
	events: {
		'click .edit-blog': 'edit',
		'click .update-blog': 'update',
		'click .cancel': 'cancel',
		'click .delete-blog': 'delete'
	},
	edit() {
		$('.edit-blog').hide();
		$('.delete-blog').hide();
		this.$('.update-blog').show();
		this.$('.cancel').show();

		const author = this.$('.author').html();
		const title = this.$('.title').html();
		const url = this.$('.url').html();

		this.$('.author').html(`<input type="text" class="form-control author-update" value="${author}">`);
		this.$('.title').html(`<input type="text" class="form-control title-update" value="${title}">`);
		this.$('.url').html(`<input type="text" class="form-control url-update" value="${url}">`);
	},
	update() {
		this.model.set({
			'author': this.$('.author-update').val(),
			'title': this.$('.title-update').val(),
			'url': this.$('.url-update').val()
		});
	},
	cancel() {
		blogsView.render();
	},
	delete() {
		this.model.destroy();
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
		const self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', this.render, this);
		this.model.on('remove', this.render, this);

		this.model.fetch({
			success(response) {
				_.each(response.toJSON(), item => {
					console.log(`Succesfully got blog with _id: ${item._id}`);
				});
			},
			error() {
				console.log('Failed to get blogs');
			}
		});
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
		blogs.add(blog);
		blog.save(null, {
			success(response) {
				console.log(`Successfully SAVED blog with _id: ${response.toJSON()._id}`);
			},
			error() {
				console.log('Failed to save blog!');
			}
		});
	});
});

