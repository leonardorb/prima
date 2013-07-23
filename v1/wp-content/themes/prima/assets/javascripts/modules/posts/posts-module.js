// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Prima.Modules.Posts = Prima.App.module('Posts', {
    define: function(PostsModule, App, Backbone, Marionette, $, _) {
      var _ref;
      PostsModule.Controller = (function(_super) {
        __extends(Controller, _super);

        function Controller() {
          _ref = Controller.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Controller.prototype.index = function() {
          var Posts;
          Posts = new Prima.Collections.Posts();
          return Posts.fetch({
            success: function() {
              var postsView;
              postsView = new PostsModule.Posts({
                collection: Posts
              });
              postsView.render();
              return document.title = '@leonardorb';
            }
          });
        };

        Controller.prototype.single = function(options) {
          var Post;
          Post = new Prima.Models.Post({
            slug: options.name
          });
          return Post.fetch({
            success: function() {
              var postsView;
              postsView = new PostsModule.Post({
                model: Post
              });
              postsView.render();
              return document.title = Post.get('post').title + ' | @leonardorb';
            }
          });
        };

        return Controller;

      })(Backbone.Marionette.Controller);
      return PostsModule.controller = new PostsModule.Controller();
    }
  });

}).call(this);
