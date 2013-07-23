<script id="post-template" type="text/x-handlebars-template">
  <article class="post">
    <h1 class="post-title"><a href="#post/{{slug}}" class="post-title-link">{{post.post.title}}</a></h1>
    <div id="article-{{post.id}}-content" class="post-content">{{strToHtml post.post.content}}</div>
  </article>
</script>