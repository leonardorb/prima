<script id="post-template" type="text/x-handlebars-template">
  {{#if post.post}}
  <article class="post">
    <h1 class="post-title"><a href="{{post.post.slug}}" class="post-title-link">{{post.post.title}}</a></h1>
    {{#if post.post.date}}<div class="post-date">{{srtftime post.post.date "MMMM d, yyyy"}}</div>{{/if}}
    <div id="article-{{post.post.id}}-content" class="post-content">
      {{strToHtml post.post.content}}
    </div>
    <div id="article-{{post.post.id}}-comments-count" class="comments-count">{{pluralize post.post.comment_count 'comment' 'comments'}}</div>
    <div id="article-{{post.post.id}}-comments" class="comments">
    {{#if post.post.comments}}
      {{#each post.post.comments}}
        {{#isCommentParent this}}
        <div id="comment-{{id}}" class="comment-parent{{#isAdminComment this}} comment-admin{{/isAdminComment}}">
          <div class="comment-parent-reply"><a href="#" data-id="{{id}}">reply</a></div>
          <div class="comment-parent-photo"><span>{{getAvatar this.email}}</span></div>
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
    {{/if}}
    </div>
    <div id="article-{{post.post.id}}-comments-add" class="comments-add">{{addComment post.post.comment_count}}</div>
    <div id="article-{{post.post.id}}-comment-post" class="comment-post">
      <form class="comment-form">
        <p class="comment-cancel-reply"><a href="#">Cancel Reply</a></p>
        <p><label for="comment-post-name">Name</label><input type="text" class="input-text comment-post-name" id="comment-post-name" name="comment-post-name" placeholder="Your name" /></p>
        <input type="hidden" name="comment-post-postId" class="comment-post-postId" value="{{post.post.id}}" />
        <input type="hidden" name="comment-post-parent" class="comment-post-parent" value="0" />
        <p><label for="comment-post-email">E-mail</label><input type="text" class="input-text comment-post-email" id="comment-post-email" name="comment-post-email" placeholder="Your e-mail" /></p>
        <p><label for="comment-post-url">Website</label><input type="text" class="input-text comment-post-url" id="comment-post-url" name="comment-post-url" placeholder="Your website or facebook or twitter, etc..." /></p>
        <p><label for="comment-post-content">Comment</label><textarea id="comment-post-content" name="comment-post-content" class="comment-post-content" placeholder="Write your comment here"></textarea></p>
        <p><input type="submit" class="input-submit submit-comment" value="Post comment" /></p>
        <div class="clear"></div>
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