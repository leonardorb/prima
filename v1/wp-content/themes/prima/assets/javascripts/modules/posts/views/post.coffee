Prima.Modules.Posts = Prima.App.module 'Posts',
  define: (PostsModule, App, Backbone, Marionette, $, _) ->

    class PostsModule.PostView extends Backbone.Marionette.ItemView
      template : Handlebars.compile $('#post-template').html()

      events:
        'click .post-title a'           : 'samePost'
        'click .comment-parent-date a'  : 'goToComment'
        'click .comment-parent-reply'   : 'replyComment'
        'click .comment-cancel-reply a' : 'cancelReply'
        'click .comment-child-date a'   : 'goToComment'
        'submit form'                   : 'submitComment'

      samePost: (ev) ->
        ev.preventDefault()

      serializeData: ->
        'post' : @model.toJSON()

      render: ->
        super
        $(@el).hide()
        $('.loading').fadeOut 'slow'
        $.vegas
          src: Prima.BaseURL + 'wp-content/themes/prima/assets/images/bg-min.jpg'
        $.vegas 'overlay',
          src: Prima.BaseURL + 'wp-content/themes/prima/assets/images/overlays/02.png'

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
          , 'slow'

      goToComment: (ev) ->
        ev.preventDefault()
        target = $(ev.target)
        window.location.hash = target.attr 'href'

      replyComment: (ev) ->
        ev.preventDefault()
        target = $(ev.target)
        $('.comment-post-parent').val target.data('id')
        $('body, html').animate
          scrollTop: $('.comments-add').position().top
        , 'slow'
        $('.comment-cancel-reply').show 'fast'
        $('.comment-post-name').focus()

      cancelReply: (ev) ->
        ev.preventDefault()
        $('.comment-post-parent').val 0
        $(ev.target).parent().hide 'fast'

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
              notification.setNotification 'info', '<p>Thanks for the comment.</p><p>You can also get in touch with me at:</p><p><a target="_blank" href="http://www.github.com/leonardorb">GitHub</a>, <a target="_blank" href="http://www.twitter.com/leonardorb">Twitter</a> and <a target="_blank" href="http://www.dribbble.com/leonardorb">Dribbble</a></p>'
              notification.showNotification()

              if model.get('parent') is 0
                commentClass = 'parent'
              else
                commentClass = 'child'

              isPending = model.get('status') is 'pending'
              if isPending
                newComment = '<div id="comment-'+model.get('id')+'" class="comment-'+commentClass+' comment-pending">'
              else
                newComment = '<div id="comment-'+model.get('id')+'" class="comment-'+commentClass+'">'
              newComment += '<div class="comment-'+commentClass+'-photo"><span>'+Prima.Utilities.getAvatar(model.get('email'))+'</span></div>'
              newComment += '<div class="comment-'+commentClass+'-data">'
              newComment += '<div class="comment-'+commentClass+'-content-author-and-date">'
              newComment += '<span class="comment-'+commentClass+'-author">'+model.get('name')+'&nbsp;&nbsp;</span>'
              newComment += '<span class="comment-'+commentClass+'-date"><a href="#comment-'+model.get('id')+'">'+Prima.Utilities.srtftime(model.get('date'), "MMMM d, yyyy h:mm:ss tt")+'</a></span>'
              newComment += '</div>'
              newComment += '<div class="comment-'+commentClass+'-content">'+model.get('content')+'</div></div></div>'

              if commentClass.indexOf('parent') isnt -1 then $('.comments').append newComment else $('#comment-'+commentParent).append newComment

          error: (model, response, options) ->
            notification.setNotification 'error', '<p>Something went wrong. :(</p>'
            notification.showNotification()
