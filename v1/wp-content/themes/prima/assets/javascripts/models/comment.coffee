class Prima.Models.Comment extends Backbone.Model
  url: ->
    if @get('parent')?
      Prima.BaseURL + '/api/submit_comment?post_id='+@get('post_id')+'&parent='+@get('parent')+'&name='+@get('name')+'&email='+@get('email')+'&url='+@get('url')+'&content='+@get('content')
    else
      Prima.BaseURL + '/api/submit_comment?post_id='+@get('post_id')+'&name='+@get('name')+'&email='+@get('email')+'&url='+@get('url')+'&content='+@get('content')
