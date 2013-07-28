<script id="posts-template" type="text/x-handlebars-template">
{{#each posts}}
  <article class="post">
    <h1 class="post-title"><a href="{{slug}}" class="post-title-link">{{title}}</a></h1>
    <div class="post-date">{{srtftime date "%B %d, %Y"}}</div>
  </article>
{{/each}}
</script>