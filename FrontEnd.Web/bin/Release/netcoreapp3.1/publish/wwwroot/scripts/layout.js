var selectCompany = ""

$(document).ready(function () {
    var dsh = {
        init: function () {
            dsh.evento();
        },

        evento() {
            $("#buttonCerrarSesion").click(function () {
                dsh.SET_CerrarSesion();
            });

            if (sessionStorage.length > 0) {
                const note = document.querySelector('.app-sidebar .menu .menu-profile .menu-profile-cover');
                note.style.cssText += 'background-image:url("../img/companies/' + sessionStorage.Logo + '")!important;background-size:contain;background-position:center;background-color: white';
            } 
            dsh.GetCompanySession();

            if ($(".inicio").html() == "") {
                dsh.getMenu();
            }
            $(document).on("click", ".menuN1", function () {
                sessionStorage.removeItem('menuN1');
                sessionStorage.setItem('menuN1', $(this).attr('dataNombre'));
                sessionStorage.removeItem('menuN2');
                sessionStorage.removeItem('menuN3');
            });
            $(document).on("click", ".menuN2", function () {
                sessionStorage.removeItem('menuN2');
                sessionStorage.setItem('menuN2', $(this).attr('dataNombre'));
                sessionStorage.removeItem('menuN3');
            });
            $(document).on("click", ".menuN3", function () {
                sessionStorage.removeItem('menuN3');
                sessionStorage.setItem('menuN3', $(this).attr('dataNombre'));
            });

            $(document).on("click", ".menu-submenu .menu-item", function () {
                sessionStorage.setItem('modulo', $(this).attr('dataModulo'));
            });

            $(document).on("click", ".cambiarContraseña", function () {
                $('#contrasena').val('');
                $('#rContrasena').val('');
                $('#mCambiarContrasena').modal('show');
            });

            $(document).on("click", "#btnContrasena", function () {
                var contrasenaNueva = $('#contrasena').val();
                var rContrasenaNueva = $('#rContrasena').val();
                if (contrasenaNueva != "") {
                    if (contrasenaNueva == rContrasenaNueva) {
                        $.ajax({
                            cache: false,
                            async: true,
                            url: url_updatePasswordUser,
                            type: "GET",
                            data: {
                                userPswd: $('#contrasena').val()
                            },
                            datatype: false,
                            contentType: false,
                            success: function (data) {
                                if (data.status) {
                                    $('#mCambiarContrasena').modal('hide');
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Se cambio la contraseña correctamente',
                                        showConfirmButton: false,
                                        timer: 2500
                                    })
                                }
                            },
                            error: function (request) {
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Debe repetir la contraseña',
                            icon: 'error'
                        })
                    }
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'No debe ingresar contraseña en blanco',
                        icon: 'error'
                    })
                }

            });

            $(document).on("click", ".btnCompany", function () {
                sessionStorage.setItem('IdEmpresa', $(this).attr('dataIdEmpresa'));
                sessionStorage.setItem('Abreviatura', $(this).attr('dataAbreviatura'));
                sessionStorage.setItem('NombreCorto', $(this).attr('dataNombreCorto'));
                sessionStorage.setItem('Ruc', $(this).attr('dataRuc'));
                sessionStorage.setItem('RazonSocial', $(this).attr('dataRazonSocial'));
                sessionStorage.setItem('Logo', $(this).attr('dataLogo'));
                sessionStorage.setItem('elegido', true);

                $(".theme-version-link").removeClass("active");
                $('#btnCompany' + sessionStorage.Abreviatura).addClass("active");
                document.title = sessionStorage.NombreCorto + ' | ADG Integrado';

                const note = document.querySelector('.app-sidebar .menu .menu-profile .menu-profile-cover');
                note.style.cssText += 'background-image:url("../img/companies/' + sessionStorage.Logo + '")!important;background-size:contain;background-position:center;background-color: white';

                document.location.href = url_home;
            });

            $(document).on("click", ".btnCompanyPanel", function () {
                $(".theme-version-link").removeClass("active");
                $('#btnCompany' + $(this).attr('dataAbreviatura')).addClass("active");
                document.title = $(this).attr('dataNombreCorto') + ' | ADG Integrado';
                sessionStorage.setItem('IdEmpresa', $(this).attr('dataIdEmpresa'));
                sessionStorage.setItem('Abreviatura', $(this).attr('dataAbreviatura'));
                sessionStorage.setItem('NombreCorto', $(this).attr('dataNombreCorto'));
                sessionStorage.setItem('Ruc', $(this).attr('dataRuc'));
                sessionStorage.setItem('RazonSocial', $(this).attr('dataRazonSocial'));
                sessionStorage.setItem('Logo', $(this).attr('dataLogo'));
                sessionStorage.setItem('elegido', true);

                const note = document.querySelector('.app-sidebar .menu .menu-profile .menu-profile-cover');
                note.style.cssText += 'background-image:url("../img/companies/' + sessionStorage.Logo + '")!important;background-size:contain;background-position:center;background-color: white';

                document.location.href = url_home;
            });
        },

        getMenu() {
            $.ajax({
                cache: false,
                url: url_getMenuForProfile,
                data: {
                    softwareId : 11
                },
                type: "POST",
                success: function (data) {

                    var ls = JSON.parse(data.value).menu;
                    //console.log(ls);

                    var moduleN1 = [];
                    var moduleN1_2 = [];

                    for (var i = 0; i < ls.length; i++) {
                        if (moduleN1.indexOf(ls[i].Menu_N1) === -1) {
                            moduleN1.push(ls[i].Menu_N1);
                            moduleN1_2.push({ menu: ls[i].Menu_N1, acceso: ls[i].Acceso_N1, ruta : ls[i].Route });
                        }
                    }

                    //console.log(moduleN1_2);

                    var moduleN2 = [];
                    var moduleN2_2 = [];

                    for (var i = 0; i < ls.length; i++) {
                        if (moduleN2.indexOf(ls[i].Menu_N2) === -1) {
                            moduleN2.push(ls[i].Menu_N2);
                            if (ls[i].Menu_N2 != null) {
                                moduleN2_2.push({ menu: ls[i].Menu_N1, menu2: ls[i].Menu_N2, acceso: ls[i].Acceso_N2, ruta: ls[i].Route });
                            }                            
                        }
                    }
                    //console.log(moduleN2_2);

                    var moduleN3 = [];
                    var moduleN3_2 = [];

                    for (var i = 0; i < ls.length; i++) {
                        if (moduleN3.indexOf(ls[i].Menu_N3) === -1) {
                            moduleN3.push(ls[i].Menu_N3);
                            if (ls[i].Menu_N3 != null) {
                                moduleN3_2.push({ menu: ls[i].Menu_N1, menu2: ls[i].Menu_N2, menu3: ls[i].Menu_N3, acceso: ls[i].Acceso_N3, ruta: ls[i].Route });
                            }
                        }
                    }
                    //console.log(moduleN3_2);

                    var html = 'Menu';
                    var rutaN1 = '';
                    var submenuN1 = '';
                    var finsubmenuN1 = '';
                    var finmenuN1 = '';
                    var rutaN2 = '';
                    var submenuN2 = '';
                    var finsubmenuN2 = '';
                    var rutaN3 = '';
                    for (var i = 0; i < moduleN1.length; i++) {
                        if (!moduleN1_2[i].acceso || moduleN1_2[i].acceso == null) {
                            rutaN1 = 'javascript:;';
                            submenuN1 = '    <div class="menu-submenu submenuN1_' + moduleN1[i].replace(' ', '').replace(' ', '').toString() + '">';
                            finsubmenuN1 = `
                                </div>`;
                            finmenuN1 = `
                            </div>`;
                        } else {
                            rutaN1 = moduleN1_2[i].ruta;
                            submenuN1 = '';
                            finmenuN1 = `
                            </div>`;
                        }

                        html += `
                            <div class="menu-item has-sub menuN1_` + moduleN1[i].replace(' ', '').replace(' ', '').toString() + `">
                                <a href="` + rutaN1 + `" class="menu-link menuN1"  dataNombre="` + moduleN1[i].replace(' ', '').replace(' ', '').toString() + `">
                                    <div class="menu-icon">
                                        <i class="fa fa-align-left"></i>
                                    </div>
                                    <div class="menu-text">` + moduleN1[i] + `</div>
                                    ` + (submenuN1 == '' ? '' : '<div class="menu-caret"></div>') + `
                                </a>
                            ` + submenuN1;

                        for (var j = 0; j < moduleN2_2.length; j++) {
                            if (!moduleN2_2[j].acceso || moduleN2_2[j].acceso == null) {
                                rutaN2 = 'javascript:;';
                                submenuN2 = `<div class="menu-submenu submenuN2_` + moduleN2_2[j].menu2.replace(' ', '').replace(' ', '').toString() + `">`;
                                finmenuN2 = `
                                </div>`;
                            } else {
                                rutaN2 = moduleN2_2[j].ruta;
                                submenuN2 = '';
                                finmenuN2 = `
                                </div>`;
                            }
                            if (moduleN1[i] == moduleN2_2[j].menu) {
                                html += `
                                    <div class="menu-item has-sub menuN2_` + moduleN2_2[j].menu2.replace(' ', '').replace(' ', '').toString() + `">
                                        <a href="` + rutaN2 + `" class="menu-link menuN2"  dataNombre="` + moduleN2_2[j].menu2.replace(' ', '').replace(' ', '').toString() + `">
                                            <div class="menu-text">` + moduleN2_2[j].menu2 + `</div>
                                            ` + (submenuN2 == '' ? '' : '<div class="menu-caret"></div>') + `
                                        </a>
                                    ` + submenuN2;
                                    
                                for (var k = 0; k < moduleN3_2.length; k++) {
                                    if (moduleN2_2[j].menu2 == moduleN3_2[k].menu2) {

                                        if (!moduleN3_2[k].acceso || moduleN3_2[k].acceso == null) {
                                            rutaN3 = 'javascript:;';
                                        } else {
                                            rutaN3 = moduleN3_2[k].ruta;
                                        }

                                        html += `
                                        <div class="menu-item has-sub menuN3_` + moduleN3_2[k].menu3.replace(' ', '').replace(' ', '').toString() + `">
                                            <a href="` + rutaN3 + `" class="menu-link menuN3"  dataNombre="` + moduleN3_2[k].menu3.replace(' ', '').replace(' ', '').toString() + `">
                                                <div class="menu-text">` + moduleN3_2[k].menu3 + `</div>
                                            </a>
                                        </div>
                                        `;
                                    //    if (k + 1 == moduleN3_2.length) {
                                    //        html += `
                                    //</div>
                                    //    `;
                                    //    }
                                    }
                                    
                                }


                                html += (submenuN2 == '' ? '' : `
                                </div>`);
                                html += `
                                ` + finmenuN2;

                            }
                            
                        }
                        
                        html += (submenuN1 == '' ? '' : `
                                </div>`) + `

                            `;
                        html += `
                    ` + finmenuN1;


                    }
                    
                    //console.log(html);

                    $(".inicio").after(html);


                    if (sessionStorage.menuN1 != undefined) {
                        $(".menuN1_" + sessionStorage.menuN1).addClass("active expand");
                        $(".submenuN1_" + sessionStorage.menuN1).css("display", "block");
                    }
                    if (sessionStorage.menuN2 != undefined) {
                        $(".menuN2_" + sessionStorage.menuN2).addClass("active expand");
                        $(".submenuN2_" + sessionStorage.menuN2).css("display", "block");
                    }
                    if (sessionStorage.menuN3 != undefined) {
                        $(".menuN3_" + sessionStorage.menuN3).addClass("active expand");
                        $(".submenuN3_" + sessionStorage.menuN3).css("display", "block");
                    }

                },
                error: function (e) {

                }
            });
        },
        GetCompanySession() {
            $.ajax({
                cache: false,
                url: url_getCompaniesSesion,
                type: "GET",
                data: {
                    CodUsuario: $("#txtCodUsuario").val()
                },
                datatype: false,
                contentType: false,
                success: function (data) {
                    $("#botonera").html('');
                    $("#panelEmpresas").html('');
                    var list = JSON.parse(data.value).companies;

                    var ls = list.filter(x => x.softwareId == 2);
                    //console.log('Empresassss');
                    //console.log(ls);

                    var html = "";
                    var panel = "";
                    for (var i = 0; i < ls.length; i++) {
                        html = html + '<div class="item_botonera">';
                        html = html + '<a id="btn_' + ls[i].idEmpresa + '_' + ls[i].RazonSocial + '" dataRuc="' + ls[i].Ruc + '" dataRazonSocial="' + ls[i].RazonSocial + '" dataNombreCorto="' + ls[i].NombreCorto + '" dataIdEmpresa="' + ls[i].idEmpresa + '" dataAbreviatura="' + ls[i].Abreviatura + '" dataLogo="' + ls[i].Logo + '" class="btn btn-outline-light btnCompany"><img src="../img/companies/' + ls[i].Logo + '" class="img-thumbnail" /></a>';
                        html = html + '</div>';

                        panel = panel + '<div class="theme-version-item">';
                        panel = panel + '<button id="btnCompany' + ls[i].Abreviatura + '" dataRuc="' + ls[i].Ruc + '" dataRazonSocial="' + ls[i].RazonSocial + '" dataNombreCorto="' + ls[i].NombreCorto + '" dataIdEmpresa="' + ls[i].idEmpresa + '" dataAbreviatura="' + ls[i].Abreviatura + '" dataLogo="' + ls[i].Logo + '" class="btn btn-outline-light theme-version-link btnCompanyPanel">';
                        panel = panel + '<span style="background-image: url(../img/companies/' + ls[i].Logo + '); margin-left: 15px; width: 80px;" class="theme-version-cover"></span>';
                        panel = panel + '</button>';
                        panel = panel + '</div>';
                    }

                    $("#botonera").html(html);
                    $("#panelEmpresas").html(panel);

                    if (sessionStorage.elegido) {
                        $("#lblCompanyLayout").text(sessionStorage.RazonSocial);
                        $("#lblCompany").text(sessionStorage.RazonSocial);
                        $(".theme-version-link").removeClass("active");
                        $('#btnCompany' + sessionStorage.Abreviatura).addClass("active");
                        document.title = sessionStorage.NombreCorto + ' | ADG Integrado';
                    }
                },
                error: function (request) {
                }
            });
        },

        SET_CerrarSesion() {
            $.ajax({
                cache: false,
                url: URL_CERRARSESION,
                type: "POST",
                datatype: "json",
                contentType: "application/json;charset=UTF-8",
                data: null,
                success: function (data) {
                    document.location.href = URL_AUTENTICACION;
                },
                error: function (request) {
                }
            });
        },


    };


    dsh.init();
});
