
var Nav = (function(){

    var $body = $('body'),
    	nav_is_fixed,
        $mBar = $(".nav .mobile .bar"),
        $mMenu = $(".nav__mobile"),

        ua = navigator.userAgent.toLowerCase(),
        isAndroid = ( ua.indexOf('android') > -1 ) ? true : false,
        iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,

        currentScrollPos;

        if( iOS ){
            $(window).scroll(function(){
                currentScrollPos = $(document).scrollTop();
            });         
        }


    var init = function(){      

        /****************************
            Fixed Nav
        *****************************/
        checkMobileNav();
        $(window).scroll(function(){
            checkMobileNav();
        });     


        /****************************
            Top Nav Click
        *****************************/
        BindDropClick();


        /****************************
            Main Nav Click
        *****************************/
        if ( !$body.hasClass('page-template-template-mariam-assefa') ) {
	        main_nav_click();
        }


        /*****************************
            Hide Dropdowns, Searchform on Resize
        *****************************/      
        $(window).resize(function(){
            $(".main--drop").removeClass("drop--open");
            if ( !$body.hasClass('page-template-template-mariam-assefa') ) {
	            $(".nav__main ul li ul").hide();
            }

            //hide menus & search   
            if( !isAndroid ){                                           
                $(".nav__search__container").hide();                
            } else {
                if( !$('.nav--search').is(':focus') ){
                    $(".nav__search__container").hide();
                }
            }
        });
                

        /****************************
            Mobile Click 
        *****************************/      
        mobile_click_events();

    };



    function main_nav_click(){
        $(".main-nav-item").on("click",function(){
            var $item = $(this).parent().find("ul").eq(0);
            $(".nav__main ul li ul").not($item).hide();
            $item.toggle();         
            
            //hide search
            $(".nav__search__container").hide();            
        });

        $(document).on('click', function(e){
            if( $(e.target).parents('.nav__main').length == 0 ){
                $(".nav__main ul li ul").hide();
            }
        }); 
    }   
        

    function checkMobileNav(){
        var sTop = $(window).scrollTop();
        if(sTop >= 114 && !$mBar.hasClass("mobile--top")){
            $mBar.addClass("mobile--top");
            $mMenu.addClass("mobile--top");

            nav_is_fixed = true;

            if( $('.nav__mobile').is(':visible') ){
                $('html, body').addClass('no_scroll');
                $('.main_wrapper').addClass('opaque--nav_display');
            }           
        }
        else if(sTop < 114 && $mBar.hasClass("mobile--top")){
            $mBar.removeClass("mobile--top");
            $mMenu.removeClass("mobile--top");

            nav_is_fixed = false;
            
            if( $('.nav__mobile').is(':visible') ){
                $('html, body').removeClass('no_scroll');                       
                $('.main_wrapper').removeClass('opaque--nav_display');
            }           
        }
    }


    function BindDropClick(){   
        // Display sub link
        $('body').on('click', '.main--drop--selected', function(){          
            var sub_link = $(this).siblings('.main--drop--option');
            
            if( $('.main--drop--option').not(sub_link).hasClass('show') ){
                $('.main--drop--option').removeClass('show')
            }

            sub_link.toggleClass('show');
        });     

        // Sub link click
        $('body').on('click', '.main--drop--option.show', function(){
            var orig_display_link = $(this).parent().children('.main--drop--selected');

             orig_display_link.removeClass('main--drop--selected').addClass('main--drop--option');
             $(this).removeClass('main--drop--option show').addClass('main--drop--selected');           
        });

        // Hide Sub link on off click
        $(document).on('click', function(e){
            if( e.target.className !== 'main--drop--selected' ){
                $('.main--drop--option').removeClass('show');
            } 
        });
    }
    

    function mobile_click_events(){
        // Hamburger Click
        $('body').on("click", ".hamburger", function(){
            // Toggle Nav Display
            $(".nav__mobile").toggle();
            $(this).toggleClass("openNav");

            // Prevent body scroll && iOS specific logic
            if( $(this).hasClass('openNav') ){              
                $('.main_wrapper').addClass('opaque--nav_display');

                if( nav_is_fixed ){
                    $('html, body').addClass('no_scroll');              
                }

                if( iOS ){
                    $('.main_wrapper').addClass('opaque--nav_display');
                    removeIOSRubberEffect();
                }
            } else {
                $('html, body').removeClass('no_scroll');               
                $('.main_wrapper').removeClass('opaque--nav_display');
            }
            
        });
        
        // Nav Item Click
        $(".nav__mobile a.drop").on("click",function(e){
            e.preventDefault();

            var $drop = $(this).parent().find("ul").eq(0);
            $drop.toggle();
            $(".nav__mobile ul ul").not($drop).hide();
            $(this).toggleClass("openDrop");
            $("a.drop").not($(this)).removeClass("openDrop");
        });
    }


    function removeIOSRubberEffect() {
        $('.scrollable').on('touchstart', function(){
            var top = $(this).scrollTop,
                totalScroll = $(this).scrollHeight,
                currentScroll = top + $(this).offsetHeight;
 
            if ( top === 0 ) {
                $(this).scrollTop = 1;
            } else if ( currentScroll === totalScroll ) {
                $(this).scrollTop = top - 1;
            }
        });
    }


    /***********************
        TEMP REMOVED - do not use as fn call
    ************************/ 
    function ios_prevent_scrolling(){
        if( iOS ){
            if( $(this).hasClass('openNav') ){
                $('.logo--mobile').hide();              

                $('.main_wrapper')
                    .css({
                        'position': 'fixed'
                    })
                    .addClass('opaque--nav_display');

                removeIOSRubberEffect();

                localStorage.setItem('cachedScrollPos', currentScrollPos);
            } else {                
                $('.logo--mobile').show();
                $('.main_wrapper')
                    .css({                  
                        'position': 'relative'
                    })
                    .removeClass('opaque--nav_display');
                
                $('body').scrollTop( localStorage.getItem('cachedScrollPos') );
            }
        }       
    }


    return {
        init: init
    }

})();


var Carousels = (function(){

    var init = function(){
        // Init carousels
        $('.carousel').carousel({
            interval: false
        });
        
        $(".carousel").swiperight(function() {  
            $(this).carousel('prev');  
        });  
        $(".carousel").swipeleft(function() {  
            $(this).carousel('next');  
        });  
    };


    return {
        init: init
    }

})();


var Email_Input = (function(){

    var $email_events = $('.email_upd--events .wpcf7-form input[type="email"]'),
        $email_footer = $('.email_upd--footer .wpcf7-form input[type="email"]');

    var init = function(){

        // Email Input form
        email_input_size()      

        $(window).resize(function(){
            email_input_size()          
        });     

    };


    function email_input_size(){
        // Set initial email footer input size
        $email_footer.attr('size', '20');

        if( $(window).width() > 1380 ){
            $email_events.attr('size', '40');               
        } else if( $(window).width() < 1380 && $(window).width() > 1140 ){
            $email_events.attr('size', '30');       
        } else {
            $email_events.attr('size', '20');           
        }
    };

    return {
        init: init
    }

})();


var Footer = (function(){

    var init = function(){
        
        /**************************
            Footer Menu Dropdowns
        ***************************/
        menu_toggle();
        $(window).resize(function(){
            if( $(window).width() < 832 ){                  
                // Remove clear from div to prevent extra spacing
                $('.footer__menu').removeClass('clearfix');

                // Hide any previously displayed sub menu's & toggle glyphs
                if( $('.footer__col ul').hasClass('show') ){
                    $('.footer__col ul').removeClass('show')
                }

                if( $('.col-title--wrapper > .glyphicon').hasClass('glyphicon-triangle-bottom') ){
                    $('.col-title--wrapper > .glyphicon')
                        .removeClass('glyphicon-triangle-bottom')
                        .addClass('glyphicon-triangle-right');
                }
            } else {
                // Add back clear on footer menu div
                $('.footer__menu').addClass('clearfix');
            }   
        });

        /**************************
            Reorder Footer Links
        ***************************/
        reorder_links();
        $(window).resize(function(){
            clearTimeout(window.resizedReorder);
            window.resizedReorder = setTimeout(reorder_links, 150);
        });
    };


    function menu_toggle(){                 
        $('body').on('click', '.footer__col', function(e){
            var $this = $(this),
                icon = $this.children('.col-title--wrapper').children('.glyphicon');

            /*****************************
                Toggle submenu display
            ******************************/
            if( !$this.hasClass('footer__social') ){
                // Hide currently displayed submenu's
                $('.footer__col ul').not( $this.children('ul') ).removeClass('show');
                $('.footer__col .social').removeClass('show');
                $('.email_upd--footer').removeClass('show');
                
                //toggle clicked element submenu
                $this.children('ul').toggleClass('show');                   
            } else {
                // Hide currently displayed submenu's
                $('.footer__col ul').not( $this.children('ul') ).removeClass('show');
                
                // toggle social, email input
                $this.children('.social').toggleClass('show');
                $('.email_upd--footer').toggleClass('show');                                                            
            }

            /*****************************
                Toggle Glyphicon
            ******************************/
            if( icon.hasClass('glyphicon-triangle-right') ){                    
                // Toggle currently displayed glyphs
                $('.glyphicon-triangle-bottom')
                    .not(icon)
                    .removeClass('glyphicon-triangle-bottom')
                    .addClass('glyphicon-triangle-right');

                // Toggle clicked element glyph
                icon.removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom');
            } else {
                icon.removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right');
            }
        }); 
    }


    function reorder_links(){
        if( $(window).width() < 832 ){
            $('.priv_pol, .terms_cond').prependTo('.footer__links ul');
        } else if( $('.priv_pol').is(':first-child') ){
            $('.copyright').prependTo('.footer__links ul');
        }
    }


    return {
        init: init
    }



})();


var Header = (function(){

    var ua = navigator.userAgent.toLowerCase(),
        isAndroid = ( ua.indexOf('android') > -1 ) ? true : false;


    var init = function(){
        // Apply Now
        // $('.js_apply_now').on('click', function(){
        //     $('.apply-now').show();
        //     prevent_body_scroll();
        // });

        $('.close_apply').on('click', function(){
            $('.apply-now').hide();
            $('html, body').removeClass('no_scroll')
            $(document).unbind('touchmove');
        });

        // Toggle scroll prevention depending on width & device
        $(window).resize(function(){
            if( $(window).width() > 959 && $('html, body').hasClass('no_scroll') ){
                $('html, body').removeClass('no_scroll');               
                $(document).unbind('touchmove');
            } else {
                if( $('.apply-now').is(':visible') ){
                    prevent_body_scroll();
                }
            }
        });
    };


    function prevent_body_scroll(){
        if( $(window).width() < 960 ){
            $('html, body').addClass('no_scroll');

            if( isAndroid ){
                $(document).on('touchmove', function(e){
                    e.preventDefault();
                });
            }
        }       
    }


    return {
        init: init
    }



})();


var Search = (function(){

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;


    var init = function(){
        // Toggle Search Display
        toggle_search();    

        // Resize - on desktop, remove opaque display       
        $(window).resize(function(){
            if( $(window).width() > 959 ){
                $(".mobile__search__box").hide();   
                $('header, .banner, section, footer').hasClass('opaque') ? $('header, .banner, section, footer').removeClass('opaque') : null;                      
            }
        });
    };


    function toggle_search(){

        $(".nav__search, .nav--search--close").on("click",function(){
            $(".nav__search__container").toggle();
            // hide nav drop downs
            $(".nav__main ul li ul").hide();
        });

        $(".mobile__search, .mobile--search--close").on("click",function(){
            $(".mobile__search__box").toggle();
            on_search_display();

            // Prevent body scrolling
            $('html, body').toggleClass('no_scroll');           
            if( iOS ){
                if( $('.mobile__search__box').is(':visible') ){
                    $(document).on('touchmove', function(e){
                        e.preventDefault();
                    });     
                } else {
                    $(document).unbind('touchmove');
                }       
            }
        });
    }


    function on_search_display(){
        $('header, .banner, section, footer').toggleClass('opaque');
    }

    return {
        init: init
    }


})();

// More Button
$('.intro_more-button').on('click', function(){
    $( '.more_cont' ).slideToggle( "fast" , function() {
        if ($('.more_cont').is(":visible") ) {
            $('.intro_more-button').text('Less');
        } else {
            $('.intro_more-button').text('More');
        }
    });
});

function replyClick() {
    if ( $( '#respond' ).is( ":hidden" ) ) {
        $( '#respond' ).slideDown( "fast" );
    } else {
        $( '#respond').hide();
    }
}

function shareToggle() {
    if ( $( '.socialBtns' ).is(":hidden" ) ) {
        $( '.socialBtns' ).slideDown("fast");
    } else {
        $('.socialBtns').hide();
    }
}

// Research Sidebar
$(document).on('click', '.res-topic', function (e) {
    
    var host = window.location.origin;
    var type = $(this).data('type');
    var term = $(this).data('term');

    $('.research-sidebar').removeClass("research-sidebar-selected");
    $('.res-tri').hide();
    e.preventDefault();

    $(".research-results").empty();
    var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';
    $('.research-results').append(loading);
    $(".research-results").show();

    $.ajax({ url: host+"/wp-json/wp/v2/research?research_type="+term+"&per_page=100" }).done(function( data ) {
        $(".research-results").empty();
        console.log(data);
        for (i = 0; i < data.length; i++) {
            var report = "";
            var urlTitle = "";
            var webinar= "";
            var researchDiv = $("<div class='row res-topic-research-page'></div>");
            var researchImg = $("<div class='col-xs-12 col-sm-12 col-md-research-2 col-lg-research-2'><img class='card-img' src='" + data[i].better_featured_image.source_url + "' alt='research-image'></div>");
            var researchExcer = $("<div class='col-xs-12 col-sm-12 col-md-research-7 col-lg-research-7'><p>" + data[i].content.rendered + "</p>");
            var researchTitle = $("<a target='_blank' href='" +urlTitle + "'><h3 class='title'>" + data[i].title.rendered + "</h3></a>");
            var researchLinks = $("<div class='res-links-research-page green-text'> <ul><li><span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span>Report</li> <li><span class='glyphicon glyphicon-modal-window' aria-hidden='true'></span>On-Demand Webinar</li></ul> </div></div>");
            $(researchDiv).append([researchImg, researchTitle,researchExcer]);
            $('.research-results').append(researchDiv);
        }
    });

    $(".research-sidebar[data-type='" + type +"']").toggleClass( "research-sidebar-selected" );
    $(".res-tri[data-type='" + type +"']").toggle();
});

$('.research-sidebar-row .clear_filter').on('click', function(){
    $('.research-sidebar-row input[type=checkbox]').prop('checked', false);
    filter_research_topics();   
});

$(document).on('change', '.research-sidebar-row input[type=checkbox]', function(e){
    filter_research_topics();   
})//$(document).on('change', 'input[type=checkbox]', function(e){

function filter_research_topics(){
    var host = window.location.origin;
    var term = jQuery('input.one_research_topic:checked').map(function() {
                return this.value;
    }).get();   
    var $show_all = false;
    
    //If we there is no specific term to get, get all the terms.
    if(term.length < 1){
        var term = jQuery('input.one_research_topic').map(function() {
                return this.value;
        }).get(); 
        
    //Show all results since no term is set 
      var $show_all = true;
          
    }//if(term.length < 1){
    
    
        
    /*Clear our Results and show loading*/
    $(".research-results").empty();
    var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';
    $('.research-results').append(loading);
    $(".research-results").show();
        
    $.ajax({ url: host+"/wp-json/wp/v2/research?research_type="+term+"&per_page=100" }).done(function( data ) {
        $(".research-results").empty();
        
        
        if (history.pushState  && $show_all == false) {
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?research_type='+term;
          window.history.pushState({path:newurl},'',newurl);
        }else{
            
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.pushState({path:newurl},'',newurl);
        }
        
        
        
    console.log(data);
        for (i = 0; i < data.length; i++) {
              console.log(data);
        
            var report = "";
            var urlLink = data[i].acf.url;
            var webinar= "";
            var researchDiv = $("<div class='row res-topic-research-page'></div>");
            var researchImg = $("<div class='col-xs-12 col-sm-12 col-md-research-2 col-lg-research-2'><img class='card-img' src='" + data[i].better_featured_image.source_url + "' alt='research-image'></div>");
            var researchExcer = $("<div class='col-xs-12 col-md-research-7 col-lg-research-7'><p>" + data[i].content.rendered + "</p>");
            var researchTitle = $("<a target='_blank' href='"+urlLink+ "'><h3 class='title'>" + data[i].title.rendered + "</h3></a>");
            var researchLinks = $("<div class='res-links-research-page green-text'> <ul><li><span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span><a href='"+ data[i].acf.research_report_link +"' '_blank'>Report</a></li><li><span class='glyphicon glyphicon-modal-window' aria-hidden='true'></span><a href='"+ data[i].acf.research_webinar_link +"' '_blank'>On-Demand Webinar</a></li></ul> </div></div>");
            $(researchDiv).append([researchImg, researchTitle,researchExcer]);
            $('.research-results').append(researchDiv);
        }
    });
    
}//function filter_research_topics(){

var Filter_Events = (function(){

    var events = $('.event__item'),
        blogs = $('.blog__item'),
        filter_terms = '',
        filterArray = [],
        IDArr = [],
        totalEvents= "",
        countries = [],
        types = [],
        keys = [],
        keywords = [],
        topics = [],
        tags = [],
        search_terms = [];

    var init = function(){
        var thehost = window.location.origin;
        var thepath = window.location.pathname;
        
         switch (thepath) {
            case '/partners/gtb-blog/':
                var search_input = $('.blog--search').val();
                console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                break;
             case '/ca/partners/gtb-blog/':
                var search_input = $('.blog--search').val();
                console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                break;

            case '/advisor-e-guides/':
                var search_input = $('.guide--search').val();
                console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                $(window).unload(function() {
                    window.history.pushState("object or string", "Title", "/e-guides/");
                });
                break;
             case '/ca/advisor-e-guides/':
                var search_input = $('.guide--search').val();
                console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                $(window).unload(function() {
                    window.history.pushState("object or string", "Title", "/ca/e-guides/");
                });
                break;

            case '/zh-hans/advisor-e-guides/':
                var search_input = $('.guide--search').val();
                console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                $(window).unload(function() {
                    window.history.pushState("object or string", "Title", "/ca/e-guides/");
                });
                break;

            case '/events/':
                var search_input = $('.event--search').val();
                //console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                // Events search update "Showing x of y events"
                $.ajax({ url: '/wp-json/wp/v2/events?', success: function (data) {
                    var totalofEvents = data.length;
                   // $('.event-count').html("<p class='events__archive__header__item events_count  blue-text'>Showing <span id='search_total'>"+ totalEvents_search + "</span> of " + totalofEvents + " events</p>");
                }
                });
                break;
             case '/ca/events/':
                var search_input = $('.event--search').val();
                //console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                // Events search update "Showing x of y events"
                $.ajax({ url: '/wp-json/wp/v2/events?', success: function (data) {
                    var totalofEvents = data.length;
                   // $('.event-count').html("<p class='events__archive__header__item events_count  blue-text'>Showing <span id='search_total'>"+ totalEvents_search + "</span> of " + totalofEvents + " events</p>");
                }
                });
                break;

            case '/partners/events/':
                var search_input = $('.event--search').val();
                console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                // Events search update "Showing x of y events"
                $.ajax({ url: '/wp-json/wp/v2/partners-events', success: function (data) {
                    var totalofEvents = data.length;
                    //$('.event-count').html("<p class='events__archive__header__item events_count  blue-text'>Showing <span id='search_total'>"+ totalEvents_search + "</span> of " + totalofEvents + " events</p>");
                }
                });
            break;

            case '/ca/partners/events/':
                var search_input = $('.event--search').val();
                console.log( "New URL: " + thehost + thepath + search_input );
                var get = (window.location.href );
                checkURLFilters(get);
                // Events search update "Showing x of y events"
                $.ajax({ url: '/wp-json/wp/v2/partners-events', success: function (data) {
                    var totalofEvents = data.length;
                    //$('.event-count').html("<p class='events__archive__header__item events_count  blue-text'>Showing <span id='search_total'>"+ totalEvents_search + "</span> of " + totalofEvents + " events</p>");
                }
                });
            break;

        }//switch (thepath) {

    };

    function checkFilters(thepath, $loadmore) {
                    
        // Filter
        //Get search terms entered in box.
        var search_terms = [];
        var $search_term_value =  $('.nav__search__box.con .nav--search').val();
        if($search_term_value.length > 0){
            search_terms.push(  $('.nav__search__box.con  .nav--search').val() )
        }else{}
        
        
        var categories = [];
        $('.filter__category input:checked').each(function() {
            categories.push($(this).val());
        });

         var categuides = [];
        $('.filter__category__eguides input:checked').each(function() {
            categuides.push($(this).val());
        });

        var tags = [];
        $('.filter__blog-tag input:checked').each(function() {
            tags.push($(this).val());
        });

         var etags = [];
        $('.filter__guide-tag input:checked').each(function() {
            etags.push($(this).val());
        });

        var countries = [];
        $('.filter__country input:checked').each(function() {
            countries.push($(this).val());
        });

        var types = [];
        $('.filter__event-type input:checked').each(function() {
            types.push($(this).val());
        });

        var topics = [];
        $('.filter__topics input:checked').each(function() {
            topics.push($(this).val());
        });

        var keys = [];
        $('.filter__keywords input:checked').each(function() {
            keys.push($(this).val());
        });

      
        set_eventCount();
        set_partners_eventCount();
        search_wes(categories, categuides,tags,etags,countries,types, topics, keys, thepath, search_terms, $loadmore);

    };
    
    

    function makeEvent(array, value){
        value.link
        $.ajax({
            url: value.link+"?ajax=1", success: function (data) {
                $("#events-wes").append(data);
                
                var $itl = $('body').attr('data-items_to_load');
                $itl--;
                $('body').attr('data-items_to_load', $itl);
            }
        });
    }
    function makePartnerEvent(array, value){
        value.link
        $.ajax({
            url: value.link+"?ajax=1", success: function (data) {
                //console.log("makepartnerevent - response: " , data);
                    
                $("#events-wes").append(data);
                var $itl = $('body').attr('data-items_to_load');
                $itl--;
                $('body').attr('data-items_to_load', $itl);
                

            }
        });
    }
    function makeBlog(array, value){
        value.link
        $.ajax({
            url: value.link+"?template=ajax", success: function (data) {
                $("#blog-wes").append(data);
                var $itl = $('body').attr('data-items_to_load');
                $itl--;
                $('body').attr('data-items_to_load', $itl);
            }
        });
    }
     function makeBlogCA(array, value){
        value.link
        $.ajax({
            url: value.link+"?template=ajaxca", success: function (data) {
                $("#blog-wes").append(data);
                var $itl = $('body').attr('data-items_to_load');
                $itl--;
                $('body').attr('data-items_to_load', $itl);
            }
        });
    }

    function makeBlogZH(array, value){
        value.link
        $.ajax({
            url: value.link+"?template=ajax", success: function (data) {
                $("#blog-wes").append(data);
                var $itl = $('body').attr('data-items_to_load');
                $itl--;
                $('body').attr('data-items_to_load', $itl);
            }
        });
    }

    function makeEGuide(array, value){
        value.link
        $.ajax({
            url: value.link+"?ajax=1", success: function (data) {
                $("#e-guides-wes").append(data);
                var $itl = $('body').attr('data-items_to_load');
                $itl--;
                $('body').attr('data-items_to_load', $itl);
            }
        });
    }

    function set_eventCount() {
        var URL = '/wp-json/wp/v2/events?';
        $.ajax({
            url: URL, success: function (data) {
                totalEvents = data.length;
            }
        });
    }
    function set_partners_eventCount() {
        var URL = '/wp-json/wp/v2/partners-events?';
        $.ajax({
            url: URL, success: function (data) {
                totalEvents = data.length;
            }
        });
    }

    function checkURLFilters(get) {
            
        var thepath = window.location.pathname;
        var categories = [];
         var categuides = [];
        var countries = [];
        var topics = [];
        var types = [];
        var keys = [];
        var tags = [];
        var etags = [];
        var search_terms = [];
        var get = get.split("?");
        if (get[1]){
           var search = get[1].split('&');
            
            
            function eventFilter (item, index){
                var elements = item.split('=');
                //alert('the_elemnts '+elements);
                //alert('the_elemnts 0 '+elements[0]);
                //alert('the_elemnts 1 '+elements[1]);
                switch(elements[0]){
                        case 'categories':
                            categories.push(elements[1]);                           
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                             $('input[id="cat-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;      
                        case 'advisor_categories':
                            categories.push(elements[1]);                           
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                             $('input[id="cat-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) {         
                        break;  

                        case 'gtb_blog_categories':
                            categories.push(elements[1]);                           
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                             $('input[id="cat-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) {         
                        break; 
                        
                        case 'categuides':                            
                            categuides.push(elements[1]);                           
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                             $('input[id="categuides-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;
                        case 'categories_eguides':                            
                            categuides.push(elements[1]);                           
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                             $('input[id="categuides-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;
                                                        
                        case 'tags':
                            tags.push(elements[1]);                         
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                             $('input[id="tags-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) {     
                        break;
                        
                        case 'advisor_tags':
                            tags.push(elements[1]);                         
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                             $('input[id="tags-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) {     
                        break;
                        
                                                
                        case 'etags':
                            
                            etags.push(elements[1]);                            
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="etags-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;          
                        case 'countries':
                        
                            countries.push(elements[1]);                            
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="countries-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;
                        
                        
                         case 'partners_countries':
                        
                            countries.push(elements[1]);                            
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="partners_countries-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;                  
                        
                        
                        case 'partners_types':                            
                            types.push(elements[1]);                            
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="partners_types-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;
                        
                        
                        case 'types':                            
                            types.push(elements[1]);                            
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="types-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;
                        
                        case 'partners_topics':                            
                            types.push(elements[1]);                            
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="partners_topics-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                        break;
                        
                        
                        
                        case 'topics':
                        
                            topics.push(elements[1]);
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="topics-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                         
                            break;
                        case 'partners_keywords':
                                
                        
                            keys.push(elements[1]);
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="partners_keywords-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                            
                            
                            break;
                         case 'keywords':
                                
                        
                            keys.push(elements[1]);
                            var $multi = elements[1].split(',');
                            for (var i = 0, len = $multi.length; i < len; i++) {
                              $('input[id="keyword-'+ $multi[i] +'"]').prop('checked', true);
                            }//for (var i = 0, len = $multi.length; i < len; i++) { 
                            
                            
                            break;

                        case 'search':
                            search_terms.push(elements[1]);
                            $('.nav__search__box.con  .nav--search').val(decodeURIComponent(elements[1]));
                            //$('input[value="'+ search_terms[2] +'"]').prop('checked', true);
                            break;  
                    }// switch(elements[1]){
                
                
                        
            
            }// function eventFilter (item, index){
            
        
            
            search.forEach(eventFilter);
            set_eventCount();
            set_partners_eventCount();
            
            
            
            
            search_wes(categories,categuides,tags,etags,countries, types, topics, keys, thepath, search_terms);
        }else{  
        
        
        
                
            search_wes(categories,categuides,tags,etags,countries, types, topics, keys, thepath, search_terms);
        }
    };

    $( document ).ready(function() {
        var parts = window.location.search.substr(1).split("&");
        var $_GET = {};
        for (var i = 0; i < parts.length; i++) {
            var temp = parts[i].split("=");
            $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
            $('input[id="'+ decodeURIComponent(temp[1]) +'"]').prop('checked', true);
        }
    });

    function search_wes(categories, categuides, tags,etags, countries, types, topics, keys, thepath, search_terms, loadmore) {
        loadmore = (typeof loadmore !== 'undefined') ?  true : false;
            
            
        //alert('search_wes '+types);   
        //alert('search_wes '+categories);  
        
        //alert('search_terms = '+search_terms)
        //console.log('countries' +countries);
        switch (thepath) {
            case '/advisor-blog/':
                if(!loadmore){
                $('#blog-wes').empty();
                  var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';
                  $('#blog-wes').append(loading);
                }
               //$('#load-more').hide();
               var URL = '/wp-json/wp/v2/advisor-blogs?';
               break;
            
             case '/ca/advisor-blog/':
                if(!loadmore){
                $('#blog-wes').empty();
                  var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';
                  $('#blog-wes').append(loading);
                }
               //$('#load-more').hide();
               var URL = '/wp-json/wp/v2/advisor-blogs?';
               break;
            case '/zh-hans/advisor-blog/':
                if(!loadmore){
                $('#blog-wes').empty();
                  var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';
                  $('#blog-wes').append(loading);
                }
               //$('#load-more').hide();
               var URL = '/wp-json/wp/v2/advisor-blogs?';
               break;                    
               
            case '/partners/gtb-blog/':
              if(!loadmore){
                $('#blog-wes').empty();
                  var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';
                  $('#blog-wes').append(loading);
                }
               
                //$('#load-more').hide();
                var URL = '/wp-json/wp/v2/gtb-blogs?';
                break;

             case '/ca/partners/gtb-blog/':
              if(!loadmore){
                $('#blog-wes').empty();
                  var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';
                  $('#blog-wes').append(loading);
                }
               
                //$('#load-more').hide();
                var URL = '/wp-json/wp/v2/gtb-blogs?';
                break;

            case '/events/':
                set_eventCount();
                if(!loadmore){
                 $('#events-wes').empty();
                 var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';                
                $('#events-wes').append(loading);
                }
                
                var URL = '/wp-json/wp/v2/events?';
            
                break;
            case '/ca/events/':
                set_eventCount();
                if(!loadmore){
                 $('#events-wes').empty();
                 var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';                
                $('#events-wes').append(loading);
                }
                
                var URL = '/wp-json/wp/v2/events?';
             
                break;
        
            case '/partners/events/':
               //set_partners_eventCount();
                if(!loadmore){
                 $('#events-wes').empty();
                 var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';                
                $('#events-wes').append(loading);
                }
                
                var URL = '/wp-json/wp/v2/partners-events?';
              
                break;
            case '/ca/partners/events/':
               //set_partners_eventCount();
                if(!loadmore){
                 $('#events-wes').empty();
                 var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';                
                $('#events-wes').append(loading);
                }
                
                var URL = '/wp-json/wp/v2/partners-events?';
                
                break;

            case '/advisor-e-guides/':
                if(!loadmore){
                 $('#e-guides-wes').empty();
                 var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';                
                $('#e-guides-wes').append(loading);
                }
            
                var URL = '/wp-json/wp/v2/e_guides?';
                break;
             case '/ca/advisor-e-guides/':
                if(!loadmore){
                 $('#e-guides-wes').empty();
                 var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';                
                $('#e-guides-wes').append(loading);
                }
            
                var URL = '/wp-json/wp/v2/e_guides?';
                break;

                 case '/zh-hans/advisor-e-guides/':
                if(!loadmore){
                 $('#e-guides-wes').empty();
                 var loading = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';                
                $('#e-guides-wes').append(loading);
                }
            
                var URL = '/wp-json/wp/v2/e_guides?';
                break;
        }

         if (categories) {           
             if('/partners/gtb-blog/' == thepath || '/ca/partners/gtb-blog/' == thepath){
              if(categories.length > 0){
               URL = updateURLParameterWES(URL, '&gtb_blog_categories', categories);
              }else{}
            }
            else if('/advisor-blog/' == thepath || '/ca/advisor-blog/' == thepath || '/zh-hans/advisor-blog/' == thepath ){
              if(categories.length > 0){
               URL = updateURLParameterWES(URL, '&advisor_categories', categories);
              }else{}

            }else{
              if(categories.length > 0){
              URL = updateURLParameterWES(URL, '&categories', countries);
              }else{}               
            }                
         }//if (categories) {
        

        if (categuides) {
            if(categuides.length > 0){
             URL = updateURLParameterWES(URL, '&categories_eguides',  categuides);
            }else{}
        }
       if (tags) {
            if(tags.length > 0){
             URL = updateURLParameterWES(URL, '&advisor_tags',  tags);
            }else{}
        }
        if (etags) {
            if(etags.length > 0){
             URL = updateURLParameterWES(URL, '&tags_eguides',  etags);
            }else{}
        }
        if (countries) {            
            if('/partners/events/' == thepath || '/ca/partners/events/' == thepath){
              if(countries.length > 0){
               URL = updateURLParameterWES(URL, '&partners_countries', countries);
              }else{}
            }else{
              if(countries.length > 0){
              URL = updateURLParameterWES(URL, '&countries', countries);
              }else{}               
            }   
        }
        if (types) {
          
          if('/partners/events/' == thepath || '/ca/partners/events/' == thepath){
            if(types.length > 0){                     
            URL = updateURLParameterWES(URL, '&partners_types', types);
            }else{}
          }else{
            if(types.length > 0){
            URL = updateURLParameterWES(URL, '&types', types);
            }else{}         
          }//if('/partners/events/' == thepath){            
        }
        
        
        
        if (topics) {            
          if('/partners/events/' == thepath || '/ca/partners/events/' == thepath){
            if(topics.length > 0){                    
            URL = updateURLParameterWES(URL, '&partners_topics', topics);
            }else{}
          }else{
            if(topics.length > 0){
            URL = updateURLParameterWES(URL, '&topics', topics);
            }       
          }//if('/partners/events/' == thepath){        
        }// if (topics) {   
        
         if (search_terms) {
             if(search_terms.length > 0)
             URL = updateURLParameterWES(URL, '&search', search_terms[0]);
             else{
             URL = removeUrlParameterWes(URL, 'search');            
            }
        }else{ URL = removeUrlParameterWes(URL, 'search');      }
            
        if (keys) {
             
         if('/partners/events/' == thepath || '/ca/partners/events/' == thepath){
            if(keys.length > 0 > 0){                    
            URL = updateURLParameterWES(URL, '&partners_keywords', keys);
            }else{}
          }else{
            if(keys.length > 0 > 0){
            URL = updateURLParameterWES(URL, '&keywords', keys);
            }       
          }//if('/partners/events/' == thepath){
        } 

        //console.log(URL);
        var pathname = window.location.pathname;
        switch (pathname) {
            case '/events/':
                var check = URL.split("?");
                console.log(check[1]);
                
                if(window.location.href.indexOf("utm_") > -1)
                {

                     $('.filter input[type="checkbox"]').on('click', function(event){
                            //If we are currently in the middle of a search then 
                            var newURL = URL.replace("/wp-json/wp/v2/events?", "?s=");
                    // var newURL = URL.replace("/wp-json/wp/v2/events?", "?");
                    window.history.pushState("object or string", "Title", newURL);

                   });
                 
                } else{

                     if (check[1] == ""){
                    var newURL = URL.replace("/wp-json/wp/v2/events?", " ");
                    window.history.pushState("obj", "Title", newURL);
                    
                } else {
                     var newURL = URL.replace("/wp-json/wp/v2/events?", "?s=");
                    // var newURL = URL.replace("/wp-json/wp/v2/events?", "?");
                    window.history.pushState("object or string", "Title", newURL);
                }  

                }
                    
                
                break;
            case '/ca/events/':
                var check = URL.split("?");
                console.log(check[1]);

                 if(window.location.href.indexOf("utm_") > -1)
                {
                     $('.filter input[type="checkbox"]').on('click', function(event){
                        var newURL = URL.replace("/wp-json/wp/v2/events?", "?s=");
                        // var newURL = URL.replace("/wp-json/wp/v2/events?", "?");
                        window.history.pushState("object or string", "Title", newURL);
                    
                   });
                  
                } else{

                    if (check[1] == ""){
                        var newURL = URL.replace("/wp-json/wp/v2/events?", " ");
                        window.history.pushState("obj", "Title", newURL);
                        
                    } else {
                         var newURL = URL.replace("/wp-json/wp/v2/events?", "?s=");
                        // var newURL = URL.replace("/wp-json/wp/v2/events?", "?");
                        window.history.pushState("object or string", "Title", newURL);
                    }       
                }
                break;

            case '/partners/events/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                    $('.filter input[type="checkbox"]').on('click', function(event){
                        var newURL = URL.replace("/wp-json/wp/v2/partners-events?", "?s=");
                        window.history.pushState("obj", "Title", newURL);

                   });

                } else {
                    if (check[1] == ""){
                        var newURL = URL.replace("/wp-json/wp/v2/partners-events?", " ");
                        window.history.pushState("obj", "Title", newURL);
                        
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/partners-events?", "?s=");
                        window.history.pushState("obj", "Title", newURL);
                    }
               }  
                break;
             case '/ca/partners/events/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                     $('.filter input[type="checkbox"]').on('click', function(event){
                        var newURL = URL.replace("/wp-json/wp/v2/partners-events?", "?s=");
                        window.history.pushState("obj", "Title", newURL);

                   });

                } else {

                    if (check[1] == ""){
                        var newURL = URL.replace("/wp-json/wp/v2/partners-events?", " ");
                        window.history.pushState("obj", "Title", newURL);
                      
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/partners-events?", "?s=");
                        window.history.pushState("obj", "Title", newURL);
                    }
               }
                break;


            case '/advisor-blog/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                    $('.filter input[type="checkbox"]').on('click', function(event){
                        var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                   });

                } else {
                    if (check[1] == "" ){
                        var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", " ");
                        console.log(newURL);
                        window.history.pushState("obj", "Title", newURL);
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                    }
               }
                break;
            case '/ca/advisor-blog/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                     $('.filter input[type="checkbox"]').on('click', function(event){
                        var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                   });

                } else {
                    if (check[1] == "" ){
                        var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", " ");
                        console.log(newURL);
                        window.history.pushState("obj", "Title", newURL);
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                    }
                }
                break;

             case '/zh-hans/advisor-blog/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                     $('.filter input[type="checkbox"]').on('click', function(event){
                       var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                   });

                } else {
                    if (check[1] == "" ){
                        var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", " ");
                        console.log(newURL);
                        window.history.pushState("obj", "Title", newURL);
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/advisor-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                    }
                }
                break;

            case '/partners/gtb-blog/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                    $('.filter input[type="checkbox"]').on('click', function(event){
                       var newURL = URL.replace("/wp-json/wp/v2/gtb-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                   });

                } else {
                    if (check[1] == "" ){
                        var newURL = URL.replace("/wp-json/wp/v2/gtb-blogs?", " ");
                        console.log(newURL);
                        window.history.pushState("obj", "Title", newURL);
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/gtb-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                    }
                }
                break;
             case '/ca/partners/gtb-blog/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                     $('.filter input[type="checkbox"]').on('click', function(event){
                       var newURL = URL.replace("/wp-json/wp/v2/gtb-blogs?", "?s=" );
                       window.history.pushState("obj", "Title", newURL);
                   });

                } else {
                    if (check[1] == "" ){
                        var newURL = URL.replace("/wp-json/wp/v2/gtb-blogs?", " ");
                        console.log(newURL);
                        window.history.pushState("obj", "Title", newURL);
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/gtb-blogs?", "?s=" );
                        window.history.pushState("obj", "Title", newURL);
                    }
                }
                break;

            case '/advisor-e-guides/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                     $('.filter input[type="checkbox"]').on('click', function(event){
                       var newURL = URL.replace("/wp-json/wp/v2/e_guides?", "?s=");
                       window.history.pushState("obj", "Title", newURL);
                   });

                } else {
                    if (check[1] == ""){
                        var newURL = URL.replace("/wp-json/wp/v2/e_guides?", " ");
                        window.history.pushState("obj", "Title", newURL);
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/e_guides?", "?s=");
                        window.history.pushState("obj", "Title", newURL);
                    }
                }
                break;
              case '/ca/advisor-e-guides/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                    $('.filter input[type="checkbox"]').on('click', function(event){
                       var newURL = URL.replace("/wp-json/wp/v2/e_guides?", "?s=");
                        window.history.pushState("obj", "Title", newURL);
                   });

                } else {
                    if (check[1] == ""){
                        var newURL = URL.replace("/wp-json/wp/v2/e_guides?", " ");
                        window.history.pushState("obj", "Title", newURL);
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/e_guides?", "?s=");
                        window.history.pushState("obj", "Title", newURL);
                    }
                }
                break;

                case '/zh-hans/advisor-e-guides/':
                var check = URL.split("?");
                console.log(check[1]);
                 if(window.location.href.indexOf("utm_") > -1)
                {
                     $('.filter input[type="checkbox"]').on('click', function(event){
                        var newURL = URL.replace("/wp-json/wp/v2/e_guides?", "?s=");
                        window.history.pushState("obj", "Title", newURL);
                   });

                } else {
                    if (check[1] == ""){
                        var newURL = URL.replace("/wp-json/wp/v2/e_guides?", " ");
                        window.history.pushState("obj", "Title", newURL);
                    } else {
                        var newURL = URL.replace("/wp-json/wp/v2/e_guides?", "?s=");
                        window.history.pushState("obj", "Title", newURL);
                    }
                }
                break;
        }
        
        
        //At this point check if we have any query variables at all.
        //If not, we want to restore the URL to reflect this
        var $query_check =  URL.split("?"); 
        if(parseInt(0) == $query_check[1].length){
             window.history.pushState("obj", "Title", window.location.origin + pathname);
        }else{}
        
        
        
        
        
        //Force only showing 5 results perpage.
        URL += '&per_page=5';
        
        //Order by Date
        URL += '&orderby=date'; 
        
        //Order by Date
        URL += '&order=desc';   
       if (thepath == '/zh-hans/advisor-blog/'){
        //Order by Date
        URL += '&lang=zh-hans';  
       } else  if (thepath == '/zh-hans/advisor-e-guides/'){
        //Order by Date
        URL += '&lang=zh-hans';  
       }
         
        
        
        //Passing path name to Ajax function
        if(search_terms  &&  search_terms.length > 0){
            URL += '&pathname='+pathname;
        }
                
        //If we are doing a load more action
        if(loadmore){                     
          var OFFSET = $('form.nav__search__box').attr('data-offset');
          if(OFFSET > 0){
          URL += '&offset='+OFFSET;
          }else{}//if(Number.isInteger(OFFSET)){
        }else{
        //Not doing a loadmore, dont need an offset set.    
        }//if(loadmore){    
        
        console.log(URL)
        
       var the_results = $.ajax({
            url: URL, 
            success: function (data, result_message, something ) {
                
                if (thepath == '/events/' || thepath == '/ca/events/') {
                    
                    //Are we doing a load more post action.
                    if(!loadmore){
                      $('#events-wes').empty();
                    }else{}//if(!loadmore){
                        
                    
                    console.log(data);
                    var count = data.length;
                   // $('.event-count').html("<p class='events__archive__header__item events_count  blue-text'>Showing "+ count +" of "+ total_search  +" events</p>");
                    if (data.length === 0) {
                        $('#events-wes').append('<p>Sorry, we couldnt find any events that matched your criteria.<br>Please try narrowing your search.</p>');
                        $('.progress').remove();
                        $('.load_more_items').removeAttr('disabled');   
                        $('.main_wrapper').trigger('allow_wes_search');         
                    }else{
                    $('body').attr('data-items_to_load', data.length);                  
                    }// if (data.length === 0) {
                    
                    $.each(data, function (index, value) {
                         wessleep(500)
                        makeEvent(filterArray, value);
                        if((index + 1) ==  data.length ){
                            if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                            }else{}//if(loadmore){
                        }else{} //if((index + 1) ==  data.length ){         
                    })
                   

                           
                } else if (thepath == '/partners/events/' || thepath == '/ca/partners/events/') {
                    if(!loadmore){
                      $('#events-wes').empty();
                    }else{}//if(!loadmore){
                        
                  
                    console.log(data);
                    var count = data.length;
                    //$('.event-count').html("<p class='events__archive__header__item events_count  blue-text'>Showing "+ count +" of "+ total_search  +" events</p>");
                    if (data.length === 0) {
                        $('#events-wes').append('<p>Sorry, we couldnt find any events that matched your criteria.<br>Please try narrowing your search.</p>');
                        $('.progress').remove();
                        $('.load_more_items').removeAttr('disabled'); 
                        $('.main_wrapper').trigger('allow_wes_search');     
                    }else{
                    $('body').attr('data-items_to_load', data.length);                  
                    }// if (data.length === 0) {
                    
                    
                    
                    $.each(data, function (index, value) {
                         wessleep(700)
                        makePartnerEvent(filterArray, value);
                        if((index + 1) ==  data.length ){
                            if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                            }else{}//if(loadmore){
                        }else{} //if((index + 1) ==  data.length ){         
                    });
                   
                } else if (thepath == '/advisor-blog/') {
                    
                    //Are we doing a load more post action.
                    if(!loadmore){
                      $('#blog-wes').empty();
                    }else{}//if(!loadmore){
                    
                    
                    console.log(data);
                    var count = data.length;
                    if (count === 0) {
                        $('#blog-wes').append('<p>Sorry, we couldnt find any blogs that matched your criteria.<br>Please try narrowing your search.</p>');
                        $('.progress').remove();
                        $('.load_more_items').removeAttr('disabled');   
                        $('.main_wrapper').trigger('allow_wes_search'); 
                    }else{
                    $('body').attr('data-items_to_load', data.length);                  
                    }// if (data.length === 0) {
                        
                                    
                    for (index = 0; index < data.length; index++) { 
                         wessleep(500)
                        makeBlog(filterArray, data[index]);
                         
                         if((index + 1) ==  data.length ){
                            if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                            }else{}//if(loadmore){
                        }else{} //if((index + 1) ==  data.length ){     
                        
                        console.log('new');
                                                
                    }//for (index = 0; index < data.length; i++) { 
                    
                    
                    
                /*  $.each(data, function (index, value) {               
                      wessleep(400)
                                     
                       makeBlog(filterArray, value);
                       if((index + 1) ==  data.length ){
                            if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                            }else{}//if(loadmore){
                        }else{} //if((index + 1) ==  data.length ){                        
                    });*/
                
                
                
                
                
                
                
                } else if (thepath == '/ca/advisor-blog/') {
                    
                    //Are we doing a load more post action.
                    if(!loadmore){
                      $('#blog-wes').empty();
                    }else{}//if(!loadmore){
                    
                    
                    console.log(data);
                    var count = data.length;
                    if (count === 0) {
                        $('#blog-wes').append('<p>Sorry, we couldnt find any blogs that matched your criteria.<br>Please try narrowing your search.</p>');
                        $('.progress').remove();
                        $('.load_more_items').removeAttr('disabled');   
                        $('.main_wrapper').trigger('allow_wes_search'); 
                    }else{
                    $('body').attr('data-items_to_load', data.length);                  
                    }// if (data.length === 0) {
                        
                                    
                    for (index = 0; index < data.length; index++) { 
                         wessleep(500)
                        makeBlogCA(filterArray, data[index]);
                         
                         if((index + 1) ==  data.length ){
                            if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                            }else{}//if(loadmore){
                        }else{} //if((index + 1) ==  data.length ){     
                        
                        console.log('new');
                                                
                    }//for (index = 0; index < data.length; i++) { 
                    
                    
                    
                /*  $.each(data, function (index, value) {               
                      wessleep(400)
                                     
                       makeBlog(filterArray, value);
                       if((index + 1) ==  data.length ){
                            if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                            }else{}//if(loadmore){
                        }else{} //if((index + 1) ==  data.length ){                        
                    });*/
                
                
                
                
                
                
                
                } else if (thepath == '/partners/gtb-blog/' || thepath == '/ca/partners/gtb-blog/') {
                    //Are we doing a load more post action.
                    if(!loadmore){
                      $('#blog-wes').empty();
                    }else{}//if(!loadmore){
                                        
                    console.log(data);
                    var count = data.length;
                    if (count === 0) {
                        $('#blog-wes').append('<p>Sorry, we couldnt find any blogs that matched your criteria.<br>Please try narrowing your search.</p>');
                        $('.progress').remove();
                        $('.load_more_items').removeAttr('disabled'); 
                        $('.main_wrapper').trigger('allow_wes_search'); 
                    }else{
                    $('body').attr('data-items_to_load', data.length);                  
                    }// if (data.length === 0) {
                        
                        
                    $.each(data, function (index, value) {
                         wessleep(500)
                        makeBlog(filterArray, value);
                        if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                        }else{}//if(loadmore){
                    });
                } else if (thepath == '/zh-hans/advisor-blog/' || thepath == '/zh-hans/ca/advisor-blog/') {
                    //Are we doing a load more post action.
                    if(!loadmore){
                      $('#blog-wes').empty();
                    }else{}//if(!loadmore){
                                        
                    console.log(data);
                    var count = data.length;
                    if (count === 0) {
                        $('#blog-wes').append('<p>Sorry, we couldnt find any blogs that matched your criteria.<br>Please try narrowing your search.</p>');
                        $('.progress').remove();
                        $('.load_more_items').removeAttr('disabled'); 
                        $('.main_wrapper').trigger('allow_wes_search'); 
                    }else{
                    $('body').attr('data-items_to_load', data.length);                  
                    }// if (data.length === 0) {
                        
                        
                    $.each(data, function (index, value) {
                         wessleep(500)
                        makeBlogZH(filterArray, value);
                        if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                        }else{}//if(loadmore){
                    });
                }  else if (thepath == '/advisor-e-guides/' || thepath == '/ca/advisor-e-guides/' || thepath == '/zh-hans/advisor-e-guides/') {
                   if(!loadmore){
                      $('#e-guides-wes').empty();
                    }else{}//if(!loadmore){
                    console.log(data);
                    var count = data.length;
                    if (count === 0) {
                        $('#e-guides-wes').append('<p>Sorry, we couldnt find any guides that matched your criteria.<br>Please try narrowing your search.</p>');
                        $('.progress').remove();
                        $('.load_more_items').removeAttr('disabled'); 
                        $('.main_wrapper').trigger('allow_wes_search'); 
                    }else{
                    $('body').attr('data-items_to_load', data.length);                  
                    }// if (data.length === 0) {
                        
                        
                                    
                    $.each(data, function (index, value) {
                         wessleep(500)
                        makeEGuide(filterArray, value);
                        if(loadmore){
                              $('.progress').remove();
                              $('.load_more_items').removeAttr('disabled');
                        }else{}//if(loadmore){
                    });

                }
            },
        });
        


//Trigger the searching of content.
$(document).on('search_wes_content', '.main_wrapper', function(e){
   if($('.main_wrapper').hasClass('searching_for_content')){}
   else{    
    //$('.main_wrapper').css('background-color','green');
    $('.main_wrapper').addClass('searching_for_content').css({'pointer-events':'none'});
        
    var thepath = window.location.pathname;
    checkFilters(thepath);
   }//if($('body').hasClass('searching_for_content')){}
})//$(document).on('search_wes_content', function(){


//Trigger allow the searching of content.
$(document).on('allow_wes_search', '.main_wrapper', function(e){
  $('.main_wrapper').removeClass('searching_for_content');
    $('.main_wrapper').css({'pointer-events':'all'});
})//$(document).on('allow_wes_search', function(){

//When checkbox is clicked
$('.filter input[type="checkbox"]').on('click', function(event){
    //If we are currently in the middle of a search then 
    if($('.main_wrapper').hasClass('searching_for_content')){
        //Do nothing a search is going on.
         event.preventDefault();
         event.stopPropagation();    
         return false;
    }else{
    }
});//$('.filter input[type="checkbox"]').on('click', function(event){
    
        
//When a filter changes.
$('.filter input[type="checkbox"]').on('change', function(event){
    //checkFilters(thepath);
    jQuery('.main_wrapper').trigger( "search_wes_content" );
});


//When search box is submitted.
    $(document).on('submit', '.con.nav__search__box', function(e){
        if($('.main_wrapper').hasClass('searching_for_content')){}
        else{
        e.preventDefault();     
        jQuery('.main_wrapper').trigger( "search_wes_content" );    
        }
    })//$(document).on('submit', 'nav__search__box', function(e){
    
    
    

    // Clear Filters
    $('.clear_filter').on('click', function(){
        var thepath = window.location.pathname;
        $('.filter input[type="checkbox"]').prop('checked', false);
         $('.nav--search').val('');
        switch (thepath) {
            case '/events/':
                window.history.pushState("object or string", "Title", "/events/");
                break;
            case '/ca/events/':
                window.history.pushState("object or string", "Title", "/ca/events/");
                break;
            case '/partners/events/':
                window.history.pushState("object or string", "Title", "/partners/events/");
                break;
            case '/ca/partners/events/':
                window.history.pushState("object or string", "Title", "/ca/partners/events/");
                break;
            case '/advisor-blog/':
                window.history.pushState("object or string", "Title", "/advisor-blog/");
                break;
            case '/ca/advisor-blog/':
                window.history.pushState("object or string", "Title", "/ca/advisor-blog/");
                break;
            case '/partners/gtb-blog/':
                window.history.pushState("object or string", "Title", "/partners/gtb-blog/");
                break;
             case '/ca/partners/gtb-blog/':
                window.history.pushState("object or string", "Title", "/ca/partners/gtb-blog/");
                break;
            case '/advisor-e-guides/':
                window.history.pushState("object or string", "Title", "/advisor-e-guides/");
                break;
            case '/ca/advisor-e-guides/':
                window.history.pushState("object or string", "Title", "/ca/advisor-e-guides/");
                break;
                case '/zh-hans/advisor-e-guides/':
                window.history.pushState("object or string", "Title", "/zh-hans/advisor-e-guides/");
                break;
        }   
        jQuery('.main_wrapper').trigger( "search_wes_content"); 
        //checkFilters(thepath);
    });     


/*Observe changes to the body attribute*/
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var element = document.body
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type == "attributes") {
    //if we have no more items to load then we can trigger the allow wes search again.
    var $itl = $('body').attr('data-items_to_load');
     if (typeof $itl != 'undefined'){       
        if($itl < 1){
            $('.main_wrapper').trigger('allow_wes_search');
        }else{}//if($itl < 1){
         
     }else{      
        $('.main_wrapper').trigger('allow_wes_search');          
     }// if (typeof $itl != 'undefined'){
    }
  });
});

observer.observe(element, {
  attributes: true //configure it to listen to attribute changes
});



    
        
        
//Chnage when content is added or removed from div
$(document).on('DOMSubtreeModified', '#events-wes, #e-guides-wes, #blog-wes', function(){
            
            
      var pathname = window.location.pathname;
            
      switch (pathname) {
        case '/events/':
          var $count = $(this).find('.event__item').length;
        break;
        case '/ca/events/':
          var $count = $(this).find('.event__item').length;
        break;
                        
        case '/advisor-e-guides/':
          var $count = $(this).find('.e-guide-result').length;
        break;  
        
        case '/ca/advisor-e-guides/':
          var $count = $(this).find('.e-guide-result').length;
        break;  
        
         case '/zh-hans/advisor-e-guides/':
          var $count = $(this).find('.e-guide-result').length;
        break;  
        case '/advisor-blog/':
          var $count = $(this).find('.blog-result').length;
        break;  
        
        case '/ca/advisor-blog/':
          var $count = $(this).find('.blog-result').length;
        break;

        case '/zh-hans/advisor-blog/':
          var $count = $(this).find('.blog-result').length;
        break;

        case '/partners/events/':
          var $count = $(this).find('.event__item').length;
        break;  

        case '/ca/partners/events/':
          var $count = $(this).find('.event__item').length;
        break;  
        
        case '/partners/gtb-blog/':
          var $count = $(this).find('.blog__item').length;
        break;  

        case '/ca/partners/gtb-blog/':
          var $count = $(this).find('.blog__item').length;
        break;              
                    
      }//switch (pathname) {
                    
                    
      $('span#visible_total').html( $count );
      //$('.load-more-events').attr('offset', $count);
      //Hide Load more button if there is no more stuff to load
      if(parseInt($('span#visible_total').html()) >=  parseInt($('span#search_total').html()) || parseInt($('span#visible_total').html()) < 1 ){
          $('.load_more_items').hide().attr('data-offset', '0');
      }else{
          $('.load_more_items').show()
      }
      $('.load_more_items').attr('data-offset',$count);     
                
})//$(document).on('DOMSubtreeModified', '#events-wes', function(){
        
//Modify 'Showing' label.
the_results.done( function( data, textStatus, jqXHR ){
    
    
    var $total_pages = parseInt( jqXHR.getResponseHeader('X-WP-TotalPages'), 10 );
    var $total_items = parseInt( jqXHR.getResponseHeader('X-WP-Total'), 10 );
    
    $('form.nav__search__box').attr('data-total_items', $total_items);
    $('form.nav__search__box').attr('data-total_pages', $total_pages);
    
    $('span#search_total').html( $total_items );
    
    
});//the_results.done( function( data, textStatus, jqXHR ){
        
    
        
}//Filter_Events
    
    
    
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    
    //Load More Button
    $(document).on('click', '.load_more_items', function(e){
        jQuery(this).attr('disabled', 'disabled');
        var $offset = jQuery(this).attr('data-offset');
        $('form.nav__search__box').attr('data-offset', $offset);
         var thepath = window.location.pathname;
         checkFilters(thepath, true);
         var loading = '<div class="progress" style="width:100%;"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width:100%"></div></div>';
         $('.results').append(loading);
    });
    
    

    $('#load-more').on('click', function() {
        var $this = $(this);
        var total = 0;
        var offset = $this.attr("data-total");
        $.ajax({
            url: '/wp-json/wp/v2/advisor-blogs?per_page=5&offset='+offset+'',
            beforeSend: function() {
                $this.text('Loading...');
            },
            success: function(data) {
                var load = data.length, newOffset = (load + parseInt(offset));
                if (load > 0){
                    $this.attr("data-total", newOffset);
                    $.each(data, function (index, value) {
                        makeBlog(filterArray, value);
                    });
                    $this.text('Load More');
                    $.ajax({
                        url: '/wp-json/wp/v2/advisor-blogs',
                        success: function(data) {
                            total = (data.length);
                            if (newOffset >= total) {
                                $this.hide();
                            }
                        }
                    });
                } else {
                    $this.hide();
                }
            },
            fail: function() {
                console.log('error');
            }
        })
    });

    

    $('#load-more').on('click', function() {
        var $this = $(this);
        var total = 0;
        var offset = $this.attr("data-total");
        $.ajax({
            url: '/wp-json/wp/v2/gtb-blogs?per_page=5&offset='+offset+'',
            beforeSend: function() {
                $this.text('Loading...');
            },
            success: function(data) {
                var load = data.length, newOffset = (load + parseInt(offset));
                if (load > 0){
                    $this.attr("data-total", newOffset);
                    $.each(data, function (index, value) {
                        makeBlog(filterArray, value);
                    });
                    $this.text('Load More');
                    $.ajax({
                        url: '/wp-json/wp/v2/gtb-blogs',
                        success: function(data) {
                            total = (data.length);
                            if (newOffset >= total) {
                                $this.hide();
                            }
                        }
                    });
                } else {
                    $this.hide();
                }
            },
            fail: function() {
                console.log('error');
            }
        })
    });

    return {
        init: init
    }
})();
$(document).ready(function(){
     // Populate Year
    var currentDate = new Date(),
     year = currentDate.getFullYear();

    $('.year').text(year);

    //Global
    Nav.init();
    Search.init();
    Carousels.init();
    Email_Input.init();
    Footer.init();

    //Homepage
    Header.init();
   
    //Events
    Filter_Events.init();

});

//Updates URL with new varialbes.
function updateURLParameterWES(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) 
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}//updateURLParameterWES


function removeUrlParameterWes(url, parameter) {
  var urlParts = url.split('?');

  if (urlParts.length >= 2) {
    // Get first part, and remove from array
    var urlBase = urlParts.shift();

    // Join it back up
    var queryString = urlParts.join('?');

    var prefix = encodeURIComponent(parameter) + '=';
    var parts = queryString.split(/[&;]/g);

    // Reverse iteration as may be destructive
    for (var i = parts.length; i-- > 0; ) {
      // Idiom for string.startsWith
      if (parts[i].lastIndexOf(prefix, 0) !== -1) {
        parts.splice(i, 1);
      }
    }

    url = urlBase + '?' + parts.join('&');
  }

  return url;
}


function wessleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var WESApp = (function($) {
    var removeMarketoStylesPageIds = ['32072', '3774', '3775'];

    function shouldRemoveMarketoStyles() {
        var wesMarketoStyles = $('.wes-marketo-styles');

        if (wesMarketoStyles.length > 0) {
            return true;
        }

        return removeMarketoStylesPageIds.includes(getCurrentPageId());
    }

    function getCurrentPageId() {
        var bodyClasses = $('body')[0].classList;
        var currentPageId;

        bodyClasses.forEach(bodyClass => {
            if (bodyClass.startsWith('page-id-')) {
                currentPageId = bodyClass.replace('page-id-', '');
            }
        });

        return currentPageId;
    }

    function removeMarketoStyles() {
        if (!shouldRemoveMarketoStyles()) return;

        if (typeof MktoForms2 !== 'undefined') {
            MktoForms2.whenReady(function (form) {
                $('#mktoForms2BaseStyle, #mktoForms2ThemeStyle, .mktoClear, .mktoGutter, .mktoOffset, .mktoForm style').remove();
                $('.mktoForm, .mktoButtonWrap, .mktoFormCol, .mktoHasWidth').removeAttr('style').removeClass('mktoHasWidth');
                $('.mktoFormRow input:hidden').parent().removeClass('mktoFormRow').css('display', 'none');
                $('.mktoField').each(function () {
                    if ($(this).hasClass('mktoRequired') && $(this).attr('id')) {
                        $('label[for=' + $(this).attr('id') + '] .mktoAsterix').replaceWith('<span class="asterisk">*</span>');
                    } else if ($(this).attr('id')) {
                        $('label[for=' + $(this).attr('id') + '] .mktoAsterix').remove();
                    }
                });
            });
        }
    }

    function slideDownContactForm(event) {
        event.preventDefault();
        $('.marketo-contact-form').slideDown();
        $('html, body').animate({
            scrollTop: $(".marketo-contact-form").offset().top - 100
        }, 350);
    }

    function slideUpContactForm(event) {
        event.preventDefault();
        $('.marketo-contact-form').slideUp();
        $('html, body').animate({
            scrollTop: $(".marketo-contact-us-trigger").offset().top - 100
        }, 350);
    }

    function showPopupOnUrl() {
        if ($(location).attr('pathname') !== '/partners/resources-for-institutional-professionals/') return;
        if ($(location).attr('hash') !== '#contactForm') return;

        $('.marketo-contact-form').slideDown();
    }

    function getArticleHtml(title, permalink, imageHtml, categories, author, datePublished) {
        return '<article class="blog-result blog__item"><div class="blog-img">' + imageHtml + '</div><div class="blog-content"><ul class="article-categories">' + $.map(categories, function (category, index) {
            return '<li>' + category.name + '</li>'
        }).join('') + '</ul><h2 class="title"><a href="' + permalink + '">' + title + '</a></h2>' + '<p class="blue-text date">' + datePublished + '<span> | By ' + author + '</span></p></div></article>';
    }

    function setShowingPostsCount() {
        var postsOnPage = $('#blog-wes article').length;

        $('.showing_count_area #visible_total').text(postsOnPage);
    }

    function fetchNewPosts() {
        var postsOnPage = $('#blog-wes article').length;
        var viewMoreBtn = $(this);
        var searchTerm = wp_helper.search_term;
        $(viewMoreBtn).prop('disabled', true);
        var selectedTopic = $(".wes-topics option:selected");

        var fetchUrl = new URL(window.location.origin + "/wp-json/wp/v2/advisor-blogs?");
        var fetchUrlParams = new URLSearchParams(fetchUrl.search);
        fetchUrlParams.append('offset', postsOnPage);
        fetchUrlParams.append('per_page', 4);
        fetchUrlParams.append('_embed', 1);
        if (searchTerm) fetchUrlParams.append('search', searchTerm);
        if (selectedTopic[0].value !== '') fetchUrlParams.append('advisor_categories', selectedTopic[0].value);

        try {
            $.ajax({url: fetchUrl + fetchUrlParams.toString()}).done(function (data) {

                if (data.length === 0) {
                    $(viewMoreBtn).remove();
                    return;
                }

                $.map(data, function (article, index) {
                    var allArticleCategories = article._embedded['wp:term'] ? article._embedded['wp:term'] : [];
                    var filteredArticleCategories = $.grep(allArticleCategories, function (category) {
                        return category[0]?.taxonomy === 'advisor_categories';
                    });
                    var articleCategories = filteredArticleCategories.length > 0 ? filteredArticleCategories[0] : [];

                    var imageHtml = "";

                    if (article.better_featured_image) {
                        var image = article.better_featured_image;
                        imageHtml = '<img width="' + image.media_details.width + '" height="' + image.media_details.height + '" alt="' + image.alt_text + '" loading="lazy" data-src="' + image.source_url + '" class="attachment-post-thumbnail size-post-thumbnail wp-post-image lazyloaded" src="' + image.source_url + '"/>'
                    }
                    ;

                    var datePublished = new Date(article.date);
                    var formattedDate = datePublished.toLocaleString('en-us', {
                        month: 'long', day: 'numeric', year: 'numeric'
                    });

                    $(getArticleHtml(article.title.rendered, article.link, imageHtml, articleCategories, article.acf.author_name, formattedDate)).appendTo("#blog-wes .articles");
                    setShowingPostsCount();
                });

                $(viewMoreBtn).prop('disabled', false);
            });
        } catch (err) {
            console.log(err);
        }
    }


    /*
        Add class wesScrollTo to button and data-scrollto-class attribute
        with the class of the element you want to scroll to.
     */
    function wesScrollToEl(e) {
        e.preventDefault();
        var scrollElClass = this.dataset.scrolltoClass;

        if (!scrollElClass) return;

        var scrollEl = $('.' + scrollElClass);
        if (scrollEl.length === 0) return;

        $('html, body').animate({
            scrollTop: scrollEl.offset().top - 100
        }, 350);
    }

    var expertsSliderOptions = {
        accessibility: true,
        addaptiveHeight: false,
        autoplay: true,
        slidesToScroll: 1,
        slidesToShow: 4,
        dots: true,
        nextArrow: '<button type="button" class="slick-next"><svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M0.574554 17.0444C0.574437 16.9187 0.602927 16.7943 0.658333 16.6785C0.713738 16.5627 0.794931 16.4579 0.897099 16.3703L10.1603 8.32675C10.2606 8.23856 10.3797 8.16867 10.5106 8.12107C10.6415 8.07347 10.7818 8.04909 10.9234 8.04932C11.065 8.04955 11.2052 8.07439 11.3359 8.12242C11.4667 8.17045 11.5854 8.24073 11.6853 8.32925C11.7853 8.41776 11.8645 8.52278 11.9184 8.63831C11.9724 8.75384 12 8.87761 11.9998 9.00256C11.9995 9.12751 11.9713 9.25119 11.9169 9.36654C11.8625 9.48189 11.7828 9.58665 11.6825 9.67484L2.4023 17.7234C2.19987 17.9006 1.92632 18 1.64121 18C1.35611 18 1.08255 17.9006 0.880123 17.7234C0.780334 17.634 0.701877 17.5278 0.649391 17.4112C0.596907 17.2946 0.57146 17.1698 0.574554 17.0444Z" fill="#013763"/>' + '<path d="M0.574791 0.952262C0.572854 0.764679 0.634324 0.580844 0.75135 0.424229C0.868377 0.267615 1.03565 0.14533 1.23181 0.0729898C1.42797 0.000649276 1.64411 -0.0184647 1.85264 0.0180902C2.06117 0.0546452 2.25261 0.145211 2.40254 0.278219L11.6261 8.26689C11.8172 8.44526 11.9225 8.68204 11.9199 8.92747C11.9172 9.1729 11.8069 9.40787 11.6121 9.58303C11.4172 9.75819 11.153 9.8599 10.8749 9.86679C10.5969 9.87368 10.3266 9.78521 10.1209 9.61997L0.897334 1.6313C0.79448 1.54314 0.71289 1.43754 0.657461 1.32085C0.602034 1.20416 0.573913 1.07878 0.574791 0.952262Z" fill="#013763"/>' + '</svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M11.4253 0.955615C11.4254 1.0813 11.397 1.20572 11.3415 1.32151C11.2861 1.43729 11.2049 1.54208 11.1028 1.62966L1.83956 9.67325C1.73924 9.76144 1.62022 9.83133 1.48928 9.87893C1.35835 9.92653 1.21808 9.95091 1.07647 9.95068C0.934858 9.95045 0.794686 9.92561 0.663956 9.87758C0.533226 9.82955 0.414496 9.75927 0.314549 9.67075C0.214601 9.58224 0.135392 9.47722 0.0814429 9.36169C0.0274938 9.24616 -0.000138806 9.12239 0.000123926 8.99744C0.000386659 8.87249 0.0285388 8.74881 0.0829734 8.63346C0.137408 8.51811 0.217059 8.41335 0.317379 8.32516L9.59758 0.276582C9.8 0.0994339 10.0736 3.43323e-05 10.3587 3.43323e-05C10.6438 3.43323e-05 10.9173 0.0994339 11.1198 0.276582C11.2195 0.365996 11.298 0.472158 11.3505 0.588791C11.403 0.705423 11.4284 0.830154 11.4253 0.955615Z" fill="#013763"/>' + '<path d="M11.4252 17.0477C11.4271 17.2353 11.3657 17.4192 11.2486 17.5758C11.1316 17.7324 10.9644 17.8547 10.7682 17.927C10.572 17.9994 10.3559 18.0185 10.1474 17.9819C9.93883 17.9454 9.74739 17.8548 9.59746 17.7218L0.373852 9.73311C0.182781 9.55474 0.0775 9.31796 0.0801261 9.07253C0.0827522 8.8271 0.193081 8.59213 0.387935 8.41697C0.582788 8.24181 0.846999 8.1401 1.12506 8.13321C1.40311 8.12632 1.67337 8.21479 1.87905 8.38003L11.1027 16.3687C11.2055 16.4569 11.2871 16.5625 11.3425 16.6792C11.398 16.7958 11.4261 16.9212 11.4252 17.0477Z" fill="#013763"/>' + '</svg></button>',
        responsive: [{
            breakpoint: 1000, settings: {
                slidesToShow: 2,
            }
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 1,
            }
        },],
    }

    var testimonialsSliderOptions = {
        accessibility: true,
        addaptiveHeight: false,
        autoplay: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        dots: true,
        nextArrow: '<button type="button" class="slick-next"><svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M0.574554 17.0444C0.574437 16.9187 0.602927 16.7943 0.658333 16.6785C0.713738 16.5627 0.794931 16.4579 0.897099 16.3703L10.1603 8.32675C10.2606 8.23856 10.3797 8.16867 10.5106 8.12107C10.6415 8.07347 10.7818 8.04909 10.9234 8.04932C11.065 8.04955 11.2052 8.07439 11.3359 8.12242C11.4667 8.17045 11.5854 8.24073 11.6853 8.32925C11.7853 8.41776 11.8645 8.52278 11.9184 8.63831C11.9724 8.75384 12 8.87761 11.9998 9.00256C11.9995 9.12751 11.9713 9.25119 11.9169 9.36654C11.8625 9.48189 11.7828 9.58665 11.6825 9.67484L2.4023 17.7234C2.19987 17.9006 1.92632 18 1.64121 18C1.35611 18 1.08255 17.9006 0.880123 17.7234C0.780334 17.634 0.701877 17.5278 0.649391 17.4112C0.596907 17.2946 0.57146 17.1698 0.574554 17.0444Z" fill="#013763"/>' + '<path d="M0.574791 0.952262C0.572854 0.764679 0.634324 0.580844 0.75135 0.424229C0.868377 0.267615 1.03565 0.14533 1.23181 0.0729898C1.42797 0.000649276 1.64411 -0.0184647 1.85264 0.0180902C2.06117 0.0546452 2.25261 0.145211 2.40254 0.278219L11.6261 8.26689C11.8172 8.44526 11.9225 8.68204 11.9199 8.92747C11.9172 9.1729 11.8069 9.40787 11.6121 9.58303C11.4172 9.75819 11.153 9.8599 10.8749 9.86679C10.5969 9.87368 10.3266 9.78521 10.1209 9.61997L0.897334 1.6313C0.79448 1.54314 0.71289 1.43754 0.657461 1.32085C0.602034 1.20416 0.573913 1.07878 0.574791 0.952262Z" fill="#013763"/>' + '</svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M11.4253 0.955615C11.4254 1.0813 11.397 1.20572 11.3415 1.32151C11.2861 1.43729 11.2049 1.54208 11.1028 1.62966L1.83956 9.67325C1.73924 9.76144 1.62022 9.83133 1.48928 9.87893C1.35835 9.92653 1.21808 9.95091 1.07647 9.95068C0.934858 9.95045 0.794686 9.92561 0.663956 9.87758C0.533226 9.82955 0.414496 9.75927 0.314549 9.67075C0.214601 9.58224 0.135392 9.47722 0.0814429 9.36169C0.0274938 9.24616 -0.000138806 9.12239 0.000123926 8.99744C0.000386659 8.87249 0.0285388 8.74881 0.0829734 8.63346C0.137408 8.51811 0.217059 8.41335 0.317379 8.32516L9.59758 0.276582C9.8 0.0994339 10.0736 3.43323e-05 10.3587 3.43323e-05C10.6438 3.43323e-05 10.9173 0.0994339 11.1198 0.276582C11.2195 0.365996 11.298 0.472158 11.3505 0.588791C11.403 0.705423 11.4284 0.830154 11.4253 0.955615Z" fill="#013763"/>' + '<path d="M11.4252 17.0477C11.4271 17.2353 11.3657 17.4192 11.2486 17.5758C11.1316 17.7324 10.9644 17.8547 10.7682 17.927C10.572 17.9994 10.3559 18.0185 10.1474 17.9819C9.93883 17.9454 9.74739 17.8548 9.59746 17.7218L0.373852 9.73311C0.182781 9.55474 0.0775 9.31796 0.0801261 9.07253C0.0827522 8.8271 0.193081 8.59213 0.387935 8.41697C0.582788 8.24181 0.846999 8.1401 1.12506 8.13321C1.40311 8.12632 1.67337 8.21479 1.87905 8.38003L11.1027 16.3687C11.2055 16.4569 11.2871 16.5625 11.3425 16.6792C11.398 16.7958 11.4261 16.9212 11.4252 17.0477Z" fill="#013763"/>' + '</svg></button>',
    }

    function getSliderArrows(direction) {
        return direction === 'next' ? '<button type="button" class="slick-next ir-2023"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-0.4" y="0.4" width="34.4955" height="34.4955" rx="17.2477" transform="matrix(-1 0 0 1 34.7908 0)" stroke="#1F9055" stroke-width="0.8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.4373 18.2102L17.1476 22.5L17.9431 23.2955L23.5908 17.6477L17.9431 12L17.1476 12.7955L21.4373 17.0853L12.2953 17.0852V18.2102L21.4373 18.2102Z" fill="#1F9055"/></svg></button>' : '<button type="button" class="slick-prev ir-2023"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.35" y="0.35" width="34.5955" height="34.5955" rx="17.2977" stroke="#1F9055" stroke-width="0.7"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.1535 18.2102L18.4432 22.5L17.6477 23.2955L12 17.6477L17.6477 12L18.4432 12.7955L14.1535 17.0853L23.2955 17.0852V18.2102L14.1535 18.2102Z" fill="#1F9055"/></svg></button>';
    }

    var irTestimonialsSliderOptions = {
        accessibility: true,
        adaptiveHeight: false,
        autoplay: true,
        pauseOnHover: false,
        slidesToScroll: 1,
        slidesToShow: 4,
        dots: false,
        nextArrow: getSliderArrows('next'),
        prevArrow: getSliderArrows('prev'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '40px',
                }
            },],
    }


    var filteredValue = 'all';

    function filterExpertsSlider(e) {
        var filteringValue = e.target.dataset.filter;

        if (filteringValue === filteredValue) return;

        var expertsSlider = $('.ir-experts.ir-slider');
        var clickedButton = $(e.target);
        var allSliderButtons = $('.ir-2023-experts-section .ir-button-group button');

        allSliderButtons.removeClass('active');
        clickedButton.addClass('active');

        if (filteringValue === 'all') {
            expertsSlider.slick('slickUnfilter');
            filteredValue = 'all';
        } else {
            expertsSlider.slick('slickUnfilter');
            expertsSlider.slick('slickFilter', '.ir-expert-' + filteringValue);
            filteredValue = filteringValue;
        }

        var resultsCount = $('.ir-experts.ir-slider .slick-slide:not(.slick-cloned)').length;
        $('.ir-results span').text(resultsCount);
    }

    function toggleActiveClass(items, dataAttr, clickedDataAttr) {
        $(items).each(function () {
            var itemDataAttr = $(this).data(dataAttr);

            if (itemDataAttr === clickedDataAttr) {
                $(this).addClass('active');
                return;
            }

            $(this).removeClass('active');
        })
    }

    function fadeInSection(clickedDataAttr) {
        var activeContent = $(".ir-value-img-wrapper.active");
        var nextContent = $(".ir-value-img-wrapper[data-ir-group='" + clickedDataAttr + "']");

        if (nextContent.length > 0) {
            activeContent.fadeOut(150, function() {
                activeContent.removeClass("active");
                nextContent.fadeIn(150).addClass("active");
            });
        }
    }

    function togglePartnerSections(e) {
        var clickedDataAttr = e.target.dataset.irGroup;
        var buttons = $('.ir-btn-group button');
        var imagesWrapper = $('.ir-value .ir-value-img-wrapper');

        toggleActiveClass(buttons, 'irGroup', clickedDataAttr);
        toggleActiveClass(imagesWrapper, 'irGroup', clickedDataAttr);

        // fadeInSection(clickedDataAttr);
    }

    function getSlidesToShow() {
        return Math.ceil((window.innerWidth / 160));
    }

    var irTeamSliderOptions = {
        accessibility: true,
        adaptiveHeight: false,
        autoplay: false,
        pauseOnHover: true,
        slidesToScroll: 1,
        slidesToShow: getSlidesToShow(),
        dots: false,
        infinite: true,
        nextArrow: getSliderArrows('next'),
        prevArrow: getSliderArrows('prev'),
        responsive: [
            {
                breakpoint: 768, settings: {
                    slidesToShow: 3, slidesToScroll: 1,
                }
            }, {
                breakpoint: 600, settings: {
                    slidesToShow: 1, slidesToScroll: 1, variableWidth: true,
                }
            },]
    }

    var irTeamSlider = $('.ir-team-slider');
    var resizeTimerInternalIrSlider;
    if (irTeamSlider.length > 0) {
        $(window).on('resize', function () {
            clearTimeout(resizeTimerInternalIrSlider)
            resizeTimerInternalIrSlider = setTimeout(function () {
                var currentSlidesToShow = getSlidesToShow();

                if (irTeamSlider.slick('getSlick').options.slidesToShow !== currentSlidesToShow) {
                    irTeamSlider.slick('unslick');
                    irTeamSlider.slick({
                        ...irTeamSliderOptions,
                        slidesToShow: currentSlidesToShow,
                    });
                }

            }, 100)
        });
    }


    function init() {
        $('.wesScrollTo').on('click', wesScrollToEl);
        removeMarketoStyles();
        $('.top-cta button.marketo-contact-us-trigger').on('click', slideDownContactForm);
        $('.marketo-contact-us-trigger').on('click', slideDownContactForm);
        $('.ir-2023-experts-section .marketo-contact-us-trigger').on('click', slideDownContactForm);
        $('.page-id-3508 .marketo-contact-us-trigger').on('click', slideDownContactForm);
        $('.ir-2023-hero-section .ir-btn-border').on('click', slideDownContactForm);
        $('.ir-cta .ir-btn').on('click', slideDownContactForm);
        $('#close-marketo-contact-form').on('click', slideUpContactForm);
        showPopupOnUrl();
        $('#posts-load-more').on('click', fetchNewPosts);
        $('.ir-experts.ir-slider').slick(expertsSliderOptions);
        $('.ir-2023-testimonials-section .ir-slider').slick(testimonialsSliderOptions);
        $('.ir-testimonials-slider').slick(irTestimonialsSliderOptions);
        $('.ir-team-slider').slick(irTeamSliderOptions);
        $('.ir-2023-experts-section .ir-button-group button').on('click', filterExpertsSlider)
        $('.ir-btn-group button').on('click', togglePartnerSections)
    }

    return {
        init
    };
}
(jQuery));

jQuery(document).ready(WESApp.init);

