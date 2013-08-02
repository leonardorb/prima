<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
  	<meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width initial-scale=1" />
    <title></title>
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <?php wp_head(); ?>
    <?php if (WP_ENV == 'development') { ?>
    <link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet" />
    <link href="<?php echo get_template_directory_uri(); ?>/assets/stylesheets/jquery.vegas.css" rel="stylesheet" />
    <link href="<?php echo get_template_directory_uri(); ?>/assets/stylesheets/jquery.snippet.css" rel="stylesheet" />
    <?php } else { ?>
    <link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet" />
    <?php } ?>
  </head>
  <body>
    <header></header>