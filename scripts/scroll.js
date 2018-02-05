$(window).scroll(function() {
  var windowW = $(window).width();
  if (windowW > 768) {
    $(".slider-footer").fadeOut();
  }
});
