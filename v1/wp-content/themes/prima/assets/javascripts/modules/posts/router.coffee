Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.Router extends Backbone.Router
      routes:
        ''           : 'index'
        'post/:name' : 'single'

      index: ->
        PostsModule.controller.index()

      single: (name) ->
        PostsModule.controller.single name : name

    postsRouter = new PostsModule.Router()