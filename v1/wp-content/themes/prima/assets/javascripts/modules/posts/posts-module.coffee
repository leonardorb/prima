Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.Controller extends Backbone.Marionette.Controller
      index: ->
        Posts = new Prima.Collections.Posts()
        Posts.fetch
          success: ->
            postsView = new PostsModule.Posts
              collection : Posts
            postsView.render()
            document.title = '@leonardorb'

      single: (options) ->
        Post = new Prima.Models.Post
          slug : options.name
        Post.fetch
          success: ->
            postsView = new PostsModule.Post
              model : Post
            postsView.render()
            document.title = Post.get('post').title + ' | @leonardorb'

    PostsModule.controller = new PostsModule.Controller()