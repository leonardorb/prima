global = @

global.Prima = {}

Prima.Modules = {}
Prima.Models = {}
Prima.Collections = {}
Prima.Views = {}
Prima.Routers = {}
Prima.Utilities = {}
Prima.App = new Backbone.Marionette.Application()
Prima.BaseURL = if location.host is 'localhost' then '/leonardorb.net/website/v1/' else '/'
Prima.CurrentURL = location.pathname


Prima.App.addRegions
  sidebar : '.sidebar'
  main    : '.main'

$(document).ready =>

  Prima.App.on 'initialize:after', ->
    sidebarView = new Prima.Views.Sidebar()
    Prima.App.sidebar.show sidebarView
    if Backbone.history?
      Backbone.history.start
        pushState : true
        root: Prima.BaseURL
      if Prima.BaseURL is '/' then postName = Prima.CurrentURL.split('/')[1] else postName = Prima.CurrentURL.split('/')[4]
      postHash = location.hash
      if postName?
        Backbone.history.navigate postName + '/' + postHash,
          trigger: true
      else
        Backbone.history.navigate '',
          trigger : true

  Prima.App.start()

  @notification = new Prima.Utilities.Notification()