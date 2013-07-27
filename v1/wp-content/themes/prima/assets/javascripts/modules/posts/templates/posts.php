<script id="posts-template" type="text/x-handlebars-template">
{{#each posts}}
  <article class="post">
    <h1 class="post-title"><a href="{{slug}}" class="post-title-link">{{title}}</a></h1>
  </article>
{{/each}}
</script>