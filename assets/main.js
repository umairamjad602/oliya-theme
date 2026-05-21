(function ($) {
  "use strict";
  jQuery(document).ready(function() {
    // menu toggler js
    $("button.navbar-toggle").on('click', function() {
      $(".main-menu-area").addClass("active");
      $(".mm-fullscreen-bg").addClass("active");
      $("body").addClass("ov-hidden");
    });
    $(".close-box").on('click', function() {
      $(".main-menu-area").removeClass("active");
      $(".mm-fullscreen-bg").removeClass("active");
      $("body").removeClass("ov-hidden");
    });
    // filter button js
    $("button.filter-button").on('click', function() {
      $(".filter-sidebar").addClass("active");
      $(".mm-fullscreen-bg").addClass("active");
    });
    $("button.close-filter-sidebar").on('click', function() {
      $(".filter-sidebar").removeClass("active");
      $(".mm-fullscreen-bg").removeClass("active");
    });
    // body background color js
    $(".mm-fullscreen-bg").on('click',function() {
      $(".main-menu-area").removeClass("active");
      $(".filter-sidebar").removeClass("active");
      $(".mm-fullscreen-bg").removeClass("active");
      $("body").removeClass("hidden");
    });
    $('.checkout-btn .read-agree').on('click', function () {
      if($('.cust-checkbox').is(':checked')) {
        $('.checkout-btn button.check-btn').removeAttr('disabled');
      }
      else {
        $('.checkout-btn button.check-btn').attr('disabled', 'disabled');
      }
    });
    $('.read-agree').on('click', function () {
      if($('.create-checkbox').is(':checked')) {
        $('.create').removeAttr('disabled');
      }
      else {
        $('.create').attr('disabled', 'disabled');
      }
    });
    $('.full-view, .zoom').on('click', function() {
      $('.product_img_top').magnificPopup({
        delegate: 'a',
        type:'image',
        showCloseBtn: true,
        closeBtnInside: false,
        midClick: true,
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1]
        }
      }).magnificPopup('open');
    });
    $('.play-button, .popup-vimeo, .popup-gmaps').magnificPopup({
      tClose: 'Close (Esc)',
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
    function cardSwapImage($card, newSrc) {
      var $img = $card.find('.product-image .img1 img');
      $img.off('load.swap error.swap');
      $img.css('opacity', 0);
      $img.one('load.swap error.swap', function() {
        $(this).css('opacity', 1);
      });
      $img[0].src = newSrc;
      $img[0].srcset = newSrc;
      // If image was already cached the load event fired synchronously before .one()
      if ($img[0].complete) {
        $img.off('load.swap error.swap');
        $img.css('opacity', 1);
      }
    }

    $(document).on('click', '.item-data', function(e) {
      e.stopPropagation();
      $(this).closest('.card-inline-swatches, .option-block').find('.variant-option').removeClass('active-variant');
      $(this).closest('form-wrap').addClass('active-variant');
      var it_img = $(this).attr('dataimg');
      var $card = $(this).closest('.single-product-wrap');
      if (it_img) {
        cardSwapImage($card, it_img);
        $card.find('.pro-img').data('slideIndex', 0);
      }
      var price = $(this).attr('dataprice');
      var compareprice = $(this).attr('datacompare');
      $card.find('.price-box .new-price').text(Shopify.formatMoney(price, window.money_format));
      if (compareprice > price) {
        $card.find('.price-box .old-price').show().html(Shopify.formatMoney(compareprice, window.money_format));
      } else {
        $card.find('.price-box .old-price').hide();
      }
    });

    $(document).on('click', '.card-img-arrow', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $card = $(this).closest('.single-product-wrap');
      var $proImg = $card.find('.pro-img');
      var urlStr = $proImg.attr('data-media-urls');
      if (!urlStr) return;
      var urls = urlStr.split('||');
      var total = urls.length;
      var current = parseInt($proImg.data('slideIndex') || 0, 10);
      current = $(this).hasClass('card-img-next')
        ? (current + 1) % total
        : (current - 1 + total) % total;
      $proImg.data('slideIndex', current);
      cardSwapImage($card, urls[current]);
    });
    var swiper = new Swiper('.drawer-slider', {
      slidesPerView: 1,
      grid: {
        rows: 1,
        fill: 'row' | 'column',
      },
      spaceBetween: 30,
      navigation: {
        nextEl: '.arrow-next-drawer',
        prevEl: '.arrow-prev-drawer',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      speed: 1000,
    });
  });
})(jQuery);