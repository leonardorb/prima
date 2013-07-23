class Prima.Models.Post extends Backbone.Model
  url: ->
    slug = @get 'slug'
    if slug?
      slug + '/?json=1'
    else
      @id + '/?json=1'