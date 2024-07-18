jQuery( function($) {
	
/* ------------------------------------------ */
/* Variables */

	var $body = $("body"),
		$page_overlay = $('.page-overlay');
		
/* ------------------------------------------ */
/* Outer HTML */
		
	$.fn.outerHTML = function(){
	 
	    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
	    return (!this.length) ? this : (this[0].outerHTML || (
	      function(el){
	          var div = document.createElement('div');
	          div.appendChild(el.cloneNode(true));
	          var contents = div.innerHTML;
	          div = null;
	          return contents;
	    })(this[0]));
	 
	}
	
/* ------------------------------------------ */
/* Header */

	var $header = $('.header-v2'),
		$navigation = $('.main-nav .navigation'),
		$utility_nav = $header.find('.utility-nav'),
		$mobile_nav = $('.header-v2 .mobile-nav'),
		$mobile_nav_toggle = $('.mobile-nav-toggle .hamburger');
		
	/* Mega Menu --- */
		
		function initMegaMenu() {
		
			$navigation.find('.sub-menu.mega-menu').each( function() {
				
				var $mega_menu = $(this),
					inner = 0;
				
				$mega_menu.find('.mega-columm').each( function() {
					
					inner = inner + $(this).outerWidth();
					
				});
				
				$mega_menu.find('.inner').css({width: inner+'px'});
				
				equalheight('.equal-height');
				
			});
		
		}
		
	/* Navigation click toggle --- */
	
		function initCloseOtherNavs($not) {
			
			if ($not) {
				
				$navigation.find('> ul > li.menu-item-has-children').not($not).removeClass('active');
				
				$utility_nav.find('.drop, .wpml-ls-legacy-dropdown li, .top-nav-left li').not($not).removeClass('active');
				
			}  else {
				
				$navigation.find('> ul > li.menu-item-has-children').removeClass('active');
				
				$utility_nav.find('.drop, .wpml-ls-legacy-dropdown li, .top-nav-left li').removeClass('active');
				
			}
			
		}
	
		function initNavClick() {
		
			$navigation.find('> ul > li.menu-item-has-children > a').on('click', function(e) {
				
				e.preventDefault();
				
				var $this = $(this),
					$target = $this.closest('li');
				
				$target.toggleClass('active');
				
				initCloseOtherNavs($target);
				
			});
			$navigation.find('> ul > li.menu-item-has-children').on('focusout', function(e) {
				setTimeout(function() {
					if ( $(document.activeElement).closest('li.active').length == 0 ) {
						initCloseOtherNavs();
					}
				}, 100);
			});
			
			$utility_nav.find('.drop--label').on('click', function(e) {
				
				e.preventDefault();
				
				var $this = $(this),
					$target = $this.closest('.drop');
				
				$target.toggleClass('active');
				
				initCloseOtherNavs($target);
				
			}).on('keypress', function(e) {
			    if ( e.which === 13 ) {
			        $(this).trigger('click');
			    }
			});
			$utility_nav.find('.drop').on('focusout', function(e) {
				setTimeout(function() {
					if ( $(document.activeElement).closest('.drop.active').length == 0 ) {
						initCloseOtherNavs();
					}
				}, 100);
			});
			
			$utility_nav.find('.wpml-ls-legacy-dropdown, .top-nav-left').find('> ul > li > a').on('click', function(e) {
				
				e.preventDefault();
				
				var $this = $(this),
					$target = $this.closest('li');
				
				$target.toggleClass('active');
				
				initCloseOtherNavs($target);
				
			}).on('keypress', function(e) {
			    if ( e.which === 13 ) {
			        $(this).trigger('click');
			    }
			});
			$utility_nav.find('.wpml-ls-legacy-dropdown, .top-nav-left').find('> ul > li').on('focusout', function(e) {
				setTimeout(function() {
					if ( $(document.activeElement).closest('li.active').length == 0 ) {
						initCloseOtherNavs();
					}
				}, 100);
			});
		
		}
		
		$(document).mouseup(function(e) {
		    //var container = jQuery('.sub-menu');
		    //if (!container.is(e.target) && container.has(e.target).length === 0) {
		    if ( !$('.sub-menu').is(e.target) && $(e.target).closest('li.active .sub-menu').length == 0 ) {
		        //initCloseOtherNavs($(e.target).closest('li.active'));
		    }
		});
	
	/* WPML Drop --- */
	
		function initWPMLDrop() {
			
			$('.header-v2 .wpml-ls-legacy-dropdown').each( function() {
				
				var $this = $(this),
					$list_item = $this.find('> ul > li'),
					indicator = $header.find('.utility-nav .top-nav-left > ul > li > .indicator').outerHTML(),
					indicator_m = $header.find('.utility-nav .top-nav-left > ul > li > .indicator-m').outerHTML();
					
				$list_item.find('> a').prepend('<span class="lang-icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6574 3.34277L3.34375 14.6564" stroke="#5C5C5C" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.3418 3.34277L14.6555 14.6564" stroke="#5C5C5C" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.34301 3.34301C6.46703 0.218995 11.5327 0.218995 14.6567 3.34301C17.7811 6.46703 17.7811 11.5327 14.6567 14.6567C11.5327 17.7811 6.46703 17.7811 3.34301 14.6567C0.218995 11.5327 0.218995 6.46703 3.34301 3.34301V3.34301Z" stroke="#5C5C5C" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.76632 5.76729C8.89034 2.64327 12.8704 1.55767 14.6556 3.34288C16.4408 5.12809 15.3556 9.10811 12.2312 12.2321C9.10714 15.3566 5.12711 16.4418 3.3419 14.6565C1.55669 12.8713 2.6423 8.89131 5.76632 5.76729V5.76729Z" stroke="#5C5C5C" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
				
				$list_item.append(indicator_m).removeAttr('tabindex').find('> a > .wpml-ls-native').attr('data-text', $list_item.find('> a').text()).append(indicator);
				
			});
			
		}
	
	/* Sticky Header --- */
	
		function initStickyHeader() {
			
			var screen_width 	= $(window).width(),
				detach_point 	= $header.find('.main-nav').outerHeight() + $header.find('.utility-nav').outerHeight();
				
			if ( $(window).scrollTop() >= detach_point ) {
				
				$header.addClass('detach').removeClass('attach').addClass('drop');
				
			} else {
				
				$header.removeClass('detach drop').addClass('attach');
				
			}
			
		}
	
	/* Mobile Nav Toggle --- */
	
		$mobile_nav_toggle.on('click', function() {
			
			var $burger = $(this);
			
			if ( $burger.hasClass('is-active') ) {
				
				//$('.main-menu').removeClass('active');
				$burger.removeClass('is-active');
				$mobile_nav.removeClass('open');
				$body.removeClass('mobile-nav-open');
				$page_overlay.removeClass('active');
				$mobile_nav.find('.back').trigger('click');
			
			} else {
				
				//$('.main-menu').addClass('active');
				$burger.addClass('is-active');
				$mobile_nav.addClass('open');
				$body.addClass('mobile-nav-open');
				
				$('.search-mobile-form, .header-v2 .main-nav').removeClass('active');
				
			}
			
		});
	
	/* Mobile Sub Toggle --- */
	
		var $mobile_trigger = $mobile_nav.find('> .top-part > ul > li.menu-item-has-children'),
			$utility_mobile = $('.utility-mobile');
		
		$mobile_trigger.on('click', '> a', function(e) {
			
			e.preventDefault();
			
			var $this = $(this).closest('li'),
				$this_sub = $this.find('.sub-menu'),
				$other_subs = $this.closest('ul').find('.sub-menu');
			
			if ( $this_sub.parent().hasClass('open') ) {
				$this_sub.parent().removeClass('open');
				$this.closest('ul').find('> li').not($this_sub.parent()).removeClass('closed');
				
				$utility_mobile.removeClass('hide');
				
				$mobile_nav.removeClass('sub-open').find('.top-part .back').removeClass('show');
			} else {
				$this_sub.parent().addClass('open');
				$this.closest('ul').find('> li').not($this_sub.parent()).removeClass('open').addClass('closed');
				
				$utility_mobile.addClass('hide');
				
				$mobile_nav.addClass('sub-open').find('.top-part .back').addClass('show');
			}
			
		});
		
		$utility_mobile.find('.toggle-mobile, .wpml-ls-legacy-dropdown').each( function() {
			var $this = $(this);

			if ( $this.hasClass('toggle-drop') ) {
				var $click = $this.find('.toggle');
			} else {
				var $click = $this.find('> ul > li');
			}

			$click.on('click', function(e) {

				e.preventDefault();

				if ($this.hasClass('toggle-drop')) {
					var $toggle_target = $this;
				} else {
					var $toggle_target = $click;
				}

				if ($toggle_target.hasClass('open') ) {

					$toggle_target.removeClass('open');

					$utility_mobile
					.removeClass('sub-open')
					.find('.menu-item-has-children, .drop, .wpml-ls-item').not($toggle_target).removeClass('closed');

					$mobile_nav.removeClass('toggle-open').find('.back').removeClass('show');

					if ( $this.hasClass('wpml-ls-legacy-dropdown') ) {
						$this.removeClass('open');
					} else {
						$('.wpml-ls-legacy-dropdown').removeClass('closed');
					}

				} else {
					$toggle_target.addClass('open');

					var wpmlLinks = $toggle_target.find('.wpml-ls-sub-menu a');
					wpmlLinks.on('click', function(e) {
						window.location = e.currentTarget.href;
					})

					$toggle_target.find('.sub-menu a').on('click', function(e) {
						// close menu only if hash scroll navigation
						var currentTargetPath = e.currentTarget.pathname;
						var currentPath = window.location.pathname;

						if(currentPath.includes(currentTargetPath)) {
							$mobile_nav_toggle.removeClass('is-active');
							$mobile_nav.removeClass('open');
							$body.removeClass('mobile-nav-open');
						} else {
							window.location = e.currentTarget.href;
						}

					})

					$utility_mobile
					.addClass('sub-open')
					.find('.menu-item-has-children, .drop, .wpml-ls-item').not($toggle_target).removeClass('open').addClass('closed');
					
					$mobile_nav.addClass('toggle-open').find('.back').addClass('show');
					
					if ( $this.hasClass('wpml-ls-legacy-dropdown') ) {
						$this.addClass('open');
					} else {
						$('.wpml-ls-legacy-dropdown').addClass('closed');
					}
					
				}
				
			});
			
		});
		
		$mobile_nav.find('.back').on('click', function() {
			
			$mobile_nav
			.removeClass('sub-open toggle-open')
			.find('li').removeClass('closed open');
			
			$mobile_nav.find('.back').removeClass('show');
			
			$utility_mobile
			.removeClass('sub-open hide')
			.find('.menu-item-has-children, .drop, .wpml-ls-item').removeClass('closed open');
			
			$utility_mobile.find('.wpml-ls-legacy-dropdown').removeClass('open closed');
			
		});
		
	/* Hide Header on on scroll down ---
	
		var didScroll;
		var lastScrollTop = 0;
		var delta = 35;
		var navbarHeight = $('.header-v2').outerHeight();
		
		$(window).on('scroll', function(event){
		    didScroll = true;
		});
		
		setInterval(function() {
		    if (didScroll) {
		        hasScrolled();
		        didScroll = false;
		    }
		}, 250);
		
		function hasScrolled() {
			
			console.log($(window).scrollTop());
			
		    var st = $(this).scrollTop();
		    
		    if(Math.abs(lastScrollTop - st) <= delta)
		        return;
		    
		    if ((st > lastScrollTop && st > (navbarHeight+250)) || $(window).scrollTop() <= navbarHeight){
		        $header.removeClass('detach drop').addClass('attach');
		        
		        if ( $(window).scrollTop() > navbarHeight ) {
					$header.addClass('stay-fixed'); 
		        } else {
					$header.removeClass('stay-fixed'); 
		        }
		    } else {
		        if(st + $(window).height() < $(document).height() && $(window).scrollTop() !== 0) {
		            $header.addClass('detach').removeClass('attach').addClass('drop');
		        }
		    }
		    
		    lastScrollTop = st;

		} */
		
/* ------------------------------------------ */
/* Smooth Scroll */

	$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]').not('[href="#0"]').not('.tab-list li a').click(function(event) {
		// On-page links
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top - ( $header.find('.nav-bar').outerHeight() )
				}, 500, 'linear', function() {

					// Callback after animation
					// Must change focus!
					
					// var $target = $(target);
					// $target.focus();
					// if ($target.is(":focus")) { // Checking if the target was focused
					// 	return false;
					// } else {
					// 	$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
					// 	$target.focus(); // Set focus again
					// };
					
				});
			}
		}
	});

	function initUrlHashScroll() {
		
		if (window.location.hash) {
			
			setTimeout(function() {
				window.scrollTo(0, 0);
				/*$('html, body').animate({
			        scrollTop: 0
		        }, 1, 'linear');*/
			}, 1);
			
			setTimeout(function() {
				
				var $loc_hash = $(window.location.hash);

				if ( $loc_hash.length ) {
					$('html, body').animate({
			        	scrollTop: $loc_hash.offset().top - ( $header.find('.nav-bar').outerHeight() )
		        	}, 400, 'linear');
				}
	        
	        }, 1000);
	        
		}
		
	}
	initUrlHashScroll();
		
/* ------------------------------------------ */
/* Popups */
	
	$('.show-popup').on('click', function(e) {
		
		e.preventDefault();
		
		var $this = $(this),
			instance = $.fancybox.getInstance(),
			popup_id = $this.attr('data-popup-id');
			
		if (instance) {
			instance.close();
		}
		
		var instance = $.fancybox.open({
			src: '#'+popup_id,	
			type: 'inline',
			transitionEffect: 'zoom-in-out',
			transitionDuration: 300,
			animationEffect: 'zoom',
			animationDuration: 300,
			mobile: {
				transitionEffect: false,
				animationEffect: false
			},
			btnTpl: {
				smallBtn:'<button data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><span>Close </span><svg width="24" height="24" id="b3a6cff1-071e-4738-9483-9504dc957d8b" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path d="M25,1,1,25" style="fill:none;stroke:#333;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M25,25,1,1" style="fill:none;stroke:#333;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></button>',
			},
			beforeShow: function(instance, current) {
				
				var $popup = $(current['src']),
					$prev = $popup.find('.prev'),
					$next = $popup.find('.next'),
					window_width = $(window).width(),
					popup_width = $popup.outerWidth(),
					diff = window_width - popup_width,
					side = diff / 2
					adjust = (side / 2) + 20;
					
				if ( window_width >= 768 ) {
					$prev.css({marginLeft: '-'+adjust+'px',left: 0});
					$next.css({marginRight: '-'+adjust+'px',right: 0});
				} else {
					$prev.css({marginLeft: '',left: ''});
					$next.css({marginRight: '',right: ''});
				}
				
			}
		});
		
	});
	
	function initFancyboxMemberAdjust() {
	
		$('.fancy-content.style-member').each( function() {
			
			var $popup = $(this),
				$prev = $popup.find('.prev'),
				$next = $popup.find('.next'),
				window_width = $(window).width(),
				popup_width = $popup.outerWidth(),
				diff = window_width - popup_width,
				side = diff / 2
				adjust = (side / 2) + 20;
				
			if ( window_width >= 768 ) {
				$prev.css({marginLeft: '-'+adjust+'px',left: 0});
				$next.css({marginRight: '-'+adjust+'px',right: 0});
			} else {
				$prev.css({marginLeft: '',left: ''});
				$next.css({marginRight: '',right: ''});
			}
			
		});
	
	}
		
/* ------------------------------------------ */
/* Mobile Search */

	function initMobileSearch() {
		
		$('.search-mobile-trigger').on('click', function() {
			
			var $search_mobile_form = $('.search-mobile-form'),
				$main_nav = $header.find('.main-nav');
			
			if ( $search_mobile_form.hasClass('active') ) {
				$search_mobile_form.removeClass('active');
				$main_nav.removeClass('active');
				$page_overlay.removeClass('active');
			} else {
				$search_mobile_form.addClass('active');
				$main_nav.addClass('active');
				$page_overlay.addClass('active');
				if ( $('.header-v2 .main-nav').hasClass('active') ) {
					$mobile_nav_toggle.removeClass('is-active');
					$mobile_nav.removeClass('open');
					$body.removeClass('mobile-nav-open');
				}
			}
			
		});
		
	}
	
/* ------------------------------------------ */
/* Desktop Search */

	function initDesktopSearch() {
		
		$header.find('.top-search .trigger').on('click', function() {
			
			var $this = $(this),
				$target = $this.closest('.top-search');
			
			$target.toggleClass('active');
			
			initCloseOtherNavs($target);
			
		}).on('keypress', function(e) {
		    if ( e.which === 13 ) {
		        $(this).trigger('click');
		    }
		});
		
	}

/* ------------------------------------------ */
/* Equal Height */

	equalheight = function(container) {
		
		if ( $body.hasClass('page-template-template-mariam-assefa') ) { // OLD
			
			var currentTallest = 0,
				currentTallestChild = 0,
				currentTallestChild2 = 0,
				currentTallestChild3 = 0,
				currentRowStart = 0,
				rowDivs = new Array(),
				$el,
				topPosition = 0,
				win_width = $(window).width();
				
			$(container).each( function() {
				
				var $el = $(this),
					equal_on = true;
				
				// Desktop Only
				if ( win_width < 992 && $el.hasClass('equal-desktop-only') ) {
					equal_on = false;
				}
				
				// No Mobile 
				if ( win_width < 768 && $el.hasClass('equal-no-mobile') ) {
					equal_on = false;
				}
				
				// Tablet Only
				if ( win_width >= 992 && win_width <= 450 && $el.hasClass('equal-tablet-only') ) {
					equal_on = false;
				}
				
				// Mobile Only
				if ( win_width >= 768 && $el.hasClass('equal-mobile-only') ) {
					equal_on = false;
				}
				
				if ( equal_on ) {
				
					$($el).height('auto');
					$($el).find('.equal-child').height('auto');
					$($el).find('.equal-child-2').height('auto');
					$($el).find('.equal-child-3').height('auto');
					topPosition = $el.offset().top;
					
					if (currentRowStart != topPosition) {
						
						for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
							
							rowDivs[currentDiv].find('.equal-child').outerHeight(currentTallestChild);
							rowDivs[currentDiv].find('.equal-child-2').outerHeight(currentTallestChild2);
							rowDivs[currentDiv].find('.equal-child-3').outerHeight(currentTallestChild3);
							
							if ( !$el.hasClass('child-only') ) {
								rowDivs[currentDiv].outerHeight(currentTallest);
							}
							
						}
						
						rowDivs.length = 0; // empty the array
						currentRowStart = topPosition;
						currentTallest = $el.outerHeight();
						currentTallestChild = $el.find('.equal-child').outerHeight();
						currentTallestChild2 = $el.find('.equal-child-2').outerHeight();
						currentTallestChild3 = $el.find('.equal-child-3').outerHeight();
						rowDivs.push($el);
						
					} else {
						
						rowDivs.push($el);
						currentTallest = (currentTallest < $el.height()) ? ($el.outerHeight()) : (currentTallest);
						currentTallestChild = (currentTallestChild < $el.find('.equal-child').outerHeight()) ? ($el.find('.equal-child').outerHeight()) : (currentTallestChild);
						currentTallestChild2 = (currentTallestChild2 < $el.find('.equal-child-2').outerHeight()) ? ($el.find('.equal-child-2').outerHeight()) : (currentTallestChild2);
						currentTallestChild3 = (currentTallestChild3 < $el.find('.equal-child-3').outerHeight()) ? ($el.find('.equal-child-3').outerHeight()) : (currentTallestChild3);
						
					}
					
					for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
						
						rowDivs[currentDiv].find('.equal-child').outerHeight(currentTallestChild);
						rowDivs[currentDiv].find('.equal-child-2').outerHeight(currentTallestChild2);
						rowDivs[currentDiv].find('.equal-child-3').outerHeight(currentTallestChild3);
						
						if ( !$el.hasClass('child-only') ) {
							rowDivs[currentDiv].outerHeight(currentTallest);
						}
						
					}
				
				} else {
					
					$el.css('height', '');
					$el.find('.equal-child').css('height', '');
					$el.find('.equal-child-2').css('height', '');
					$el.find('.equal-child-3').css('height', '');
					
				}
					
			});
		
		} else {
		
			var currentTallest = 0,
				currentTallestChild = 0,
				currentTallestChild2 = 0,
				currentTallestChild3 = 0,
				currentRowStart = 0,
				rowDivs = new Array(),
				$el,
				topPosition = 0,
				win_width = $(window).width();
				
			$(container).each( function() {
				
				var $el = $(this),
					equal_on = true;
				
				// Desktop Only
				if ( win_width < 992 && $el.hasClass('equal-desktop-only') ) {
					equal_on = false;
				}
				
				// No Mobile 
				if (
					win_width < 768 &&
					(
						$el.hasClass('equal-no-mobile') ||
						($el.hasClass('col') && $el.hasClass('col-sm'))
					)
				) {
					equal_on = false;
				}
				
				// Tablet Only
				if ( win_width >= 992 && win_width <= 450 && $el.hasClass('equal-tablet-only') ) {
					equal_on = false;
				}
				
				// Mobile Only
				if ( win_width >= 768 && $el.hasClass('equal-mobile-only') ) {
					equal_on = false;
				}
				
				if ( equal_on ) {
				
					$($el).height('auto');
					$($el).find('.equal-child').height('auto');
					$($el).find('.equal-child-2').height('auto');
					$($el).find('.equal-child-3').height('auto');
					topPosition = $el.offset().top;
					
					if (currentRowStart != topPosition) {
						
						for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
							
							rowDivs[currentDiv].find('.equal-child').outerHeight(currentTallestChild);
							rowDivs[currentDiv].find('.equal-child-2').outerHeight(currentTallestChild2);
							rowDivs[currentDiv].find('.equal-child-3').outerHeight(currentTallestChild3);
							
							if ( !rowDivs[currentDiv].hasClass('child-only') ) {
								rowDivs[currentDiv].outerHeight(currentTallest);
							}
							
						}
						
						rowDivs.length = 0; // empty the array
						currentRowStart = topPosition;
						currentTallest = $el.outerHeight();
						currentTallestChild = $el.find('.equal-child').outerHeight();
						currentTallestChild2 = $el.find('.equal-child-2').outerHeight();
						currentTallestChild3 = $el.find('.equal-child-3').outerHeight();
						rowDivs.push($el);
						
					} else {
						
						rowDivs.push($el);
						currentTallest = (currentTallest < $el.height()) ? ($el.outerHeight()) : (currentTallest);
						currentTallestChild = (currentTallestChild < $el.find('.equal-child').outerHeight()) ? ($el.find('.equal-child').outerHeight()) : (currentTallestChild);
						currentTallestChild2 = (currentTallestChild2 < $el.find('.equal-child-2').outerHeight()) ? ($el.find('.equal-child-2').outerHeight()) : (currentTallestChild2);
						currentTallestChild3 = (currentTallestChild3 < $el.find('.equal-child-3').outerHeight()) ? ($el.find('.equal-child-3').outerHeight()) : (currentTallestChild3);
						
					}
					
					for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
						
						rowDivs[currentDiv].find('.equal-child').outerHeight(currentTallestChild);
						rowDivs[currentDiv].find('.equal-child-2').outerHeight(currentTallestChild2);
						rowDivs[currentDiv].find('.equal-child-3').outerHeight(currentTallestChild3);
						
						if ( !rowDivs[currentDiv].hasClass('child-only') ) {
							rowDivs[currentDiv].outerHeight(currentTallest);
						}
						
					}
				
				} else {
					
					$el.css('height', '');
					$el.find('.equal-child').css('height', '');
					$el.find('.equal-child-2').css('height', '');
					$el.find('.equal-child-3').css('height', '');
					
				}
					
			});
		
		}
		
	}
	
/* ------------------------------------------ */
/* Equal Height Set */

	equalheightset = function(container) {
		
		$(container).each( function() {
		
			var $this = $(this),
				currentTallest = 0,
				currentTallestChild = 0,
				currentTallestChild2 = 0,
				currentTallestChild3 = 0,
				currentRowStart = 0,
				rowDivs = new Array(),
				$el,
				topPosition = 0,
				win_width = $(window).width();
				
			$this.find('.equal-item').each( function() {
				
				var $el = $(this),
					equal_on = true;
				
				// Desktop Only
				if ( win_width < 992 && $el.hasClass('equal-desktop-only') ) {
					equal_on = false;
				}
				
				// No Mobile 
				if ( win_width < 768 && $el.hasClass('equal-no-mobile') ) {
					equal_on = false;
				}
				
				// Tablet Only
				if ( win_width >= 992 && win_width <= 450 && $el.hasClass('equal-tablet-only') ) {
					equal_on = false;
				}
				
				// Mobile Only
				if ( win_width >= 768 && $el.hasClass('equal-mobile-only') ) {
					equal_on = false;
				}
				
				if ( equal_on ) {
				
					$($el).height('auto');
					$($el).find('.equal-child').height('auto');
					$($el).find('.equal-child-2').height('auto');
					$($el).find('.equal-child-3').height('auto');
					topPosition = $el.offset().top;
					
					if (currentRowStart != topPosition) {
						
						for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
							
							rowDivs[currentDiv].find('.equal-child').outerHeight(currentTallestChild);
							rowDivs[currentDiv].find('.equal-child-2').outerHeight(currentTallestChild2);
							rowDivs[currentDiv].find('.equal-child-3').outerHeight(currentTallestChild3);
							
							if ( !$el.hasClass('child-only') ) {
								rowDivs[currentDiv].outerHeight(currentTallest);
							}
							
						}
						
						rowDivs.length = 0; // empty the array
						currentRowStart = topPosition;
						currentTallest = $el.outerHeight();
						currentTallestChild = $el.find('.equal-child').outerHeight();
						currentTallestChild2 = $el.find('.equal-child-2').outerHeight();
						currentTallestChild3 = $el.find('.equal-child-3').outerHeight();
						rowDivs.push($el);
						
					} else {
						
						rowDivs.push($el);
						currentTallest = (currentTallest < $el.height()) ? ($el.outerHeight()) : (currentTallest);
						currentTallestChild = (currentTallestChild < $el.find('.equal-child').outerHeight()) ? ($el.find('.equal-child').outerHeight()) : (currentTallestChild);
						currentTallestChild2 = (currentTallestChild2 < $el.find('.equal-child-2').outerHeight()) ? ($el.find('.equal-child-2').outerHeight()) : (currentTallestChild2);
						currentTallestChild3 = (currentTallestChild3 < $el.find('.equal-child-3').outerHeight()) ? ($el.find('.equal-child-3').outerHeight()) : (currentTallestChild3);
						
					}
					
					for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
						
						rowDivs[currentDiv].find('.equal-child').outerHeight(currentTallestChild);
						rowDivs[currentDiv].find('.equal-child-2').outerHeight(currentTallestChild2);
						rowDivs[currentDiv].find('.equal-child-3').outerHeight(currentTallestChild3);
						
						if ( !$el.hasClass('child-only') ) {
							rowDivs[currentDiv].outerHeight(currentTallest);
						}
						
					}
				
				} else {
					
					$el.css('height', '');
					$el.find('.equal-child').css('height', '');
					$el.find('.equal-child-2').css('height', '');
					$el.find('.equal-child-3').css('height', '');
					
				}
					
			});
		
		});
		
	}
	
/* ------------------------------------------ */
/* Home Hero Slider */

	var $home_hero_slider = $('.home-hero-slider'),
		$slider_info = $home_hero_slider.find('.slides-info'),
		$slider_bg = $home_hero_slider.find('.slides-bg');

	function initHomeHeroSlider() {
		
		var screen_width = $(window).width(),
			slider_info_count = $slider_info.length - 1;
			
		//if ( screen_width > 991 ) {
			
			$slider_info.on('init beforeChange afterChange', function(event, slick, currentSlide, nextSlide) {
				initHomeHeroSliderAdjust();
			});
			
			$slider_info.on('afterChange', function(event, slick, currentSlide, nextSlide) {
				if ( $slider_info.slick('slickCurrentSlide') === 0 ) {
					//$slider_info.slickSetOption("autoplay",false,false);
					$slider_info.slick('slickSetOption', 'autoplay', false);
				}
			});
			
			if ( !$slider_info.hasClass('slick-initialized') ) {
	
				$slider_info.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
					prevArrow: '<a class="slick-prev slick-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L0.99997 9L9 17" stroke="#013763" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
					nextArrow: '<a class="slick-next slick-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00098 1L9.00104 9L1.00098 17" stroke="#013763" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
					dots: true,
					appendArrows: $home_hero_slider.find('.slider-nav .arrows'),
					appendDots: $home_hero_slider.find('.slider-nav .dots'),
					draggable: false,
					focusOnSelect: false,
					fade: true,
					cssEase: 'linear',
					asNavFor: '.slides-bg',
					adaptiveHeight: true,
					responsive: [
						{
							breakpoint: 992,
							settings: {
								adaptiveHeight: true
							}
						}
					]
				});
			
			}
			
			if ( !$slider_bg.hasClass('slick-initialized') ) {
				
				$slider_bg.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					arrows: false,
					dots: false,
					draggable: false,
					focusOnSelect: false,
					fade: true,
					cssEase: 'linear',
					asNavFor: '.slides-info'
				});
			
			}
		
		//}
	
	}
	function initHomeHeroSliderAdjust() {
		
		var screen_width = $(window).width(),
			contain_width = $('.header-v2 .container').width(),
			contain_width_xl = $home_hero_slider.find('> .container.parent').width(),
			//padding_left = (contain_width_xl - contain_width) / 2,
			slider_info_height = $slider_info.height();
			
		if ( screen_width > 991 ) {
		
			$slider_bg.css('height', slider_info_height+'px');
			if ( !$body.hasClass('maf-page') ) {
				//$slider_info.find('.slide--info .inner').css({paddingLeft: padding_left+'px', marginLeft: '-'+padding_left+'px'});
			}
		
		} else {
			
			$slider_bg.css('height', '');
			if ( !$body.hasClass('maf-page') ) {
				//$slider_info.find('.slide--info .inner').css({paddingLeft: '', marginLeft: ''});
			}
			
		}
		
	}
	
/* ------------------------------------------ */
/* Hero Module */

	function initHeroModuleAdjust() {
		
		$('.module-hero').each( function() {
			
			var $hero = $(this),
				container = $header.find('.main-nav .nav-bar .container').width(),
				screen_width = $(window).width(),
				diff = screen_width - container,
				adjust = diff / 2;
			
			if ( screen_width >= 992 ) {
				$hero.find('.hero--desc .inner').css('padding-right', adjust+'px');
			} else {
				$hero.find('.hero--desc .inner').css('padding-right', '');
			}
			
		});
		
	}
	
/* ------------------------------------------ */
/* Timeline Slider */

	function initTimelineSlider() {
		
		if ( $('.timeline').length ) {
		
			$('.timeline').each( function() {
				
				var $timeline = $(this);
				
				$timeline.slick({
					slidesToShow: 5,
					slidesToScroll: 1,
					infinite: false,
					dots: false,
					draggable: false,
					focusOnSelect: false,
					adaptiveHeight: true,
					prevArrow: '<a class="slick-prev slick-arrow"><svg id="fe9563ff-dcd2-40f1-a252-8f41742189da" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M40,20A20,20,0,1,0,20,40,20,20,0,0,0,40,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M39,20A19,19,0,1,0,20,39,19,19,0,0,0,39,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M24,12l-8,8,8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
					nextArrow: '<a class="slick-next slick-arrow"><svg id="b7b6f25c-173e-497e-af8a-e746ec84c023" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M1,20A19,19,0,1,1,20,39,19,19,0,0,1,1,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M16,12l8,8-8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
					responsive: [
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						}
					]
				});
				
			});
		
		}
		
	}
	
/* ------------------------------------------ */
/* Module Slider */

	function initModuleSlider() {
		
		if ( $('.module-slider .slider').length ) {
			
			$('.module-slider .slider').each( function() {
				
				var $slider = $(this),
					slider_id = $slider.attr('id');
					
				$slider.find('.slider-child').on('init afterChange', function(event, slick, direction) {
					equalheight('.equal-height');
				});
				
				$slider.find('.slider-parent').on('afterChange', function(event, slick, currentSlide, nextSlide) {
					if ( currentSlide === 0 ) {
						$slider.find('.slider-parent').slick('slickSetOption', 'autoplay', false);
					}
				});
				
				$slider.find('.slider-child').on('afterChange', function(event, slick, currentSlide, nextSlide) {
					if ( currentSlide === 0 ) {
						$slider.find('.slider-child').slick('slickSetOption', 'autoplay', false);
					}
				});
				
				if ( !$slider.hasClass('slick-initialized') ) {
					
					$slider.find('.slider-parent').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						autoplay: true,
						autoplaySpeed: 10000,
						prevArrow: '<a class="slick-prev slick-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L0.99997 9L9 17" stroke="#013763" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
						nextArrow: '<a class="slick-next slick-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00098 1L9.00104 9L1.00098 17" stroke="#013763" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
						dots: true,
						appendArrows: $slider.find('.slider-nav .arrows'),
						appendDots: $slider.find('.slider-nav .dots'),
						draggable: false,
						focusOnSelect: false,
						fade: true,
						cssEase: 'linear',
						asNavFor: '.slider-child',
						adaptiveHeight: true
					});
				
					$slider.find('.slider-child').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: false,
						arrows: false,
						draggable: false,
						focusOnSelect: false,
						fade: true,
						cssEase: 'linear',
						asNavFor: '.slider-parent',
						adaptiveHeight: true
					});
				
				}
				
			});
			
		}
		
	}
	
/* ------------------------------------------ */
/* Post Feed Carousel */

	function initPostFeedCarousel() {
		
		$('.module-post_feed .feed-posts').each( function() {
			
			var $slider = $(this),
				infinite = true,
				prev_arrow = '<a class="slick-prev slick-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L0.99997 9L9 17" stroke="#013763" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
				next_arrow = '<a class="slick-next slick-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00098 1L9.00104 9L1.00098 17" stroke="#013763" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
				append_arrows = $slider.parent().find('.feed-nav');
				
			if ( $body.hasClass('maf-page') ) {
				
				var infinite = false,
				prev_arrow = '<a class="slick-prev slick-arrow"><svg id="fe9563ff-dcd2-40f1-a252-8f41742189da" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M40,20A20,20,0,1,0,20,40,20,20,0,0,0,40,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M39,20A19,19,0,1,0,20,39,19,19,0,0,0,39,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M24,12l-8,8,8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
				next_arrow = '<a class="slick-next slick-arrow"><svg id="b7b6f25c-173e-497e-af8a-e746ec84c023" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M1,20A19,19,0,1,1,20,39,19,19,0,0,1,1,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M16,12l8,8-8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
				append_arrows = $slider;
				
			}
			
			$slider.slick({
				infinite: infinite,
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: false,
				draggable: false,
				focusOnSelect: false,
				adaptiveHeight: true,
				prevArrow: prev_arrow,
				nextArrow: next_arrow,
				appendArrows: append_arrows,
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							adaptiveHeight: false
						}
					}
				]
			});
			
		});
		
	}
	
/* ------------------------------------------ */
/* Mobile Slider */

	function initMobileSlider() {
		
		$('.column-row.mobile-slider .row').each( function() {
			
			var $slider = $(this);
			
			if ( $slider.length ) {
			
				$slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					draggable: false,
					focusOnSelect: false,
					mobileFirst: true,
					adaptiveHeight: true,
					prevArrow: '<a class="slick-prev slick-arrow"><svg id="fe9563ff-dcd2-40f1-a252-8f41742189da" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M40,20A20,20,0,1,0,20,40,20,20,0,0,0,40,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M39,20A19,19,0,1,0,20,39,19,19,0,0,0,39,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M24,12l-8,8,8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
					nextArrow: '<a class="slick-next slick-arrow"><svg id="b7b6f25c-173e-497e-af8a-e746ec84c023" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M1,20A19,19,0,1,1,20,39,19,19,0,0,1,1,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M16,12l8,8-8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
					responsive: [
						{
							breakpoint: 768,
							settings: "unslick"
						}
					]
				});
			
			}
			
		});
		
	}
	
/* ------------------------------------------ */
/* Inline Popup */

	function inlinePopup() {
		
		$('.__active .ip-container').not('.ip-init').each( function() {
			
			var $ip_container = $(this);
			
			$ip_container.not('.ip-no-inline').addClass('ip-init').inlinePopup({
				itemSelector: '.ip-item',
				detailsElem: 'ip-details',
				activeFirst: false,
				arrow: false,
				scrollToViewPort: false
			});
			
		});
		
        $('.tab-list').find('a').on('click', function() {
			$('.inlinepopupClose').trigger('click');
		});
		
	}
	
/* ------------------------------------------ */
/* Pathways Slider */

	function initPathwaysSlider() {
		
		$('.pathways-slider').each( function() {
			
			var $slider = $(this),
				$slider_stage = $slider.closest('.career-pathways-grid').find('.slider-stage');
				
			$slider.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: false,
				prevArrow: '<a class="slick-prev slick-arrow"><svg id="fe9563ff-dcd2-40f1-a252-8f41742189da" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M40,20A20,20,0,1,0,20,40,20,20,0,0,0,40,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M39,20A19,19,0,1,0,20,39,19,19,0,0,0,39,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M24,12l-8,8,8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
				nextArrow: '<a class="slick-next slick-arrow"><svg id="b7b6f25c-173e-497e-af8a-e746ec84c023" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M1,20A19,19,0,1,1,20,39,19,19,0,0,1,1,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M16,12l8,8-8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
				dots: false,
				draggable: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 500,
						settings: {
							slidesToShow: 1,
						}
					}
				]
			});
			
			$slider.find('.ip-item').each( function() {
				
				var $item = $(this),
					item_details = $item.find('.ip-details').html();
					
				$item.on('click', function() {
					if ( $item.hasClass('active') ) {
						$slider_stage.slideUp(300);
						$item.removeClass('active');
					} else {
						$slider.find('.ip-item').removeClass('active');
						$slider_stage.slideDown(300).find('.inlinepopup_content').html(item_details);
						$item.addClass('active');
					}
				});
				
			});
			
		});
		
	}
	
/* ------------------------------------------ */
/* Footer Mobile Menu */

	function initFooterMobileMenu() {
		
		$('.footer-v2 .widget_nav_menu .menu').each( function () {
			
			var $menu = $(this),
				$menu_link = $menu.find('> li.menu-item-has-children > a'),
				screen_width = $(window).width();
				
			if ( screen_width < 768 ) {
				
				if ( !$menu_link.find('.indicator').length ) {

					$menu_link.append('<span class="indicator"><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="#5C5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
				
				}

				$menu_link.find('.indicator').on('click', function(e) {
					
					e.preventDefault();
					
					var $this = $(this).closest('li').find('> a'),
						$sub = $this.closest('li').find('.sub-menu');
					
					if ($sub.length) {
						if ($this.closest('li').hasClass('sub-open')) {
							$this.closest('li').removeClass('sub-open');
						} else {
							$this.closest('li').addClass('sub-open');
						}
						$sub.stop(true,true).slideToggle(200);
					}
					
					return false;
					
				});
			
			} else {
				
				$menu_link.find('.indicator').remove();
				
			}
			
		});
		
	}
	
/* ------------------------------------------ */
/* Content Tabs */
	
	function initContentTabs() {
		var selectors = {
			nav: "[data-features-nav]",
			tabs: "[data-features-tabs]",
			active: ".__active"
		};
		var classes = {
			active: "__active"
		};
		$("a", selectors.nav).on("click", function(event) {
			var $this = $(this)[0];
			var $index = $(this).index();
			
			$(selectors.active, selectors.nav).removeClass(classes.active);
			$($this).addClass(classes.active);
			$("div", selectors.tabs).removeClass(classes.active);
			$($this.hash, selectors.tabs).addClass(classes.active);
			if ( $(".tab-list li a.__active").attr("href") === "#all-positions" ) {
				$("div", selectors.tabs).addClass(classes.active);
			}
			inlinePopup();
			equalheight('.equal-height');
			event.preventDefault();
			return false;
		});
	}
	
/* ------------------------------------------ */
/* Mosaic Tiles */
	
	function initMosaicTiles() {
		
		$('.mosaic-tiles').each( function() {
			
			var $mosaic = $(this);
			
			$mosaic.find('.tile').each( function() {
			
				var $tile = $(this),
					screen_width = $(window).width();
				
				if ( screen_width <= 991 ) {
				
					$tile.find('.toggle').on('click', function() {
						
						if ( $tile.hasClass('active') ) {
							$tile.removeClass('active');
						} else {
							$tile.addClass('active');
						}
						
					});
				
				} else {
					
					$mosaic.find('.tile').removeClass('active');
					
				}
			
			});
			
		});
		
	}
	
/* ------------------------------------------ */
/* Square Up */
	
	function initSquareUp() {
		
		$('.square-up').each( function() {
			
			var $this = $(this),
				get = $this.attr('data-get'),
				width = $this.outerWidth(),
				height = $this.outerHeight();
			
			if ( get == 'height' ) {
				$this.css({height: width+'px'});
			} else {
				$this.css({width: height+'px'});
			}
			
		});
		
	}
	
/* ------------------------------------------ */
/* Accordion */

	function initAccordion() {
		
		if ( $body.hasClass('page-template-template-mariam-assefa') ) { // OLD
			
			$('.accordion > li:eq(0) .panel-head').addClass('active').next().slideDown();
	
			$('.accordion .panel-head').click(function(j) {
				var dropDown = $(this).closest('li').find('.panel-content');
		
				$(this).closest('.accordion').find('.panel-content').not(dropDown).slideUp(100);
		
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				} else {
					$(this).closest('.accordion').find('.panel-head.active').removeClass('active');
					$(this).addClass('active');
				}
		
				dropDown.stop(false, true).slideToggle(100);
		
				j.preventDefault();
			});
			
		} else {
	
			//$('.accordion > li:eq(0) .panel-head').addClass('active').next().slideDown();
	
			$('.accordion .panel-head').click(function(e) {
				
				var $this = $(this),
					$dropDown = $this.closest('li').find('.panel-content');
		
				// $this.closest('.accordion').find('.panel-content').not($dropDown).slideUp(100);
		
				if ($this.hasClass('active')) {
					$this.removeClass('active');
				} else {
					// $this.closest('.accordion').find('.panel-head.active').removeClass('active');
					$this.addClass('active');
				}
		
				$dropDown.stop(false, true).slideToggle(100);
				
				if ( $this.closest('.equal-height').length ) {
					$this.closest('.equal-height').css({height: 'auto'});
					/*setTimeout( function() {
						equalheight('.equal-height');
					}, 150);*/
				}
		
				e.preventDefault();
				
			});
		
		}
	
	}
	
/* ------------------------------------------ */
/* Column Row Slider */

	function initColSlider() {
		
		if ( $body.hasClass('page-template-template-mariam-assefa') ) { // OLD
		
			$('.col-slider').each( function() {
				
				var screen_width  = $(window).width();
				
				if ( screen_width > 767 ) {
				
					$(this).slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: false,
						prevArrow: '<a class="slick-prev slick-arrow"><span></span></a>',
						nextArrow: '<a class="slick-next slick-arrow"><span></span></a>',
						dots: false,
						focusOnSelect: true
					});
				
				}
				
			});
		
		} else {

			$('.col-slider').each( function() {
				
				var screen_width  = $(window).width();
				
				if ( screen_width > 767 ) {
				
					$(this).slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: false,
						prevArrow: '<a class="slick-prev slick-arrow"><svg id="fe9563ff-dcd2-40f1-a252-8f41742189da" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M40,20A20,20,0,1,0,20,40,20,20,0,0,0,40,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M39,20A19,19,0,1,0,20,39,19,19,0,0,0,39,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M24,12l-8,8,8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
						nextArrow: '<a class="slick-next slick-arrow"><svg id="b7b6f25c-173e-497e-af8a-e746ec84c023" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M1,20A19,19,0,1,1,20,39,19,19,0,0,1,1,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M16,12l8,8-8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
						dots: false,
						focusOnSelect: true
					});
				
				}
				
			});
			
			$('.col-slider-solo').each( function() {
				
				var $slider = $(this),
					screen_width  = $(window).width();
				
				if ( screen_width > 767 ) {
				
					$(this).slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: false,
						adaptiveHeight: true,
						dots: true,
						arrows: true,
						prevArrow: '<a class="slick-prev slick-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L0.99997 9L9 17" stroke="#013763" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
						nextArrow: '<a class="slick-next slick-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00098 1L9.00104 9L1.00098 17" stroke="#013763" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
						dots: true,
						appendArrows: $slider.next('.col-slider-solo-nav'),
						appendDots: $slider.next('.col-slider-solo-nav').find('.dots'),
						focusOnSelect: true
					});
				
				}
				
			});
			
			$('.module-logos .logo-wrap').each( function() {
				
				var $slider = $(this),
					$module = $slider.closest('.module'),
					screen_width  = $(window).width();
				
				if ( screen_width > 767 || $module.hasClass('mobile-slider') ) {
					
					$slider.on('init', function(event, slick, direction) {
						setTimeout(function() {
							initSquareUp();
							$slider.slick('refresh');
						}, 500);
					});
					$slider.on('init setPosition afterChange', function(event, slick, direction) {
						setTimeout(function() {
							initSquareUp();
						}, 500);
					});
				
					$slider.slick({
						slidesToShow: 6,
						slidesToScroll: 1,
						infinite: false,
						initialSlide: 1,
						prevArrow: '<a class="slick-prev slick-arrow"><svg id="fe9563ff-dcd2-40f1-a252-8f41742189da" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M40,20A20,20,0,1,0,20,40,20,20,0,0,0,40,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M39,20A19,19,0,1,0,20,39,19,19,0,0,0,39,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M24,12l-8,8,8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
						nextArrow: '<a class="slick-next slick-arrow"><svg id="b7b6f25c-173e-497e-af8a-e746ec84c023" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="M0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z" style="fill:#fff;fill-rule:evenodd"/><path d="M1,20A19,19,0,1,1,20,39,19,19,0,0,1,1,20Z" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M16,12l8,8-8,8" style="fill:none;stroke:#013763;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg></a>',
						dots: false,
						focusOnSelect: true,
						responsive: [
							{
								breakpoint: 767,
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3
								}
							},
							{
								breakpoint: 460,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2
								}
							}
						]
					});
				
				}
				
			});
		
		}
	
	}
	
/* ------------------------------------------ */
/* Tabbed Menu */

	function initTabbedMenu() {
		
		$('.tabbed-menu li').on('click', function() {
			
			var $this = $(this),
				$menu = $(this).closest('ul');
				
			$menu.find('.active').removeClass('active');
				
			$this.addClass('active');
			
		});
		
	}
	
/* ------------------------------------------ */
/* Auto Height Animate */
	
	function autoHeightAnimate(element, time) {
		var curHeight = element.height(), // Get Default Height
			autoHeight = element.css('height', 'auto').outerHeight(); // Get Auto Height
		element.height(curHeight); // Reset to Default Height
		element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
	}
	
/* ------------------------------------------ */
/* Grantee Partners */

	function granteePartnersAjax() {
		
		var $partner_wrap = $('.partner-wrap'),
			when = $partner_wrap.find('.filter-tabs li.active').attr('data-value'),
			where = $partner_wrap.find('.filter-drop select').val(),
			what = $partner_wrap.find('.filter-alpha li.active').attr('data-value');
			
		$partner_wrap.find('.partner-items').addClass('loading').find('.partner-ajax').empty();
		
		jQuery.ajax({
			type: "POST",
			url: wp_helper.ajax_url,
			data: {
				action: 'grantee_partners',
				when: when,
				where: where,
				what: what
			},
			success: function(data, response) {
				$partner_wrap.find('.partner-ajax').html(data);
				setTimeout(function() {
					initExpandContent();
					$partner_wrap.find('.partner-items').removeClass('loading');
				}, 500);
			}
		});
		
	}

	function initGranteePartners() {
		
		var $partner_wrap = $('.partner-wrap');
		
		$partner_wrap.find('.partner-filter .tabbed-menu li').on('click', granteePartnersAjax);
		$partner_wrap.find('.filter-drop select').on('change', granteePartnersAjax);
		
	}
	
/* ------------------------------------------ */
/* Expand Content */

	function initExpandContent() {
		
		$('.expand-content .more').on('click', function() {
			
			var $this = $(this),
				$parent = $this.closest('.expand-content'),
				$parent_top = $this.closest('.expand-parent');
				
			if ( $parent.hasClass('expanded') ) {
				$parent_top.removeClass('expanded');
				$parent.removeClass('expanded').stop().animate({ height: '120px' }, 300);
				$this.find('span').text('More');
				$('html, body').animate({
                    scrollTop: $parent.closest('.item').offset().top - $header.outerHeight()
                }, 300);
			} else {
				$parent_top.addClass('expanded');
				$parent.addClass('expanded');
				$this.find('span').text('Less');
				autoHeightAnimate($parent, 300);
			}
			
		});
		
	}
	
/* ------------------------------------------ */
/* Toggle Drop */

	function initToggleDrop() {
		
		$('.toggle-drop .trigger').on('click', function() {
			
			var $this = $(this),
				$parent = $this.closest('.toggle-drop');
			
			$parent.stop(true, true).toggleClass('open');
			
			$parent.find('li').on('click', function() {
				$li = $(this);
				$parent.find('li').not($li).removeClass('active');
				$li.addClass('active');
				$parent.removeClass('open');
			});
			
		});
		
	}
	
/* ------------------------------------------ */
/* Equal Height All */

	function initEQ() {
		
		$('.eq-parent').each(function() {  
			var min_highestBox = 0;
			$('.eq-item', this).height('auto');
			$('.eq-item', this).each(function() {
				if($(this).height() > min_highestBox) {
					min_highestBox = $(this).height(); 
				}
			});
			$('.eq-item',this).height(min_highestBox);
		});
		
	}
	
/* ------------------------------------------ */
/* Playbook */

	function initPlaybook() {
		
		var $playbook_main = $('.playbook-main');
			
		if ( $playbook_main.length ) {
			
			$playbook_main.find('.version-wrap .version-index ul li a').on('click', function() {
				
				var $this = $(this),
					$version = $this.closest('.version-wrap'),
					sub_section = $this.attr('data-sub-section'),
					$sub_section = $('.version-content [data-sub-section="'+sub_section+'"]');
				
				$('html, body').animate({
					scrollTop: $sub_section.offset().top - ( $header.find('.nav-bar').outerHeight() + 15 )
				}, 300);
				
			});
			
		}
		
		var $version_map = $playbook_main.find('.playbook-version-map');
		
		$version_map.find('.map-pin').on('click touch', function() {
			
			var $pin = $(this),
				pin_url = $pin.attr('data-url');
				
			if ( pin_url ) {
				
				console.log(pin_url);
				
				window.location.href = pin_url;
				
			}
			
		});
		
	}
	
/* ------------------------------------------ */
/* Export Pathways Users */

	function initExportPathwaysUsers() {
		
		$('.export-pathways-users').on('click', function (e) {
			e.preventDefault();
			console.log('test export-pathways-users');
			var $that = $(this),
				type = $that.attr('data-type');
			$that.addClass('processing');
			$.ajax({
				type: "POST",
				url: wp_helper.ajax_url,
				data: {
					action: 'export_pathways_users',
					type: type,
					// nonce: wp_helper.nonce
				},
				success: function (res) {
					$that.removeClass('processing');
					if (res.success) {
						window.location.href = res.data;
					} else {
						// window.alert(res.data);
					};
				},
				error: function (jqXHR, exception) {
					console.log(jqXHR);
				}
			});
		});
		
	}
	
/* ------------------------------------------ */
/* Document Ready */
    
	$(document).ready( function() {
		
		initMegaMenu();
		
		initNavClick();
		
		initWPMLDrop();
		
		equalheight('.equal-height');
		equalheightset('.equal-height-set');
		
		initHomeHeroSlider();
		initHeroModuleAdjust();
		initMobileSearch();
		initDesktopSearch();
		initContentTabs();
		initMosaicTiles();
		
		inlinePopup();
		initPathwaysSlider();
		
		initSquareUp();
		initAccordion();
		initColSlider();
		
		initTabbedMenu();
		initGranteePartners();
		initExpandContent();
		initToggleDrop();
		
		initEQ();
		initPlaybook();
		initExportPathwaysUsers();
		
	});
	
/* ------------------------------------------ */
/* Window Events */

	$(window).on('load', function() {
		
		initMegaMenu();
		
		equalheight('.equal-height');
		equalheightset('.equal-height-set');
		
		initHomeHeroSliderAdjust();
		initTimelineSlider();
		initModuleSlider();
		initPostFeedCarousel();
		initMobileSlider();
		initFooterMobileMenu();
		
		initSquareUp();
		
	});
	
	$(window).on('resize', function() {
		
		var screen_width = $(window).width();
				
		if ( screen_width >= 992 ) {
		
			equalheight('.equal-height');
			equalheightset('.equal-height-set');
		
		}
		
		initFancyboxMemberAdjust();
		initHomeHeroSliderAdjust();
		initHeroModuleAdjust();
		initTimelineSlider();
		initModuleSlider();
		initPostFeedCarousel();
		initMobileSlider();
		initFooterMobileMenu();
		
		initSquareUp();
		
		initEQ();
		
	});
	
	$(window).on('scroll', function() {
		
		initStickyHeader();
		
	});
	
	// From Smush Pro
	$(window).on('lazyloaded', function() {
		
		equalheight('.equal-height');
		equalheightset('.equal-height-set');
		
	});

	$('.search-field-reset-button').on('click', function() {
		$(this).prev().val('');
	});

	$('body').on('click', '.event-card-button', function(e) {
		e.preventDefault();

		$('.event__filters input[value="' + $(this).attr('data-term') + '"]').each(function() {
			if ($(this).prop('checked')==false){ 
				$(this).trigger('click');
			}
		});
	});

	function replaceAll(string, search, replace) {
		return string.split(search).join(replace);
	}	
	
	$('a[href*="#WESapplication"').on('click', routeToApplication);

	function routeToApplication(e) {
		
		e.preventDefault();
		
		var routeUrl =  $(this).attr('href').split('#WESapplication').pop();
		routeUrl = replaceAll(routeUrl,'_','/');
		console.log(routeUrl);
		
		$.ajax({
			type: "POST",
			url: wp_helper.ajax_url,
			data: {
				action: 'ipstack'
			},
			success: function(response) {
				
				var access_key = response.data.access_key;
				
				// get IP
				let options = {
					dataType: "jsonp",
					type: "GET",
					url: 'https://api.ipstack.com/check',
					data: {
						access_key: access_key
					}
				};
				
				$.ajax(options).done((json) => {
					console.log("Request origin country: " + json.country_name);
					
					if (json.country_name === "China") {
						window.location.href = 'https://evaluations.wes.org' + routeUrl;
					} else {
						window.location.href = 'https://applications.wes.org' + routeUrl;
					}
				}).fail(() => {
					// default to applications.wes.org
					window.location.href = 'https://applications.wes.org' + routeUrl;
				});
				
			}
		});
		
	}

});
