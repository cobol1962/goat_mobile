(function ($) {
    "use strict";
    
    var Products = function (options) {
        this.init('products', options, Products.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Products, $.fn.editabletypes.abstractinput);

    $.extend(Products.prototype, {
        /**
        Renders input from tpl

        @method render() 
        **/        
        render: function() {
           this.$input = this.$tpl.find('input');
        },
        
        /**
        Default method to show value in element. Can be overwritten by display option.
        
        @method value2html(value, element) 
        **/
        value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return; 
            }
            var html ="";
            $(element).html(html); 
        },
        
        /**
        Gets value from element's html
        
        @method html2value(html) 
        **/    
	
        html2value: function(html) {        
          /*
            you may write parsing method to get value by element's html
            e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
            but for complex structures it's not recommended.
            Better set value directly via javascript, e.g. 
            editable({
                value: {
                    city: "Moscow", 
                    street: "Lenina", 
                    building: "15"
                }
            });
          */ 
          return null;  
        },
      
       /**
        Converts value to string. 
        It is used in internal comparing (not for sending to server).
        
        @method value2str(value)  
       **/
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';  
               }
           }
           return str;
       }, 
       
       /*
        Converts string to value. Used for reading value from 'data-value' attribute.
        
        @method str2value(str)  
       */
       str2value: function(str) {
           /*
           this is mainly for parsing value defined in data-value attribute. 
           If you will always set value by javascript, no need to overwrite it
           */
           return str;
       },                
       
       /**
        Sets value of input.
        
        @method value2input(value) 
        @param {mixed} value
       **/         
       value2input: function(value) {
           if(!value) {
             return;
           }
           this.$input.filter('[name="name"]').val(value.name);
           this.$input.filter('[name="price"]').val(value.price);
          
       },       
       
       /**
        Returns value of input.
        
        @method input2value() 
       **/          
       input2value: function() { 
           return {
              name:   this.$input.filter('[name="name"]').val(), 
              price_after_tax:  parseFloat(this.$input.filter('[name="price"]').val()),
			  price_before_tax:  parseFloat(this.$input.filter('[name="price"]').val()) / (1 + (parseFloat(this.$tpl.find("#tax").find("option:selected").attr("rate")) / 100)),
			  tax_group:    this.$tpl.find("#tax").val(),
			  measure_unit:    this.$input.filter('[name="measure_unit"]').val(),
			  tax: this.$tpl.find("#tax").find("option:selected").attr("rate"),
			  category: "0"
            
           };
       },        
       
        /**
        Activates input: sets focus on the first field.
        
        @method activate() 
       **/        
       activate: function() {
            this.$input.filter('[name="name"]').focus();
		
       },  
       
       /**
        Attaches handler to submit form in case of 'showbuttons=false' mode
        
        @method autosubmit() 
       **/       
       autosubmit: function() {
           this.$input.keydown(function (e) {
                if (e.which === 13) {
				    $(this).closest('form').submit();
                }
           });
       }       
    });
	var taxes_div = "<select id='tax' class='form-control' name='tax'>";
	$.ajax({
		url: "/ajax/actions/getTaxRates.php",
		type: "POST",
		success: function(res) {
			
			taxes_div += res + "</select>";
			  Products.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
					tpl: '<div class="editable-customer"><label><span>Name: </span><input type="text" name="name" class="form-control"></label></div>'+
						 '<div class="editable-customer"><label><span>Price: </span><input type="text" name="price" class="form-control"></label></div>'+
						 '<div class="editable-customer"><label><span>Measure unit: </span><input type="text" name="measure_unit" class="form-control"></label></div>'+
						  '<div class="editable-customer"><label><span>Tax: </span>' + taxes_div + '</label></div>'+
						  '<br /><b><span>New product will be added in category "Others".</span><b><br /><span>You can change category later</span>',
					inputclass: ''
				});
			  $.fn.editabletypes.products = Products;
		}
	});
  

  

}(window.jQuery));