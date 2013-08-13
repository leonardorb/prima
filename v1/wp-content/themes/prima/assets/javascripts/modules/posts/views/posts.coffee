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
        $('.loading').fadeOut 'fast'
        $.vegas
          src: Prima.BaseURL + 'wp-content/themes/prima/assets/images/bg-min.jpg'
        $.vegas 'overlay',
          src: Prima.BaseURL + 'wp-content/themes/prima/assets/images/overlays/02.png'

      onShow: ->
        Loading.load()
        $(@el).fadeIn 'slow'
        $('.website-navigation a').removeClass 'selected'