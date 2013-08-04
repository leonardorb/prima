Handlebars.registerHelper 'strToHtml', (str) ->
  new Handlebars.SafeString str

Handlebars.registerHelper 'pluralize', (value, single, multiple) ->
  if value <= 1
    return "#{value} #{single}"
  return "#{value} #{multiple}"

Handlebars.registerHelper 'addComment', (commentsCount) ->
  if commentsCount is 0
    return 'Start the conversation'
  else
    return 'Join the conversation'

srtftime = (date, format) ->
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
      isAdminComment = comment.author?.id is 1
      commentsHTML += '<div id="comment-'+comment.id+'" class="comment-child'
      if isAdminComment then commentsHTML += ' comment-admin">' else commentsHTML += '">'
      if isAdminComment then comment.name = comment.author.name
      commentsHTML += '<div class="comment-child-photo"><span>'+getAvatar(comment.email)+'</span></div>'
      commentsHTML += '<div class="comment-child-data"><div class="comment-child-content-author-and-date">'
      commentsHTML += '<span class="comment-child-author">'+comment.name+'&nbsp;&nbsp;</span>'
      commentsHTML += '<span class="comment-child-date"><a href="#comment-'+comment.id+'">'+srtftime(comment.date, "MMMM d, yyyy h:mm:ss tt")+'</a><span></div>'
      commentsHTML += '<div class="comment-child-content">'+comment.content+'</div>'
      commentsHTML += '</div></div>'
  return new Handlebars.SafeString(commentsHTML)

getAvatar = (email) ->
  md5email = md5 email
  gravatarElement = '<img src="http://www.gravatar.com/avatar/' + md5email + '?d='+encodeURIComponent('http://0.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=80')+'" />'
  return new Handlebars.SafeString gravatarElement

Handlebars.registerHelper 'srtftime', srtftime
Handlebars.registerHelper 'getAvatar', getAvatar