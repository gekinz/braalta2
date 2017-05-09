/*A LOT OF CALLS FOR APIS


DO NOT PAY ATTENTION OR EDIT */

/*********************************************************************
*  #### Twitter Post Fetcher v16.0.3 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/

/* TWITTER.JS */

(function(root,factory){if(typeof define==='function'&&define.amd){define([],factory)}else if(typeof exports==='object'){module.exports=factory()}else{factory()}}(this,function(){var domNode='';var maxTweets=20;var parseLinks=!0;var queue=[];var inProgress=!1;var printTime=!0;var printUser=!0;var formatterFunction=null;var supportsClassName=!0;var showRts=!0;var customCallbackFunction=null;var showInteractionLinks=!0;var showImages=!1;var targetBlank=!0;var lang='en';var permalinks=!0;var dataOnly=!1;var script=null;function handleTweets(tweets){if(customCallbackFunction===null){var x=tweets.length;var n=0;var element=document.getElementById(domNode);var html='<ul>';while(n<x){html+='<li>'+tweets[n]+'</li>';n++}html+='</ul>';element.innerHTML=html}else{customCallbackFunction(tweets)}}function strip(data){return data.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,s){return s}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,'')}function targetLinksToNewWindow(el){var links=el.getElementsByTagName('a');for(var i=links.length-1;i>=0;i--){links[i].setAttribute('target','_blank')}}function getElementsByClassName(node,classname){var a=[];var regex=new RegExp('(^| )'+classname+'( |$)');var elems=node.getElementsByTagName('*');for(var i=0,j=elems.length;i<j;i++){if(regex.test(elems[i].className)){a.push(elems[i])}}return a}function extractImageUrl(image_data){if(image_data!==undefined&&image_data.innerHTML.indexOf('data-srcset')>=0){var data_src=image_data.innerHTML.match(/data-srcset="([A-z0-9%_\\.\-]+)/i)[0];return decodeURIComponent(data_src).split('"')[1]}}var twitterFetcher={fetch:function(config){if(config.maxTweets===undefined){config.maxTweets=20}if(config.enableLinks===undefined){config.enableLinks=!0}if(config.showUser===undefined){config.showUser=!0}if(config.showTime===undefined){config.showTime=!0}if(config.dateFunction===undefined){config.dateFunction='default'}if(config.showRetweet===undefined){config.showRetweet=!0}if(config.customCallback===undefined){config.customCallback=null}if(config.showInteraction===undefined){config.showInteraction=!0}if(config.showImages===undefined){config.showImages=!1}if(config.linksInNewWindow===undefined){config.linksInNewWindow=!0}if(config.showPermalinks===undefined){config.showPermalinks=!0}if(config.dataOnly===undefined){config.dataOnly=!1}if(inProgress){queue.push(config)}else{inProgress=!0;domNode=config.domId;maxTweets=config.maxTweets;parseLinks=config.enableLinks;printUser=config.showUser;printTime=config.showTime;showRts=config.showRetweet;formatterFunction=config.dateFunction;customCallbackFunction=config.customCallback;showInteractionLinks=config.showInteraction;showImages=config.showImages;targetBlank=config.linksInNewWindow;permalinks=config.showPermalinks;dataOnly=config.dataOnly;var head=document.getElementsByTagName('head')[0];if(script!==null){head.removeChild(script)}script=document.createElement('script');script.type='text/javascript';if(config.list!==undefined){script.src='https://syndication.twitter.com/timeline/list?'+'callback=twitterFetcher.callback&dnt=false&list_slug='+config.list.listSlug+'&screen_name='+config.list.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random()}else if(config.profile!==undefined){script.src='https://syndication.twitter.com/timeline/profile?'+'callback=twitterFetcher.callback&dnt=false'+'&screen_name='+config.profile.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random()}else if(config.likes!==undefined){script.src='https://syndication.twitter.com/timeline/likes?'+'callback=twitterFetcher.callback&dnt=false'+'&screen_name='+config.likes.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random()}else{script.src='https://cdn.syndication.twimg.com/widgets/timelines/'+config.id+'?&lang='+(config.lang||lang)+'&callback=twitterFetcher.callback&'+'suppress_response_codes=true&rnd='+Math.random()}head.appendChild(script)}},callback:function(data){if(data===undefined||data.body===undefined){inProgress=!1;if(queue.length>0){twitterFetcher.fetch(queue[0]);queue.splice(0,1)}return}data.body=data.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g,'');if(!showImages){data.body=data.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g,'')}if(!printUser){data.body=data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g,'')}var div=document.createElement('div');div.innerHTML=data.body;if(typeof(div.getElementsByClassName)==='undefined'){supportsClassName=!1}function swapDataSrc(element){var avatarImg=element.getElementsByTagName('img')[0];avatarImg.src=avatarImg.getAttribute('data-src-2x');return element}var tweets=[];var authors=[];var times=[];var images=[];var rts=[];var tids=[];var permalinksURL=[];var x=0;if(supportsClassName){var tmp=div.getElementsByClassName('timeline-Tweet');while(x<tmp.length){if(tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit').length>0){rts.push(!0)}else{rts.push(!1)}if(!rts[x]||rts[x]&&showRts){tweets.push(tmp[x].getElementsByClassName('timeline-Tweet-text')[0]);tids.push(tmp[x].getAttribute('data-tweet-id'));if(printUser){authors.push(swapDataSrc(tmp[x].getElementsByClassName('timeline-Tweet-author')[0]))}times.push(tmp[x].getElementsByClassName('dt-updated')[0]);permalinksURL.push(tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]);if(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]!==undefined){images.push(tmp[x].getElementsByClassName('timeline-Tweet-media')[0])}else{images.push(undefined)}}x++}}else{var tmp=getElementsByClassName(div,'timeline-Tweet');while(x<tmp.length){if(getElementsByClassName(tmp[x],'timeline-Tweet-retweetCredit').length>0){rts.push(!0)}else{rts.push(!1)}if(!rts[x]||rts[x]&&showRts){tweets.push(getElementsByClassName(tmp[x],'timeline-Tweet-text')[0]);tids.push(tmp[x].getAttribute('data-tweet-id'));if(printUser){authors.push(swapDataSrc(getElementsByClassName(tmp[x],'timeline-Tweet-author')[0]))}times.push(getElementsByClassName(tmp[x],'dt-updated')[0]);permalinksURL.push(getElementsByClassName(tmp[x],'timeline-Tweet-timestamp')[0]);if(getElementsByClassName(tmp[x],'timeline-Tweet-media')[0]!==undefined){images.push(getElementsByClassName(tmp[x],'timeline-Tweet-media')[0])}else{images.push(undefined)}}x++}}if(tweets.length>maxTweets){tweets.splice(maxTweets,(tweets.length-maxTweets));authors.splice(maxTweets,(authors.length-maxTweets));times.splice(maxTweets,(times.length-maxTweets));rts.splice(maxTweets,(rts.length-maxTweets));images.splice(maxTweets,(images.length-maxTweets));permalinksURL.splice(maxTweets,(permalinksURL.length-maxTweets))}var arrayTweets=[];var x=tweets.length;var n=0;if(dataOnly){while(n<x){arrayTweets.push({tweet:tweets[n].innerHTML,author:authors[n]?authors[n].innerHTML:'Unknown Author',time:times[n].textContent,timestamp:times[n].getAttribute('datetime').replace('+0000','Z').replace(/([\+\-])(\d\d)(\d\d)/,'$1$2:$3'),image:extractImageUrl(images[n]),rt:rts[n],tid:tids[n],permalinkURL:(permalinksURL[n]===undefined)?'':permalinksURL[n].href});n++}}else{while(n<x){if(typeof(formatterFunction)!=='string'){var datetimeText=times[n].getAttribute('datetime');var newDate=new Date(times[n].getAttribute('datetime').replace(/-/g,'/').replace('T',' ').split('+')[0]);var dateString=formatterFunction(newDate,datetimeText);times[n].setAttribute('aria-label',dateString);if(tweets[n].textContent){if(supportsClassName){times[n].textContent=dateString}else{var h=document.createElement('p');var t=document.createTextNode(dateString);h.appendChild(t);h.setAttribute('aria-label',dateString);times[n]=h}}else{times[n].textContent=dateString}}var op='';if(parseLinks){if(targetBlank){targetLinksToNewWindow(tweets[n]);if(printUser){targetLinksToNewWindow(authors[n])}}if(printUser){op+='<div class="user">'+strip(authors[n].innerHTML)+'</div>'}op+='<p class="tweet">'+strip(tweets[n].innerHTML)+'</p>';if(printTime){if(permalinks){op+='<p class="timePosted"><a href="'+permalinksURL[n]+'">'+times[n].getAttribute('aria-label')+' | Les Mer</a></p>'}else{op+='<p class="timePosted">'+times[n].getAttribute('aria-label')+'</p>'}}}else{if(tweets[n].textContent){if(printUser){op+='<p class="user">'+authors[n].textContent+'</p>'}op+='<p class="tweet">'+tweets[n].textContent+'</p>';if(printTime){op+='<p class="timePosted">'+times[n].textContent+'</p>'}}else{if(printUser){op+='<p class="user">'+authors[n].textContent+'</p>'}op+='<p class="tweet">'+tweets[n].textContent+'</p>';if(printTime){op+='<p class="timePosted">'+times[n].textContent+'</p>'}}}if(showInteractionLinks){op+='<div style="position:absolute;bottom:-1em;"><a href="https://twitter.com/intent/'+'tweet?in_reply_to='+tids[n]+'" class="btn btn-danger" style="padding:0.6rem 0.9rem !important;margin-left:0.1em; margin-right:0.1em;"'+(targetBlank?' target="_blank">':'>')+'<span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a><a href="https://twitter.com/intent/retweet?'+'tweet_id='+tids[n]+'" class="btn btn-danger" style="padding:0.6rem 0.9rem!important;margin-left:0.1em; margin-right:0.1em;"'+(targetBlank?' target="_blank">':'>')+'<span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span></a>'+'<a href="https://twitter.com/intent/favorite?tweet_id='+tids[n]+'" class="btn btn-danger" style="padding:0.6rem 0.9rem !important;margin-left:0.1em; margin-right:0.1em;"'+(targetBlank?' target="_blank">':'>')+'<span class="glyphicon glyphicon-heart" aria-hidden="true"></span></a></div>'}if(showImages&&images[n]!==undefined&&extractImageUrl(images[n])!==undefined){op+='<div class="media">'+'<img src="'+extractImageUrl(images[n])+'" alt="Image from tweet" />'+'</div>'}if(showImages){arrayTweets.push(op)}else if(!showImages&&tweets[n].textContent.length){arrayTweets.push(op)}n++}}handleTweets(arrayTweets);inProgress=!1;if(queue.length>0){twitterFetcher.fetch(queue[0]);queue.splice(0,1)}}};window.twitterFetcher=twitterFetcher;return twitterFetcher}))
var configProfile={"profile":{"screenName":'BRA_Alta'},"domId":'example1',"maxTweets":4,"enableLinks":true,"showUser":false,"showTime":true,"showImages":true,"customCallback":handleTweets,"lang":'no'};twitterFetcher.fetch(configProfile);var config2={"id":'347099293930377217',"domId":'example2',"maxTweets":5,"enableLinks":true,"showUser":true,"showTime":true,"lang":'en'};twitterFetcher.fetch(config2);var config3={"id":'502160051226681344',"domId":'example3',"maxTweets":5,"enableLinks":true,"showImages":true};twitterFetcher.fetch(config3);var config4={"id":'345690956013633536',"domId":'example4',"maxTweets":3,"enableLinks":true,"showUser":false,"showTime":true,"showRetweet":false};twitterFetcher.fetch(config4);var config5={"profile":{"screenName":'BRA_Alta'},"domId":'twitest',"maxTweets":4,"enableLinks":true,"showUser":true,"showTime":true,"dateFunction":'',"showRetweet":false,"customCallback":handleTweets,"showInteraction":true};function handleTweets(tweets){var x=tweets.length;var n=0;var element=document.getElementById('example1');var html='';while(n<x){html+='<div class="animated wow fadeInUp card" data-wow-delay="0.3s>'+tweets[n]+'</div>';n++;}html+='';element.innerHTML=html;}twitterFetcher.fetch(example1);


/* INSTAFEED.JS */
// Generated by CoffeeScript 1.9.3
(function(){var e;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?M=["","random"]:M=this.options.sortBy.split("-"),O=M[0]==="least"?!0:!1;switch(M[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",O);break;case"liked":e.data=this._sortBy(e.data,"likes.count",O);break;case"commented":e.data=this._sortBy(e.data,"comments.count",O);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){m=e.data,A=parseInt(this.options.limit,10),this.options.limit!=null&&m.length>A&&(m=m.slice(0,A)),u=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(m=this._filter(m,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){f="",d="",w="",D=document.createElement("div");for(c=0,N=m.length;c<N;c++){h=m[c],p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);E=p.width,y=p.height,b="square",E>y&&(b="landscape"),E<y&&(b="portrait"),v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),d=this._makeTemplate(this.options.template,{model:h,id:h.id,link:h.link,type:h.type,image:v,width:E,height:y,orientation:b,caption:this._getObjectProperty(h,"caption.text"),likes:h.likes.count,comments:h.comments.count,location:this._getObjectProperty(h,"location.name")}),f+=d}D.innerHTML=f,i=[],r=0,n=D.childNodes.length;while(r<n)i.push(D.childNodes[r]),r+=1;for(x=0,C=i.length;x<C;x++)L=i[x],u.appendChild(L)}else for(T=0,k=m.length;T<k;T++){h=m[T],g=document.createElement("img"),p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),g.src=v,this.options.links===!0?(t=document.createElement("a"),t.href=h.link,t.appendChild(g),u.appendChild(t)):u.appendChild(g)}_=this.options.target,typeof _=="string"&&(_=document.getElementById(_));if(_==null)throw o='No element with id="'+this.options.target+'" on page.',new Error(o);_.appendChild(u),a=document.getElementsByTagName("head")[0],a.removeChild(document.getElementById("instafeed-fetcher")),S="instafeedCache"+this.unique,window[S]=void 0;try{delete window[S]}catch(P){s=P}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))s=n.match(r)[1],o=(i=this._getObjectProperty(t,s))!=null?i:"",n=n.replace(r,function(){return""+o});return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],r=function(e){if(t(e))return n.push(e)};for(i=0,o=e.length;i<o;i++)s=e[i],r(s);return n},e}(),function(e,t){return typeof define=="function"&&define.amd?define([],t):typeof module=="object"&&module.exports?module.exports=t():e.Instafeed=t()}(this,function(){return e})}).call(this);

/*##########################################################
############################################################
############################################################
############################################################
############################################################
############################################################
#################ONLY EDIT BELOW############################
############################################################
############################################################
############################################################
############################################################
############################################################*/


/*ANIMATION WOW*/

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

/* INSTAGRAM */

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

/**
 * Author: Heather Corey
 * jQuery Simple Parallax Plugin
 *
 */

(function($) {

    $.fn.parallax = function(options) {

        var windowHeight = $(window).height();

        // Establish default settings
        var settings = $.extend({
            speed        : 0.15
        }, options);

        // Iterate over each object in collection
        return this.each( function() {

        	// Save a reference to the element
        	var $this = $(this);

        	// Set up Scroll Handler
        	$(document).scroll(function(){

    		        var scrollTop = $(window).scrollTop();
            	        var offset = $this.offset().top;
            	        var height = $this.outerHeight();

    		// Check if above or below viewport
			if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
				return;
			}

			var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

                 // Apply the Y Background Position to Set the Parallax Effect
    			$this.css('background-position', 'right ' + yBgPosition + 'px');

        	});
        });
    };
}(jQuery));


$('.bg-1,.bg-3').parallax({
	speed :	0.45
});

(function($) {

    $.fn.parallaxRight = function(options) {

        var windowHeight = $(window).height();

        // Establish default settings
        var settings = $.extend({
            speed        : 0.015
        }, options);

        // Iterate over each object in collection
        return this.each( function() {

        	// Save a reference to the element
        	var $this = $(this);

        	// Set up Scroll Handler
        	$(document).scroll(function(){

    		        var scrollTop = $(window).scrollTop();
            	        var offset = $this.offset().top;
            	        var height = $this.outerHeight();

    		// Check if above or below viewport
			if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
				return;
			}

			var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

                 // Apply the Y Background Position to Set the Parallax Effect
    			$this.css('background-position', 'right ' + yBgPosition + 'px');

        	});
        });
    };
}(jQuery));

$('.bg-2').parallaxRight({
	speed :	0.2
});


$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});

$(window).scroll(function() {
  if ($(document).scrollTop() > 1400) {
    $('nav').addClass('text-purple');
  } else {
    $('nav').removeClass('text-purple');
  }
});






/*GOOGLE SCRIPT*/




var google;

function init() {
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	// var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
	var myLatlng = new google.maps.LatLng(69.956862, 23.236113);
	// 39.399872
	// -8.224454

	var mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: 15,

		// The latitude and longitude to center the map (always required)
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.roadmap,

		// How you would like to style the map.
		scrollwheel: true,
		styles: [{
			"featureType": "administrative.land_parcel",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "landscape.man_made",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "poi",
			"elementType": "labels",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "road",
			"elementType": "labels",
			"stylers": [{
				"visibility": "simplified"
			}, {
				"lightness": 20
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [{
				"hue": "#f49935"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "labels",
			"stylers": [{
				"visibility": "simplified"
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [{
				"hue": "#fad959"
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "labels",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [{
				"visibility": "simplified"
			}]
		}, {
			"featureType": "road.local",
			"elementType": "labels",
			"stylers": [{
				"visibility": "simplified"
			}]
		}, {
			"featureType": "transit",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "water",
			"elementType": "all",
			"stylers": [{
				"hue": "#a1cdfc"
			}, {
				"saturation": 30
			}, {
				"lightness": 49
			}]
		}]
	};



	// Get the HTML DOM element that will contain your map
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('map');

	// Create the Google Map using out element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);

	var addresses = ['Coop Banen'];

	for (var x = 0; x < addresses.length; x++) {
		$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&sensor=false', null, function (data) {
			var p = data.results[0].geometry.location;
			var latlng = new google.maps.LatLng(p.lat, p.lng);
			new google.maps.Marker({
				position: latlng,
				map: map,
			});

		});
	}

}
google.maps.event.addDomListener(window, 'load', init);



$("#header__button").click(function() {
  $(this).toggleClass("hamburger--open");
});


$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
