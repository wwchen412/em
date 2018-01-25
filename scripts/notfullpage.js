$(window).scroll(function() {
  // var footerTop = $('footer').offset().top;
  var footerHeight = $("footer").height();
  var scrollHeight = $(window).scrollTop();
  var bodyH = $("body").height() / 2;
//   console.log(bodyH);
//   console.log(footerHeight);
//   console.log(scrollHeight);
  var a = (bodyH - footerHeight) / 2;
//   console.log(a);
  if (scrollHeight >= a) {
    $(".slider-footer").fadeOut();
    $("#dots").fadeOut();
  } else {
    $(".slider-footer").fadeIn();
    $("#dots").fadeIn();
  }
});
