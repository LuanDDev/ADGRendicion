$(document).ready(function () {
    var dsh = {
        init: function () {
            dsh.evento();
        },


        evento() {
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

            dsh.GetUsers();

            $(document).on("click", "#btnCrearUsuario", function () {
                $('#mTitleModal').text('Nuevo Usuario');
                dsh.GetCompanies();
                dsh.GetProfiles();
                dsh.GetAlmacenes();
            });
            $(document).on("click", "#btnSave", function () {
                dsh.InsertUser();
            });

            $(document).on("click", ".detalleUser", function () {
                let id = $(this).attr('dataId');
                $('#txtUserId').val(id);
                $('#mTitleModal').text('Modificar Usuario');
                dsh.GetCompanies();
                dsh.GetProfiles();
                dsh.GetAlmacenes();
                dsh.GetUser(id);
            });

            //if (sessionStorage.length > 0) {
            //    const note = document.querySelector('.app-sidebar .menu .menu-profile .menu-profile-cover');
            //    note.style.cssText += 'background-image:url("../img/companies/' + sessionStorage.Logo + '")!important;background-size:contain;background-position:center;background-color: white';
            //}
        },

        mensaje(title,description,icon) {
            Swal.fire({
                icon: icon, /*'success','error','warning','info','question'*/
                title: title,
                text: description
            })
        },

        GetUser(id) {
            $.ajax({
                cache: false,
                url: url_getUser,
                type: "POST",
                data: {
                    userId: id
                },
                success: function (data) {
                    
                    var ls = JSON.parse(data.value);

                    //console.log(ls);

                    $('#txtUser').val(ls.userLogin);
                    $('#txtPswd').val(ls.userPswd);
                    $('#txtUserName').val(ls.userName);
                    $('#txtUserLastName').val(ls.userLastName);
                    $('#sProfiles').val(ls.userProfileId);
                    $("#chkActive").prop("checked", ls.userActive);
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        GetUsers() {
            $.ajax({
                cache: false,
                url: url_getUsers,
                type: "POST",
                //data: {
                //    idReq: idReq
                //},
                success: function (data) {
                    //console.log(data.value);

                    var ls = JSON.parse(data.value).users;

                    //console.log(ls);
                    dataSet = [];
                    for (var i = 0; i < ls.length; i++) {
                        dataSet.push([
                            ls[i].userId,
                            ls[i].userLogin,
                            ls[i].userName,
                            ls[i].userLastName,
                            ls[i].profileName,
                            ls[i].userActive ? '<a class="btn btn-green btn-xs"><i class="fas fa-check"></i></a>' : '<button type="button" class="btn btn-danger btn-xs"><i class="fas fa-ban"></i></button>',
                            ls[i].userDelete ? '<button type="button" class="btn btn-danger btn-xs disabled"><i class="fas fa-eraser"></i></button>' : '<button type="button" class="btn btn-danger btn-xs"><i class="fas fa-eraser"></i></button>',
                            '<button type="button" class="btn btn-outline-primary btn-xs detalleUser" data-bs-toggle="modal" data-bs-target="#m_UserDetail" dataId="' + ls[i].userId +'"><i class="fas fa-pencil-alt fa-fw"></i></button>'
                        ]);
                    }
                    //console.log('dataSet');
                    //console.log(dataSet);

                    $('#tb_Users').DataTable({
                        dom: '<"dataTables_wrapper dt-bootstrap"<"row"<"col-xl-7 d-block d-sm-flex d-xl-block justify-content-center"<"d-block d-lg-inline-flex me-0 me-md-3"l><"d-block d-lg-inline-flex"B>><"col-xl-5 d-flex d-xl-block justify-content-center"fr>>t<"row"<"col-md-5"i><"col-md-7"p>>>',
                        buttons: [
                            { extend: 'excel', className: 'btn-sm' },
                            { extend: 'pdf', className: 'btn-sm' },
                            { extend: 'print', className: 'btn-sm', name: 'Imprimir' }
                        ],
                        destroy: true,
                        responsive: true,
                        data: dataSet,
                        columns: [
                            { title: "Id" },
                            { title: "Usuario" },
                            { title: "Nombres" },
                            { title: "Apellidos" },
                            { title: "Perfil" },
                            { title: "Estado", width: "5%"  },
                            { title: "Eliminar", width: "5%"  },
                            { title: "Acciones", width: "5%" }
                        ],
                        "order": [0, "asc"],
                        language: {
                            "processing": "Procesando...",
                            "lengthMenu": "Mostrar _MENU_ registros",
                            "zeroRecords": "No se encontraron resultados",
                            "emptyTable": "Ningún dato disponible en esta tabla",
                            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                            "search": "Buscar:",
                            "infoThousands": ",",
                            "loadingRecords": "Cargando...",
                            "paginate": {
                                "first": "Primero",
                                "last": "Último",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            },
                            "aria": {
                                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                                "sortDescending": ": Activar para ordenar la columna de manera descendente"
                            },
                            "emptyTable": "No hay datos disponibles en la tabla",
                            "zeroRecords": "No se encontraron coincidencias",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
                            "infoFiltered": "(Filtrado de _MAX_ total de entradas)",
                            "lengthMenu": "Mostrar _MENU_ entradas",
                        }
                    });
                    $('.buttons-print span').text('Imprimir');
                    //$('#tRequerimientos').DataTable().destroy();
                    //$('#tRequerimientos').DataTable();
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        GetCompanies() {
            $.ajax({
                cache: false,
                url: url_getCompanies,
                type: "POST",
                //data: {
                    //idReq: idReq
                //},
                success: function (data) {
                    //console.log(data.value);

                    var ls = JSON.parse(data.value).companies;

                    $("#sCompanies").find('option').remove();
                    for (var i = 0; i < ls.length; i++) {
                        $("#sCompanies").append("<option value='" + ls[i].companyId + "'> " + ls[i].companyName + " </option>");
                    }

                    $("#sCompanies").select2();
                    
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        GetProfiles() {
            $.ajax({
                cache: false,
                url: url_getProfiles,
                type: "POST",
                //data: {
                    //idReq: idReq
                //},
                success: function (data) {
                    //console.log(data.value);

                    var ls = JSON.parse(data.value).profiles;

                    $("#sProfiles").find('option').remove();
                    for (var i = 0; i < ls.length; i++) {
                        $("#sProfiles").append("<option value='" + ls[i].profileId + "'> " + ls[i].profileName + " </option>");
                    }
                },
                error: function () {
                    console.log("Error");
                }
            });
        },
        GetAlmacenes() {
            $.ajax({
                cache: false,
                url: url_AlmacenList,
                type: "POST",
                //data: {
                //idReq: idReq
                //},
                success: function (data) {
                    //console.log(data.value);

                    var ls = JSON.parse(data.value).data;

                    $("#sAlmacen").find('option').remove();
                    for (var i = 0; i < ls.length; i++) {
                        $("#sAlmacen").append("<option value='" + ls[i].id + "'> " + ls[i].descripcion + " </option>");
                    }
                },
                error: function () {
                    console.log("Error");
                }
            });
        },
        InsertUser() {

            if ($('#txtUser').val() == "") {
                dsh.mensaje('Opss!!', 'Usuario vacío', 'error');
                $('#txtUser').focus();
                
            } else if ($('#txtPswd').val() == "" && $('#txtUserId').val() == "") {
                dsh.mensaje('Opss!!', 'Contraseña vacío', 'error');
                $('#txtPswd').focus();
            } else if ($('#txtUserName').val() == "") {
                dsh.mensaje('Opss!!', 'Nombres vacíos', 'error');
                $('#txtUserName').focus();
            } else if ($('#txtUserLastName').val() == "") {
                dsh.mensaje('Opss!!', 'Apellidos vacíos', 'error');
                $('#txtUserLastName').focus();
            //} else if ($('#sCompanies').val() == "") {
            //    dsh.mensaje('Opss!!', 'Debe escoger una empresa', 'error');
            //    $('#sCompanies').focus();
            } else if ($('#sProfiles').val() == "") {
                dsh.mensaje('Opss!!', 'Debe escoger un perfil', 'error');
                $('#sProfiles').focus();
            }

            
            var userId = $('#txtUserId').val();
            var userLogin = $('#txtUser').val();
            var userPswd = $('#txtPswd').val();
            var userName = $('#txtUserName').val();
            var userLastName = $('#txtUserLastName').val();
            var userProfileId = $('#sProfiles').val();
            var userCompanies = $('#sCompanies').val();
            var almacen = $('sAlmacen').val();
            var userActive = document.getElementById('chkActive').checked;

            $.ajax({
                cache: false,
                url: url_insertUser,
                type: "POST",
                data: {
                    userId: userId,
                    userLogin: userLogin,
                    userPswd: userPswd,
                    userName: userName,
                    userLastName: userLastName,
                    userProfileId: userProfileId,
                    almacenId: almacen,
                    userActive: userActive
                },
                success: function (data) {
                    var title = 'Se ' + (userId != "" ? 'modificó' : 'creó') + ' usuario correctamente';
                    Swal.fire({
                        icon: 'success',
                        title: title,
                        showConfirmButton: true,
                        timer: 3500
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            $('#m_UserDetail').modal('hide');
                            document.location.reload();
                        }
                    })

                    
                },
                error: function () {
                    console.log("Error");
                }
            });
        },
    };

    dsh.init();
});
