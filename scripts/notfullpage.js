$(window).scroll(function() {
  var windowHeight = $(window).height();
  var footerHeight = $("footer").height();
  var scrollHeight = $(window).scrollTop();
  var bodyH = $("body").height();
//   console.log(bodyH);
//   console.log(footerHeight);
  // console.log(scrollHeight);
  var a = bodyH - footerHeight - windowHeight;
  // console.log(a);
  if (scrollHeight >= a) {
    $(".slider-footer").fadeOut();
    $("#dots").fadeOut();
  } else {
    $(".slider-footer").fadeIn();
    $("#dots").fadeIn();
  }
});
