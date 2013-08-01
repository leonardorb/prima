class Prima.Models.Comment extends Backbone.Model
  url: ->
    'api/submit_comment?post_id='+@get('post_id')+'&name='+@get('name')+'&email='+@get('email')+'&content='+@get('content')