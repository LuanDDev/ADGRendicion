$(document).ready(function () {
    var dsh = {
        init: function () {
            dsh.evento();
        },

        evento() {

            $(".app-sidebar").css('display', 'none');
            $(".app-sidebar-bg").css('display', 'none');
            $(".app-content").css('margin-left', '0px');

        },
        
    };


    dsh.init();
});
