<script id="posts-template" type="text/x-handlebars-template">
{{#each posts}}
  <article class="post">
    <h1 class="post-title"><a href="#post/{{slug}}" class="post-title-link">{{title}}</a></h1>
    <div id="article-{{id}}-content" class="post-content">{{strToHtml content}}</div>
  </article>
{{/each}}
</script>