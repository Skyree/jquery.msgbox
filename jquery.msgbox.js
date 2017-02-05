/*
 * Jquery timeline : jQuery plugin allowing you to append or prepend temporary messages to a box
 * Copyright 2017 Loïc B. Florin (@bf_loic)
 * Licensed under the MIT license.
 * Version 1.0
 */

(function($) {
	
    $.msgbox = function(element, options) {

        var defaults = {
           'lines': 4,
           'timer': 5000,
           'direction': 'append',
           'onComplete': null,
           'animate': true
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

		/**
		 * Initialize
		 * First initalization with callback
		 */
		plugin.initialize = function() {
			plugin.settings = $.extend({}, defaults, options);
			plugin.settings.animation = plugin.settings.animate ? 'fadeOut' : 'hide';
			plugin.settings.duration = plugin.settings.animate ? 400 : 0;

			$element.addClass('msgbox');

			if(typeof(plugin.settings.onComplete) == 'function') plugin.settings.onComplete($element);
		}
		
		
		/**
		 * Prepend
		 * Prepend the given new element and throw a callback
		 */
		plugin.prepend = function(args, callback) {
			if(typeof(args) == 'undefined') {
				window.console.error('cannot prepend undefined element');
				return 0;
			}
			// ! Must allow anonymous arguments
			if(typeof(args.element) != 'undefined') {
				args = args.element;
			}

			var newItem = $('<span></span>').text(args);

			if ($element.children('span').length == plugin.settings.lines) {
				$element.children('span').last()[plugin.settings.animation](plugin.settings.duration, function() {
					$(this).detach();
					$(this).remove();
					newItem.prependTo($element);
				});
			} else {
				newItem.prependTo($element);
			}

			if(callback) callback(newItem);
			plugin.setDelay(newItem);
		}
		
		/**
		 * Append
		 * Append the given new element and throw a callback
		 */
		plugin.append = function(args, callback) {
			if(typeof(args) == 'undefined') {
				window.console.error('cannot append undefined element');
				return 0;
			}
			// ! Must allow anonymous arguments
			if(typeof(args.element) != 'undefined') {
				args = args.element;
			}

			var newItem = $('<div></div>').text(args);

			if ($element.children('div').length == plugin.settings.lines) {
				$element.children('div').first()[plugin.settings.animation](plugin.settings.duration, function() {
					$(this).detach();
					$(this).remove();
					newItem.appendTo($element);
				});
			} else {
				newItem.appendTo($element);
			}

			if(callback) callback(newItem);
			plugin.setDelay(newItem);
		}

		/**
		 * Add
		 * Append or prepend element depending on the settings
		 */
		plugin.add = function(args, callback) {
			if (plugin.settings.direction == 'append') {
				plugin.append(args, callback);
			} else {
				plugin.prepend(args, callback);
			}
		}

		/**
		 * setDelay
		 * Set a delay before an element disappears
		 */
		plugin.setDelay = function(args) {
			if (plugin.settings.timer != null) {
				setTimeout(function() {
					if (typeof(args) != 'undefined') {
						args[plugin.settings.animation](plugin.settings.duration, function() {
							args.remove();
						});
					}
				}, plugin.settings.timer);
			}
		}
		
		/**
		 * Destroy
		 * Destroy the instance of msgbox
		 */
		plugin.destroy = function(args) {
			plugin.empty();

			$element.removeData('msgbox');
			$element.removeClass('msgbox');

			if(typeof(args) == 'function') args($element);
		}

		/**
		 * Empty
		 * Remove elements in the msgbox
		 */
		plugin.empty = function() {
			$element.children().each(function() {
				$(this).detach();
				$(this).remove();
			});
		}

		/**
		 * Reset
		 * Return to the initial state
		 */
		plugin.reset = function() {
			plugin.destroy();
			plugin.initialize();
		}
		
		jQuery.expr[':'].parents = function(a,i,m){
			return jQuery(a).parents(m[3]).length < 1;
		};
		
		
        plugin.initialize();

    }

    $.fn.msgbox = function(options) {
		if ( typeof options === 'string' ) {
			// call method
			var args = Array.prototype.slice.call( arguments, 1 );

			this.each(function() {
				var instance = $.data( this, 'msgbox' );
				if ( !instance ) {
					window.console.error( "cannot call methods on msgbox prior to initialization; " +
										  "attempted to call method '" + options + "'" );
				return;
			}
			if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
				window.console.error( "no such method '" + options + "' for msgbox instance" );
				return;
			}
			// apply method
			instance[ options ].apply( instance, args );
			});
		}
		else {
			return this.each(function() {

				// New instance
				if (undefined == $(this).data('msgbox')) {
					var plugin = new $.msgbox(this, options);
					$(this).data('msgbox', plugin);
				}
				// Replace instance
				else {
					$(this).data('msgbox').destroy();
					var plugin = new $.msgbox(this, options);
					$(this).data('msgbox', plugin);
					//return;
				}
			});
		}
    }

})(jQuery);