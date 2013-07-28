/**
 * Based off of Mootools Locale library.
 */

(function(){

Object.getFromPath = function(source, parts){
  if (typeof parts == 'string') parts = parts.split('.');
  for (var i = 0, l = parts.length; i < l; i++){
    if (Object.prototype.hasOwnProperty.call(source, parts[i])) source = source[parts[i]];
    else return null;
  }
  return source;
};

Function.from = function(item){
  return (typeOf(item) == 'function') ? item : function(){
    return item;
  };
};


var instanceOf = function(obj, klass) { return (obj instanceof klass) };
var typeOf = function(obj) { return typeof obj };

var current = null,
  locales = {},
  inherits = {};

var getSet = function(set){
  if (instanceOf(set, Locale.Set)) return set;
  else return locales[set];
};


var localeClass = function() {};

_.extend(localeClass.prototype, Backbone.Events, {

  define: function(locale, set, key, value){
    var name;
    if (instanceOf(locale, Locale.Set)){
      name = locale.name;
      if (name) locales[name] = locale;
    } else {
      name = locale;
      if (!locales[name]) 
        locale = locales[name] = new Locale.Set(name);
    }

    if (set) locale.define(set, key, value);

    if (!current) current = locale;

    return locale;
  },

  _use: function(locale){
    locale = getSet(locale);

    if (locale){
      current = locale;

      this.trigger('change', locale);
    }

    return this;
  },

  use: function(locale) {
    var _this = this;

    if(locales[locale]) {
      this._use(locale);
    } else {
      yepnope({
        load: '/javascripts/locales/Locale.'+ locale +'.Date.js',
        complete: function() {
          _this._use(locale);
        }
      });
    }
  },

  getCurrent: function(){
    return current;
  },

  get: function(key, args){
    return (current) ? current.get(key, args) : '';
  },

  inherit: function(locale, inherits, set){
    locale = getSet(locale);

    if (locale) locale.inherit(inherits, set);
    return this;
  },

  list: function(){
    return _.keys(locales);
  }

});


var Locale = this.Locale = new localeClass();

Locale.Set = function(name) {
    this.sets = {};

    this.inherits = {
      locales: [],
      sets: {}
    };

    this.name = name || '';
};

_.extend(Locale.Set.prototype, {

  define: function(set, key, value){
    var defineData = this.sets[set];
    if (!defineData) defineData = {};

    if (key){
      if (typeOf(key) == 'object') defineData = _.extend(defineData, key);
      else defineData[key] = value;
    }
    this.sets[set] = defineData;

    return this;
  },

  get: function(key, args, _base){
    var value = Object.getFromPath(this.sets, key);
    if (value != null){
      var type = typeOf(value);
      if (type == 'function') value = value.apply(null, [args]);
      else if (type == 'object') value = _.clone(value);
      return value;
    }

    // get value of inherited locales
    var index = key.indexOf('.'),
      set = index < 0 ? key : key.substr(0, index),
      names = _.uniq((this.inherits.sets[set] || []).concat(this.inherits.locales, 'en-US'));
    if (!_base) _base = [];

    for (var i = 0, l = names.length; i < l; i++){
      if (_.include(_base, names[i])) continue;
      _base.push(names[i]);

      var locale = locales[names[i]];
      if (!locale) continue;

      value = locale.get(key, args, _base);
      if (value != null) return value;
    }

    return '';
  },

  inherit: function(names, set){
    if(!_.isArray(names))
      names = [names];

    if (set && !this.inherits.sets[set]) this.inherits.sets[set] = [];

    var l = names.length;
    while (l--) (set ? this.inherits.sets[set] : this.inherits.locales).unshift(names[l]);

    return this;
  }

});


}).call(this);

Locale.define('en-US', 'Date', {

  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  months_abbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  days_abbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  // Culture's date order: MM/DD/YYYY
  dateOrder: ['month', 'date', 'year'],
  shortDate: '%m/%d/%Y',
  shortTime: '%I:%M%p',
  AM: 'AM',
  PM: 'PM',
  firstDayOfWeek: 0,

  // Date.Extras
  ordinal: function(dayOfMonth){
    // 1st, 2nd, 3rd, etc.
    return (dayOfMonth > 3 && dayOfMonth < 21) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][Math.min(dayOfMonth % 10, 4)];
  },

  lessThanMinuteAgo: 'less than a minute ago',
  minuteAgo: 'about a minute ago',
  minutesAgo: '{delta} minutes ago',
  hourAgo: 'about an hour ago',
  hoursAgo: 'about {delta} hours ago',
  dayAgo: '1 day ago',
  daysAgo: '{delta} days ago',
  weekAgo: '1 week ago',
  weeksAgo: '{delta} weeks ago',
  monthAgo: '1 month ago',
  monthsAgo: '{delta} months ago',
  yearAgo: '1 year ago',
  yearsAgo: '{delta} years ago',

  lessThanMinuteUntil: 'less than a minute from now',
  minuteUntil: 'about a minute from now',
  minutesUntil: '{delta} minutes from now',
  hourUntil: 'about an hour from now',
  hoursUntil: 'about {delta} hours from now',
  dayUntil: '1 day from now',
  daysUntil: '{delta} days from now',
  weekUntil: '1 week from now',
  weeksUntil: '{delta} weeks from now',
  monthUntil: '1 month from now',
  monthsUntil: '{delta} months from now',
  yearUntil: '1 year from now',
  yearsUntil: '{delta} years from now'
});

Locale.define('en-GB', 'Date', {
  // Culture's date order: DD/MM/YYYY
  dateOrder: ['date', 'month', 'year'],
  shortDate: '%d/%m/%Y',
  shortTime: '%H:%M'
}).inherit('en-US', 'Date');

Locale.define('en-CA', 'Date', {
  // Culture's date order: DD/MM/YYYY
  dateOrder: ['date', 'month', 'year'],
  shortDate: '%d/%m/%Y',
  shortTime: '%H:%M'
}).inherit('en-US', 'Date');


Locale.use('en-US');

