<script id="post-template" type="text/x-handlebars-template">
  {{#if post.post}}
  <article class="post">
    <h1 class="post-title"><a href="{{post.post.slug}}" class="post-title-link">{{post.post.title}}</a></h1>
    <div class="post-date">{{srtftime post.post.date "%B %d, %Y"}}</div>
    <div id="article-{{post.post.id}}-content" class="post-content">{{strToHtml post.post.content}}</div>
    <div id="article-{{post.post.id}}-comments-count" class="comments-count">{{pluralize post.post.comment_count 'comment' 'comments'}}</div>
    {{#if post.post.comments}}
    <div id="article-{{post.post.id}}-comments" class="comments">
      {{#each post.post.comments}}
        {{#isCommentParent this}}
        <div id="article-{{../../post.post.id}}-parent-comment" class="comment-parent">
          <p>{{name}}</p>
          {{strToHtml content}}
            {{getChilds this ../../post.post.comments}}
        </div>
        {{/isCommentParent}}
      {{/each}}
    </div>
    {{/if}}
  </article>
  {{/if}}
  {{#if post.page}}
  <article class="post">
    <h1 class="post-title"><a href="#post/{{post.page.slug}}" class="post-title-link">{{post.page.title}}</a></h1>
    <div id="article-{{post.page.id}}-content" class="post-content">{{strToHtml post.page.content}}</div>
    <div id="article-{{post.page.id}}-comments-count" class="comments-count">{{pluralize post.page.comment_count 'comment' 'comments'}}</div>
    {{#if post.post.comments}}
    <div id="article-{{post.page.id}}-comments" class="comments">
      {{#each post.post.comments}}
        {{#if isCommentParent this}}
        <p>{{name}}</p>
        <p>{{strToHtml content}}</p>
        {{/if}}
      {{/each}}
    </div>
    {{/if}}
  </article>
  {{/if}}
</script>