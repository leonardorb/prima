global = @

global.Prima = {}

Prima.Modules = {}
Prima.Models = {}
Prima.Collections = {}
Prima.Views = {}
Prima.Routers = {}
Prima.App = new Backbone.Marionette.Application()

$(document).ready ->
  Prima.App.on 'initialize:after', ->
    Backbone.history.start() if Backbone.history?
  Prima.App.start()