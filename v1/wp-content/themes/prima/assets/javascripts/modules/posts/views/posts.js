// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Prima.Modules.Posts = Prima.App.module('Posts', {
    define: function(PostsModule, App, Backbone, Marionette, $, _) {
      var _ref;
      return PostsModule.PostsView = (function(_super) {
        __extends(PostsView, _super);

        function PostsView() {
          _ref = PostsView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        PostsView.prototype.template = Handlebars.compile($('#posts-template').html());

        PostsView.prototype.events = {
          'click h1 a': 'navigate'
        };

        PostsView.prototype.navigate = function(ev) {
          ev.preventDefault();
          return PostsModule.router.navigate($(ev.target).attr('href'), {
            trigger: true
          });
        };

        PostsView.prototype.serializeData = function() {
          return {
            'posts': this.collection.toJSON()
          };
        };

        PostsView.prototype.render = function() {
          PostsView.__super__.render.apply(this, arguments);
          $(this.el).hide();
          $('.loading').fadeOut('fast');
          $.vegas({
            src: Prima.BaseURL + 'wp-content/themes/prima/assets/images/bg-min.jpg'
          });
          return $.vegas('overlay', {
            src: Prima.BaseURL + 'wp-content/themes/prima/assets/images/overlays/02.png'
          });
        };

        PostsView.prototype.onShow = function() {
          Loading.load();
          $(this.el).fadeIn('slow');
          return $('.website-navigation a').removeClass('selected');
        };

        return PostsView;

      })(Backbone.Marionette.ItemView);
    }
  });

}).call(this);
