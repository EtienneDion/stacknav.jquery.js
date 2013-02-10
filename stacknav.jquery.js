(function($){
    $.fn.stackNav = function( options ){

        var settings = {
            animateFixing:{
                marginTop: 0
            },
            animateUnfixing:{
                marginTop: 25
            },
            animateSpeed: 300,
            completeFixing: function(){},
            completeUnfixing: function(){},
            affectedElement:".stack"
        }
        var $self = $(this);
        var currentTop;

        $.extend( settings, options );
        $self.each( onEach );
        /*
         * Each profile in the page
         */
        function onEach(){
            var $this = $(this);
            var stacknav = new stackNav( $this );
        }
        function stackNav( elem ){

            var self = this;
            var $elem = elem;
            var top = $elem.offset().top;
            var isFixed = false;
            var $stackNav = elem.find(settings.affectedElement);

            this.scroll = function(){
                currentTop = $(document).scrollTop();

                if(currentTop > top){
                    isFixed = true;
                    $stackNav.addClass('fixed');
                    self.fixed();
                }else{
                    isFixed = false;
                    $stackNav.removeClass('fixed');
                    self.unfixed();
                }

            }

            this.fixed = function( speed ){
                if(isFixed){

                    $stackNav.stop().animate(settings.animateFixing, settings.animateSpeed, function() {
                        isFixed = true;
                        settings.completeFixing();
                    });

                }
            }

            this.unfixed = function( speed ){
                if(!isFixed){

                    $stackNav.stop().animate(settings.animateUnfixing, settings.animateSpeed, function() {
                        isFixed = false;
                        settings.completeUnfixing();
                    });

                }
            }

            $(window).scroll( self.scroll );

        }

    }

})(jQuery)