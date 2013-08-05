// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Prima.Modules.Posts = Prima.App.module('Posts', {
    define: function(PostsModule, App, Backbone, Marionette, $, _) {
      var _ref;
      return PostsModule.PostView = (function(_super) {
        __extends(PostView, _super);

        function PostView() {
          _ref = PostView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        PostView.prototype.template = Handlebars.compile($('#post-template').html());

        PostView.prototype.events = {
          'click .post-title a': 'samePost',
          'click .comment-parent-date a': 'goToComment',
          'click .comment-child-date a': 'goToComment',
          'submit form': 'submitComment'
        };

        PostView.prototype.samePost = function(ev) {
          return ev.preventDefault();
        };

        PostView.prototype.serializeData = function() {
          return {
            'post': this.model.toJSON()
          };
        };

        PostView.prototype.render = function() {
          PostView.__super__.render.apply(this, arguments);
          return $(this.el).hide();
        };

        PostView.prototype.goToComment = function(ev) {
          var target;
          ev.preventDefault();
          target = $(ev.target);
          return window.location.hash = target.attr('href');
        };

        PostView.prototype.submitComment = function(ev) {
          var commentContent, commentEmail, commentName, commentParent, commentPostId, commentURL, newComment;
          ev.preventDefault();
          commentName = encodeURIComponent(this.$('.comment-post-name').val());
          commentEmail = encodeURIComponent(this.$('.comment-post-email').val());
          commentURL = encodeURIComponent(this.$('.comment-post-url').val());
          commentContent = encodeURIComponent(this.$('.comment-post-content').val());
          commentPostId = encodeURIComponent(this.$('.comment-post-postId').val());
          commentParent = parseInt(encodeURIComponent(this.$('.comment-post-parent').val()));
          newComment = new Prima.Models.Comment({
            name: commentName,
            email: commentEmail,
            url: commentURL,
            content: commentContent,
            post_id: commentPostId,
            parent: commentParent
          });
          return newComment.save({}, {
            success: function(model, response, options) {
              if (response.status === 'error') {
                notification.setNotification('error', response.error);
                return notification.showNotification();
              } else {
                notification.setNotification('info', 'Thanks for the comment.');
                return notification.showNotification();
              }
            },
            error: function(model, response, options) {
              notification.setNotification('error', 'Something went wrong. :(');
              return notification.showNotification();
            }
          });
        };

        PostView.prototype.onShow = function() {
          var slug;
          $('img').parent().css('background', 'none');
          Loading.load();
          $(this.el).fadeIn('fast');
          $('.website-navigation a').removeClass('selected');
          if (this.model instanceof Prima.Models.Page) {
            $('html, body').animate({
              scrollTop: 0
            }, 1000);
            slug = this.model.get('slug') + '/';
            $('.website-navigation a[href="' + slug + '"]').addClass('selected');
          }
          $('pre.javascript').snippet('javascript', {
            style: 'darkblue'
          });
          if ((location.hash != null) && $(location.hash).length !== 0) {
            return $('html, body').animate({
              scrollTop: $(location.hash).offset().top
            }, 2000);
          }
        };

        return PostView;

      })(Backbone.Marionette.ItemView);
    }
  });

}).call(this);
