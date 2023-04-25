var caja;
var sumCC;
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
            dsh.ListRendiciones();

            $(document).on('click', '.verSustento', function () {
                $('#spinner_loading').show();
                if ($(this).attr('dataTipo') == 'Caja') {
                    $('#titleModalSustentosCaja').text('RENDICIÓN DE CAJA CHICA');

                    var id = $(this).attr('dataId');
                    var tipo = $(this).attr('dataTipo');
                    var codigo = $(this).attr('dataCodigo');
                    var fecha = new Date($(this).attr('dataDate'));
                    var estado = new Date($(this).attr('dataEstado'));
                    console.log(fecha);
                    $.ajax({
                        cache: false,
                        url: url_GetRendicion,
                        type: "POST",
                        data: {
                            id: id,
                        },
                        success: function (data) {
                            var ls = JSON.parse(data.value).data;
                            caja = [];
                            $('#txtArea').val(ls[0].area);
                            $('#txtJefeArea').val(ls[0].jefeArea);

                            $('#txtIdRendicionSC').val(ls[0].id);
                            $('#txtCodigoRendicionSC').val(ls[0].codigo);

                            $('#txtEmpresa').val(sessionStorage.RazonSocial);
                            $('#txtRuc').val(sessionStorage.Ruc);
                            $('#txtTrabajador').val(userLogin);

                            $('#txtMotivo').val('Informe de Caja Chica');
                            $('#txtNroReporte').val(codigo);
                            $('#txtFecha').val(dsh.dateToText(fecha));
                            $('#txtPeriodo').val(dsh.obtenerNombreMes(fecha.getMonth() + 1).toUpperCase() + ' ' + fecha.getFullYear());

                            dsh.ListSustentos(id, estado);

                            setTimeout(() => {
                                $('#mSustentosCaja').modal('show');
                                $('#spinner_loading').hide();
                            }, "1000");

                            if (estado != 0) {
                                $('#btnEnviarRC').attr("disabled", 'disabled');
                                $('#btnAgregarSustento').attr("disabled", 'disabled');
                            }

                            var row = { idCaja: ls[0].idCaja, caja: ls[0].caja, monto: ls[0].monto }
                            caja.push(row);
                            console.log(caja);

                        },
                        error: function (request) {
                        }
                    });


                } else if ($(this).attr('dataTipo') == 'Requisición') {
                    $('#titleModalSustentosRequisicion').text('Sustento de Requisición');
                    $('#mSustentosRequisicion').modal('show');
                }
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

        formatDateSlash(date) {
            return [
                dsh.padTo2Digits(date.getDate()),
                dsh.padTo2Digits(date.getMonth() + 1),
                date.getFullYear(),
            ].join('/');
        },

        dateToText(date) {
            var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
            var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            return dsh.padTo2Digits(primerDia.getDate()) + ' AL ' + dsh.formatDateSlash(new Date());
        },

        obtenerNombreMes(numero) {
            let miFecha = new Date();
            if (0 < numero && numero <= 12) {
                miFecha.setMonth(numero - 1);
                return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(miFecha);
            } else {
                return null;
            }
        },

        soles(value) {
            const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })
            return formatter.format(value)
        },

        dolares(value) {
            const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
            return formatter.format(value)
        },

        verPdfFactura(codigo, pdf) {

            var formdata = new FormData();
            formdata.append("codigo", codigo);
            formdata.append("pdf", pdf);

            fetch(url_VerPDFFactura, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo: codigo, pdf: pdf })
            }).then(function (resp) {
                return resp.blob();
            }).then(function (blob) {
                download(blob, pdf);
            });

        },

        SumaTotal() {

            $('#div_table_sumSC').html('');

            var htmlTableDetalle = '';
            htmlTableDetalle += `
                        <table id="tSumaCC" class="table-hover" style="width:100%; font-size:15px">
                            `;
            htmlTableDetalle += `
                            <tbody>`;
            htmlTableDetalle += `<tr style="vertical-align: middle;">`;
            htmlTableDetalle += `
                                <th style="padding: 0px;">` + `Monto Caja Total` + `</th>
                                <td class="text-end" style="padding: 0px;">` + dsh.soles(caja[0].monto) + `</td>
                            `;
            htmlTableDetalle += `</tr>`;

            htmlTableDetalle += `<tr style="vertical-align: middle;border-bottom: double;">`;
            htmlTableDetalle += `
                                <th style="padding: 0px;">` + `Monto Sustentado` + `</th>
                                <td class="text-end" style="padding: 0px; ">` + dsh.soles(sumCC) + `</td>
                            `;
            htmlTableDetalle += `</tr>`;

            htmlTableDetalle += `<tr style="vertical-align: middle;">`;
            htmlTableDetalle += `
                                <th style="padding: 0px;">` + `Diferencia` + `</th>
                                <td class="text-end" style="padding: 0px;">` + dsh.soles(caja[0].monto - sumCC) + `</td>
                            `;
            htmlTableDetalle += `</tr>`;

            htmlTableDetalle += `
                            </tbody>
                        </table>`;
            console.log(htmlTableDetalle);
            $('#div_table_sumSC').html(htmlTableDetalle);
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

                        var ls = JSON.parse(data.value).data.filter(x => x.estado == 1);

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
                                    estado = 'Enviado a revisión';
                                    break;
                                case 2:
                                    estado = 'Rechazado';
                                    break;
                                case 3:
                                    estado = 'Aprobado';
                                    break;
                                case 3:
                                    estado = 'Cerrado';
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
                                '<button type="button" data-bs-toggle="tooltip" data-bs-title="Ver Sustentos" dataId="' + ls[i].id + '" dataTipo="' + ls[i].tipo + '" dataCodigo="' + ls[i].codigo + '" dataDate="' + ls[i].dateCreate + '" dataEstado="' + ls[i].estado + '" class="btn btn-indigo btn-xs verSustento"><i class="ion ion-md-apps"></i></button> '
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
        ListSustentos(id, estado) {
            $.ajax({
                cache: false,
                url: url_ListSustentos,
                type: "POST",
                data: {
                    idRendicion: id,
                },
                success: function (data) {
                    if (data.status) {
                        $('#div_tableSC').html('');
                        var ls = JSON.parse(data.value).data;

                        var columns = [
                            { title: 'N°', width: '30px' },
                            { title: 'Centro Costo', width: '70px' },
                            { title: 'Fecha Doc', width: '50px' },
                            { title: 'Tipo', width: '50px' },
                            { title: 'RUC', width: '50px' },
                            { title: 'N° Doc', width: '50px' },
                            { title: 'Descripción', width: '20px' },
                            { title: 'Monto', width: '50px' },
                            { title: 'Acciones', width: '50px' },
                        ]

                        var dataSet = [];
                        for (var i = 0; i < ls.length; i++) {
                            let tipo = '';
                            let ruc = '';
                            let nroDoc = '';
                            let importe = '';
                            let fechaDoc = '';

                            switch (ls[i].tipo) {
                                case 'Factura':
                                    tipo = 'FA';
                                    ruc = ls[i].ruc;
                                    nroDoc = ls[i].nroDoc;
                                    fechaDoc = dsh.formatDate(new Date(ls[i].fechaDoc));
                                    importe = dsh.soles(ls[i].importe);
                                    break;
                                case 'Boleta':
                                    tipo = 'BO';
                                    ruc = ls[i].ruc;
                                    nroDoc = ls[i].nroDoc;
                                    fechaDoc = dsh.formatDate(new Date(ls[i].fechaDoc));
                                    importe = dsh.soles(ls[i].importe);
                                    break;
                                case 'Voucher':
                                    tipo = 'VR'
                                    ruc = ls[i].ruc;
                                    nroDoc = ls[i].nroVoucher;
                                    fechaDoc = dsh.formatDate(new Date(ls[i].fechaVoucher));
                                    importe = dsh.soles(ls[i].importeVoucher);
                                    break;
                                case 'Otro':
                                    tipo = 'OTR'
                                    //ruc = ls[i].ruc;
                                    nroDoc = ls[i].nroDoc;
                                    fechaDoc = dsh.formatDate(new Date(ls[i].fechaDoc));
                                    importe = dsh.soles(ls[i].importe);
                                    break;
                            }

                            dataSet.push([
                                ls[i].id,
                                ls[i].centroCosto,
                                fechaDoc,
                                tipo,
                                ruc,
                                nroDoc,
                                ls[i].descripcion,
                                importe,
                                '<div class="fa-2x">' +
                                '<button type="button" data-bs-toggle="tooltip" data-bs-title="Ver PDF" class="btn btn-outline-dark btn-icon verPDFSC" dataCodigo="' + ls[i].codigo + '" dataFilePDF="' + ls[i].filePDF + '"><i class="fas fa-file-pdf"></i></button> ' +
                                (estado == 0 ? (tipo != 'VR' ? '<button type="button" data-bs-toggle="tooltip" data-bs-title="Modificar" dataId="' + ls[i].id + '" dataTipo="' + ls[i].tipo + '" class="btn btn-outline-primary btn-icon modificarSC"><i class="ion ion-md-create"></i></button> ' : '') : '') +
                                (estado == 0 ? ('<button type="button" data-bs-toggle="tooltip" data-bs-title="Eliminar" dataId="' + ls[i].id + '" dataTipo="' + ls[i].tipo + '" dataCodigo="' + ls[i].codigo + '" dataFilePDF="' + ls[i].filePDF + '" dataFileXML="' + ls[i].fileXML + '"class="btn btn-outline-danger btn-icon borrarSC"><i class="ion ion-md-trash"></i></button>  ') : '') +
                                '</div>'
                            ]);
                        }

                        sumCC = 0
                        for (var i = 0; i < dataSet.length; i++) {
                            sumCC += ls[i].importe;
                        }
                        console.log(sumCC);

                        var htmlTableDetalle = '';
                        htmlTableDetalle += `
                        <table id="tSustentosCaja" class="table table-bordered table-hover" style="width:100%">
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
                        $('#div_tableSC').html(htmlTableDetalle);

                        $('#tSustentosCaja').DataTable({
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
                        //$('#spinner_loading').hide();


                        dsh.SumaTotal();
                    }
                },
                error: function (request) {
                }
            });
        },
    };

    dsh.init();
});