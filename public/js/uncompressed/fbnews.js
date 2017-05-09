$.ajax({
		type: 'GET',
		url: 'https://graph.facebook.com/ProsjektZ/posts?access_token=404791276543276|f0pFVTezBvxQjmdicdQsHmGjuRI',
		dataType: 'json',
		success: function(json) {
			var COUNT = 5;
			for (var i=0; i<=(COUNT-1); i++) {
				var obj = json.data[i];
        var msg = obj.message;
        var pic = obj.picture;
        var time = obj.created_time.replace(/[A-Z].*0/g,'').replace(/-/g,'/');
				$('#fb-list').append('<div class="card h-25"><div class="card-block"><p class=card-text>'+msg+'</p>'+time+'</div></div>');

			}
		},
		error: function() {
      //error func
		}
	}).done(function(){
      $('#fb-list').each(function () {
            $(this).html($(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank"></a> '));
      });
});
