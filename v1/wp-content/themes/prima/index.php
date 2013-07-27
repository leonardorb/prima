<?php get_header(); ?>

<div class="loading">
	<span class="loader"></span>
</div>
<div class="wrapper">
	<section class="main"></section>
	<aside class="sidebar">this is a test</aside>
</div>

<!-- templates -->
<?php include(TEMPLATEPATH . '/assets/javascripts/modules/posts/templates/post.php'); ?>
<?php include(TEMPLATEPATH . '/assets/javascripts/modules/posts/templates/posts.php'); ?>

<?php get_footer(); ?>