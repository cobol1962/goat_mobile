(function($){
	$(function(){


    // Navbar

	}); // end of document ready
})(jQuery); // end of jQuery name space
function initializeGallery(hash) {

//		$(".count").remove();
	$(".button-collapse").sideNav();
	var categories = $('nav .categories-container');
	if (categories.length) {
		categories.pushpin({ top: categories.offset().top });
		var $links = categories.find('li');
  //  var $links = [];
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

			});
		});
		if (localStorage.user !== undefined) {
	    var u = $.parseJSON(localStorage.user);
	    checkNewsNumber(u.id);

	  } else {

	    checkNewsNumber();
	  }
	}
	var $galleryItems = $('.gallery .gallery-item');

	$('a.filter').click(function (e) {
		e.preventDefault();
	});
	setTimeout(function() {
		var rb = 1;

		$.each($galleryItems, function(i) {
			if ($(this).is(":visible")) {
				$(this).css({
					minHeight: 600,
					height: 600,
					maxHeight: 600
				})
				if ($(this).find(".gallery-name").find(".count").length == 0) {
					$(this).find(".gallery-name").append($('<span class="btn-floating btn-large waves-effect waves-light count">' +  rb + '</span>'));
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


	var onShow = function(el) {

	/*	$("[newstag]").css({
			zIndex: -1
		})*/

		var ww = setInterval(function() {
			if (!el.hasClass("active")) {
				clearInterval(ww);
				history.pushState({}, 'goat100','/');
				$('title').text('GOAT100 - Gratest Of All Time 100');
			}
		}, 100)
		var aname = $(el).attr("artname");

		el.find(".price")[0].outerHTML = $(cards[el.attr("cardid")]).find(".price")[0].outerHTML;
		el.find("h3").eq(0).html($(cards[el.attr("cardid")]).find("h3").eq(0).html());
		el.find(".description").eq(0).html($(cards[el.attr("cardid")]).find(".description").eq(0).html());

		el.find(".collapsible").eq(0).html($(cards[el.attr("cardid")]).find(".collapsible").eq(0).html());
		if (glrs[el.attr("cardid")] === undefined) {
				el.find(".carousel").eq(0).html($(cards[el.attr("cardid")]).find(".carousel").eq(0).html());
		}
		var cid = el.attr("cardid");
		if (localStorage.user !== undefined) {
			var usr = $.parseJSON(localStorage.user);
			$.ajax({
				url: "/ajax/insertUserVisit.php",
				type: "POST",
				dataType: "json",
				data: {
					cardid: parseInt(cid),
					userid: parseInt(usr.id)
				},
				success: function(res) {

				}
			})
		}
//		el.find("#video-gallery").eq(0).html("");
		el.find("#video-gallery").eq(0).html($(cards[el.attr("cardid")]).find("#video-gallery").eq(0).html());
		var $cel = $(cards[el.attr("cardid")]);
//		$(cards[el.attr("cardid")]).find("[spotify]").appendTo(el);
//		$(cards[el.attr("cardid")]).find("[apple]").appendTo(el);

setTimeout(function() {

	$.ajax({
		url: "/ajax/artistNews.php?cardid=" + cid,
		type: "GET",
		dataType: "JSON",
		success: function(res) {
			if (res.length > 0) {

				if (el.find("[news]").length == 0) {
			/*		<a class="bit-widget-initializer" data-artist-name="stormzy" data-display-local-dates="false" data-display-past-dates="false" data-auto-style="false" data-text-color="#000000"  data-background-color="rgba(0,0,0,0)" data-display-limit="15" data-display-start-time="false" data-link-text-color="#FFFFFF" data-display-lineup="false" data-display-play-my-city="true" data-separator-color="rgba(124,124,124,0.25)"></a>*/
					var $l = $('<li events><div class="collapsible-header"><i class="material-icons">event</i>News</div><div style="padding-top:10px;background-color:#263238;display:inline-block !important;" newsdiv class="collapsible-body section gray" style="display:inline-block !important;"></div></li>').appendTo(el.find(".collapsible"));
					$.each(res, function() {
						var html = "";
						html = "<div  class='col-lg-3 col-sm-2 col-xs-12' style='min-height:600px;height:600px;'>";
						html += "<div style='width:100%;text-align:center;'><img style='width:auto;max-width:100%;height:auto;max-height:350px;' src='" + unescape(this.image) + "' /></div>";
						html += "<h5 style='width:100%;color:wheat;'>" + unescape(this.title).replace(/\+/g, " ") + "</h5>";
						html += "<span style='width:100%;font-size:13px;color:wheat;'>" + unescape(this.date).replace(/\+/g, " ") + "</span><br />";
						html += "<span style='width:100%;font-size:13px;color:wheat;'>" + unescape(this.body).replace(/\+/g, " ") + "</span>";
						html += "<br /><br /><a target='_blank' href='" + unescape(this.url) + "' style='width:100%;font-size:15px;color:white;'>" + "Read complete article on source" + "</a>";
						html += "</div>";

						$(html).appendTo($l.find("[newsdiv]"));
					})
					$l.find("[newsdiv]").hide()
				}

			}
		}
	})
	var images = [];

	aImages = [];
			 		if (true) {
						$.each(el.find(".collapsible").find("li"), function() {
							var ths = this;
							if ($(this).html().indexOf("Spotify") > -1) {
								aname = aname.replace(/\s/g, '%20'); //HimynameisFlavio
								$.ajax({
									url: "https://api.spotify.com/v1/search?q=" + aname + "&type=artist&limit=1&access_token=" + localStorage.spotify_token,
									type: "GET",
									success: function(res) {
											spotifyid = res.artists.items[0].id;
											aImages = res.artists.items[0].images;

									  	$(ths).find(".collapsible-body").html("<iframe style='width:100%;height:auto;' src='https://open.spotify.com/embed?uri=" + res.artists.items[0].uri + "'></iframe>");

									}
								})
							}
							/*	if ($cel.html().indexOf("<iframe") == -1) {
									$(this).find(".collapsible-body").html("<iframe style='width:100%;height:auto;' src='" + $cel.attr("spotify") + "'></iframe>");
								} else {
									$($cel.attr("spotify")).appendTo($(this).find(".collapsible-body"));
								}
								el.find("[spotify]").remove();*/

						})
					}
					if ($cel.attr("apple") != "") {
						$.each(el.find(".collapsible").find("li"), function() {
							if ($(this).html().indexOf("Apple") > -1) {
								if ($cel.html().indexOf("<iframe") == -1) {
									$(this).find(".collapsible-body").html("<iframe style='width:100%;height:500px;' src='" + $cel.attr("apple") + "'></iframe>");
								} else {
									$($cel.attr("apple")).appendTo($(this).find(".collapsible-body"));
								}
								el.find("[spotify]").remove();
							}
						})
					}
		}, 500);
		setTimeout(function() {

				$("#lg-share").hide();

				var cid = el.attr("cardid");
				$("<div style='margin-top:10px;margin-left:-10px;' class='gallery-action1'></div>").appendTo(el);
				var $act = el.find(".gallery-action1");
				var stateObj = { foo: "bar" };
				var artName = el.attr("artName");
				$.each(el.find(".collapsible-header"), function() {

					if ($(this).find("i").text() == "comment") {
						$("#chatDiv").appendTo($(this).parent().find(".collapsible-body"));
						$("#chatDiv").show();
					}
				})

			  if (el.find("[facebook]").length != 1) {

  				var url = "https://goat100.com/share.php?id=" + cid + "&artsearch=" + el.attr("artsearch_m");
          var title = "GOAT00 - " + el.attr("artsearch_m");
          $('<button class="button" id="twitter_share_' + cid + '" style="display:none;" data-sharer="twitter" data-width="800" data-height="600" data-title=' + title + ' data-url=' + url + '>Share</button>').appendTo($act);
          $('<button id="linkedin_share_' + cid + '" class="button" style="display:none;" data-sharer="linkedin" data-width="800" data-height="600" data-title=' + title + ' data-url=' + url + '>Share</button>').appendTo($act);

          var am = $(this).closest(".gallery-item").attr("artsearch_m");

            $("<span facebook onclick=\"fireShare('facebook'," + cid + ",'" + am + "');\"; style='cursor:pointer;'><img style='width:40px;margin-left: 10px;' src='/images/facebook-share-icon.png' /></span>").appendTo($act);
            $("<span twitter onclick=\"fireShare('twitter'," + cid + ",'" + am + "');return false;\" style='cursor:pointer;'><img style='width:40px;margin-left: 10px;' src='/images/twitter-share-icon.png' /></span>").appendTo($act);
            $("<span linkedin onclick=\"fireShare('linkedin'," + cid + ",'" + am + "');return false;\" style='cursor:pointer;'><img style='width:40px;margin-left: 10px;' src='/images/linkedIn-share-icon.png' /></span>").appendTo($act);
    				var a1 = $("<a><img style='width:40px;margin-left: 10px;' src='/images/btn-like.png' /></a>").appendTo($act);
						a1.bind("click", function() {
							vote('Voted for', cid, artName, 1);
						})
						var a2 = $("<a><img style='width:40px;margin-left: 10px;' src='/images/btn-unlike.png' /></a>").appendTo($act);
						a2.bind("click", function() {
							vote('Unvote', cid, artName, -1);
						})

						$act.appendTo(el.find(".price"));

			  }
				  window.Sharer.init();
				/*	aImages = [];
					$.ajax({
						url: "https://api.spotify.com/v1/search?q=" + aname + "&type=artist&limit=1&access_token=" + localStorage.spotify_token,
						type: "GET",
						success: function(res) {
							aImages = res.artists.items[0].images;

						}
					})*/
					var ww = setInterval(function() {

						if (aImages.length > 0) {
							clearInterval(ww);

								$.each(el.find('.carousel').find("img"), function() {
									var url =  $(this).attr("src");

									urlExists(url,$(this).closest("a"), function(exists) {

									});
								});

						  	var $lg1 =	el.find('#video-gallery').lightGallery({
									loadYoutubeThumbnail: true,
									youtubeThumbSize: 'default',
									loadVimeoThumbnail: true,
									vimeoThumbSize: 'thumbnail_large',
						 		});

								$(".carousel.initialized").removeClass("initialized");
								$('.carousel:not(.carousel-slider)').carousel({
									dist: 0,
									padding: 10
								});
								$('.carousel.carousel-slider').carousel({
									fullWidth: true,
									indicators: true,
									onCycleTo: function(el) {
										$('.nav-background img').removeClass('active');
										$('.nav-background img').eq(el.index()).addClass('active');
									}
								});
								if (glrs[el.attr("cardid")] !== undefined) {
							//		glrs[el.attr("cardid")].("destroy");
									delete glrs[el.attr("cardid")];
								}
								setTimeout(function() {

									glrs[el.attr("cardid")] = el.find('.carousel').lightGallery({
										thumbnail: true,
									});
									glrs[el.attr("cardid")].on('onAfterOpen.lg',function(event) {

										$("#lg-share").hide();
									//	$("#chatDiv").hide();
								//		$("#lg-zoom-in").trigger("click");
									});
									glrs[el.attr("cardid")].on('onCloseAfter.lg',function(event){
									//	$("#chatDiv").show();
									});
									glrs[el.attr("cardid")].on('onAfterSlide.lg',function(event, index, fromTouch, fromThumb){
											$("#lg-zoom-in").trigger("click");
									});
								}, 500);

								$lg1.on('onAfterOpen.lg',function(event) {
									$("#lg-share").hide();
								//	$("#chatDiv").hide();
									$("#lg-zoom-in").trigger("click");
								});
								$lg1.on('onCloseAfter.lg',function(event){
									try{$lg1.data('lightGallery').destroy(true);}catch(ex){};
								//	$("#chatDiv").show();
								});
							}
					}, 200)

					var wii = setInterval(function() {
						try {

								$.ajax({
									url: "https://api.spotify.com/v1/artists/" + spotifyid + "/albums?access_token=" + localStorage.spotify_token,
									type: "GET",
									success: function(res) {


										if (res.items.length > 0) {
											var $l = $('<li events><div class="collapsible-header"><i class="material-icons">event</i>Discography</div><div style="min-width:100%;float:left;max-width:100%;" discography class="collapsible-body"></div></li>').appendTo(el.find(".collapsible"));
										}
										done = [];
										$.each(res.items, function() {
											var ths = this;
											if (ths.album_type == "album") {
												if (done.indexOf(ths.name) == -1) {
														var html = "<a target='_blank' style='color:bllack;' href='" + ths.external_urls.spotify + "'><div style='width:220px;float:left;min-height:350px;padding:10px;text-align:center;'>";
														html += "<img style='width:200px;height:auto;' src='" + ths.images[1].url + "' />";
														html += "<p style='font-size:15px;margin-top:10px;word-wrap: break-word;max-width:100%'>" + ths.name + "</p>";
														html += "<h6>" + ths.release_date + "</h6>";

														html += "</div></a>";
														$(html).appendTo(el.find("[discography]"));
														done.push(ths.name);

												}
											}
										})

										$.ajax({
											url: "https://api.spotify.com/v1/artists/" + spotifyid + "/top-tracks?country=GB&access_token=" + localStorage.spotify_token,
											type: "GET",
											success: function(res) {
												spotifyid = "";

												if (res.tracks.length > 0) {
													var $l = $('<li events><div class="collapsible-header"><i class="material-icons">event</i>Top Music</div><div style="min-width:100%;float:left;max-width:100%;" topmusic class="collapsible-body"></div></li>').appendTo(el.find(".collapsible"));
												}
												done1 = [];
												$.each(res.tracks, function() {
													var ths = this;
														if (done1.indexOf(ths.name) == -1) {
																var html = "<br /><a style='color:black;font-size:17px;margin-botton:4px;' target='_blank' style='color:black;' href='" + ths.external_urls.spotify + "'>" + ths.name + "&nbsp;-&nbsp;(" + ths.album.album_type + ") " + ths.album.name + " " + ths.album.release_date + "</a>";
																$(html).appendTo(el.find("[topmusic]"));
																done1.push(ths.name);
														}

												})
											}
										})


									}
								})
									clearInterval(wii);

							} catch(err) {
								console.log(err)
							}
					}, 500);
				if (el.find("[events]").length == 0) {
			/*		<a class="bit-widget-initializer" data-artist-name="stormzy" data-display-local-dates="false" data-display-past-dates="false" data-auto-style="false" data-text-color="#000000"  data-background-color="rgba(0,0,0,0)" data-display-limit="15" data-display-start-time="false" data-link-text-color="#FFFFFF" data-display-lineup="false" data-display-play-my-city="true" data-separator-color="rgba(124,124,124,0.25)"></a>*/
					var $l = $('<li events><div class="collapsible-header"><i class="material-icons">event</i>Events and Tickets</div><div class="collapsible-body"><p><a ticket class="bit-widget-initializer" data-link-color="#000000" data-artist-name="' + el.attr("artname") + '" data-display-limit="3" data-display-local-dates="false" data-display-past-dates="false" data-auto-style="false" data-text-color="#000000"></a></p></div></li>').appendTo(el.find(".collapsible"));
					  $('<script  charset="utf-8" src="https://widget.bandsintown.com/main.min.js"></script>').appendTo($("head"));
				}

			}, 100);
			setTimeout(function() {
					$.each(el.find(".collapsible-header"), function() {
						$(this).unbind("click");
						$(this).bind("click", function() {
							$(this).parent().find(".collapsible-body").toggle();
						})
					})

					$.each(el.find(".gallery-cover"), function() {
						$(this).attr("artsearch", $(this).closest(".gallery-item").attr("artsearch_m"));
						$(this).attr("cardid", $(this).closest(".gallery-item").attr("cardid"));
					});
				//	el.find(".gallery-cover").bind("click", function(e) {
						$("[clone]").remove();
						var u = $.parseJSON(localStorage.user);
						var ww = setInterval(function() {
							if ($(".back-btn").length > 0) {
								clearInterval(ww);
								$(".back-btn").attr("onclick", "$('[newstag]').css({zIndex: 2});history.pushState({}, 'goat100','/');$('title').text('GOAT100 - Gratest Of All Time 100');$('[linkedin]').remove();$('[share]').popover('hide');$('[share]').remove();$('[twitter]').remove();");
								$('title').text("GOAT100 - " + artName);
							}
						}, 100);
					
						$("#chatDiv").attr("cardid",cid);
						$("#message").val("");

						$.ajax({
							url: "/ajax/getConversation.php",
							type: "POST",
							dataType: "json",
							data: {cardid: cid },
							success: function(res) {
								var options = {
										year: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
										month: "2-digit",
										day: "numeric"
								};
								$.each(res.records, function() {
									var $dv = $("#chatMessageMaster").clone();
									$dv.attr("clone", "1");
									$dv.appendTo($(".chatMessages"));
									var usr = $.parseJSON(this.user);
									$dv.find("[avatar]").attr("src", usr.avatar);
									var dt = new Date(this.date);
									$dv.find("[sender]").html(usr.nick + "<br />" + dt.toLocaleDateString("en", options));
									$dv.find("[message]").html(atob(this.message));
									$dv.show();
								});
							//  $("#chatDiv").show();
								$(".chatMessages").scrollTop($(".chatMessages")[0].scrollHeight);
							}
						})
				//	});
			}, 1000);
	};
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

}
