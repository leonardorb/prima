// Generated by CoffeeScript 1.6.3
(function() {
  Prima.Utilities.Loading = (function() {
    function Loading() {}

    Loading.prototype.load = function() {
      return $('.loading').removeClass('fullwidth').delay(10).queue(function(next) {
        $(this).addClass('fullwidth');
        return next();
      });
    };

    return Loading;

  })();

  this.Loading = new Prima.Utilities.Loading();

}).call(this);