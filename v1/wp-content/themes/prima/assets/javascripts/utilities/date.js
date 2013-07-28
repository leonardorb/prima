/**
 * Based off of Mootools More Date library.
 *
 *
 * Formatting:

  a - short day ("Mon", "Tue")
  A - full day ("Monday")
  b - short month ("Jan", "Feb")
  B - full month ("January")
  c - the full date to string ("Mon Dec 10 14:35:42 2007"; %a %b %d %H:%m:%S %Y)
  d - the date to two digits (01, 05, etc)
  e - the date as one digit (1, 5, 12, etc)
  H - the hour to two digits in military time (24 hr mode) (00, 11, 14, etc)
  I - the hour as a decimal number using a 12-hour clock (range 01 to 12).
  j - the day of the year to three digits (001 to 366, is Jan 1st)
  k - the hour (24-hour clock) as a digit (range 0 to 23). Single digits are preceded by a blank space.
  l - the hour (12-hour clock) as a digit (range 1 to 12). Single digits are preceded by a blank space.
  L - the time in milliseconds (three digits; "081")
  m - the numerical month to two digits (01 is Jan, 12 is Dec)
  M - the minutes to two digits (01, 40, 59)
  o - the ordinal of the day of the month in the current language ("st" for the 1st, "nd" for the 2nd, etc.)
  p - the current language equivalent of either AM or PM
  s - the Unix Epoch Time timestamp
  S - the seconds to two digits (01, 40, 59)
  T - the time as %H:%M:%S
  U - the week to two digits (01 is the week of Jan 1, 52 is the week of Dec 31)
  w - the numerical day of the week, one digit (0 is Sunday, 1 is Monday)
  x - the date in the current language preferred format. en-US: %m/%d/%Y (12/10/2007)
  X - the time in the current language preferred format. en-US: %I:%M%p (02:45PM)
  y - the short year (two digits; "07")
  Y - the full year (four digits; "2007")
  z - the GMT offset ("-0800")
  Z - the time zone ("GMT")
  % - returns % (example: %y%% = 07%)

 *
 */

(function(){

var associate = function(keys, vals){
  var obj = {}, length = Math.min(vals.length, keys.length);
  for (var i = 0; i < length; i++) obj[keys[i]] = vals[i];
  return obj;
};

var instanceOf = function(obj, klass) {return (obj instanceof klass)};
var typeOf = function(obj) {return typeof obj};



var Date = this.Date;

var DateMethods = Date.Methods = {
  ms: 'Milliseconds',
  year: 'FullYear',
  min: 'Minutes',
  mo: 'Month',
  sec: 'Seconds',
  hr: 'Hours'
};

_.each(['Date', 'Day', 'FullYear', 'Hours', 'Milliseconds', 'Minutes', 'Month', 'Seconds', 'Time', 'TimezoneOffset',
  'Week', 'Timezone', 'GMTOffset', 'DayOfYear', 'LastMonth', 'LastDayOfMonth', 'UTCDate', 'UTCDay', 'UTCFullYear',
  'AMPM', 'Ordinal', 'UTCHours', 'UTCMilliseconds', 'UTCMinutes', 'UTCMonth', 'UTCSeconds', 'UTCMilliseconds'], function(method){
  Date.Methods[method.toLowerCase()] = method;


  /**
   * Create add/sub methods for all the basic date fields.
   * Argument defaults to 1 if not present.
   *
   * Examples:
   *
   * new Date() => Tue Jan 04 2011 11:55:28 GMT-0800 (PST)
   * new Date().addMonth() => Fri Feb 04 2011 11:55:31 GMT-0800 (PST)
   * new Date().addMonth().addDate(1) => Sat Feb 05 2011 11:55:37 GMT-0800 (PST)
   *
   */
  Date.prototype['add' + method] = function(n) {this['set' + method](this['get' + method]() + (n || 1));return this;}
  Date.prototype['sub' + method] = function(n) {this['set' + method](this['get' + method]() - (n || 1));return this;}
});

var pad = function(n, digits, string){
  if (digits == 1) return n;
  return n < Math.pow(10, digits - 1) ? (string || '0') + pad(n, digits - 1, string) : n;
};

_.extend(Date.prototype, {

  _set: function(prop, value){
    prop = prop.toLowerCase();
    var method = DateMethods[prop] && 'set' + DateMethods[prop];
    if (method && this[method]) this[method](value);
    return this;
  },

  set: function(prop, value) {
    var _this = this;
    if(typeof prop != 'string') {
      _.each(prop, function(v, k) {
        _this._set(k, v);
      });

    } else {
      this._set(prop, value);
    }

    return this;
  },

  get: function(prop){
    prop = prop.toLowerCase();
    var method = DateMethods[prop] && 'get' + DateMethods[prop];
    if (method && this[method]) return this[method]();
    return null;
  },

  clone: function(){
    return new Date(this.get('time'));
  },

  increment: function(interval, times){
    interval = interval || 'day';
    times = times != null ? times : 1;

    switch (interval){
      case 'year':
        return this.increment('month', times * 12);
      case 'month':
        var d = this.get('date');
        this.set('date', 1).set('mo', this.get('mo') + times);
        return this.set('date', Math.min(d, this.get('lastdayofmonth')));
      case 'week':
        return this.increment('day', times * 7);
      case 'day':
        return this.set('date', this.get('date') + times);
    }

    if (!Date.units[interval]) throw new Error(interval + ' is not a supported interval');

    return this.set('time', this.get('time') + times * Date.units[interval]());
  },

  decrement: function(interval, times){
    return this.increment(interval, -1 * (times != null ? times : 1));
  },

  isLeapYear: function(){
    return Date.isLeapYear(this.get('year'));
  },

  clearTime: function(){
    return this.set({hr: 0, min: 0, sec: 0, ms: 0});
  },

  diff: function(date, resolution) {
    if (typeOf(date) == 'string') date = Date.parse(date);
    var resSeconds = Date.units[resolution || 'day'](3, 3); // non-leap year, 30-day month
    return Math.round(((date - this) / resSeconds) % resSeconds)
  },
  
  getLastDayOfMonth: function(){
    return Date.daysInMonth(this.get('mo'), this.get('year'));
  },

  getDayOfYear: function(){
    return (Date.UTC(this.get('year'), this.get('mo'), this.get('date') + 1)
      - Date.UTC(this.get('year'), 0, 1)) / Date.units.day();
  },

  setDay: function(day, firstDayOfWeek){
    if (firstDayOfWeek == null){
      firstDayOfWeek = Date.getMsg('firstDayOfWeek');
      if (firstDayOfWeek === '') firstDayOfWeek = 1;
    }

    day = (7 + Date.parseDay(day, true) - firstDayOfWeek) % 7;
    var currentDay = (7 + this.get('day') - firstDayOfWeek) % 7;

    return this.increment('day', day - currentDay);
  },

  getWeek: function(firstDayOfWeek){
    if (firstDayOfWeek == null){
      firstDayOfWeek = Date.getMsg('firstDayOfWeek');
      if (firstDayOfWeek === '') firstDayOfWeek = 1;
    }

    var date = this,
      dayOfWeek = (7 + date.get('day') - firstDayOfWeek) % 7,
      dividend = 0,
      firstDayOfYear;

    if (firstDayOfWeek == 1){
      // ISO-8601, week belongs to year that has the most days of the week (i.e. has the thursday of the week)
      var month = date.get('month'),
        startOfWeek = date.get('date') - dayOfWeek;

      if (month == 11 && startOfWeek > 28) return 1; // Week 1 of next year

      if (month == 0 && startOfWeek < -2){
        // Use a date from last year to determine the week
        date = new Date(date).decrement('day', dayOfWeek);
        dayOfWeek = 0;
      }

      firstDayOfYear = new Date(date.get('year'), 0, 1).get('day') || 7;
      if (firstDayOfYear > 4) dividend = -7; // First week of the year is not week 1
    } else {
      // In other cultures the first week of the year is always week 1 and the last week always 53 or 54.
      // Days in the same week can have a different weeknumber if the week spreads across two years.
      firstDayOfYear = new Date(date.get('year'), 0, 1).get('day');
    }

    dividend += date.get('dayofyear');
    dividend += 6 - dayOfWeek; // Add days so we calculate the current date's week as a full week
    dividend += (7 + firstDayOfYear - firstDayOfWeek) % 7; // Make up for first week of the year not being a full week

    return (dividend / 7);
  },

  getOrdinal: function(day){
    return Date.getMsg('ordinal', day || this.get('date'));
  },

  getTimezone: function(){
    return this.toString()
      .replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/, '$1')
      .replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, '$1$2$3');
  },

  getGMTOffset: function(){
    var off = this.get('timezoneOffset');
    return ((off > 0) ? '-' : '+') + pad(Math.floor(Math.abs(off) / 60), 2) + pad(off % 60, 2);
  },

  setAMPM: function(ampm){
    ampm = ampm.toUpperCase();
    var hr = this.get('hr');
    if (hr > 11 && ampm == 'AM') return this.decrement('hour', 12);
    else if (hr < 12 && ampm == 'PM') return this.increment('hour', 12);
    return this;
  },

  getAMPM: function(){
    return (this.get('hr') < 12) ? 'AM' : 'PM';
  },

  parse: function(str){
    this.set('time', Date.parse(str));
    return this;
  },

  isValid: function(date){
    return !isNaN((date || this).valueOf());
  },

  isBetween: function(lower, upper) {
    if (this.getTime() <= upper.getTime() && this.getTime() >= lower.getTime()) {
      return true;
    }
    return false;
  },

  formatRelative: function(options) {
    var o = _.extend({
      show_time: true,
      show_year: false,
      short_month_name: true
    }, options);

    var since = new Date(),
    daysApart = this.daysApart(since);
    
    var str = '';
    if (daysApart == 0) {
      return o.show_time? this.stringDiff(since) : 'today';
    } else if(daysApart == 1) {
      str = 'yesterday';
    } else if(daysApart == -1) {
      str = 'tomorrow';
    } else if(this.isThisWeek()) {
      str = Date.getMsg('days')[this.get('day')];
    } else {
      var format = [(o.short_month_name? '%b' : '%B' ), ' %e'];
      if (o.show_year || this.getFullYear() != since.getFullYear()) { format.push(', %Y') };
      str = this.format( format.join('') );
    }
    if (o.show_time) { return str + ' at ' + this.format("%l:%M%p"); }
    else { return str; }
  },
  
  compactRelative: function(options) {
    options = $.extend(true, {
      show_time: true,
      short_year: true,
      very_compact: false
    }, options);
    
    var since = new Date(),
      daysApart = this.daysApart(since),
      str = '';
    
    if (daysApart == 0) { return options.show_time ? this.compactStringDiff(since, options) : 'today'; }
    else if (daysApart == 1) { str = 'yesterday'; }
    else if (daysApart == -1) { str = 'tomorrow'; }
    else if(this.isThisWeek()) { str = Date.getMsg('days')[this.get('day')]; }
    else {
      var year_format = options.short_year ? ' \'%y' : ', %Y';
      str = this.format('%b %e' + (this.getFullYear() != since.getFullYear() ? year_format : ''));
    }
    
    return str;
  },
  
  compactStringDiff: function(since, options) {
    options = options || {};
    var strDiff = this.stringDiff(since, options);
    if (!!options.very_compact) {
      strDiff = strDiff.replace('about a', '~1');
      strDiff = strDiff.replace(' hours', 'h').replace(' hour', 'h');
      strDiff = strDiff.replace(' minutes', 'm').replace(' minute', 'm');
      strDiff = strDiff.replace(' seconds', 's').replace(' second', 's');
      strDiff = strDiff.replace(' months', 'mo').replace(' month', 'mo');
      strDiff = strDiff.replace(' years', 'yr').replace(' year', 'yr');
      strDiff = strDiff.replace(' weeks', 'wk').replace(' week', 'wk');
      strDiff = strDiff.replace(' ago', '');
    } else {
      strDiff = strDiff.replace('about a', '~1');
      strDiff = strDiff.replace('hour', 'hr');
      strDiff = strDiff.replace('minute', 'min');
      strDiff = strDiff.replace('second', 'sec');
      strDiff = strDiff.replace('month', 'mon');
      strDiff = strDiff.replace('year', 'yr');
      strDiff = strDiff.replace('week', 'wk');
    }
    return strDiff;
  },
  
  stringDiff: function(since, options) {
    options = _.extend({
      accuracy: 1
    }, options);

    var CHUNKS = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    since = ( (_.isDate(since)? since : new Date().getTime()) - this.getTime())/1000;

    if (since <= 60)
      return 'just now';
    // if (since <= 75)
      // return 'about a minute ago';

    var largestChunk = null, ratio, chunk, largestChunkName, largestChunkSeconds, secondChunk, secondChunkName;
    $.each(CHUNKS, function(name, seconds) {
      if (null === largestChunk) {
        ratio = since / seconds;
        chunk = (since < 0) ? -Math.floor(Math.abs(ratio)) : Math.floor(ratio);
      }

      if (chunk && chunk != 0 && largestChunk === null) {
        largestChunk        = chunk;
        largestChunkName    = (chunk == 1) ? name : name + 's';
        largestChunkSeconds = seconds;
      } else if (chunk && chunk == 0 && largestChunk === null) {
        // if it is 0 of the smallest chunk
        return 'about a minute ago';
      } else if (largestChunk) {
        ratio = (since - (largestChunkSeconds * largestChunk)) / seconds;
        chunk = (since < 0) ? -Math.floor(Math.abs(ratio)) : Math.floor(ratio);

        if (chunk != 0) {
          secondChunk     = chunk;
          secondChunkName = (chunk == 1) ? name : name + 's';
        }

        return false; // break
      }
    });

    var sinceString = since < 0? 'from now' : 'ago';

    if (options.accuracy == 2) {
      return [largestChunk, largestChunkName, 'and', secondChunk, secondChunkName, sinceString].join(' ');
    } else {
      return [largestChunk, largestChunkName, sinceString].join(' ');
    }
  },

  format: function(f){
    if (!this.isValid()) return 'invalid date';
    if (!f) f = '%x %X';

    var formatLower = f.toLowerCase();
    if (formatters[formatLower]) return formatters[formatLower](this); // it's a formatter!
    f = formats[formatLower] || f; // replace short-hand with actual format

    var d = this;
    return f.replace(/%([a-z%])/gi,
      function($0, $1){
        switch ($1){
          case 'a':return Date.getMsg('days_abbr')[d.get('day')];
          case 'A':return Date.getMsg('days')[d.get('day')];
          case 'b':return Date.getMsg('months_abbr')[d.get('month')];
          case 'B':return Date.getMsg('months')[d.get('month')];
          case 'c':return d.format('%a %b %d %H:%M:%S %Y');
          case 'd':return pad(d.get('date'), 2);
          case 'e':return d.get('date');
          case 'H':return pad(d.get('hr'), 2);
          case 'I':return pad((d.get('hr') % 12) || 12, 2);
          case 'j':return pad(d.get('dayofyear'), 3);
          case 'k':return pad(d.get('hr'), 2, ' ');
          case 'l':return pad((d.get('hr') % 12) || 12, 2, ' ');
          case 'L':return pad(d.get('ms'), 3);
          case 'm':return pad((d.get('mo') + 1), 2);
          case 'n':return d.get('mo') + 1;
          case 'M':return pad(d.get('min'), 2);
          case 'o':return d.get('ordinal');
          case 'p':return Date.getMsg(d.get('ampm'));
          case 's':return Math.round(d / 1000);
          case 'S':return pad(d.get('seconds'), 2);
          case 'T':return d.format('%H:%M:%S');
          case 'U':return pad(d.get('week'), 2);
          case 'w':return d.get('day');
          case 'x':return d.format(Date.getMsg('shortDate'));
          case 'X':return d.format(Date.getMsg('shortTime'));
          case 'y':return d.get('year').toString().substr(2);
          case 'Y':return d.get('year');
          case 'z':return d.get('GMTOffset');
          case 'Z':return d.get('Timezone');
        }
        return $1;
      }
    );
  },


  getFirstDayOfWeek: function(firstDayOfWeek) {
    if (firstDayOfWeek == null){
      firstDayOfWeek = Date.getMsg('firstDayOfWeek');
      if (firstDayOfWeek === '') firstDayOfWeek = 1;
    }

    var d = this.clone(),
      day = (d.getDay() < firstDayOfWeek) ? d.getDay() + 7 : d.getDay();
    
    d.setDate(d.getDate() - day + firstDayOfWeek);
    return d;
  },

  getLastDayOfWeek: function(firstDayOfWeek) {
    if (firstDayOfWeek == null){
      firstDayOfWeek = Date.getMsg('firstDayOfWeek');
      if (firstDayOfWeek === '') firstDayOfWeek = 1;
    }

    var d = this.clone(),
      day = (d.getDay() < firstDayOfWeek) ? d.getDay() + 7 : d.getDay();
    d.setDate(d.getDate() + (6 - day) + firstDayOfWeek);
    return d;
  },

  daysApart: function(d) {
    if (typeof d === 'undefined')
      d = new Date();
    return this.clone().clearTime().diff(d.clone().clearTime(), 'day');
  },

  isToday: function() {
    return this.daysApart( new Date() ) == 0;
  },

  isThisWeek: function(ref) {
    var d = this.clone().clearTime(),
      t = ref || Date.today(),
      f = t.getFirstDayOfWeek(),
      l = t.getLastDayOfWeek();

    return d >= f && d <= l;
  },

  isNextWeek: function(ref) {
    var d = this.clone().clearTime(),
      t = ref || Date.today(),
      f = t.getFirstDayOfWeek().addDate(7),
      l = f.getLastDayOfWeek();
    return d >= f && d <= l;
  },

  isLastWeek: function(ref) {
    var d = this.clone().clearTime(),
      t = ref || Date.today(),
      f = t.getFirstDayOfWeek().subDate(7),
      l = f.getLastDayOfWeek();

    return d >= f && d <= l;
  },

  isThisMonth: function(ref) {
    var d = this.clone().clearTime(),
      f = ref || Date.today();

    f.setDate(1);
    var l = f.clone().addMonth(1);

    return d >= f && d < l;
  },

  isNextMonth: function(ref) {
    var d = this.clone().clearTime(),
      f = ref || Date.today();

    f.setDate(1);
    f.addMonth(1);

    var l = f.clone().addMonth(1);

    return d >= f && d < l;
  },

  isLastMonth: function(ref) {
    var d = this.clone().clearTime(),
      f = ref || Date.today();

    f.setDate(1);
    f.subMonth(1);

    var l = f.clone().addMonth(1);

    return d >= f && d <= l;
  },

  toISOString: function(){
    return this.format('iso8601');
  },

  toJSON: function(){
    return this.format('iso8601utc');
  }
});

var formats = {
  db: '%Y-%m-%d %H:%M:%S',
  compact: '%Y%m%dT%H%M%S',
  'short': '%d %b %H:%M',
  'long': '%B %d, %Y %H:%M'
};

// The day and month abbreviations are standardized, so we cannot use simply %a and %b because they will get localized
var rfcDayAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  rfcMonthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var formatters = {
  rfc822: function(date){
    return rfcDayAbbr[date.get('day')] + date.format(', %d ') + rfcMonthAbbr[date.get('month')] + date.format(' %Y %H:%M:%S %Z');
  },
  rfc2822: function(date){
    return rfcDayAbbr[date.get('day')] + date.format(', %d ') + rfcMonthAbbr[date.get('month')] + date.format(' %Y %H:%M:%S %z');
  },
  iso8601utc: function(date){
    return (
      date.getUTCFullYear() + '-' +
      pad(date.getUTCMonth() + 1, 2) + '-' +
      pad(date.getUTCDate(), 2) + 'T' +
      pad(date.getUTCHours(), 2) + ':' +
      pad(date.getUTCMinutes(), 2) + ':' +
      pad(date.getUTCSeconds(), 2) + '.' +
      pad(date.getUTCMilliseconds(), 3) + 'Z'
    );
  },
  iso8601: function(date){
    return (
      date.getUTCFullYear() + '-' +
      pad(date.getUTCMonth() + 1, 2) + '-' +
      pad(date.getUTCDate(), 2) + 'T' +
      pad(date.getUTCHours(), 2) + ':' +
      pad(date.getUTCMinutes(), 2) + ':' +
      pad(date.getUTCSeconds(), 2) + '.' +
      pad(date.getUTCMilliseconds(), 3) +
      date.get('GMTOffset')
    );
  },
  iso8601local: function(date) {
    return (
      date.getFullYear() + '-' +
      pad(date.getMonth() + 1, 2) + '-' +
      pad(date.getDate(), 2) + 'T' +
      pad(date.getHours(), 2) + ':' +
      pad(date.getMinutes(), 2) + ':' +
      pad(date.getSeconds(), 2) + '.' +
      pad(date.getMilliseconds(), 3)
    );
  }
};


var parsePatterns = [],
  nativeParse = Date.parse;

var parseWord = function(type, word, num){
  var ret = -1,
    translated = Date.getMsg(type + 's');
  switch (typeOf(word)){
    case 'object':
      ret = translated[word.get(type)];
      break;
    case 'number':
      ret = translated[word];
      if (!ret) throw new Error('Invalid ' + type + ' index: ' + word);
      break;
    case 'string':
      var match = null;
      if (!!translated.filter) // IE8 doesn't have [].filter
      {
        match = translated.filter(function(name) {
          return this.test(name);
        }, new RegExp('^' + word, 'i'));
      }
      else
      {
        match = _.filter(translated, function(name) {
          return this.test(name);
        }, new RegExp('^monday', 'i'));
      }
      if (!match || !match.length)
        throw new Error('Invalid ' + type + ' string');
      if (match.length > 1)
        throw new Error('Ambiguous ' + type);
      ret = match[0];
  }

  return (num) ? _.indexOf(translated, ret) : ret;
};

var startCentury = 1900,
  startYear = 70;

_.extend(Date, {

  today: function() {
        return new Date().clearTime();
    },

  getMsg: function(key, args){
    return Locale.get('Date.' + key, args);
  },

  units: {
    ms: Function.from(1),
    second: Function.from(1000),
    minute: Function.from(60000),
    hour: Function.from(3600000),
    day: Function.from(86400000),
    week: Function.from(608400000),
    month: function(month, year){
      var d = new Date;
      return Date.daysInMonth(month != null ? month : d.get('mo'), year != null ? year : d.get('year')) * 86400000;
    },
    year: function(year){
      year = year || new Date().get('year');
      return Date.isLeapYear(year) ? 31622400000 : 31536000000;
    }
  },

  daysInMonth: function(month, year){
    return [31, Date.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  },

  isLeapYear: function(year){
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  },

  parse: function(from){
    var t = typeOf(from);
    if (t == 'number') return new Date(from);
    if (t != 'string') return from;
    from = from.clean();
    if (!from.length) return null;

    var parsed;
    _.some(parsePatterns, function(pattern){
      var bits = pattern.re.exec(from);
      try { return (bits) ? (parsed = pattern.handler(bits)) : false; }
      catch (error) { return false; }
    });
    
    if (!(parsed && parsed.isValid())){
      parsed = new Date(nativeParse(from));
      if (!(parsed && parsed.isValid())) parsed = new Date(from.toInt());
    }
    return parsed;
  },
  
  parseDay: function(day, num){
    return parseWord('day', day, num);
  },

  parseMonth: function(month, num){
    return parseWord('month', month, num);
  },

  parseUTC: function(value){
    var localDate = new Date(value);
    var utcSeconds = Date.UTC(
      localDate.get('year'),
      localDate.get('mo'),
      localDate.get('date'),
      localDate.get('hr'),
      localDate.get('min'),
      localDate.get('sec'),
      localDate.get('ms')
    );
    return new Date(utcSeconds);
  },

  orderIndex: function(unit){
    return _.indexOf(Date.getMsg('dateOrder'), unit) + 1;
  },

  defineFormat: function(name, format){
    formats[name] = format;
    return this;
  },

  defineFormats: function(formats){
    for (var name in formats) Date.defineFormat(name, formats[name]);
    return this;
  },



  defineParser: function(pattern){
    parsePatterns.push((pattern.re && pattern.handler) ? pattern : build(pattern));
    return this;
  },

  defineParsers: function(){
    _.each(_.flatten(arguments), function(p) {
      Date.defineParser(p);
    })
    return this;
  },

  define2DigitYearStart: function(year){
    startYear = year % 100;
    startCentury = year - startYear;
    return this;
  }

});

var regexOf = function(type){
  return new RegExp('(?:' + _.map(Date.getMsg(type), function(name){
    return name.substr(0, 3);
  }).join('|') + ')[a-z]*');
};

var replacers = function(key){
  switch (key){
    case 'T':
      return '%H:%M:%S';
    case 'x': // iso8601 covers yyyy-mm-dd, so just check if month is first
      return ((Date.orderIndex('month') == 1) ? '%m[-./]%d' : '%d[-./]%m') + '([-./]%y)?';
    case 'X':
      return '%H([.:]%M)?([.:]%S([.:]%s)?)? ?%p? ?%z?';
  }
  return null;
};

var keys = {
  d: /[0-2]?[0-9]|3[01]/,
  H: /[01]?[0-9]|2[0-3]/,
  I: /0?[1-9]|1[0-2]/,
  M: /[0-5]?\d/,
  s: /\d+/,
  o: /[a-z]*/,
  p: /[ap]\.?m\.?/,
  y: /\d{2}|\d{4}/,
  Y: /\d{4}/,
  z: /Z|[+-]\d{2}(?::?\d{2})?/
};

keys.m = keys.I;
keys.S = keys.M;

var currentLanguage;

var recompile = function(language){
  currentLanguage = language;

  keys.a = keys.A = regexOf('days');
  keys.b = keys.B = regexOf('months');

  _.each(parsePatterns, function(pattern, i){
    if (pattern.format) parsePatterns[i] = build(pattern.format);
  });
};

var build = function(format){
  if (!currentLanguage) return {format: format};

  var parsed = [];
  var re = (format.source || format) // allow format to be regex
   .replace(/%([a-z])/gi,
    function($0, $1){
      return replacers($1) || $0;
    }
  ).replace(/\((?!\?)/g, '(?:') // make all groups non-capturing
   .replace(/ (?!\?|\*)/g, ',? ') // be forgiving with spaces and commas
   .replace(/%([a-z%])/gi,
    function($0, $1){
      var p = keys[$1];
      if (!p) return $1;
      parsed.push($1);
      return '(' + p.source + ')';
    }
  ).replace(/\[a-z\]/gi, '[a-z\\u00c0-\\uffff;\&]'); // handle unicode words

  return {
    format: format,
    re: new RegExp('^' + re + '$', 'i'),
    handler: function(bits){
      bits = associate(parsed, bits.slice(1));

      var date = new Date().clearTime(),
        today = new Date(),
        month = 'm' in bits || bits.b || bits.B;
        year = bits.y || bits.Y;
      if (year != null) handle.call(date, 'y', year); // need to start in the right year
      if ('d' in bits) handle.call(date, 'd', 1);
      if (month) handle.call(date, 'm', 1);

      for (var key in bits) handle.call(date, key, bits[key]);

      if (year == null && month && (date.getMonth() < today.getMonth() || (date.getMonth() == today.getMonth() && date.getDate() < today.getDate()))) {
        handle.call(date, 'y', today.getFullYear() + 1);
      }

      if (month == null && (date.getMonth() < today.getMonth() || (date.getMonth() == today.getMonth() && date.getDate() < today.getDate()))) {
        handle.call(date, 'm', today.getMonth() + 2);
      }

      return date;
    }
  };
};

var handle = function(key, value){
  if (!value) return this;

  switch (key){
    case 'a': case 'A':return this.set('day', Date.parseDay(value, true));
    case 'b': case 'B':return this.set('mo', Date.parseMonth(value, true));
    case 'd':return this.set('date', value);
    case 'H': case 'I':return this.set('hr', value);
    case 'm':return this.set('mo', value - 1);
    case 'M':return this.set('min', value);
    case 'p':return this.set('ampm', value.replace(/\./g, ''));
    case 'S':return this.set('sec', value);
    case 's':return this.set('ms', ('0.' + value) * 1000);
    case 'w':return this.set('day', value);
    case 'Y':return this.set('year', value);
    case 'y':
      value = +value;
      if (value < 100) value += startCentury + (value < startYear ? 100 : 0);
      return this.set('year', value);
    case 'z':
      if (value == 'Z') value = '+00';
      var offset = value.match(/([+-])(\d{2}):?(\d{2})?/);
      offset = (offset[1] + '1') * (offset[2] * 60 + (+offset[3] || 0)) + this.getTimezoneOffset();
      return this.set('time', this - offset * 60000);
  }

  return this;
};

Date.defineParsers(
  '%Y([-./]%m([-./]%d((T| )%X)?)?)?', // "1999-12-31", "1999-12-31 11:59pm", "1999-12-31 23:59:59", ISO8601
  '%Y%m%d(T%H(%M%S?)?)?', // "19991231", "19991231T1159", compact
  '%x( %X)?', // "12/31", "12.31.99", "12-31-1999", "12/31/2008 11:59 PM"
  '%d%o( %b( %Y)?)?( %X)?', // "31st", "31st December", "31 Dec 1999", "31 Dec 1999 11:59pm"
  '%b( %d%o)?( %Y)?( %X)?', // Same as above with month and day switched
  '%Y %b( %d%o( %X)?)?', // Same as above with year coming first
  '%o %b %d %X %z %Y', // "Thu Oct 22 08:11:23 +0000 2009"
  '%T', // %H:%M:%S
  '%H:%M( ?%p)?' // "11:05pm", "11:05 am" and "11:05"
);

Locale.bind('change', function(language){
  if (Locale.get('Date')) recompile(language);
}).trigger('change', Locale.getCurrent());

}).call(this);



Date.defineParsers(
  // Fix things like "day/"
  {
    re: /^(\d+)[\/-]/,
    handler: function(bits){
      return Date.parse(bits[0]);
    }
  },

  {
    // "today", "tomorrow", "yesterday"
    re: /^(?:tod|tom|yes)/i,
    handler: function(bits){
      var d = new Date().clearTime();
      switch (bits[0].toLowerCase()){
        case 'tom':return d.increment();
        case 'yes':return d.decrement();
        default:return d;
      }
    }
  },

  {
    // "a fortnight" "fortnight"
    re: /^(?:a\s)?fortnight/i,
    handler: function(bits){
      return new Date().clearTime().addDate(14);
    }
  },

  {
    // "next Wednesday", "last Thursday", "next week", "next month"
    re: /^(next|last) ([a-z]+)$/i,
    handler: function(bits){
      var d = new Date().clearTime();
      var unit = bits[2].toLowerCase().capitalizeFirst();
      if(unit == 'Week') {
        return d.set('date', d.getDate() + 7);
      } else if(unit == 'Month') {
        return d.set('month', d.getMonth() + 1);
      }

      var day = d.getDay();
      try {
        var newDay = Date.parseDay(bits[2], true);
      } catch(e) {
        return false;
      }
      var addDays = newDay - day;
      if (newDay <= day) addDays += 7;
      if (bits[1].toLowerCase() == 'last') addDays -= 7;
      return d.set('date', d.getDate() + addDays);
    }
  },

  {
    // day names, defaults to next.
    re: new RegExp('^('+ Locale.getCurrent().get('Date.days_abbr').join('|').toLowerCase() +')', 'i'),
    handler: function(bits){
      var d = new Date().clearTime();
      var day = d.getDay();
      var newDay = Date.parseDay(bits[1], true);
      var addDays = newDay - day;
      if (newDay <= day) addDays += 7;
      return d.set('date', d.getDate() + addDays);
    }
  },

  {
    // n units, i.e. 3 days, 4 months
    re: /^(\d+) ([a-z]+)$/i,
    handler: function(bits){
      var d = new Date().clearTime();
      var num = parseInt(bits[1], 10);
      var unit = bits[2].toLowerCase().capitalizeFirst();
      if(unit == 'Day' || unit == 'Days')
        unit = 'Date';

      if(unit == 'Week' || unit == 'Weeks') {
        unit = 'Date';
        num = num*7;
      }

      var method = 'add' + unit;
      if(!d[method]) {
        method = 'add' + unit.replace(/s$/, '');
        if(!d[method])
          return false;
      }


      d[method](num);
      return d;
    }
  }
);
