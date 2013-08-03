# Require any additional compass plugins here.
require 'fileutils'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "assets/stylesheets"
sass_dir = "assets/sass"
images_dir = "assets/images"
javascripts_dir = "assets/javascripts"
line_comments = false

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
preferred_syntax = :sass

on_stylesheet_saved do |file|
	if File.exists?(file) && File.basename(file) == "style.css"
		puts "Moving: #{file}"
		FileUtils.mv(file, File.dirname(file) + "/../../" + File.basename(file))
	end
	if File.exists?(File.dirname(file) + "/../../prima.js")
	  FileUtils.rm(File.dirname(file) + "/../../prima.js")
	end
	if File.exists?(File.dirname(file) + "/../../prima.min.js")
	  FileUtils.rm(File.dirname(file) + "/../../prima.min.js")
	end
end