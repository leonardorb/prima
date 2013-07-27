Handlebars.registerHelper 'strToHtml', (str) ->
  new Handlebars.SafeString str

Handlebars.registerHelper 'pluralize', (value, single, multiple) ->
  if value <= 1
    return "#{value} #{single}"
  return "#{value} #{multiple}"