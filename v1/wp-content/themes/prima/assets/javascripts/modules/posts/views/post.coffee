Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.PostView extends Backbone.Marionette.ItemView
      template : Handlebars.compile $('#post-template').html()

      events:
        'click .post-title a'          : 'samePost'
        'click .comment-parent-date a' : 'goToComment'
        'click .comment-child-date a'  : 'goToComment'
        'submit form'                  : 'submitComment'

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
        commentName      = encodeURIComponent @$('.comment-post-name').val()
        commentEmail     = encodeURIComponent @$('.comment-post-email').val()
        commentURL       = encodeURIComponent @$('.comment-post-url').val()
        commentContent   = encodeURIComponent @$('.comment-post-content').val()
        commentPostId    = encodeURIComponent @$('.comment-post-postId').val()
        commentParent    = parseInt(encodeURIComponent @$('.comment-post-parent').val())

        newComment = new Prima.Models.Comment
          name      : commentName
          email     : commentEmail
          url       : commentURL
          content   : commentContent
          post_id   : commentPostId
          parent    : commentParent

        console.log newComment

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
          slug = @model.get('slug') + '/'
          $('.website-navigation a[href="'+slug+'"]').addClass 'selected'
        $('pre.javascript').snippet 'javascript',
          style: 'darkblue'
        if location.hash? and $(location.hash).length isnt 0
          $('html, body').animate
            scrollTop: $(location.hash).offset().top
          , 2000