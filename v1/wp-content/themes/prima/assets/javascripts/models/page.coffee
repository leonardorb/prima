class Prima.Models.Page extends Backbone.Model
  url: ->
    slug = @get 'slug'
    if slug?
      Prima.BaseURL + 'api/get_page/?slug=' + slug
    else
      Prima.BaseURL + @id + '/?json=1'