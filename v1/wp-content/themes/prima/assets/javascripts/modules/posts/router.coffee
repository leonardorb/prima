Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.Router extends Backbone.Marionette.AppRouter
      controller: PostsModule.controller
      appRoutes:
        ''                  : 'index'
        ':name/'            : 'single'

    PostsModule.router = new PostsModule.Router()