$(document).ready(function () {
    var dsh = {
        init: function () {
            dsh.evento();
        },


        evento() {

            $('.menuN1_Inicio').addClass('active');


            if (sessionStorage.menuN1 != undefined) {
                $(".menuN1_" + sessionStorage.menuN1).addClass("active expand");
                $(".submenuN1_" + sessionStorage.menuN1).css("display", "block");
            }
            if (sessionStorage.menuN2 != undefined) {
                $(".menuN2_" + sessionStorage.menuN2).addClass("active expand");
                $(".submenuN2_" + sessionStorage.menuN2).css("display", "block");
            }
            if (sessionStorage.menuN3 != undefined) {
                $(".menuN3_" + sessionStorage.menuN2).addClass("active expand");
                $(".submenuN2_" + sessionStorage.menuN2).css("display", "block");
            }
        },

        
    };


    dsh.init();
});
