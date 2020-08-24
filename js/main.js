$(document).ready(function () {

  //sticky header
  $(window).scroll(function (e) {
    var height = $(this).scrollTop();
    if (height > 150) {
      $('.shopping__cart--scroll').addClass("cart--sticky");
    } else {
      $('.shopping__cart--scroll').removeClass("cart--sticky");
    }
  });

  $('.js-addToCart').click(function (e) {
    e.preventDefault();
    let parent = $(this).closest('.product__item');
    let productName = parent.find('.product__name').text();
    showNotifycation(productName);
  });

  const notifycation = {
    body: $('.js-noti'),
    message: $('.js-Notifycation__content'),
    isNeedToClose: true
  }
  let myTimeOut;

  function showNotifycation(productName) {
    if (notifycation.body.hasClass('is--active')) {
      clearTimeout(myTimeOut);
      closeNotifycation(true, productName);
      return;
    }
    notifycation.message.text('Bạn đã thêm sản phẩm ' + productName + ' Thành công');
    notifycation.body.addClass('is--active');
    myTimeOut = setTimeout(() => {
      closeNotifycation();
    }, 1000);
  }

  function closeNotifycation(isReopen = false, newProductName = "") {
    notifycation.body.removeClass('is--active');
    if (isReopen) {
      setTimeout(() => {
        showNotifycation(newProductName);
      }, 500);
    }
  }


  // navbar-link mobile
  $('.js-navbar').click(function (e) {
    $(this).toggleClass('is--active');
    $(this).parent().find('.navbar__mobile-list').slideToggle(300, "linear");
    $(this).toggleClass('icon-rotate');
  });

  // light box
  $('.slick__large-img .slick__large-img-item').children('img').click(function () {
    var lb_image = $(this).attr('src');
    $('html').addClass('overflow');
    $('body').append('<div class="light-box-page"><div class="light-box-img"><img src="' + lb_image + '"></div></div>');
    $('body').on('click', '.light-box-page', function () {
      $('html').removeClass('overflow');
      $('.light-box-page').remove();
    });
  });

  // scroll Top
  var scrollTop = $(".back-to-top");

  $(window).scroll(function () {

    var topPos = $(this).scrollTop();
    if (topPos > 100) {
      $(scrollTop).css("opacity", "1");
      $(scrollTop).css("visibility", "visible");

    } else {
      $(scrollTop).css("opacity", "0");
      $(scrollTop).css("visibility", "hidden");
    }
  });

  $(scrollTop).click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  // tăng giảm số lượng
  // if ($('.cart-plus-minus-box').val() == 1) {
  //   $('.dec').addClass('disable-el');
  // }
  $('.cart-plus-minus-box').on('change', function () {
    if ($(this).val() == "" || $(this).val() == 0 || $(this).val() < 0) {
      $(this).val('' + 1 + '');
    } else if ($(this).val() > 1) {
      $('.dec').removeClass('disable-el');
    }
  });
  $(".qtybutton").click(function (e) {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    console.log(oldValue);
    if ($button.text() == "+") {
      var newVal = parseInt(oldValue) + 1;
    }
    else {
      if (oldValue > 0) {
        var newVal = parseInt(oldValue) - 1;
      }
      else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
    $button.parent().find("input").trigger("change");
  });

});