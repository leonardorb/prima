Handlebars.registerHelper 'strToHtml', (str) ->
  new Handlebars.SafeString str

Handlebars.registerHelper 'pluralize', (value, single, multiple) ->
  if value <= 1
    return "#{value} #{single}"
  return "#{value} #{multiple}"

Handlebars.registerHelper 'srtftime', (date, format) ->
  date = new Date(Date(date)) unless _.isDate(date)
  date.format format

# comments

Handlebars.registerHelper 'isCommentParent', (comment, options) ->
  if comment.parent is 0
    options.fn comment

Handlebars.registerHelper 'getChilds', (parentComment, comments, options) ->
  commentsHTML = ''
  childs = _.each comments, (comment) ->
    if comment.parent is parentComment.id
      commentsHTML += '<div class="comment-child">'
      commentsHTML += '<p>' + comment.author.name + '</p>'
      commentsHTML += comment.content
      commentsHTML += '</div>'
  return new Handlebars.SafeString(commentsHTML)
  


