Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.Posts extends Backbone.Marionette.ItemView
      template : Handlebars.compile $('#posts-template').html()
      el : '#posts'

      serializeData: ->
        'posts' : @collection.toJSON()