Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.PostView extends Backbone.Marionette.ItemView
      template : Handlebars.compile $('#post-template').html()

      events:
        'click .post-title a'          : 'samePost'
        'click .comment-parent-date a' : 'goToComment'
        'click .comment-child-date a'  : 'goToComment'
        'click .submit-comment'        : 'submitComment'

      samePost: (ev) ->
        ev.preventDefault()

      serializeData: ->
        'post' : @model.toJSON()

      render: ->
        super
        $(@el).hide()

      goToComment: (ev) ->
        ev.preventDefault()
        target = $(ev.target)
        window.location.hash = target.attr 'href'

      submitComment:  (ev) ->
        ev.preventDefault()
        commentName    = @$('.comment-post-name').val()
        commentEmail   = @$('.comment-post-email').val()
        commentContent = @$('.comment-post-content').val()
        commentPostId  = @$('.comment-post-postId').val()

        newComment = new Prima.Models.Comment
          name    : commentName
          email   : commentEmail
          content : commentContent
          post_id : commentPostId

        newComment.save {},
          success: ->
            console.log newComment
            console.log 'saved'
          error: ->
            console.log 'something is wrong'

      onShow: ->
        $('img').parent().css 'background', 'none'
        Loading.load()
        $(@el).fadeIn 'slow'
        $('.website-navigation a').removeClass 'selected'
        if @model instanceof Prima.Models.Page
          $('html, body').animate
            scrollTop:0
          , 1000
          slug = @model.get 'slug'
          $('.website-navigation a[href='+slug+']').addClass 'selected'
        $('pre.javascript').snippet 'javascript',
          style: 'darkblue'
        if location.hash? and $(location.hash).length isnt 0
          $('html, body').animate
            scrollTop: $(location.hash).offset().top
          , 2000