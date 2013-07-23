// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Prima.Modules.Posts = Prima.App.module('Posts', {
    define: function(PostsModule, App, Backbone, Marionette, $, _) {
      var _ref;
      return PostsModule.Posts = (function(_super) {
        __extends(Posts, _super);

        function Posts() {
          _ref = Posts.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Posts.prototype.template = Handlebars.compile($('#posts-template').html());

        Posts.prototype.el = '#posts';

        Posts.prototype.serializeData = function() {
          return {
            'posts': this.collection.toJSON()
          };
        };

        return Posts;

      })(Backbone.Marionette.ItemView);
    }
  });

}).call(this);
