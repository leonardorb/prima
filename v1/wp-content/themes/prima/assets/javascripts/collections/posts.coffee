class Prima.Collections.Posts extends Backbone.Collection
  url: 'api/get_recent_posts'

  parse: (response) ->
    response.posts