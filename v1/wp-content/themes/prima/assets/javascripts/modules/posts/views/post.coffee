Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.Post extends Backbone.Marionette.ItemView
      template : Handlebars.compile $('#post-template').html()
      el : '#posts'

      serializeData: ->
        'post' : @model.toJSON()