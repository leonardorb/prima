module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    
    concat:
      options:
        separator: ';'
      dist:
        src: ['assets/javascripts/libs/underscore/underscore.js', 'assets/javascripts/libs/jquery/jquery.js', 'assets/javascripts/libs/json2/json2.js', 'assets/javascripts/libs/handlebars-wycats/dist/handlebars.js', 'assets/javascripts/libs/backbone/backbone.js', 'assets/javascripts/libs/marionette/lib/backbone.marionette.js', 'assets/javascripts/*.js', 'assets/javascripts/utilities/*.js', 'assets/javascripts/models/*.js', 'assets/javascripts/collections/*.js', 'assets/javascripts/modules/**/**/*.js']
        dest: '<%= pkg.name %>.js'

    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      dist:
        files:
          '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']

    cssmin:
      add_banner:
        options:
          banner: '/*\n* Theme Name: leonardorb.net\n* Theme URI: http://www.leonardorb.net\n* Description: Version 1 of leonardorb.net\n* Version: 1.0\n* Author: Leonardo Rodrigues Barbosa\n* Author URI: http://www.leonardorb.net\n* Tags: leonardorb\n*\n*/'
        files:
          'style.css': ['assets/stylesheets/jquery.snippet.css', 'assets/stylesheets/jquery.vegas.css', 'style.css']

    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-cssmin'

    grunt.registerTask 'generateassets', ['concat', 'uglify', 'cssmin']