    <?php wp_footer(); ?>
    <?php if (WP_ENV == 'development') { ?>

    <link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet" />
    <link href="<?php echo get_template_directory_uri(); ?>/assets/stylesheets/jquery.vegas.css" rel="stylesheet" />
    <link href="<?php echo get_template_directory_uri(); ?>/assets/stylesheets/jquery.snippet.css" rel="stylesheet" />

    <!--<script type="text/javascript" src="//use.typekit.net/eia3zwp.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>-->
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/libs/underscore/underscore.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/libs/jquery/jquery.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/libs/json2/json2.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/libs/handlebars-wycats/dist/handlebars.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/libs/backbone/backbone.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/libs/marionette/lib/backbone.marionette.js"></script>

    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/helpers.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/init.js"></script>
    
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/utilities/loading.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/utilities/notification.js"></script>  
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/utilities/date.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/utilities/jquery.vegas.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/utilities/jquery.snippet.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/utilities/md5.js"></script>

    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/models/post.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/models/page.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/models/comment.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/collections/posts.js"></script>
    
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/modules/posts/posts-module.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/modules/posts/router.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/modules/posts/views/post.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/modules/posts/views/posts.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/javascripts/modules/sidebar/views/sidebar.js"></script>
    <?php } else { ?>
    <link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet" />
    <script type="text/javascript" src="//use.typekit.net/eia3zwp.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
    <script src="<?php echo get_template_directory_uri(); ?>/prima.min.js"></script>
    <?php } ?>
    <div class="overlay"></div>
    <div class="notification"></div>
    <div class="loading"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/loading.gif" /></div>
  </body>
</html>