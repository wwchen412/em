$(function() {
  $("#header").load("index.html #header nav");
  $("footer").load("index.html footer > ul");
  // $(".slider-footer").load(".slider-footer footer");
  
  $(window).bind("load", function() {
    // console.log('load');
    // 展開選單
    $("#menu").click(function() {
      event.preventDefault();
      $(this)
        .find(".menu-line")
        .toggleClass("active");
      $(".menu-list").toggleClass("active");
      $(".mainSlider").toggleClass("unscroll");
      $(".slider-footer").toggleClass("active");
      $(".menu-list.sibActive").removeClass("sibActive");
    
      
      // 點開選單
      if ($(".menu-list").hasClass("active")) {
        $.fn.fullpage.destroy("all");
      } else if (!$(".menu-list").hasClass("active")) {
        // 關閉選單
        initialization();
        // $("#fullpage").fullpage({
        //   anchors: ["firstPage", "secondPage", "3rdPage", "4thPage", "footer"],
        //   menu: "#dots",
        //   keyboardScrolling: true,
        //   animateAnchor: true,
        //   scrollOverflow: true,
        //   // responsiveWidth: 576,
        //   onLeave: function(index, nextIndex, direction) {
        //     var leavingSection = $(this);

        //     //after leaving section 2
        //     if (index == 4 && direction == "down") {
        //       $(".slider-footer").fadeOut();
        //       $("#dots").fadeOut();
        //     } else {
        //       $(".slider-footer").fadeIn();
        //       $("#dots").fadeIn();
        //     }
        //   },
        //   afterLoad: function(anchorLink, index) {
        //     BackgroundCheck.refresh();
        //   },
        //   afterRender: function() {
        //     BackgroundCheck.refresh();
        //   }
        // });
        $(".sibling-menu-list").removeClass("active");
      }
    });
    // 次級選單 hover
    $(".lists .sub").each(function() {
        var hoverSrc = $(this).data("hoversrc");
     
        $(this).hover(
          function() {
             if (hoverSrc !== $(".showImg img").attr("src")) {
            $(".showImg img")
              .stop(true, true)
              .addClass("showImgAni");
            setTimeout(() => {
              $(".showImg img").attr("src", hoverSrc);
            }, 200);}
          },
          function() {
            $(".showImg img").removeClass("showImgAni");
          }
        );
      

      // 讀取商品內容
      $(this).on("click", function() {
        var list = $(".sibling-menu-list ul");
        // json來源
        var jsonLink = $(this).attr("href");
        event.preventDefault();
        $(this)
          .parents(".menu-list")
          .addClass("sibActive");
        $(this)
          .addClass("sibActive")
          .parent()
          .siblings()
          .children()
          .removeClass("sibActive");
        list.html("");
        $(".sibling-menu-list").addClass("active");
        $(".slider-footer").removeClass("active");
        $(".back").click(function() {
          $(this)
            .parents(".sibling-menu-list")
            .removeClass("active");
          $(this)
            .parents()
            .find(".menu-list")
            .removeClass("sibActive");
          $(".slider-footer").addClass("active");
        });
        // 讀取次選單商品列表
        $.ajax({
          type: "GET",
          url: jsonLink,
          success: function(data) {
            for (i = 0; i < data.length; i++) {
              // 內容顏色及圖片
              var color = "";
              for (a = 0; a < data[i].imgSelect["color"].length; a++) {
                color +=
                  '<li style="background:' +
                  data[i].imgSelect["color"][a] +
                  '" data-src="' +
                  data[i].imgSelect["src"][a] +
                  '"></li>';
              }

              list.append(
                '<li><a href="product.html"><img src="' +
                  data[i].itemSrc +
                  '" class="img-fluid" alt=""></a><p>' +
                  data[i].itemName +
                  "<span>" +
                  data[i].itemInfo +
                  '</span></p><ul class="dots">' +
                  color +
                  "</ul></li>"
              );
            }
            // 點擊li點 切換圖片attr
            $(".sibling-menu-list .dots li").each(function() {
              var img_link = $(this).data("src");
            
              $(this).click(function() {
                  console.log(img_link);
                $(this)
                  .parent()
                  .siblings("a")
                  .children('img')
                  .attr("src", img_link);
              });
            });
          },
          error: function() {
            $(".sibling-menu-list").html("<p>商品建構中</p>");
          },
          dataType: "json"
        });
      });
    });
  });
});
