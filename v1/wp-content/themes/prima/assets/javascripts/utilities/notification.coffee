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

    $(document).keyup( (ev) =>
    	if ev.keyCode is 27
    	  @hideNotification()
    )

  setNotification: (type, content) ->
    @resetNotificationClass()
    if type is 'info'
      @setNotificationClass @notificationClassInfo
    if type is 'error'
      @setNotificationClass @notificationClassError

    @notification.html content

  showNotification: ->
    @overlay.fadeIn 200
    @notification.slideDown 200

  hideNotification: ->
    @overlay.fadeOut 200
    @notification.fadeOut 200
