﻿$(document).ready(function () {

    var dsh = {
        init: function () {
            dsh.evento();
        },

        evento() {
            if (sessionStorage.IdEmpresa == 0 || sessionStorage.IdEmpresa == undefined) {
                document.location.href = url_selectCompany;
            }

            $('#spinner_loading').show();
            dsh.ListRendiciones();

            $(document).on('click', '#btnNuevo', function () {
                $('#txtDescripcion').val('');
                let chkCaja = document.getElementById('chkCaja');
                if (chkCaja.checked) {
                    $('#div_requisicion').css('display', 'none');
                    $('#div_caja').css('display', '');

                    dsh.GetCajas();
                }

                let chkReq = document.getElementById('chkReq');
                if (chkReq.checked) {
                    $('#div_requisicion').css('display', '');
                    $('#div_caja').css('display', 'none');
                }

                $('#titleModal').text('Nueva Rendición');
                $('#mNuevo').modal('show');
            });

            $(document).on('click', '.agregarSustento', function () {
                if ($(this).attr('dataTipo') == 'Caja') {
                    $('#titleModalSustentosCaja').text('RENDICIÓN DE CAJA CHICA');
                    $('#mSustentosCaja').modal('show');
                } else if ($(this).attr('dataTipo') == 'Requisición') {
                    $('#titleModalSustentosRequisicion').text('Sustento de Requisición');
                    $('#mSustentosRequisicion').modal('show');
                }
            });

            $(document).on('click', '.modificar', function () {
                $('#spinner_loading').show();
                var id = $(this).attr('dataId');
                dsh.GetCajas();
                dsh.GetRequisiciones();
                dsh.GetRendicion(id);
            });

            $(document).on('click', '.borrar', function () {
                var id = $(this).attr('dataId');
                Swal.fire({
                    icon: 'warning',
                    title: 'Consulta',
                    text: '¿Está seguro de eliminar rendición?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dsh.DeleteRendicion(id);
                    }
                })
                
            });

            $(document).on('click', '#chkCaja', function () {
                console.log('Activo chkCaja');
                $('#div_requisicion').css('display','none');
                $('#div_caja').css('display', '');

                dsh.GetCajas();
            });

            $(document).on('click', '#chkReq', function () {
                console.log('Activo chkReq');
                $('#div_requisicion').css('display', '');
                $('#div_caja').css('display', 'none');

                dsh.GetRequisiciones();
            });

            $(document).on('click', '#btnGuardar', function () {
                dsh.InsertRendicion();
            });

            $(document).on('click', '#btnAgregarSustento', function () {
                //$('#mSustentosRequisicion').modal('show');

                Swal.fire({
                    title: 'Seleccion Sustento',
                    input: 'select',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'Cancel',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    inputOptions: {
                            0: 'Factura',
                            1: 'Voucher de Movilidad',
                            2: 'Requisición de Fondos',
                            3: 'Otros'
                    },
                    inputPlaceholder: 'Seleccion Tipo de Sustento',
                    showCancelButton: true,
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            
                            switch (value) {
                                case '0':
                                    console.log(value);
                                    resolve();
                                    $('#titleModalSCFactura').text('Factura');
                                    $('#mSCFactura').modal('show');
                                    break;
                                case '1':
                                    console.log(value);
                                    resolve();
                                    $('#titleModalSCVoucher').text(Factura);
                                    $('#mSCVoucher').modal('show');
                                    break;
                                case '2':
                                    console.log(value);
                                    resolve();
                                    break;
                                case '3':
                                    console.log(value);
                                    resolve();
                                    break;
                                default:
                                    resolve('Debes Seleccionar una opción');
                                    break;
                            }
                        })
                    }
                })

            });

            $(document).on('click', '#btnSearchRucSCFactura', function () {
                $.ajax({
                    cache: false,
                    url: url_ConsultaRuc,
                    type: "GET",
                    data: {
                        ruc: $('#txtRucSCFactura').val(),
                    },
                    success: function (data) {
                        if (data.status) {
                            var ls = JSON.parse(data.value);
                            console.log(ls);
                            $('#txtEmpresaSCFactura').val(ls.nombre);
                        }
                        
                    },
                    error: function (request) {
                        var ls = JSON.parse(request.responseText);
                        if (!ls.status) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Error',
                                text: ls.value,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $('#txtRucSCFactura').focus();
                                }
                            })
                        }
                    }
                });
            });
        },

        sumarDias(fecha, dias) {
            fecha.setDate(fecha.getDate() + dias);
            return fecha;
        },

        padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        },

        formatDate(date) {
            return [
                date.getFullYear(),
                dsh.padTo2Digits(date.getMonth() + 1),
                dsh.padTo2Digits(date.getDate()),
            ].join('-');
        },

        soles(value) {
            const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })
            return formatter.format(value)
        },

        dolares(value) {
            const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
            return formatter.format(value)
        },

        ListRendiciones() {
            $.ajax({
                cache: false,
                url: url_ListRendiciones,
                type: "GET",
                data: {
                    companyId: sessionStorage.IdEmpresa,
                },
                success: function (data) {
                    if (data.status) {

                        var ls = JSON.parse(data.value).data;

                        var columns = [
                            { title: 'ID', width: '30px' },
                            { title: 'Código', width: '70px' },
                            { title: 'Descripcion', width: '200px' },
                            { title: 'Tipo', width: '50px' },
                            { title: 'Estado', width: '50px' },
                            { title: 'Acciones', width: '50px' }
                        ]

                        var dataSet = [];
                        for (var i = 0; i < ls.length; i++) {
                            var estado = '';
                            switch (ls[i].estado) {
                                case 0:
                                    estado = 'Sin revisión';
                                    break;
                                case 1:
                                    estado = '';
                                    break;
                                default:
                                    console.log("Invalid day of the week");
                                    break;
                            }

                            dataSet.push([
                                ls[i].id,
                                ls[i].codigo,
                                ls[i].descripcion,
                                ls[i].tipo == 'Caja' ? 'Caja : ' + ls[i].caja : 'Requisición : ' + ls[i].requisicion,
                                estado,
                                '<button type="button" data-bs-toggle="tooltip" data-bs-title="Agregar Sustentos" dataId="' + ls[i].id + '" dataTipo="' + ls[i].tipo + '" dataCodigo="' + ls[i].codigo + '" class="btn btn-indigo btn-xs agregarSustento"><i class="ion ion-md-apps"></i></button> ' +
                                '<button type="button" data-bs-toggle="tooltip" data-bs-title="Modificar" dataId="' + ls[i].id + '" class="btn btn-primary btn-xs modificar"><i class="ion ion-md-create"></i></button> ' +
                                '<button type="button" data-bs-toggle="tooltip" data-bs-title="Eliminar" dataId="' + ls[i].id + '" class="btn btn-danger btn-xs borrar"><i class="ion ion-md-trash"></i></button>   '
                            ]);
                        }

                        var htmlTableDetalle = '';
                        htmlTableDetalle += `
                        <table id="tRendiciones" class="table table-bordered table-hover" style="width:100%">
                            <thead>
                                <tr>`;
                        for (var i = 0; i < columns.length; i++) {
                            htmlTableDetalle += `<th style="width: ` + columns[i].width + `">` + columns[i].title + `</th>`;
                        }
                        htmlTableDetalle += `
                                </tr>
                            </thead>`;
                        htmlTableDetalle += `
                            <tbody>`;
                        for (var i = 0; i < dataSet.length; i++) {
                            htmlTableDetalle += `<tr style="vertical-align: middle;">`;
                            for (var j = 0; j < dataSet[i].length; j++) {
                                htmlTableDetalle += `
                                    <td>` + (dataSet[i][j] == null ? '' : dataSet[i][j]) + `</td>
                                `;
                            }
                            htmlTableDetalle += `</tr>`;
                        }
                        htmlTableDetalle += `
                            </tbody>
                        </table>`;
                        $('#div_table').html(htmlTableDetalle);

                        $('#tRendiciones').DataTable({
                            destroy: true,
                            //scrollY: 400,
                            //scrollX: true,
                            //scrollCollapse: true,
                            //fixedColumns: true,
                            //responsive: true,
                            initComplete: function () {
                                $(this.api().table().container()).find('input[type="search"]').parent().wrap('<form>').parent().attr('autocomplete', 'off');
                            },
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
                        $('[data-bs-toggle="tooltip"]').tooltip();
                        $('#spinner_loading').hide();
                    }
                },
                error: function (request) {
                }
            });
        },

        GetRendicion(id) {
            $.ajax({
                cache: false,
                url: url_GetRendicion,
                type: "POST",
                data: {
                    id: id,
                },
                success: function (data) {
                    if (data.status) {

                        var ls = JSON.parse(data.value).data;

                        $('#titleModal').text('Editar Rendición : ' + ls[0].codigo);

                        $('#txtId').val(ls[0].id);
                        $('#txtDescripcion').val(ls[0].descripcion);

                        switch (ls[0].tipo) {
                            case 'Caja':
                                $('#div_requisicion').css('display', 'none');
                                $('#div_caja').css('display', '');
                                document.getElementById("chkCaja").checked = true;
                                setTimeout(() => {
                                    $('#sCaja').picker('set', ls[0].idCaja);
                                }, 300);
                                
                                break;
                            case 'Requisición':
                                $('#div_requisicion').css('display', '');
                                $('#div_caja').css('display', 'none');
                                document.getElementById("chkReq").checked = true;
                                setTimeout(() => {
                                    $('#sRequisicion').picker('set', ls[0].idRequisicion);
                                }, 300);

                                break;
                            default:
                                console.log("Invalid day of the week");
                                break;
                        }

                        $('#spinner_loading').hide();
                        $('#mNuevo').modal('show');
                    }
                },
                error: function (request) {
                }
            });
        },

        InsertRendicion() {

            var id = $('#txtId').val();
            var descripcion = $('#txtDescripcion').val();
            let chkCaja = document.getElementById('chkCaja');
            let chkReq = document.getElementById('chkReq');
            var tipo;
            var idCaja = null;
            var idRequisicion = null;
            if (chkCaja.checked) {
                tipo = 'Caja';
                idCaja = $("#sCaja").val();
            }
            if (chkReq.checked) {
                tipo = 'Requisición';
                idRequisicion = $("#sRequisicion").val();
            }

            $.ajax({
                cache: false,
                url: url_InserRendicion,
                type: "POST",
                data: {
                    id: id,
                    descripcion: descripcion,
                    tipo: tipo,
                    idCaja: idCaja,
                    idRequisicion: idRequisicion,
                    companyId: sessionStorage.IdEmpresa,
                },
                success: function (data) {
                    if (data.status) {

                        var ls = JSON.parse(data.value).data;

                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Éxito',
                                text: 'Se guardó correctamente!',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $('#mNuevo').modal('hide');
                                    dsh.ListRendiciones();
                                    $('#spinner_loading').hide();
                                }
                            })
                        }
                    }
                },
                error: function (request) {
                }
            });
        },

        DeleteRendicion(id) {
            $.ajax({
                cache: false,
                url: url_DeleteRendicion,
                type: "POST",
                data: {
                    id: id,
                    companyId: sessionStorage.IdEmpresa
                },
                success: function (data) {
                    if (data.status) {

                        var ls = JSON.parse(data.value).data;

                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Éxito',
                                text: 'Se eliminó correctamente!',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    dsh.ListRendiciones();
                                }
                            })
                        }
                    }
                },
                error: function (request) {
                }
            });
        },

        GetCajas() {
            $.ajax({
                url: url_ListCajasCombo,
                type: "POST",
                data: {
                    companyId: sessionStorage.IdEmpresa,
                },
                success: function (data) {
                    //console.log(data.value);

                    var ls = JSON.parse(data.value).data;
                    $("#sCaja").picker('destroy');
                    $("#sCaja").find('option').remove();
                    for (var i = 0; i < ls.length; i++) {
                        $("#sCaja").append("<option value='" + ls[i].id + "'> " + ls[i].descripcion + " | " + dsh.soles(ls[i].monto) + " </option>");
                    }
                    $('#sCaja').picker({
                        search: true,
                        texts: { trigger: "-- Seleccione Caja --", noResult: "No se encuentró", search: "Buscar" }
                    });
                    //jSuites.dropdown(document.getElementById('sCaja'));
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        GetRequisiciones() {
            $.ajax({
                url: url_GetRequisiciones,
                type: "POST",
                data: {
                    companyId: sessionStorage.IdEmpresa,
                },
                success: function (data) {
                    //console.log(data.value);

                    var ls = JSON.parse(data.value).data;
                    $("#sRequisicion").picker('destroy');
                    $("#sRequisicion").find('option').remove();
                    for (var i = 0; i < ls.length; i++) {
                        $("#sRequisicion").append("<option value='" + ls[i].id + "'> " + ls[i].codigo + " | " + ls[i].proyecto + " </option>");
                    }
                    $('#sRequisicion').picker({
                        search: true,
                        texts: { trigger: "-- Seleccione Requisición --", noResult: "No se encuentró", search: "Buscar" }
                    });
                    //jSuites.dropdown(document.getElementById('sCaja'));
                },
                error: function () {
                    console.log("Error");
                }
            });
        },
    };

    dsh.init();
});