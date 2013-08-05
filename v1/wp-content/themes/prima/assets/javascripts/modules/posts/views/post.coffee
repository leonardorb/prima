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

        newComment.save {},
          success: (model, response, options) ->
            if response.status is 'error'
              notification.setNotification 'error', '<p>'+response.error+'</p>'
              notification.showNotification()
            else
              notification.setNotification 'info', '<p>Thanks for the comment.</p><p>You can also get in touch with me at:</p><p><a href="http://www.github.com/leonardorb">GitHub</a>, <a href="http://www.twitter.com/leonardorb">Twitter</a> and <a href="http://www.dribbble.com/leonardorb">Dribbble</a></p>'
              notification.showNotification()

              newComment = '<div id="comment-'+model.get('id')+'" class="comment-parent">'
              newComment += '<div class="comment-parent-photo"><span>avatar</span></div>'
              newComment += '<div class="comment-parent-data">'
              newComment += '<div class="comment-parent-content-author-and-date">'
              newComment += '<span class="comment-parent-author">'+model.get('name')+'&nbsp;&nbsp;</span>'
              newComment += '<span class="comment-parent-date"><a href="#comment-'+model.get('id')+'">data e hora</a></span>'
              newComment += '</div>'
              newComment += '<div class="comment-parent-content">'+model.get('content')+'</div></div></div>'

              $('.comments').append newComment

          error: (model, response, options) ->
            notification.setNotification 'error', '<p>Something went wrong. :(</p>'
            notification.showNotification()

      onShow: ->
        $('img').parent().css 'background', 'none'
        Loading.load()
        $(@el).fadeIn 'fast'
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