$(function(){
  var accessToken = '1392050276.e956760.e973be5c34734c53b001203a0359c54b';
  $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken+'&callback=?',function (insta) {
    $.each(insta.data,function (photos,src) {
      if ( photos === 8 ) { return false; }
      $('<a href="'+src.link+'" class="post">'+
        '<div class="image" style="background-image:url('+src.images.standard_resolution.url+');"><p>'+src.caption.text+'</div>'+
        '<ul>'+
        '<li><i class="fa fa-heart"></i> '+src.likes.count+'</li>'+
        '<li><i class="fa fa-comment"></i> '+src.comments.count+'</li>'+
        '</ul>'+
        '</a>').appendTo('#content');
    });
  });
});
