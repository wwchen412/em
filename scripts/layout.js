$(function() {
  $("#header").load("index.html #header nav");
  $("footer").load("index.html footer > ul");
  // $(".slider-footer").load(".slider-footer footer");
  $(window).bind("load", function()  {
   
    // 展開選單
    $("#menu").click(function() {
      event.preventDefault();
      $(this).find(".menu-line").toggleClass("active");
      $(".menu-list").toggleClass("active");
      $(".mainSlider").toggleClass("unscroll");
      $(".slider-footer").toggleClass("active");
      // 點開選單
      if ($(".menu-list").hasClass("active")) {
        $.fn.fullpage.destroy("all");
      } else if (!$(".menu-list").hasClass("active")) {
        // 關閉選單

        $("#fullpage").fullpage({
          anchors: ["firstPage", "secondPage", "3rdPage", "4thPage", "footer"],
          menu: "#dots",
          keyboardScrolling: true,
          animateAnchor: true,
          scrollOverflow: true,
          // responsiveWidth: 576,
          onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this);

            //after leaving section 2
            if (index == 4 && direction == "down") {
              $(".slider-footer").fadeOut();
              $("#dots").fadeOut();
            } else {
              $(".slider-footer").fadeIn();
              $("#dots").fadeIn();
            }
          },
          afterLoad: function(anchorLink, index) {
            BackgroundCheck.refresh();
          },
          afterRender: function() {
            BackgroundCheck.refresh();
          }
        });
        $(".sibling-menu-list").removeClass("active");
      }
    });
    // 次級選單
    $(".lists .sub").each(function() {
      // $(this).hover(function () {

      //     var hoverSrc = $(this).data('hoversrc');
      //     console.log(hoverSrc);
      //     $('.showImg img').attr('src', hoverSrc);
      // })

      $(this).on("click", function() {
        var list = $(".sibling-menu-list ul");
        var jsonLink = $(this).attr("href");
        event.preventDefault();
        list.html("");
        $(".sibling-menu-list").addClass("active");
        $(".slider-footer").removeClass("active");
        $(".back").click(function() {
          $(this)
            .parents(".sibling-menu-list")
            .removeClass("active");
          $(".slider-footer").add;
          Class("active");
        });
        // 讀取次選單商品列表
        $.ajax({
          type: "GET",
          url: jsonLink,
          success: function(data) {
            for (i = 0; i < data.length; i++) {
              list.append(
                '<li><img src="' +
                  data[i].itemSrc +
                  '" class="img-fluid" alt=""><p>' +
                  data[i].itemName +
                  "<span>" +
                  data[i].itemInfo +
                  '</span></p><ul class="dots"><li style="background:#000;" data-src="Content/img/shop.png"></li><li style="background:#eee;" data-src="Content/img/shop_1.png"></li></ul></li>'
              );
            }
            // 點擊li點 切換圖片attr
            $(".sibling-menu-list .dots li").each(function() {
              var img_link = $(this).data("src");

              $(this).click(function() {
                $(this)
                  .parent()
                  .siblings("img")
                  .attr("src", img_link);
              });
            });
          },
          error: function() {
            $(".sibling-menu-list").html("<p>目前沒有資料</p>");
          },
          dataType: "json"
        });
      });
    });
  });
});
