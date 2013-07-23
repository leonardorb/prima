class Prima.Collections.Posts extends Backbone.Collection
  url: '?json=get_recent_posts'

  parse: (response) ->
    response.posts