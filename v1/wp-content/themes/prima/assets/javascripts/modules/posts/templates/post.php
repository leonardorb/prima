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
        <div id="comment-{{id}}" class="comment-parent{{#isAdminComment this}} comment-admin{{/isAdminComment}}">
          <div class="comment-parent-photo">{{getAvatar this.email}}</div>
          <div class="comment-parent-data">
            <div class="comment-parent-content-author-and-date">
              <span class="comment-parent-author">{{#if author.name}}{{author.name}}{{else}}{{name}}{{/if}}&nbsp;&nbsp;</span>
              <span class="comment-parent-date"><a href="#comment-{{id}}">{{srtftime date "MMMM d, yyyy h:mm:ss tt"}}</a></span>
            </div>
            <div class="comment-parent-content">
              {{strToHtml content}}
            </div>
          </div>
          {{getChilds this ../../post.post.comments}}
        </div>
        {{/isCommentParent}}
      {{/each}}
    </div>
    {{/if}}
    <div id="article-{{post.post.id}}-comment-post" class="comment-post">
      <form class="comment-form">
        <p>Name: <input type="text" name="comment-post-name" class="comment-post-name" /></p>
        <input type="hidden" name="comment-post-postId" class="comment-post-postId" value="{{post.post.id}}" />
        <input type="hidden" name="comment-post-parent" class="comment-post-parent" value="4" />
        <p>E-mail: <input type="text" name="comment-post-email" class="comment-post-email" /></p>
        <p>Website: <input type="text" name="comment-post-url" class="comment-post-url" /></p>
        <p>Comment: <textarea name="comment-post-content" class="comment-post-content"></textarea></p>
        <p><input type="submit" class="submit-comment" value="Post comment" /></p>
      </form>
    </div>
  </article>
  {{/if}}
  {{#if post.page}}
  <article class="post">
    <h1 class="post-title"><a href="#post/{{post.page.slug}}" class="post-title-link">{{post.page.title}}</a></h1>
    <div id="article-{{post.page.id}}-content" class="post-content">{{strToHtml post.page.content}}</div>
  </article>
  {{/if}}
</script>