$(document).ready(function () {

    var dsh = {
        init: function () {
            dsh.evento();
        },

        evento() {
            if (sessionStorage.IdEmpresa == 0 || sessionStorage.IdEmpresa == undefined) {
                document.location.href = url_selectCompany;
            }
            $('#spinner_loading').show();
            dsh.ListCajas();

            $(document).on('click', '#btnNuevo', function () {
                $('#txtId').val('');
                $('#txtId').val('');
                $('#txtDescripcion').val('');
                $('#txtMonto').val('');

                $('#titleModal').text('Nueva Caja');
                $('#mNuevo').modal('show');
            });

            $(document).on('click', '#btnGuardar', function () {
                dsh.InsertCaja();
            });

            $(document).on('click', '.modificar', function () {
                var id = $(this).attr('dataId');
                var desc = $(this).attr('dataDescripcion');
                var monto = $(this).attr('dataMonto');
                $('#titleModal').text('Modificar Caja');

                $('#txtId').val(id);
                $('#txtDescripcion').val(desc);
                $('#txtMonto').val(monto);
                $('#mNuevo').modal('show');
            });

            $(document).on('click', '.borrar', function () {

                Swal.fire({
                    icon: 'question',
                    text: '¿Desea Eliminar?',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                }).then((result) => {
                    if (result.isConfirmed) {
                        var id = $(this).attr('dataId');
                        dsh.DeleteCaja(id);
                    }
                })

                
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

        ListCajas() {
            $.ajax({
                cache: false,
                url: url_ListCajas,
                type: "GET",
                data: {
                    companyId: sessionStorage.IdEmpresa,
                },
                success: function (data) {
                    if (data.status) {

                        var ls = JSON.parse(data.value).data;

                        var columns = [
                            {title : 'ID' , width : '30px'},
                            {title : 'Descripcion' , width : '200px'},
                            { title: 'Monto', width: '50px' },
                            { title: 'Acciones', width: '50px' }
                        ]

                        var dataSet = [];
                        for (var i = 0; i < ls.length; i++) {
                            dataSet.push([
                                ls[i].id,
                                ls[i].descripcion,
                                dsh.soles(ls[i].monto),
                                '<button type="button" dataId="' + ls[i].id + '" dataDescripcion="' + ls[i].descripcion + '" dataMonto="' + ls[i].monto + '" class="btn btn-primary btn-xs modificar"><i class="ion ion-md-create"></i></button> ' +
                                '<button type="button" dataId="' + ls[i].id + '" class="btn btn-danger btn-xs borrar"><i class="ion ion-md-trash"></i></button>   '
                            ]);
                        }

                        var htmlTableDetalle = '';
                        htmlTableDetalle += `
                        <table id="tCajas" class="table table-bordered table-hover" style="width:100%">
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

                        $('#tCajas').DataTable({
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

                        $('#spinner_loading').hide();
                    }
                },
                error: function (request) {
                }
            });
        },

        InsertCaja() {
            $.ajax({
                cache: false,
                url: url_InsertCaja,
                type: "POST",
                data: {
                    id: $('#txtId').val(),
                    descripcion: $('#txtDescripcion').val(),
                    monto: $('#txtMonto').val(),
                    companyId: sessionStorage.IdEmpresa,
                },
                success: function (data) {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Correcto',
                            text: 'Se ' + ($('#txtId').val() == '' ? 'Guardó' : 'Modificó') + ' correctamente!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#mNuevo').modal('hide');
                                dsh.ListCajas();
                                $('#spinner_loading').hide();
                            }
                        })
                    }
                },
                error: function (request) {
                }
            });
        },

        DeleteCaja(id) {
            $.ajax({
                cache: false,
                url: url_DeleteCaja,
                type: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminar',
                            text: 'Se eliminó correctamente!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#mNuevo').modal('hide');
                                dsh.ListCajas();
                                $('#spinner_loading').hide();
                            }
                        })
                    }
                },
                error: function (request) {
                }
            });
        }
    };

    dsh.init();
});