/**
 editable input.
Internally value stored as {city: "Moscow", street: "Lenina", building: "15"}

@class Tax
@extends abstractinput
@final
@example

**/
(function ($) {
    "use strict";
    
    var Tax = function (options) {
        this.init('tax', options, Tax.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Tax, $.fn.editabletypes.abstractinput);

    $.extend(Tax.prototype, {
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
		
		   this.$input.filter('[name="control_id"]').val(this.$input.filter('[name="control_id"]').closest("td").find("[chosen_tax]")[0].id);
           this.$input.filter('[name="name"]').val(value.name);
           this.$input.filter('[name="abbreviation"]').val(value.abbreviation);
		   this.$input.filter('[name="rate"]').val(value.rate);
           this.$input.filter('[name="description"]').val(value.decsription);
		   this.$input.filter('[name="tax_number"]').val(value.tax_number);
		   this.$input.filter('[name="show_number"]').val(value.show_number);
		   this.$input.filter('[name="recoverable"]').val(value.recoverable);
		   this.$input.filter('[name="compound"]').val(value.compound);
       },       
       
       /**
        Returns value of input.
        
        @method input2value() 
       **/          
       input2value: function() { 
		
           return {
			    control_id: this.$input.filter('[name="control_id"]').val(), 
				name: this.$input.filter('[name="name"]').val(), 
				abbreviation: this.$input.filter('[name="abbreviation"]').val(),
				rate: this.$input.filter('[name="rate"]').val(),
				description: this.$input.filter('[name="description"]').val(),
				tax_number: this.$input.filter('[name="tax_number"]').val(),
				show_number: ((this.$input.filter('[name="show_number"]')[0].checked) ? 1 : 0),
				recoverable: ((this.$input.filter('[name="recoverable"]')[0].checked) ? 1 : 0),
				compound: ((this.$input.filter('[name="compound"]')[0].checked) ? 1 : 0),
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

    Tax.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div class="editable-tax"><label><span>Name: </span><input type="text" name="name" class="input-small"></label></div>'+
             '<div class="editable-tax"><label><span>Abbreviation: </span><input type="text" name="abbreviation" class="input-small"></label></div>'+
             '<div class="editable-tax"><label><span>Tax rate: </span><input type="numeric" name="rate" class="input-small"></label></div>'+
			 '<div class="editable-tax"><label><span>Description: </span><input type="text" name="description" class="input-small"></label></div>'+
			 '<div class="editable-tax"><label><span>Your tax number: </span><input type="text" name="tax_number" class="input-small"></label></div>'+
			 '<div class="editable-tax"><label><span>Show tax number on invoices: </span><input type="checkbox" name="show_number" class="input-small"></label></div>'+
			 '<div class="editable-tax"><label><span>Is this tax recoverable? </span><input type="checkbox" name="recoverable" class="input-small"></label></div>'+
			 '<div class="editable-tax"><label><span>Is tax compound? </span><input type="checkbox" name="compound" class="input-small"></label></div>'+
			 '<div class="editable-tax"><input type="hidden" name="control_id" value="" /></div>',
        inputclass: ''
    });

    $.fn.editabletypes.tax = Tax;

}(window.jQuery));