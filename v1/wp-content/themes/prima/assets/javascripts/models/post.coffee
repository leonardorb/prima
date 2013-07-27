class Prima.Models.Post extends Backbone.Model
  url: ->
    slug = @get 'slug'
    if slug?
      Prima.BaseURL + 'api/get_post/?slug=' + slug
    else
      Prima.BaseURL + @id + '/?json=1'