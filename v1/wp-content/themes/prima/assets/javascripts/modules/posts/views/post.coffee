Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.PostView extends Backbone.Marionette.ItemView
      template : Handlebars.compile $('#post-template').html()

      events:
        'click .post-title a' : 'samePost'

      samePost: (ev) ->
        ev.preventDefault()

      serializeData: ->
        'post' : @model.toJSON()

      render: ->
        super
        $(@el).hide()

      onShow: ->
        $('img').parent().css 'background', 'none'
        Loading.load()
        $(@el).fadeIn '2500'