class Prima.Models.Comment extends Backbone.Model
  url: ->
    if @get('parent')?
      Prima.BaseURL + 'api/submit_comment?post_id='+@get('post_id')+'&parent='+@get('parent')+'&name='+@get('name')+'&email='+@get('email')+'&url='+@get('url')+'&content='+@get('content')
    else
      Prima.BaseURL + 'api/submit_comment?post_id='+@get('post_id')+'&name='+@get('name')+'&email='+@get('email')+'&url='+@get('url')+'&content='+@get('content')

  validate: (attrs, options) ->
    errors = []
    if attrs.name.trim() is ''
      errors.push "Please, insert a valid name."
    if attrs.email.trim() is ''
      errors.push "Please, insert a valid e-mail."
    if attrs.content.trim() is ''
      errors.push "Please, insert your comment."
    if errors.length > 0
      message = ""
      _.each errors, (error) ->
        message += '<p>'+error+'</p>'
      notification.setNotification 'error', message
      notification.showNotification()
