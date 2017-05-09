$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
})

$(window).scroll(function() {
  if ($(document).scrollTop() > 1400) {
    $('nav').addClass('text-purple');
  } else {
    $('nav').removeClass('text-purple');
  }
});
