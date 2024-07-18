(function($){var selectors=[];var check_binded=!1;var check_lock=!1;var defaults={interval:250,force_process:!1}
var $window=$(window);var $prior_appeared;function process(){check_lock=!1;for(var index=0;index<selectors.length;index++){var $appeared=$(selectors[index]).filter(function(){return $(this).is(':appeared')});$appeared.trigger('appear',[$appeared]);if($prior_appeared){var $disappeared=$prior_appeared.not($appeared);$disappeared.trigger('disappear',[$disappeared])}
$prior_appeared=$appeared}}
$.expr[':'].appeared=function(element){var $element=$(element);if(!$element.is(':visible')){return!1}
var window_left=$window.scrollLeft();var window_top=$window.scrollTop();var offset=$element.offset();var left=offset.left;var top=offset.top;if(top+$element.height()>=window_top&&top-($element.data('appear-top-offset')||0)<=window_top+$window.height()&&left+$element.width()>=window_left&&left-($element.data('appear-left-offset')||0)<=window_left+$window.width()){return!0}else{return!1}}
$.fn.extend({appear:function(options){var opts=$.extend({},defaults,options||{});var selector=this.selector||this;if(!check_binded){var on_check=function(){if(check_lock){return}
check_lock=!0;setTimeout(process,opts.interval)};$(window).scroll(on_check).resize(on_check);check_binded=!0}
if(opts.force_process){setTimeout(process,opts.interval)}
selectors.push(selector);return $(selector)}});$.extend({force_appear:function(){if(check_binded){process();return!0};return!1}})})(jQuery);
/*!
 * jQuery doTimeout: Like setTimeout, but better! - v1.0 - 3/3/2010
 * http://benalman.com/projects/jquery-dotimeout-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){'$:nomunge';var cache={},doTimeout='doTimeout',aps=Array.prototype.slice;$[doTimeout]=function(){return p_doTimeout.apply(window,[0].concat(aps.call(arguments)))};$.fn[doTimeout]=function(){var args=aps.call(arguments),result=p_doTimeout.apply(this,[doTimeout+args[0]].concat(args));return typeof args[0]==='number'||typeof args[1]==='number'?this:result};function p_doTimeout(jquery_data_key){var that=this,elem,data={},method_base=jquery_data_key?$.fn:$,args=arguments,slice_args=4,id=args[1],delay=args[2],callback=args[3];if(typeof id!=='string'){slice_args--;id=jquery_data_key=0;delay=args[1];callback=args[2]}
if(jquery_data_key){elem=that.eq(0);elem.data(jquery_data_key,data=elem.data(jquery_data_key)||{})}else if(id){data=cache[id]||(cache[id]={})}
data.id&&clearTimeout(data.id);delete data.id;function cleanup(){if(jquery_data_key){elem.removeData(jquery_data_key)}else if(id){delete cache[id]}};function actually_setTimeout(){data.id=setTimeout(function(){data.fn()},delay)};if(callback){data.fn=function(no_polling_loop){if(typeof callback==='string'){callback=method_base[callback]}
callback.apply(that,aps.call(args,slice_args))===!0&&!no_polling_loop?actually_setTimeout():cleanup()};actually_setTimeout()}else if(data.fn){delay===undefined?cleanup():data.fn(delay===!1);return!0}else{cleanup()}}})(jQuery)