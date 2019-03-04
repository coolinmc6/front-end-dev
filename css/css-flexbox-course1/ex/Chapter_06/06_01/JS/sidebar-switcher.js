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
    
    $('a.no-sidebar-toggle').click(function() {
        if (!$('.content').hasClass('no-sidebar')){
            $('.content').addClass('no-sidebar');
        } else {
            $('.content').removeClass('no-sidebar');  
        };
    });
    
    $('a.hide-sidebar-toggle').click(function() {
        if (!$('.sidebar').hasClass('hide')){
            $('.sidebar').addClass('hide');
        } else {
            $('.sidebar').removeClass('hide');  
        };
    });
    
})( jQuery );








