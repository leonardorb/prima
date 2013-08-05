class Prima.Utilities.Notification
  
  constructor: ->
    @overlay                = $('.overlay')
    @notification           = $('.notification')
    @notificationClassInfo  = 'info'
    @notificationClassError = 'error'

    @setNotificationClass @notificationClassInfo
    @setEvents()

  resetNotificationClass: ->
    @notification.removeClass @notificationClassInfo
    @notification.removeClass @notificationClassError

  setNotificationClass: (notificationClass) ->
    @notification.addClass notificationClass

  setEvents: ->
    @overlay.on 'click', =>
      @hideNotification()

  setNotification: (type, content) ->
    @resetNotificationClass()
    if type is 'info'
      @setNotificationClass @notificationClassInfo
    if type is 'error'
      @setNotificationClass @notificationClassError

    @notification.html content

  showNotification: ->
    @overlay.fadeIn 500
    @notification.slideDown 500

  hideNotification: ->
    @overlay.fadeOut 500
    @notification.fadeOut 500
