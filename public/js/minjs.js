wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: true, // default
    live: true // default
  });
wow.init();

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});

$( ".wow" ).each(function() {
       if ($(this).attr('data-wow-center-offset')) {
           offset = windowHeight / 100 * $(this).attr('data-wow-center-offset');
       }
       else {
           offset = windowHeight * 0.25;
       }
       offset = offset + $(this).height() / 2;
     $(this).attr( "data-wow-offset", parseInt(offset) );
   });
