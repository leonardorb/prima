Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.PostsView extends Backbone.Marionette.ItemView
      template : Handlebars.compile $('#posts-template').html()

      events:
        'click h1 a' : 'navigate'

      navigate: (ev) ->
        ev.preventDefault()
        PostsModule.router.navigate $(ev.target).attr('href'),
          trigger: true

      serializeData: ->
        'posts' : @collection.toJSON()

      render: ->
        super
        $(@el).hide()

      onShow: ->
        Loading.load()
        $(@el).fadeIn '2500'