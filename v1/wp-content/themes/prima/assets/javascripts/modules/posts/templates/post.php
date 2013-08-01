<script id="post-template" type="text/x-handlebars-template">
  {{#if post.post}}
  <article class="post">
    <h1 class="post-title"><a href="{{post.post.slug}}" class="post-title-link">{{post.post.title}}</a></h1>
    {{#if post.post.date}}<div class="post-date">{{srtftime post.post.date "MMMM d, yyyy"}}</div>{{/if}}
    <div id="article-{{post.post.id}}-content" class="post-content">
      {{strToHtml post.post.content}}
    </div>
    <div id="article-{{post.post.id}}-comments-count" class="comments-count">{{pluralize post.post.comment_count 'comment' 'comments'}}</div>
    {{#if post.post.comments}}
    <div id="article-{{post.post.id}}-comments" class="comments">
      {{#each post.post.comments}}
        {{#isCommentParent this}}
        <div id="article-{{../../post.post.id}}-parent-comment" class="comment-parent{{#isAdminComment this}} comment-admin{{/isAdminComment}}">
          <p>{{name}}</p>
          {{strToHtml content}}
            {{getChilds this ../../post.post.comments}}
        </div>
        {{/isCommentParent}}
      {{/each}}
    </div>
    {{/if}}
    <div id="article-{{post.post.id}}-comment-post" class="comment-post">
      <p>Name: <input type="text" name="comment-post-name" class="comment-post-name" /></p>
      <input type="hidden" name="comment-post-postId" class="comment-post-postId" value="{{post.post.id}}" />
      <p>E-mail: <input type="text" name="comment-post-email" class="comment-post-email" /></p>
      <p>Comment: <textarea name="comment-post-content" class="comment-post-content"></textarea></p>
      <p><button class="submit-comment">Post comment</button></p>
    </div>
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