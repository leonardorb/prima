Handlebars.registerHelper 'strToHtml', (str) ->
  new Handlebars.SafeString str

Handlebars.registerHelper 'pluralize', (value, single, multiple) ->
  if value <= 1
    return "#{value} #{single}"
  return "#{value} #{multiple}"

Handlebars.registerHelper 'srtftime', (date, format) ->
  dateFormatted = new Date(Date.parse(date)) unless _.isDate(date)
  dateFormatted.toString format

# comments

Handlebars.registerHelper 'isCommentParent', (comment, options) ->
  if comment.parent is 0
    options.fn comment

Handlebars.registerHelper 'isAdminComment', (comment, options) ->
  if comment.author? and comment.author.id is 1
    options.fn true

Handlebars.registerHelper 'getChilds', (parentComment, comments, options) ->
  commentsHTML = ''
  childs = _.each comments, (comment) ->
    if comment.parent is parentComment.id
      isAdminComment = comment.author.id is 1
      commentsHTML += '<div class="comment-child'
      if isAdminComment then commentsHTML += ' comment-admin">' else commentsHTML += '">'
      commentsHTML += '<p>' + comment.author.name + '</p>'
      commentsHTML += comment.content
      commentsHTML += '</div>'
  return new Handlebars.SafeString(commentsHTML)
  
