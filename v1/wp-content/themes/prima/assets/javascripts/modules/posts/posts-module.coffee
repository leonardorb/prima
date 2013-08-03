Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.Controller extends Backbone.Marionette.Controller
      index: ->
        Posts = new Prima.Collections.Posts()
        Posts.fetch
          success: ->
            postsView = new PostsModule.PostsView
              collection : Posts
            Prima.App.main.show postsView
            document.title = '@leonardorb'

      single: (slug) ->
        Post = new Prima.Models.Post
          slug : slug
        Post.fetch
          success: ->
            #TODO: better way to handle this
            if Post.get('status') is 'ok'
              postView = new PostsModule.PostView
                model : Post
              Prima.App.main.show postView
              document.title = Post.get('post').title + ' | @leonardorb'                
            else
              Page = new Prima.Models.Page
                slug : slug
              Page.fetch
                success: (model, response) ->
                  if response.status isnt 'error'
                    postView = new PostsModule.PostView
                      model : Page
                    Prima.App.main.show postView
                    document.title = Page.get('page').title + ' | @leonardorb'
                  else
                    document.title = '404 - Page not found | @leonardorb'


    PostsModule.controller = new PostsModule.Controller()