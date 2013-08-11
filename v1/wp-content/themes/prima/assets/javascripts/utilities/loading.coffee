class Prima.Utilities.Loading

  load: ->
    $('.loadingbar').removeClass('fullwidth').delay(10).queue((next) ->
    	$(this).addClass 'fullwidth'
    	next()
    )

@Loading = new Prima.Utilities.Loading()