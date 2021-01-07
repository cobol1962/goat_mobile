/*! lg-share - v1.0.2 - 2016-11-26
* http://sachinchoolur.github.io/lightGallery
* Copyright (c) 2016 Sachin N; Licensed GPLv3 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(['jquery'], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(this, function ($) {

(function() {

    'use strict';

    var defaults = {
        share: true,
        facebook: true,
        facebookDropdownText: 'Facebook',
        twitter: true,
        twitterDropdownText: 'Twitter',
        googlePlus: true,
		linkedinDropdownText: 'Linkedin',
        linkedin: true,
        googlePlusDropdownText: 'GooglePlus',
        pinterest: true,
        pinterestDropdownText: 'Pinterest'
    };

    var Share = function(element) {

        this.core = $(element).data('lightGallery');

        this.core.s = $.extend({}, defaults, this.core.s);
        if (this.core.s.share) {
            this.init();
        }

        return this;
    };

    Share.prototype.init = function() {
        var _this = this;
        var shareHtml = '<span id="lg-share" class="lg-icon">' +
            '<ul class="lg-dropdown" style="position: absolute;">';
        shareHtml += _this.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank" class="btn-social btn-sm btn-facebook"><i style="margin-top:5px;" class="fa fa-facebook"></i></a></li>' : '';
        shareHtml += _this.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank" class="btn-social btn-sm btn-twitter"><i style="margin-top:5px;margin-left:-3px;" class="fa fa-twitter"></i></a></li>' : '';
		 shareHtml +=  '<li><a id="lg-share-linkedin" style="cursor:pointer;padding-top:10px;padding-bottom:10px;"  target="_blank" class="btn-social btn-sm btn-linkedin"><i style="margin-top:-5px;"  class="fa fa-linkedin"></i></a></li>';
        shareHtml += _this.core.s.googlePlus ? '<li><li><a id="lg-share-googleplus" target="_blank" class="btn-social btn-sm btn-google-plus"><i style="margin-top:5px;"  class="fa fa-google-plus"></i></a></li>' : '';
       // shareHtml += _this.core.s.pinterest ? '<li><li><a id="lg-share-pinterest" target="_blank" class="btn-social btn-sm btn-pinterest"><i style="margin-top:5px;"  class="fa fa-pinterest"></i></a></li>' : '';
        shareHtml += '</ul></span>';

        this.core.$outer.find('.lg-toolbar').append(shareHtml);
        this.core.$outer.find('.lg').append('<div id="lg-dropdown-overlay"></div>');
        $('#lg-share').on('click.lg', function(){
            _this.core.$outer.toggleClass('lg-dropdown-active');
        });

        $('#lg-dropdown-overlay').on('click.lg', function(){
            _this.core.$outer.removeClass('lg-dropdown-active');
        });

        _this.core.$el.on('onAfterSlide.lg.tm', function(event, prevIndex, index) {
			
            setTimeout(function() { 
					
                $('#lg-share-facebook').attr('onclick', "openShareLink('https://www.facebook.com/sharer/sharer.php?u=" + ((_this.core.$items.eq(index).attr('data-facebook-share-url') || window.location.href)) + "');");

                $('#lg-share-twitter').attr('href', "javascript:openTwitter('" + (_this.core.$items.eq(index).attr('data-facebook-share-url')) + "');");

                $('#lg-share-googleplus').attr('href', "javascript:openGoogleShareLink('https://plus.google.com/share?url=" + (encodeURIComponent(_this.core.$items.eq(index).attr('data-facebook-share-url') || window.location.href)) + "');");

				 $('#lg-share-linkedin').attr('href', "javascript:openLinkedin('" + (_this.core.$items.eq(index).attr('data-facebook-share-url')) + "');");
				  
                $('#lg-share-pinterest').attr('href', 'javascript:openPinterest()');

            }, 100);
        });
    };

    Share.prototype.destroy = function() {

    };

    $.fn.lightGallery.modules.share = Share;

})();



}));