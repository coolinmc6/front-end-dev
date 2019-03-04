( function( $ ) {
    
    $('a.sidebar-left-toggle').click(function() {
        if (!$('.sidebar').hasClass('sidebar-left')){
            $('.sidebar').addClass('sidebar-left');
        };
    });
    
    $('a.sidebar-right-toggle').click(function() {
        if ($('.sidebar').hasClass('sidebar-left')){
            $('.sidebar').removeClass('sidebar-left');
        };
    });
    
})( jQuery );