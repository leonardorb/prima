class Prima.Views.Sidebar extends Backbone.Marionette.ItemView
  template : Handlebars.compile $('#sidebar-template').html()

  events:
    'click h1 a' : 'home'

  home: (ev) ->
    ev.preventDefault()
    Backbone.history.navigate '',
      trigger : true