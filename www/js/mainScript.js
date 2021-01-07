var artistImages = {};
var videos = {};

window.onShow = function(el) {

//$("#chatDiv").html("");
/*  $("[newstag]").css({
    zIndex: -1
  })*/

  var ww = setInterval(function() {
    if (!el.hasClass("active")) {
      clearInterval(ww);

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
      url: "https://goat100.com/ajax/insertUserVisit.php",
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

  el.find("#video-gallery").eq(0).html(videos[el.attr("cardid")]);
  var $cel = $(cards[el.attr("cardid")]);
//		$(cards[el.attr("cardid")]).find("[spotify]").appendTo(el);
//		$(cards[el.attr("cardid")]).find("[apple]").appendTo(el);

setTimeout(function() {

$.ajax({
  url: "https://goat100.com/ajax/artistNews.php?cardid=" + cid,
  type: "GET",
  dataType: "JSON",
  success: function(res) {
    if (res.length > 0) {

      if (el.find("[news]").length == 0) {
    /*		<a class="bit-widget-initializer" data-artist-name="stormzy" data-display-local-dates="false" data-display-past-dates="false" data-auto-style="false" data-text-color="#000000"  data-background-color="rgba(0,0,0,0)" data-display-limit="15" data-display-start-time="false" data-link-text-color="#FFFFFF" data-display-lineup="false" data-display-play-my-city="true" data-separator-color="rgba(124,124,124,0.25)"></a>*/
        var $l = $('<li events><div class="collapsible-header"><i class="material-icons">event</i>News</div><div style="padding-top:10px;background-color:#263238;display:inline-block !important;" newsdiv class="collapsible-body section gray" style="display:inline-block !important;"></div></li>').appendTo(el.find(".collapsible"));
        $.each(res, function() {
          var html = "";
          html = "<div  class='col-lg-3 col-sm-2 col-xs-12'>";
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
        /*if ($cel.attr("apple") != "") {
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
        }*/
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
          $("#chatDiv").attr("cardid", el.attr("cardid"));
          $("#message").val("");
          $.ajax({
            url: "https://goat100.com/ajax/getConversation.php",
            type: "POST",
            dataType: "json",
            data: {cardid: $(this).closest(".gallery-item").attr("cardid")},
            success: function(res) {
              $(".chatMessages").html("");

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
        }
      })
      if (el.find("[facebook]").length != 1) {
        var url = "https://goat100.com/share.php?id=" + cid + "&artsearch=" + el.attr("artsearch_m");
        var title = "GOAT00 - " + el.attr("artsearch_m");
        $('<button class="button" id="twitter_share_' + cid + '" style="display:none;" data-sharer="twitter" data-width="800" data-height="600" data-title=' + title + ' data-url=' + url + '>Share</button>').appendTo($act);
        $('<button id="linkedin_share_' + cid + '" class="button" style="display:none;" data-sharer="linkedin" data-width="800" data-height="600" data-title=' + title + ' data-url=' + url + '>Share</button>').appendTo($act);

        var am = $(this).closest(".gallery-item").attr("artsearch_m");

          $("<span facebook onclick=\"fireShare('facebook'," + cid + ",'" + am + "');\"; style='cursor:pointer;'><img style='width:40px;margin-left: 10px;' src='https://goat100.com/images/facebook-share-icon.png' /></span>").appendTo($act);
          $("<span twitter onclick=\"fireShare('twitter'," + cid + ",'" + am + "');return false;\" style='cursor:pointer;'><img style='width:40px;margin-left: 10px;' src='https://goat100.com/images/twitter-share-icon.png' /></span>").appendTo($act);
          $("<span linkedin onclick=\"fireShare('linkedin'," + cid + ",'" + am + "');return false;\" style='cursor:pointer;'><img style='width:40px;margin-left: 10px;' src='https://goat100.com/images/linkedIn-share-icon.png' /></span>").appendTo($act);
          var a1 = $("<a><img style='width:40px;margin-left: 10px;' src='https://goat100.com/images/btn-like.png' /></a>").appendTo($act);
          a1.bind("click", function() {
            vote('Voted for', cid, artName, 1);
          })
          var a2 = $("<a><img style='width:40px;margin-left: 10px;' src='https://goat100.com/images/btn-unlike.png' /></a>").appendTo($act);
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
              var iis = artistImages[el.attr("cardid")].split(",");
              $.each(el.find('.carousel').find("img"), function(ind) {
                if (iis[ind] !== undefined) {
                  $(this).attr("src", iis[ind]);
                  var url =  iis[ind];
                  $(this).closest("a").attr("href", iis[ind]);
                } else {

                  $(this).remove();
                }
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
          if (spotifyid != "") {
            clearInterval(wii);
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
            }
        }, 100);
      if (el.find("[events]").length == 0) {
    /*		<a class="bit-widget-initializer" data-artist-name="stormzy" data-display-local-dates="false" data-display-past-dates="false" data-auto-style="false" data-text-color="#000000"  data-background-color="rgba(0,0,0,0)" data-display-limit="15" data-display-start-time="false" data-link-text-color="#FFFFFF" data-display-lineup="false" data-display-play-my-city="true" data-separator-color="rgba(124,124,124,0.25)"></a>*/
        var $l = $('<li events><div class="collapsible-header"><i class="material-icons">event</i>Events and Tickets</div><div class="collapsible-body"><p><a ticket class="bit-widget-initializer" data-link-color="#000000" data-artist-name="' + el.attr("artname") + '" data-display-limit="3" data-display-local-dates="false" data-display-past-dates="false" data-auto-style="false" data-text-color="#000000"></a></p></div></li>').appendTo(el.find(".collapsible"));
          $('<script  charset="utf-8" src="https://widget.bandsintown.com/main.min.js"></script>').appendTo($("head"));
      }

    }, 100);
    setTimeout(function() {

      $.each(el.find(".collapsible-header"), function() {
        console.log($(this).html())
        if ($(this).html().indexOf("Apple") > -1) {
          $(this).closest("li").remove();
        }
      });
      $.each(el.find(".collapsible-header"), function() {
        var ths = $(this);
        $(this).unbind("click");
        $(this).bind("click", function() {
          ths.closest("li").find(".collapsible-body").toggle();
        });
      })
    }, 2000);
};
var glrs = {};
var spotifyid = "";
setTimeout(function() {
  var config = {
    apiKey: "AIzaSyCDW6qVaRS0TwHtu87lSWS8e-7rrs9Xf4Q",
    authDomain: "goat100-aac5b.firebaseapp.com",
    databaseURL: "https://goat100-aac5b.firebaseio.com",
    projectId: "goat100-aac5b",
    storageBucket: "goat100-aac5b.appspot.com",
    messagingSenderId: "211978863857"
  };
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
//  messaging.usePublicVapidKey('BIoky-q98fgqT3uxG5MkPTyqTwLB6bGFS2wAFY0BiTNfnpvdyOuVERJm4SCAh4JQDe_dytEEJhYdeAxYYa9zGJE');
  messaging.requestPermission()
  .then(function() {
    console.log("Has permissions");
    return messaging.getToken();
  })
  .then(function(token) {

    $.ajax({
      url: "https://goat100.com:4444",
      type: "POST",
      data: JSON.stringify({ action: "registerToken", token : token}),
      success: function(res) {

      }
    })
  })
  .catch(function(err) {
    console.log(err);
  })
  messaging.onMessage(function(payload) {
    console.log("message " + payload);
  //  alert(payload.body)
  })
}, 5000);

$(document).ready(function(){

  //$('.modal').modal();
	if (localStorage["user"] !== undefined) {
		loginUser($.parseJSON(localStorage["user"]));
	}
  startAvatar();

});
function checkGGlogin(response) {
   $.ajax({
		url: "https://goat100.com/ajax/loginGG.php",
		type: "POST",
		data: { fbid: response[0].uid },
		dataType: "json",
		success: function(res) {

			if (res["id"] === undefined) {
				$.ajax({
					url:"https://goat100.com/ajax/getTranslation.php",
					type: "POST",
					data: { term: "Google account does not exist in GOAT100"},
					success:function(res) {
						swal({
							type: "error",
							title: "Error",
							showCancelButton: false,
							text: res
						});
					}
				});

			} else {
				updateDatabase(res);
			}
		}
	});
}
function checkFBlogin(providerData) {

   $.ajax({
		url: "https://goat100.com/ajax/loginFB.php",
		type: "POST",
		data: { fbid: providerData[0].uid },
		dataType: "json",
		success: function(res) {

			if (res["id"] === undefined) {
				swal({
					type: "error",
					title: "Error",
					showCancelButton: false,
					text: "Facebook account does not exists in goat100. Please register"
				});

			} else {
				loginUser(res);
			}
		}
	});
}

 $('#images_avatar').on('change', function() {

   		if (this.files[0].size > 10024152) {
   			swal({
   				type: "error",
   				title: "Error",
   				showCancelButton: false,
   				text: "Max allowed size is 1MB"
   			});

   			return false;
   		}

   		var reader = new FileReader();
   		reader.onload = function(e) {

   			$("#picture_container_avatar").hide();
   			$("#croppie_container_avatar").show();
   			$("#setHeader").hide();

   			$image_crop_avatar.croppie('bind', {
   				url: e.target.result
   			}).then(function() {
   				$("#saveAvatar").show();
   				$("#cancelAvatar").show();
   				$("#resetAvatar").hide();
   				$("#setAvatar").hide();
   			});
   		}
   		reader.readAsDataURL(this.files[0]);
   	});
function startAvatar() {

	$image_crop_avatar = $('#upload_avatar').croppie({
		enableExif: true,
		enableResize: false,

		viewport: {
			width: 70,
			height: 70,
			 type: 'circle',
		},
		boundary: {
			width: 200,
			height: 200
		}
	});
}
 function resetAvatar() {
	 var user = $.parseJSON(localStorage.user);
   	$.ajax({
   		url: "https://goat100.com/ajax/removeUserAvatar.php",
   		type: "POST",
   		data: {id: user.id},
   		success:function() {
   			$("[profile]").find("img").attr("src","");
			$("[profile]").find("img").hide();
			user.avatar = "";
			$("#picture_avatar").attr("src","");
			localStorage.user = JSON.stringify(user);
   		}
   	});
}
function cancelAvatar() {
   	$("#picture_header").attr("src", sessionStorage.avatar);

   	$("#picture_container_avatar").show();
   	$("#croppie_container_avatar").hide();
   	$("#saveAvatar").hide();
   	$("#cancelAvatar").hide();
   	$("#resetAvatar").show();
   	$("#setAvatar").show();
}
$('#saveAvatar').on('click', function(ev) {
   		 var user = $.parseJSON(localStorage.user);
		$image_crop_avatar.croppie('result', {
			type: 'canvas',
			size: 'original'
		}).then(function(response) {

			$("#picture_avatar").attr("src",response);
			img = response.replace("data:image/png;base64,", "");

			$.ajax({
				url: "https://goat100.com/ajax/saveUserAvatar.php",
				type: "POST",
				data: {header: img, id: user.id},
				success: function(res) {
					user.avatar = res;
					localStorage.user = JSON.stringify(user);
					$("#picture_avatar").attr("src",res);
					$("[profile]").find("img").attr("src",res);
					$("[profile]").find("img").show();
				}
			});
			$("#picture_container_avatar").show();
			$("#croppie_container_avatar").hide();

			$("#saveAvatar").hide();
			$("#cancelAvatar").hide();
			$("#resetAvatar").show();
			$("#setAvatar").show();

		});
});

function checkTWlogin(response) {
	console.log(response);
   $.ajax({
		url: "https://goat100.com/ajax/loginTW.php",
		type: "POST",
		data: { fbid: response[0].uid },
		dataType: "json",
		success: function(res) {

			if (res["id"] === undefined) {
				$.ajax({
					url:"https://goat100.com/ajax/getTranslation.php",
					type: "POST",
					data: { term: "Twitter account does not exist in InVastor"},
					success:function(res) {
						swal({
							type: "error",
							title: "Error",
							showCancelButton: false,
							text: res
						});
					}
				});

			} else {
				updateDatabase(res);
			}
		}
	});
}
function registerTW(providerData) {
	console.log(providerData[0]);
   $.ajax({
		url: "https://goat100.com/ajax/registerTW.php",
		type: "POST",
		data: { tw: JSON.stringify(providerData[0]) },
		dataType: "json",
		success: function(res) {

			$("#registerModalForm").modal("close");
			if (res.result.toString().indexOf("error") == -1) {
				swal({
					type: "success",
					title: "Success",
					text: "You can login now using your Twitter account"
				});
			} else {
				swal({
					type: "error",
					title: "error",
					text: res.result.split("#")[1]
				});
			}
		}
	});
}
function registerGG(providerData) {

   $.ajax({
		url: "https://goat100.com/ajax/registerGG.php",
		type: "POST",
		data: { gg: JSON.stringify(providerData[0]) },
		dataType: "json",
		success: function(res) {

			$("#registerModalForm").modal("close");
			if (res.result.toString().indexOf("error") == -1) {
				swal({
					type: "success",
					title: "Success",
					text: "You can login now using your Google account"
				});
			} else {
				swal({
					type: "error",
					title: "error",
					text: res.result.split("#")[1]
				});
			}
		}
	});
}
function registerFB(providerData) {
   $.ajax({
		url: "https://goat100.com/ajax/registerFB.php",
		type: "POST",
		data: { fb: JSON.stringify(providerData[0]) },
		dataType: "json",
		success: function(res) {
			$("#registerModalForm").modal("close");
			if (res.result.toString().indexOf("error") == -1) {
				swal({
					type: "success",
					title: "Success",
					text: "You can login now using your FB account"
				});
			} else {
				swal({
					type: "error",
					title: "error",
					text: res.result.split("#")[1]
				});
			}
		}
	});
}
function loginEmail() {
	var email = $("#email").val();

	var password = $("#password").val();
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
		var user = firebase.auth().currentUser;
		console.log(user);
		localStorage.currentUser = JSON.stringify(user);
		if(user && user.emailVerified === false){
			user.sendEmailVerification().then(function(){
				swal({
					type: "info",
					title: "Info",
					text: "Email is not confirmed. Please check your inbox and confirm mail address."
				});
			});
		} else {

			$.ajax({
				url: "https://goat100.com/ajax/registerEmail.php",
				type: "POST",
				data: { em: JSON.stringify(user.providerData[0]) },
				dataType: "json",
				success: function(res) {

					$("#loginModal").modal("close");
					loginUser(res);
				}
			});
		}
	}, function(error) {
    // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		swal({
			type: "error",
			title: "error",
			text: errorMessage
		});
	});
}
function registerEmail() {
	var email = $("#email_register").val();
	var password = $("#password_register").val();
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
		var user = firebase.auth().currentUser;
			$("#registerModalForm").modal("close");
		if(user && user.emailVerified === false){
			user.sendEmailVerification().then(function(){
				swal({
					type: "info",
					title: "Info",
					text: "Confirmatin email sent. Please confirm email address."
				});
			});
		} else {

			$.ajax({
				url: "https://goat100.com/ajax/registerEmail.php",
				type: "POST",
				data: { em: JSON.stringify(user.providerData[0]) },
				dataType: "json",
				success: function(res) {

					$("#registerModalForm").modal("close");
					if (res.result.indexOf("error") == -1) {
						swal({
							type: "success",
							title: "Success",
							text: "You can login now using email/password account"
						});
					} else {
						swal({
							type: "error",
							title: "error",
							text: res.result.split("#")[1]
						});
					}
				}
			});
		}
	}, function(error) {
    // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		swal({
			type: "error",
			title: "error",
			text: errorMessage
		});
	});
}
function loadNews() {
  if (localStorage.user !== undefined) {
    var u = $.parseJSON(localStorage.user);
    $.ajax({
      url: "https://goat100.com/ajax/insertUserVisit.php",
      type: "POST",
      dataType: "json",
      data: {
        userid: parseInt(u.id)
      },
      success: function(res) {

      }
    })
  }
  $.ajax({
   url: "https://goat100.com/ajax/getNews.php",
   type: "GET",
   dataType: "json",
   success: function(res) {
      $.each(res, function() {
        var html = "";
        html = "<div  class='col-lg-3 col-sm-2 col-xs-12' style='min-height:600px;height:600px;'>";
        html += "<div style='width:100%;text-align:center;'><img style='width:auto;max-width:100%;height:auto;max-height:350px;' src='" + unescape(this.image) + "' /></div>";
        html += "<h5 style='width:100%;color:wheat;'>" + unescape(this.title).replace(/\+/g, " ") + "</h5>";
        html += "<span style='width:100%;font-size:13px;color:wheat;'>" + unescape(this.date).replace(/\+/g, " ") + "</span><br />";
        html += "<span style='width:100%;font-size:13px;color:wheat;'>" + unescape(this.body).replace(/\+/g, " ") + "</span>";
        html += "<br /><br /><a target='_blank' href='" + unescape(this.url) + "' style='width:100%;font-size:15px;color:white;'>" + "Read complete article on source" + "</a>";
        html += "</div>";

        $(html).appendTo($("#newsDiv"));
      })
      $("#portfolio").hide();
      $("#newsDiv").show();
      $('html, body').animate({
        scrollTop: $("#newsDiv").offset().top - 100
      }, 2000);
      $(".categories-wrapper").hide();
      $("#news").hide();
      $("#gallery").show();
    }
  })
}
function loadGallery() {
  if (localStorage.user !== undefined) {
    var u = $.parseJSON(localStorage.user);
    checkNewsNumber(u.id);
  }
  $("#portfolio").show();
  $("#newsDiv").hide();
  $("#news").show();
  $("#gallery").hide();
  $(".categories-wrapper").show();
}
function loginUser(res) {

  $("[login]").hide();
  $("[register]").hide();
  $("[logout]").show();
  $("[profile]").show();
	$("#loginModal").modal("close");
	localStorage["user"] = JSON.stringify(res);
  var u = $.parseJSON(localStorage.user);
  ws = new ReconnectingWebSocket();
  localStorage.customer_id = res.id;
	$("[profile]").find("span").html(res.nick);
	$("#inputNick").val(res.nick);
	$("#FirstLastName").val(res.FirstlastName);
	$("#picture_avatar").attr("src",res.avatar);
	if (res.avatar != "") {
		$("[profile]").find("img").show();
		$("[profile]").find("img").attr("src",res.avatar);
	} else {
		$("[profile]").find("img").hide();
	}
	if (res.emailID != "") {
		$("[email]").show();
	} else {
		$("[email]").hide();
	}
	$("[profile]").show();
}
function checkFBlogin(providerData) {

   $.ajax({
		url: "https://goat100.com/ajax/loginFB.php",
		type: "POST",
		data: { fbid: providerData[0].uid },
		dataType: "json",
		success: function(res) {
			$("#loginModal").modal("close");
			if (res["id"] === undefined) {

				swal({
					type: "error",
					title: "Error",
					showCancelButton: false,
					text: "Facebook account does not exist in goat100. Please register."
				});

			} else {
				loginUser(res);
			}
		}
	});
}
function checkTWlogin(providerData) {
   $.ajax({
		url: "https://goat100.com/ajax/loginTW.php",
		type: "POST",
		data: { twid: providerData[0].uid },
		dataType: "json",
		success: function(res) {
    	$("#loginModal").modal("close");
			if (res["id"] === undefined) {

				swal({
					type: "error",
					title: "Error",
					showCancelButton: false,
					text: "Twitter account does not exist in goat100. Please register."
				});

			} else {
    		loginUser(res);
			}
		}
	});
}
function checkGGlogin(providerData) {
	$("#loginModal").modal("close");
   $.ajax({
		url: "https://goat100.com/ajax/loginGG.php",
		type: "POST",
		data: { ggid: providerData[0].uid },
		dataType: "json",
		success: function(res) {

			if (res["id"] === undefined) {

				swal({
					type: "error",
					title: "Error",
					showCancelButton: false,
					text: "Google account does not exist in goat100. Please register."
				});

			} else {
				loginUser(res);
			}
		}
	});
}
function saveProfile() {
	 var user = $.parseJSON(localStorage.user);
	 var currentUser = firebase.auth().currentUser;
	 var upd = {};
	 upd.id = user.id;
	 upd.nick = $("#inputNick").val();

	if (user.emailID != "") {

		if ($("#inputFullName").val().toString().trim() != "") {
			upd.FirstLastName = $("#inputFullName").val();
		}
		if ($("#inputPassword").val().toString().trim() != "") {
			currentUser.updatePassword($("#inputPassword").val().toString().trim()).then(function() {
				swal({
					type: "success",
					title: "Success",
					text: "Profile succesfully changed"
				});
 			}, function(error) {
				swal({
					type: "error",
					title: "Error",
					text: "Login again to change your password."
				});
			});
		}
	}
	$.ajax({
		url: "https://goat100.com/ajax/updateUserProfile.php",
		data: upd,
		type: "POST",
		success:function(res) {
			$("[profile]").find("span").html($("#inputNick").val());
			$("#profileForm").modal("close");
			$("#inputNick").val($("#inputNick").val());
			user.nick = $("#inputNick").val();
			user.FirstLastName =  $("#inputFullName").val();
			localStorage.user = JSON.stringify(user);
		}
	});
}
function resetPassword() {
	var auth = firebase.auth();
	var emailAddress = $("#email").val().toString().trim();

	auth.sendPasswordResetEmail(emailAddress).then(function() {
	  swal({
			type: "success",
			title: "Success",
			text: "Email sent. Please follow link from mail to change your password"
	  });
	}).catch(function(error) {
		  swal({
			type: "error",
			title: "Error",
			text: error.message
		  });
	});
}
function vote(what, cardid, artName, addVote) {

  if (localStorage.user === undefined) {
    askRegister();

  }
  var user = $.parseJSON(localStorage["user"]);

  $.ajax({
   url: "https://goat100.com/ajax/checkLastVote.php",
   type: "POST",
   data: {
     artistid: cardid,
     userid: user.id
   },
   success: function(res) {
     if (res == "999999999") {
       goVote(what, cardid, artName, addVote, user.id);
     } else  {

       var next = (parseInt(res) + 86400) * 1000;
       if ((new Date().getTime()) > next) {
         goVote(what, cardid, artName, addVote, user.id);
       } else {

         swal({
           type: "error",
           text: "Next like / unlike for " + artName + " is possible " + (new Date(next))
         });
       }
     }
   },
    error: function (request, status, error) {
        alert(request.responseText);
    }
 });
}
function goVote(what, cardid, artName, addVote, userid) {
  swal({
    type: "question",
    text: ((addVote == "1") ? "Like " : "Unlike ") + artName + "?",
    showCancelButton: true
  }).then((result) => {
    if (result.value) {
        $.ajax({
          url: "https://goat100.com/ajax/addVote.php",
          type: "POST",
          data: {
            userid: userid,
            artistid: cardid,
            vote: addVote,
            time_vote: parseInt(((new Date()).getTime()) / 1000)
          },
          success: function(res) {
            $.ajax({
              url: "https://goat100.com/ajax/updateCardVotes.php",
              type: "POST",
              data: {
                vote: addVote,
                cardid: cardid
              },
              success: function() {
                swal({
                  type: "success",
                  title: "Thank you",
                  html: "<h5>You succesfully <b>" + what + "</b> " + artName + "</h5>"
                })

              }
            });
          }
        })
      }
    });
}
function askRegister() {
  swal({
    type: "error",
    text: "You are not logged in",
    showCancelButton: true,
    cancelButtonText: "Login",
    confirmButtonText: "Register",
    allowOutsideClick: false,
    allowEsckey: false
  }).then((result) => {
    if (result.value) {
      $("#register").trigger("click");
    } else {
      $("#login").trigger("click");
    }
  })

}
function sendChatMessage() {
  var u = $.parseJSON(localStorage.user);
  var obj = {
    cardid: $("#chatDiv").attr("cardid"),
    userid: u.id,
    user: localStorage.user,
    message: btoa($("#message").val().replace(/\r?\n/g, '<br />')),
    messageid: (new Date()).getTime(0)
  };

  $.ajax({
    url: "https://goat100.com/ajax/sendMessage.php",
    type: "POST",
    dataType: "json",
    data: obj,
    success: function(res) {
      if (res.status == "ok") {
        obj.action = "message";
        ws.send(JSON.stringify(obj));
      }

    }
  })

}
function showSearch() {

  var ht = $($("#searchModal").html());
  ht.find("#card_search").attr("sweetalert", "1");
  initialzeSearch();
  swal({
    title: "Request Artist",
    html: ht[0].outerHTML
  })

}
