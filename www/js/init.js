(function($){
	$(function(){

    // Navbar

	}); // end of document ready
})(jQuery); // end of jQuery name space
function initializeGallery(hash) {
		$(".count").remove();
	$(".button-collapse").sideNav();
	var categories = $('nav .categories-container');
	if (categories.length) {
		categories.pushpin({ top: categories.offset().top });
		var $links = categories.find('li');
		$links.each(function() {
			var $link = $(this);
			$link.on('click', function() {
				$links.removeClass('active');
				$link.addClass('active');
				var $galleryItems = $('.gallery .gallery-item');

				$galleryItems.stop().addClass('gallery-filter').fadeIn(100);

				if (hash !== 'all') {
					var $galleryFilteredOut = $galleryItems.not('.' + hash).not('.all');
					$galleryFilteredOut.removeClass('gallery-filter').hide();
				}

				// transition layout

			});
		});
	  $(document).unbind("scroll");
		$(document).bind("scroll", function() {
			scrolling();
		});

		if (localStorage.user !== undefined) {
			var u = $.parseJSON(localStorage.user);
			ws = new ReconnectingWebSocket();
			$("[login]").hide();
			$("[logout]").show();
			$("[register]").hide();
			$("[profile]").show();
			checkNewsNumber(u.id);

		} else {
			$("[login]").show();
			$("[logout]").hide();
			$("[register]").show();
			$("[profile]").hide();
			checkNewsNumber();
		}
	}


	$('a.filter').click(function (e) {
		e.preventDefault();
	});
	setTimeout(function() {
		var rb = 1;
			var $galleryItems = $('.gallery .gallery-item');
		$.each($galleryItems, function(i) {
			if ($(this).is(":visible")) {
				if ($(this).find(".gallery-name").find(".count").length == 0) {
					$(this).find(".gallery-name").append($('<span class="btn-floating btn-large waves-effect waves-light count">' + rb + '</span>'));
				}
				$(this).find(".gallery-name").find(".count").html(rb);
				$(this).attr("order", rb);
				rb++;
			}
		})
	}, 2000);


	// Contact Form Icon
	$("form .form-control").focus(function() {
		$(this).siblings("label").first().children("i").first().css({"color": "#aaa", "left": 0});
	});
	$("form .form-control").blur(function() {
		$(this).siblings("label").first().children("i").first().css({"color": "transparent", "left": "-20px"});
	});



	$('.gallery-expand').galleryExpand({
		onShow: onShow,
		onHide: function() {
			alert("hideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
			window.location.hash = "";
		//	$("#chatDiv").hide();
		}
	});

	$('.blog .gallery-expand').galleryExpand({
		onShow: onShow,
		fillScreen: true,
		inDuration: 500,
	});
	setTimeout(function() {

		var $masonry = $('.gallery');
		$masonry.masonry({
			// set itemSelector so .grid-sizer is not used in layout
			itemSelector: '.gallery-filter',
			// use element for option
			columnWidth: '.gallery-filter',
			// no transitions
			transitionDuration: 0
		});
		// layout Masonry after each image loads
		$masonry.imagesLoaded(function() {
			$masonry.masonry('layout');

		});
	}, 2000)
}
function scrolling() {
  if (filtering) {
    return false;
  }
  if($(window).scrollTop() + $(window).height() == $(document).height()) {
      $(document).unbind("scroll");
     var info = aTable.page.info();
     if (info.page < (info.pages -1)) {
       aTable.page('next').draw('page');
     }
  }
}
