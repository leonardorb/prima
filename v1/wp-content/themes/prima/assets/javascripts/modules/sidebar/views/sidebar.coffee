class Prima.Views.Sidebar extends Backbone.Marionette.ItemView
  template : Handlebars.compile $('#sidebar-template').html()

  events:
    'click h1 a' : 'home'
    'click .website-navigation a' : 'page'

  home: (ev) ->
    ev.preventDefault()
    Backbone.history.navigate '',
      trigger : true

  page: (ev) ->
    ev.preventDefault()
    $(ev.target).parent().find('a').removeClass 'selected'
    $(ev.target).addClass 'selected'
    Backbone.history.navigate $(ev.target).attr('href'),
      trigger: true