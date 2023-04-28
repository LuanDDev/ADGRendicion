var tipoRendicion;
var caja;
var requisicion
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

            $('#sArea').on('sp-change', function () {
                if ($("#sArea").val() == '') {
                    $('#sJefeArea').picker();
                    $('#sJefeArea').picker('destroy');
                    $("#sJefeArea").find('option').remove();
                    $("#sJefeArea").attr('disabled', 'disable');
                } else {
                    dsh.GetJefeArea();
                }
            });


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
                tipoRendicion = $(this).attr('dataTipo');

                $('#spinner_loading').show();
                dsh.GetAreas();
                if (tipoRendicion == 'Caja') {

                    $('#titleModalSustentosCaja').text('RENDICIÓN DE CAJA CHICA');

                    $('#div_subTitle').text('FLUJO DE CAJA ("CHICA")');

                    var id = $(this).attr('dataId');
                    var codigo = $(this).attr('dataCodigo');
                    var fecha = new Date($(this).attr('dataDate'));
                    var estado = $(this).attr('dataEstado');
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
                            $("#txtArea").val(ls[0].area);
                            $("#txtJefeArea").val(ls[0].jefeArea);
                            
                            $('#txtIdRendicionSC').val(ls[0].id);
                            $('#txtCodigoRendicionSC').val(ls[0].codigo);

                            $('#txtEmpresa').val(sessionStorage.RazonSocial);
                            $('#txtRuc').val(sessionStorage.Ruc);
                            $('#txtTrabajador').val(userLogin);

                            $('#txtMotivo').val('Informe de Caja Chica');
                            $('#txtNroReporte').val(codigo);
                            $('#txtFecha').val(dsh.dateToText(fecha));
                            $('#txtPeriodo').val(dsh.obtenerNombreMes(fecha.getMonth() + 1).toUpperCase() + ' ' + fecha.getFullYear());

                            $('#div_txtPeriodo').css('display', '');

                            if (ls[0].estado == 2) {
                                $('#div_obsJefe').css('display', '');
                                $('#div_obsConta').css('display', '');

                                $('#txtObsJefe').css('color', 'red');
                                $('#txtObsConta').css('color', 'red');

                                $('#txtObsJefe').val(ls[0].obsJefe == '' || ls[0].obsJefe == null ? 'Sin Observaciones' : ls[0].obsJefe);
                                $('#txtObsConta').val(ls[0].obsConta == '' || ls[0].obsConta == null ? 'Sin Observaciones' : ls[0].obsConta);
                            } else {
                                $('#div_obsJefe').css('display', 'none');
                                $('#div_obsConta').css('display', 'none');

                                $('#txtObsJefe').val('');
                                $('#txtObsConta').val('');
                            }

                            dsh.ListSustentos(id, estado);
                            setTimeout(() => {
                                if (ls[0].codigoArea == null || ls[0].codigoArea == '') {
                                    
                                } else {
                                    $('#sArea').picker('set', ls[0].codigoArea);
                                }
                            }, "500");
                            
                            setTimeout(() => {
                                $('#sJefeArea').picker('set', ls[0].idJefeArea);
                            }, "1000");

                            if (ls[0].estado == 0 || ls[0].estado == 2) {
                                $('#btnEnviarRC').removeAttr("disabled");
                                $('#btnAgregarSustento').removeAttr("disabled");

                                $(".picker").css('display', '');

                                $("#txtArea").css('display', 'none');
                                $("#txtJefeArea").css('display', 'none');
                            } else {
                                $('#btnEnviarRC').attr("disabled", 'disabled');
                                $('#btnAgregarSustento').attr("disabled", 'disabled');

                                setTimeout(() => {
                                    $(".picker").css('display', 'none');
                                    $("#sArea").css('display', 'none');
                                    $("#sJefeArea").css('display', 'none');


                                    $("#txtArea").css('display', '');
                                    $("#txtJefeArea").css('display', '');
                                }, "800");
                            }

                            if (ls[0].estado == 4) {
                                var canvasConta = document.getElementById("canvasFinalizado");

                                canvasConta.width = canvasConta.width;

                                var autoresizeConta = true;

                                var ctxConta = document.getElementById("canvasFinalizado").getContext("2d");

                                var pastedImageConta = new Image();
                                pastedImageConta.onload = function () {
                                    if (autoresizeConta == true) {
                                        //resize canvas
                                        canvasConta.width = pastedImageConta.width;
                                        canvasConta.height = pastedImageConta.height;
                                    }
                                    else {
                                        //clear canvas
                                        ctxConta.clearRect(0, 0, canvas.width, canvas.height);
                                    }
                                    ctxConta.drawImage(pastedImageConta, 0, 0);
                                };

                                ruta = ROOT + '/Rendicion/' + ls[0].imgUrlTeso;
                                nombreCaptura = ls[0].imgUrlTeso;

                                pastedImageConta.src = ruta;

                                $('#div_finalizado').css('display', '');
                            } else {
                                $('#div_finalizado').css('display', 'none');
                            }

                            setTimeout(() => {
                                $('#mSustentosCaja').modal('show');
                                $('#spinner_loading').hide();
                            }, "200");

                            var row = { idCaja: ls[0].idCaja, caja : ls[0].caja, monto : ls[0].monto }
                            caja.push(row);
                            console.log(caja);

                        },  
                        error: function (request) {
                        }
                    });
                }


                if (tipoRendicion == 'Requisición') {
                    $('#titleModalSustentosCaja').text('RENDICIÓN DE REQUISICIÓN DE FONDOS');

                    var id = $(this).attr('dataId');
                    var codigo = $(this).attr('dataCodigo');
                    var fecha = new Date($(this).attr('dataDate'));
                    var estado = $(this).attr('dataEstado');
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
                            requisicion = [];
                            $('#div_subTitle').text('RENDICIÓN DE GASTOS');
                            $("#txtArea").val(ls[0].area);
                            $("#txtJefeArea").val(ls[0].jefeArea);

                            $('#txtIdRendicionSC').val(ls[0].id);
                            $('#txtCodigoRendicionSC').val(ls[0].codigo);

                            $('#txtEmpresa').val(sessionStorage.RazonSocial);
                            $('#txtRuc').val(sessionStorage.Ruc);
                            $('#txtTrabajador').val(userLogin);

                            $('#txtMotivo').val('Informe de Requisición de Fondos');
                            $('#txtNroReporte').val(codigo);
                            $('#txtFecha').val(dsh.formatDateSlash(new Date(ls[0].dateCreate)));
                            //$('#txtPeriodo').val(dsh.obtenerNombreMes(fecha.getMonth() + 1).toUpperCase() + ' ' + fecha.getFullYear());

                            //$('#txtFecha').css('display', 'none');
                            $('#div_txtPeriodo').css('display', 'none');

                            if (ls[0].estado == 2) {
                                $('#div_obsJefe').css('display', '');
                                $('#div_obsConta').css('display', '');

                                $('#txtObsJefe').css('color', 'red');
                                $('#txtObsConta').css('color', 'red');

                                $('#txtObsJefe').val(ls[0].obsJefe == '' || ls[0].obsJefe == null ? 'Sin Observaciones' : ls[0].obsJefe);
                                $('#txtObsConta').val(ls[0].obsConta == '' || ls[0].obsConta == null ? 'Sin Observaciones' : ls[0].obsConta);
                            } else {
                                $('#div_obsJefe').css('display', 'none');
                                $('#div_obsConta').css('display', 'none');

                                $('#txtObsJefe').val('');
                                $('#txtObsConta').val('');
                            }


                            dsh.ListSustentos(id, estado);
                            setTimeout(() => {
                                $('#sArea').picker('set', ls[0].codigoArea);
                            }, "500");

                            setTimeout(() => {
                                $('#sJefeArea').picker('set', ls[0].idJefeArea);
                            }, "1000");

                            if (ls[0].estado == 0 || ls[0].estado == 2) {
                                $('#btnEnviarRC').removeAttr("disabled");
                                $('#btnAgregarSustento').removeAttr("disabled");

                                $(".picker").css('display', '');

                                $("#txtArea").css('display', 'none');
                                $("#txtJefeArea").css('display', 'none');
                            } else {
                                $('#btnEnviarRC').attr("disabled", 'disabled');
                                $('#btnAgregarSustento').attr("disabled", 'disabled');

                                setTimeout(() => {
                                    $(".picker").css('display', 'none');
                                    $("#sArea").css('display', 'none');
                                    $("#sJefeArea").css('display', 'none');


                                    $("#txtArea").css('display', '');
                                    $("#txtJefeArea").css('display', '');
                                }, "800");
                            }

                            if (ls[0].estado == 4) {
                                var canvasConta = document.getElementById("canvasFinalizado");

                                canvasConta.width = canvasConta.width;

                                var autoresizeConta = true;

                                var ctxConta = document.getElementById("canvasFinalizado").getContext("2d");

                                var pastedImageConta = new Image();
                                pastedImageConta.onload = function () {
                                    if (autoresizeConta == true) {
                                        //resize canvas
                                        canvasConta.width = pastedImageConta.width;
                                        canvasConta.height = pastedImageConta.height;
                                    }
                                    else {
                                        //clear canvas
                                        ctxConta.clearRect(0, 0, canvas.width, canvas.height);
                                    }
                                    ctxConta.drawImage(pastedImageConta, 0, 0);
                                };

                                ruta = ROOT + '/Rendicion/' + ls[0].imgUrlTeso;
                                nombreCaptura = ls[0].imgUrlTeso;

                                pastedImageConta.src = ruta;

                                $('#div_finalizado').css('display', '');
                            } else {
                                $('#div_finalizado').css('display', 'none');
                            }

                            setTimeout(() => {
                                $('#mSustentosCaja').modal('show');
                                $('#spinner_loading').hide();
                            }, "200");

                            var row = { id: ls[0].idRequisicion, requisicion: ls[0].requisicion, monto: ls[0].montoRequisicion }
                            requisicion.push(row);
                            console.log(requisicion);

                        },
                        error: function (request) {
                        }
                    });
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

            
            $(document).on('click', '#chkTipoDoc', function () {

                $('#lblTipoDoc').text()
            });

            $(document).on('sp-change', '#sArea', function () {
                dsh.UpdateAreaRendicion();
            });

            $(document).on('sp-change', '#sJefeArea', function () {
                dsh.UpdateAreaRendicion();
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
                        0: 'Factura | Boleta | RxH',
                        1: 'Voucher de Movilidad',
                        2: 'Otros'
                    },
                    inputPlaceholder: 'Seleccion Tipo de Sustento',
                    showCancelButton: true,
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            
                            switch (value) {
                                case '0':
                                    console.log(value);
                                    resolve();
                                    dsh.limpiarmSCFactura();

                                    $('#div_adjuntosSCFactura').css('display', '');

                                    $('#titleModalSCFactura').text('Nuevo Sustento');
                                    $('#btnAgregarSCFactura').text('Agregar');
                                    $('#txtIdSCFactura').val('');
                                    $('#mSCFactura').modal('show');
                                    break;
                                case '1':
                                    console.log(value);
                                    resolve();
                                    dsh.GetVouchers();

                                    dsh.limpiarmSCVoucher();

                                    $('#titleModalSCVoucher').text('Nuevo Sustento');
                                    $('#btnAgregarSCVoucher').text('Agregar');
                                    $('#txtIdSCVoucher').val('');
                                    $('#mSCVoucher').modal('show');
                                    break;
                                case '2':
                                    console.log(value);
                                    resolve();
                                    dsh.limpiarmSCOtro();

                                    $('#div_adjuntosSCOtro').css('display', '');

                                    $('#titleModalSCOtro').text('Nuevo Sustento');
                                    $('#btnAgregarSCOtro').text('Agregar');
                                    $('#txtIdSCOtro').val('');
                                    $('#mSCOtro').modal('show');
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

            $(document).on('click', '#btnAgregarSCFactura', function () {
                if ($('#btnAgregarSCFactura').text() == 'Agregar') {
                    if (dsh.validarSCFactura()) {
                        $('#spinner_loading').show();
                        let tipo = '';
                        if (document.getElementById("rFactura").checked == true) {
                            tipo = 'Factura';
                        }
                        if (document.getElementById("rBoleta").checked == true) {
                            tipo = 'Boleta';
                        }
                        if (document.getElementById("rRxH").checked == true) {
                            tipo = 'RxH';
                        }
                        dsh.InsertSustento(tipo, $('#txtCodigoRendicionSC').val(),'','');
                    }
                }

                if ($('#btnAgregarSCFactura').text() == 'Modificar') {
                    if (dsh.validarSCFacturaSinFiles()) {
                        $('#spinner_loading').show();
                        let tipo = '';
                        if (document.getElementById("rFactura").checked == true) {
                            tipo = 'Factura';
                        }
                        if (document.getElementById("rBoleta").checked == true) {
                            tipo = 'Boleta';
                        }
                        if (document.getElementById("rRxH").checked == true) {
                            tipo = 'RxH';
                        }
                        dsh.InsertSustento(tipo, $('#txtCodigoRendicionSC').val(),'','');
                    }
                }
            });

            $(document).on('click', '#btnAgregarSCOtro', function () {

                let tipo = 'Otro';
                if ($('#btnAgregarSCOtro').text() == 'Agregar') {
                    if (dsh.validarSCOtro()) {
                        $('#spinner_loading').show();
                        dsh.InsertSustento(tipo, $('#txtCodigoRendicionSC').val(),'','');
                    }
                }

                if ($('#btnAgregarSCOtro').text() == 'Modificar') {
                    if (dsh.validarSCOtroSinFiles()) {
                        $('#spinner_loading').show();
                        dsh.InsertSustento(tipo, $('#txtCodigoRendicionSC').val(),'','');
                    }
                }
            });

            $(document).on('click', '#btnAgregarSCVoucher', function () {

                let tipo = 'Voucher';

                if (dsh.validarSCVoucher()) {
                    Swal.fire({
                        icon: 'question',
                        //title: 'Éxito',
                        text: '¿Esta seguro de su elección?',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#spinner_loading').show();
                            $.ajax({
                                cache: false,
                                url: url_GetFileVoucher,
                                type: "POST",
                                data: {
                                    id: $('#sVouchers').val(),
                                    codigo: $('#txtCodigoRendicionSC').val()
                                },
                                success: function (data) {
                                    var ls = JSON.parse(data.value).data[0];
                                    var filename = data.fileName;
                                    dsh.InsertSustento(tipo, $('#txtCodigoRendicionSC').val(), ls, filename);
                                },
                                error: function (request) {
                                }
                            });
                        }
                    })
                }
            });
            $(document).on('click', '.verPDFSC', function () {
                let codigo = $(this).attr('dataCodigo');
                let pdf = $(this).attr('dataFilePDF');
                dsh.verPdfFactura(codigo, pdf);
            });

            $(document).on('click', '.modificarSC', function () {
                let id = $(this).attr('dataId');
                let tipo = $(this).attr('dataTipo');

                if (tipo == 'Factura' || tipo == 'Boleta' || tipo == 'RxH') {
                    $.ajax({
                        cache: false,
                        url: url_ListSustentoById,
                        type: "POST",
                        data: {
                            id: id,
                        },
                        success: function (data) {
                            var ls = JSON.parse(data.value).data;
                            dsh.limpiarmSCFactura();
                            $('#txtIdSCFactura').val(id);
                            $('#txtDescripcionSCFactura').val(ls[0].descripcion);
                            $('#txtCentroCostoSCFactura').val(ls[0].centroCosto);
                            $('#txtRucSCFactura').val(ls[0].ruc);
                            $('#txtEmpresaSCFactura').val(ls[0].razonSocial);
                            $('#txtNroFacturaSCFactura').val(ls[0].nroDoc);
                            $('#txtMontoSCFactura').val(ls[0].importe);
                            $('#txtFechaSCFactura').val(dsh.formatDate(new Date(ls[0].fechaDoc)));

                            $('#div_adjuntosSCFactura').css('display', 'none');
                            $('#btnAgregarSCFactura').text('Modificar');
                            $('#titleModalSCFactura').text('Editar Sustento');
                            $('#mSCFactura').modal('show');
                            $('#spinner_loading').hide();
                        },
                        error: function (request) {
                        }
                    });
                }
                if (tipo == 'Otro') {
                    $.ajax({
                        cache: false,
                        url: url_ListSustentoById,
                        type: "POST",
                        data: {
                            id: id,
                        },
                        success: function (data) {
                            var ls = JSON.parse(data.value).data;
                            dsh.limpiarmSCOtro();
                            $('#txtIdSCFactura').val(id);
                            $('#txtDescripcionSCOtro').val(ls[0].descripcion);
                            $('#txtCentroCostoSCOtro').val(ls[0].centroCosto);
                            $('#txtNroFacturaSCOtro').val(ls[0].nroDoc);
                            $('#txtMontoSCOtro').val(ls[0].importe);
                            $('#txtFechaSCOtro').val(dsh.formatDate(new Date(ls[0].fechaDoc)));

                            $('#div_adjuntosSCOtro').css('display', 'none');
                            $('#btnAgregarSCOtro').text('Modificar');
                            $('#titleModalSCOtro').text('Editar Sustento');
                            $('#mSCOtro').modal('show');
                            $('#spinner_loading').hide();
                        },
                        error: function (request) {
                        }
                    });
                }

                if (tipo == 'Voucher') {
                    $.ajax({
                        cache: false,
                        url: url_ListSustentoById,
                        type: "POST",
                        data: {
                            id: id,
                        },
                        success: function (data) {
                            var ls = JSON.parse(data.value).data;
                            $('#txtIdSCVoucher').val(id);

                            dsh.GetVouchers();

                            setTimeout(() => {
                                $('#sVouchers').val(ls[0].voucherId);
                                $('#txtIdSCVoucher').val(ls[0].id);
                                $('#txtDescripcionSCVoucher').val(ls[0].descripcion);
                                $('#txtCentroCostoSCVoucher').val(ls[0].centroCosto);
                            }, 300);

                            $('#btnAgregarSCVoucher').text('Modificar');
                            $('#titleModalSCVoucher').text('Editar Sustento');
                            $('#mSCVoucher').modal('show');
                            $('#spinner_loading').hide();
                        },
                        error: function (request) {
                        }
                    });
                }
            });

            $(document).on('click', '.borrarSC', function () {
                let id = $(this).attr('dataId');
                let codigo = $(this).attr('dataCodigo');
                let tipo = $(this).attr('dataTipo');
                let pdf = $(this).attr('dataFilePDF');
                let xml = $(this).attr('dataFileXML');

                dsh.DeleteSustento(id, pdf, xml, codigo);
                
            });

            $(document).on('click', '#btnEnviarRC', function () {

                
                if ($("#txtJefeArea").val() == null || $("#txtJefeArea").val() == '') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: 'Debe elegir Jefatura de Area',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#mNuevo').modal('hide');
                            dsh.ListRendiciones();
                            $('#spinner_loading').hide();
                        }
                    })
                } else {
                    dsh.GetCorreoContadores();
                    dsh.UpdateEstadoRendicion($('#txtIdRendicionSC').val(), 6)
                }
                
            });

            
        },

        limpiarmSCFactura() {
            $('#txtDescripcionSCFactura').val('');
            $("#txtDescripcionSCFactura").removeClass("parsley-success");
            $("#txtDescripcionSCFactura").removeClass("parsley-error");

            $('#txtCentroCostoSCFactura').val('');
            $("#txtCentroCostoSCFactura").removeClass("parsley-success");
            $("#txtCentroCostoSCFactura").removeClass("parsley-error");

            $('#txtRucSCFactura').val('');
            $("#txtRucSCFactura").removeClass("parsley-success");
            $("#txtRucSCFactura").removeClass("parsley-error");

            $('#txtEmpresaSCFactura').val('');
            $("#txtEmpresaSCFactura").removeClass("parsley-success");
            $("#txtEmpresaSCFactura").removeClass("parsley-error");

            $('#txtNroFacturaSCFactura').val('');
            $("#txtNroFacturaSCFactura").removeClass("parsley-success");
            $("#txtNroFacturaSCFactura").removeClass("parsley-error");

            $('#txtMontoSCFactura').val('');
            $("#txtMontoSCFactura").removeClass("parsley-success");
            $("#txtMontoSCFactura").removeClass("parsley-error");

            $('#txtFechaSCFactura').val('');
            $("#txtFechaSCFactura").removeClass("parsley-success");
            $("#txtFechaSCFactura").removeClass("parsley-error");

            $('#fPDF').val('');
            $("#fPDF").removeClass("parsley-success");
            $("#fPDF").removeClass("parsley-error");
        },

        limpiarmSCOtro() {
            $('#txtDescripcionSCOtro').val('');
            $("#txtDescripcionSCOtro").removeClass("parsley-success");
            $("#txtDescripcionSCOtro").removeClass("parsley-error");

            $('#txtCentroCostoSCOtro').val('');
            $("#txtCentroCostoSCOtro").removeClass("parsley-success");
            $("#txtCentroCostoSCOtro").removeClass("parsley-error");

            $('#txtNroFacturaSCOtro').val('');
            $("#txtNroFacturaSCOtro").removeClass("parsley-success");
            $("#txtNroFacturaSCOtro").removeClass("parsley-error");

            $('#txtMontoSCOtro').val('');
            $("#txtMontoSCOtro").removeClass("parsley-success");
            $("#txtMontoSCOtro").removeClass("parsley-error");

            $('#txtFechaSCOtro').val('');
            $("#txtFechaSCOtro").removeClass("parsley-success");
            $("#txtFechaSCOtro").removeClass("parsley-error");

            $('#fPDFOtro').val('');
            $("#fPDFOtro").removeClass("parsley-success");
            $("#fPDFOtro").removeClass("parsley-error");
        },

        limpiarmSCVoucher() {
            $('#txtDescripcionSCVoucher').val('');
            $("#txtDescripcionSCVoucher").removeClass("parsley-success");
            $("#txtDescripcionSCVoucher").removeClass("parsley-error");

            $('#txtCentroCostoSCVoucher').val('');
            $("#txtCentroCostoSCVoucher").removeClass("parsley-success");
            $("#txtCentroCostoSCVoucher").removeClass("parsley-error");

        },

        validarSCFactura() {

            var val = 0;
            if ($('#txtDescripcionSCFactura').val() == '') {
                $("#txtDescripcionSCFactura").removeClass("parsley-success");
                $("#txtDescripcionSCFactura").removeClass("parsley-error");
                $("#txtDescripcionSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtDescripcionSCFactura").removeClass("parsley-success");
                $("#txtDescripcionSCFactura").removeClass("parsley-error");
                $("#txtDescripcionSCFactura").addClass("parsley-success");
            }

            if ($('#txtCentroCostoSCFactura').val() == '') {
                $("#txtCentroCostoSCFactura").removeClass("parsley-success");
                $("#txtCentroCostoSCFactura").removeClass("parsley-error");
                $("#txtCentroCostoSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtCentroCostoSCFactura").removeClass("parsley-success");
                $("#txtCentroCostoSCFactura").removeClass("parsley-error");
                $("#txtCentroCostoSCFactura").addClass("parsley-success");
            }

            if ($("#txtRucSCFactura").val() == '') {
                $("#txtRucSCFactura").removeClass("parsley-success");
                $("#txtRucSCFactura").removeClass("parsley-error");
                $("#txtRucSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtRucSCFactura").removeClass("parsley-success");
                $("#txtRucSCFactura").removeClass("parsley-error");
                $("#txtRucSCFactura").addClass("parsley-success");
            }

            if ($('#txtEmpresaSCFactura').val() == '') {
                $("#txtEmpresaSCFactura").removeClass("parsley-success");
                $("#txtEmpresaSCFactura").removeClass("parsley-error");
                $("#txtEmpresaSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtEmpresaSCFactura").removeClass("parsley-success");
                $("#txtEmpresaSCFactura").removeClass("parsley-error");
                $("#txtEmpresaSCFactura").addClass("parsley-success");
            }

            if ($('#txtNroFacturaSCFactura').val() == '') {
                $("#txtNroFacturaSCFactura").removeClass("parsley-success");
                $("#txtNroFacturaSCFactura").removeClass("parsley-error");
                $("#txtNroFacturaSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtNroFacturaSCFactura").removeClass("parsley-success");
                $("#txtNroFacturaSCFactura").removeClass("parsley-error");
                $("#txtNroFacturaSCFactura").addClass("parsley-success");
            }

            if ($('#txtMontoSCFactura').val() == '') {
                $("#txtMontoSCFactura").removeClass("parsley-success");
                $("#txtMontoSCFactura").removeClass("parsley-error");
                $("#txtMontoSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtMontoSCFactura").removeClass("parsley-success");
                $("#txtMontoSCFactura").removeClass("parsley-error");
                $("#txtMontoSCFactura").addClass("parsley-success");
            }

            if ($('#txtFechaSCFactura').val() == '') {
                $("#txtFechaSCFactura").removeClass("parsley-success");
                $("#txtFechaSCFactura").removeClass("parsley-error");
                $("#txtFechaSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtFechaSCFactura").removeClass("parsley-success");
                $("#txtFechaSCFactura").removeClass("parsley-error");
                $("#txtFechaSCFactura").addClass("parsley-success");
            }

            if ($("#fPDF").get(0).files.length == 0 || $("#fPDF").get(0).files[0].size == 0) {
                $("#fPDF").removeClass("parsley-success");
                $("#fPDF").removeClass("parsley-error");
                $("#fPDF").addClass("parsley-error");
                val = 1;
            } else {
                $("#fPDF").removeClass("parsley-success");
                $("#fPDF").removeClass("parsley-error");
                $("#fPDF").addClass("parsley-success");
            }

            if ($("#fXML").get(0).files.length == 1 && $("#fXML").get(0).files[0].size == 0) {
                $("#fXML").removeClass("parsley-success");
                $("#fXML").removeClass("parsley-error");
                $("#fXML").addClass("parsley-error");
                val = 1;
            } else {
                $("#fXML").removeClass("parsley-success");
                $("#fXML").removeClass("parsley-error");
            }

            if (val == 0) {
                return true;
            } else {
                return false;
            }
        },

        validarSCFacturaSinFiles() {

            var val = 0;
            if ($('#txtDescripcionSCFactura').val() == '') {
                $("#txtDescripcionSCFactura").removeClass("parsley-success");
                $("#txtDescripcionSCFactura").removeClass("parsley-error");
                $("#txtDescripcionSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtDescripcionSCFactura").removeClass("parsley-success");
                $("#txtDescripcionSCFactura").removeClass("parsley-error");
                $("#txtDescripcionSCFactura").addClass("parsley-success");
            }

            if ($('#txtCentroCostoSCFactura').val() == '') {
                $("#txtCentroCostoSCFactura").removeClass("parsley-success");
                $("#txtCentroCostoSCFactura").removeClass("parsley-error");
                $("#txtCentroCostoSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtCentroCostoSCFactura").removeClass("parsley-success");
                $("#txtCentroCostoSCFactura").removeClass("parsley-error");
                $("#txtCentroCostoSCFactura").addClass("parsley-success");
            }

            if ($("#txtRucSCFactura").val() == '') {
                $("#txtRucSCFactura").removeClass("parsley-success");
                $("#txtRucSCFactura").removeClass("parsley-error");
                $("#txtRucSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtRucSCFactura").removeClass("parsley-success");
                $("#txtRucSCFactura").removeClass("parsley-error");
                $("#txtRucSCFactura").addClass("parsley-success");
            }

            if ($('#txtEmpresaSCFactura').val() == '') {
                $("#txtEmpresaSCFactura").removeClass("parsley-success");
                $("#txtEmpresaSCFactura").removeClass("parsley-error");
                $("#txtEmpresaSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtEmpresaSCFactura").removeClass("parsley-success");
                $("#txtEmpresaSCFactura").removeClass("parsley-error");
                $("#txtEmpresaSCFactura").addClass("parsley-success");
            }

            if ($('#txtNroFacturaSCFactura').val() == '') {
                $("#txtNroFacturaSCFactura").removeClass("parsley-success");
                $("#txtNroFacturaSCFactura").removeClass("parsley-error");
                $("#txtNroFacturaSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtNroFacturaSCFactura").removeClass("parsley-success");
                $("#txtNroFacturaSCFactura").removeClass("parsley-error");
                $("#txtNroFacturaSCFactura").addClass("parsley-success");
            }

            if ($('#txtMontoSCFactura').val() == '') {
                $("#txtMontoSCFactura").removeClass("parsley-success");
                $("#txtMontoSCFactura").removeClass("parsley-error");
                $("#txtMontoSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtMontoSCFactura").removeClass("parsley-success");
                $("#txtMontoSCFactura").removeClass("parsley-error");
                $("#txtMontoSCFactura").addClass("parsley-success");
            }

            if ($('#txtFechaSCFactura').val() == '') {
                $("#txtFechaSCFactura").removeClass("parsley-success");
                $("#txtFechaSCFactura").removeClass("parsley-error");
                $("#txtFechaSCFactura").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtFechaSCFactura").removeClass("parsley-success");
                $("#txtFechaSCFactura").removeClass("parsley-error");
                $("#txtFechaSCFactura").addClass("parsley-success");
            }

            if (val == 0) {
                return true;
            } else {
                return false;
            }
        },

        validarSCOtro() {

            var val = 0;
            if ($('#txtDescripcionSCOtro').val() == '') {
                $("#txtDescripcionSCOtro").removeClass("parsley-success");
                $("#txtDescripcionSCOtro").removeClass("parsley-error");
                $("#txtDescripcionSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtDescripcionSCOtro").removeClass("parsley-success");
                $("#txtDescripcionSCOtro").removeClass("parsley-error");
                $("#txtDescripcionSCOtro").addClass("parsley-success");
            }

            if ($('#txtCentroCostoSCOtro').val() == '') {
                $("#txtCentroCostoSCOtro").removeClass("parsley-success");
                $("#txtCentroCostoSCOtro").removeClass("parsley-error");
                $("#txtCentroCostoSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtCentroCostoSCOtro").removeClass("parsley-success");
                $("#txtCentroCostoSCOtro").removeClass("parsley-error");
                $("#txtCentroCostoSCOtro").addClass("parsley-success");
            }

            if ($('#txtNroFacturaSCOtro').val() == '') {
                $("#txtNroFacturaSCOtro").removeClass("parsley-success");
                $("#txtNroFacturaSCOtro").removeClass("parsley-error");
                $("#txtNroFacturaSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtNroFacturaSCOtro").removeClass("parsley-success");
                $("#txtNroFacturaSCOtro").removeClass("parsley-error");
                $("#txtNroFacturaSCOtro").addClass("parsley-success");
            }

            if ($('#txtMontoSCOtro').val() == '') {
                $("#txtMontoSCOtro").removeClass("parsley-success");
                $("#txtMontoSCOtro").removeClass("parsley-error");
                $("#txtMontoSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtMontoSCOtro").removeClass("parsley-success");
                $("#txtMontoSCOtro").removeClass("parsley-error");
                $("#txtMontoSCOtro").addClass("parsley-success");
            }

            if ($('#txtFechaSCOtro').val() == '') {
                $("#txtFechaSCOtro").removeClass("parsley-success");
                $("#txtFechaSCOtro").removeClass("parsley-error");
                $("#txtFechaSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtFechaSCOtro").removeClass("parsley-success");
                $("#txtFechaSCOtro").removeClass("parsley-error");
                $("#txtFechaSCOtro").addClass("parsley-success");
            }

            if ($("#fPDFOtro").get(0).files.length == 0 || $("#fPDFOtro").get(0).files[0].size == 0) {
                $("#fPDFOtro").removeClass("parsley-success");
                $("#fPDFOtro").removeClass("parsley-error");
                $("#fPDFOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#fPDFOtro").removeClass("parsley-success");
                $("#fPDFOtro").removeClass("parsley-error");
                $("#fPDFOtro").addClass("parsley-success");
            }

            if (val == 0) {
                return true;
            } else {
                return false;
            }
        },

        validarSCOtroSinFiles() {

            var val = 0;
            if ($('#txtDescripcionSCOtro').val() == '') {
                $("#txtDescripcionSCOtro").removeClass("parsley-success");
                $("#txtDescripcionSCOtro").removeClass("parsley-error");
                $("#txtDescripcionSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtDescripcionSCOtro").removeClass("parsley-success");
                $("#txtDescripcionSCOtro").removeClass("parsley-error");
                $("#txtDescripcionSCOtro").addClass("parsley-success");
            }

            if ($('#txtCentroCostoSCOtro').val() == '') {
                $("#txtCentroCostoSCOtro").removeClass("parsley-success");
                $("#txtCentroCostoSCOtro").removeClass("parsley-error");
                $("#txtCentroCostoSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtCentroCostoSCOtro").removeClass("parsley-success");
                $("#txtCentroCostoSCOtro").removeClass("parsley-error");
                $("#txtCentroCostoSCOtro").addClass("parsley-success");
            }

            if ($('#txtNroFacturaSCOtro').val() == '') {
                $("#txtNroFacturaSCOtro").removeClass("parsley-success");
                $("#txtNroFacturaSCOtro").removeClass("parsley-error");
                $("#txtNroFacturaSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtNroFacturaSCOtro").removeClass("parsley-success");
                $("#txtNroFacturaSCOtro").removeClass("parsley-error");
                $("#txtNroFacturaSCOtro").addClass("parsley-success");
            }

            if ($('#txtMontoSCOtro').val() == '') {
                $("#txtMontoSCOtro").removeClass("parsley-success");
                $("#txtMontoSCOtro").removeClass("parsley-error");
                $("#txtMontoSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtMontoSCOtro").removeClass("parsley-success");
                $("#txtMontoSCOtro").removeClass("parsley-error");
                $("#txtMontoSCOtro").addClass("parsley-success");
            }

            if ($('#txtFechaSCOtro').val() == '') {
                $("#txtFechaSCOtro").removeClass("parsley-success");
                $("#txtFechaSCOtro").removeClass("parsley-error");
                $("#txtFechaSCOtro").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtFechaSCOtro").removeClass("parsley-success");
                $("#txtFechaSCOtro").removeClass("parsley-error");
                $("#txtFechaSCOtro").addClass("parsley-success");
            }

            if (val == 0) {
                return true;
            } else {
                return false;
            }
        },

        validarSCVoucher() {

            var val = 0;
            if ($('#txtDescripcionSCVoucher').val() == '') {
                $("#txtDescripcionSCVoucher").removeClass("parsley-success");
                $("#txtDescripcionSCVoucher").removeClass("parsley-error");
                $("#txtDescripcionSCVoucher").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtDescripcionSCVoucher").removeClass("parsley-success");
                $("#txtDescripcionSCVoucher").removeClass("parsley-error");
                $("#txtDescripcionSCVoucher").addClass("parsley-success");
            }

            if ($('#txtCentroCostoSCVoucher').val() == '') {
                $("#txtCentroCostoSCVoucher").removeClass("parsley-success");
                $("#txtCentroCostoSCVoucher").removeClass("parsley-error");
                $("#txtCentroCostoSCVoucher").addClass("parsley-error");
                val = 1;
            } else {
                $("#txtCentroCostoSCVoucher").removeClass("parsley-success");
                $("#txtCentroCostoSCVoucher").removeClass("parsley-error");
                $("#txtCentroCostoSCVoucher").addClass("parsley-success");
            }

            if ($('#sVouchers').val() == '') {
                $("#sVouchers").removeClass("parsley-success");
                $("#sVouchers").removeClass("parsley-error");
                $("#sVouchers").addClass("parsley-error");
                val = 1;
            } else {
                $("#sVouchers").removeClass("parsley-success");
                $("#sVouchers").removeClass("parsley-error");
                $("#sVouchers").addClass("parsley-success");
            }

            if (val == 0) {
                return true;
            } else {
                return false;
            }
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
                download(blob,pdf);
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

        SumaTotalRequisicion() {

            $('#div_table_sumSC').html('');

            var htmlTableDetalle = '';
            htmlTableDetalle += `
                        <table id="tSumaCC" class="table-hover" style="width:100%; font-size:15px">
                            `;
            htmlTableDetalle += `
                            <tbody>`;
            htmlTableDetalle += `<tr style="vertical-align: middle;">`;
            htmlTableDetalle += `
                                <th style="padding: 0px;">` + `Monto Requisición Total` + `</th>
                                <td class="text-end" style="padding: 0px;">` + dsh.soles(requisicion[0].monto) + `</td>
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
                                <td class="text-end" style="padding: 0px;">` + dsh.soles(requisicion[0].monto - sumCC) + `</td>
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
                                    estado = 'Enviado a revisión';
                                    break;
                                case 2:
                                    estado = 'Observado';
                                    break;
                                case 3:
                                    estado = 'en Tesoreria';
                                    break;
                                case 4:
                                    estado = 'Finalizado';
                                    break;
                                case 6:
                                    estado = 'en Jefe de Area';
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
                                '<button type="button" data-bs-toggle="tooltip" data-bs-title="Agregar Sustentos" dataId="' + ls[i].id + '" dataTipo="' + ls[i].tipo + '" dataCodigo="' + ls[i].codigo + '" dataDate="' + ls[i].dateCreate + '" dataEstado="' + ls[i].estado + '" class="btn btn-indigo btn-xs agregarSustento"><i class="ion ion-md-apps"></i></button> ' +
                                (ls[i].estado == 4 || ls[i].estado == 1 || ls[i].estado == 3 || ls[i].estado == 6 ? '' : ('<button type="button" data-bs-toggle="tooltip" data-bs-title="Modificar" dataId="' + ls[i].id + '" class="btn btn-primary btn-xs modificar"><i class="ion ion-md-create"></i></button> ')) +
                                (ls[i].estado == 2 || ls[i].estado == 0 ? ('<button type="button" data-bs-toggle="tooltip" data-bs-title="Eliminar" dataId="' + ls[i].id + '" class="btn btn-danger btn-xs borrar"><i class="ion ion-md-trash"></i></button>   ') : '')
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
                            dom: '<"dataTables_wrapper dt-bootstrap"<"row"<"col-xl-7 d-block d-sm-flex d-xl-block justify-content-center"<"d-block d-lg-inline-flex me-0 me-md-3"l><"d-block d-lg-inline-flex"B>><"col-xl-5 d-flex d-xl-block justify-content-center"fr>>t<"row"<"col-md-5"i><"col-md-7"p>>>',
                            buttons: [
                                { extend: 'excel', className: 'btn-sm' },
                                { extend: 'pdf', className: 'btn-sm' },
                                { extend: 'print', className: 'btn-sm', name: 'Imprimir' }
                            ],
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
                url: url_InsertRendicion,
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
        UpdateEstadoRendicion(id,estado) {
            $.ajax({
                cache: false,
                url: url_UpdateEstadoRendicion,
                type: "POST",
                data: {
                    id: id,
                    estado: estado
                },
                success: function (data) {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'Se envió correctamente para su revisión',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#mSustentosCaja').modal('hide');
                                dsh.ListRendiciones();
                                $('#spinner_loading').hide();
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un problema al actualizar el estado de la rendición',
                        }).then((result) => {
                            if (result.isConfirmed) {

                            }
                        })
                    }
                },
                error: function (request) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un problema al actualizar el estado de la rendición',
                    }).then((result) => {
                        if (result.isConfirmed) {

                        }
                    })
                }
            });
        },
        UpdateAreaRendicion() {

            var id = $('#txtIdRendicionSC').val();
            var area = $('#sArea').picker('get');
            var jefeArea = $('#sJefeArea').picker('get');

            $.ajax({
                cache: false,
                url: url_UpdateAreaRendicion,
                type: "POST",
                data: {
                    id: id,
                    area: area,
                    jefeArea: jefeArea
                },
                success: function (data) {
                    if (data.status) {
                        $("#txtArea").val(area);
                        $("#txtJefeArea").val(jefeArea);
                    }
                },
                error: function (request) {
                    console.log(request);
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

        GetAreas() {
            $.ajax({
                url: url_GetAreas,
                type: "POST",
                data: {
                    companyId: sessionStorage.IdEmpresa,
                },
                success: function (data) {
                    //console.log(data.value);

                    var ls = JSON.parse(data.value).data;
                    $("#sArea").picker('destroy');
                    $("#sArea").find('option').remove();
                    for (var i = 0; i < ls.length; i++) {
                        $("#sArea").append("<option value='" + ls[i].codigo + "'> " + ls[i].descripcion + " </option>");
                    }
                    $('#sArea').picker({
                        search: true,
                        texts: { trigger: "-- Seleccione Area --", noResult: "No se encuentró", search: "Buscar" }
                    });
                    //jSuites.dropdown(document.getElementById('sCaja'));
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        GetJefeArea() {
            $.ajax({
                url: url_GetJefeArea,
                type: "POST",
                data: {
                    companyId: sessionStorage.IdEmpresa,
                    codigo: $('#sArea').val()
                },
                success: function (data) {
                    //console.log(data.value);

                    var ls = JSON.parse(data.value).data;

                    if (ls.length > 0) {
                        $("#sJefeArea").picker('destroy');
                        $("#sJefeArea").find('option').remove();
                        for (var i = 0; i < ls.length; i++) {
                            $("#sJefeArea").append("<option value='" + ls[i].userId + "'> " + ls[i].usuario + " </option>");
                        }
                        $('#sJefeArea').picker({
                            search: true,
                            texts: { trigger: "-- Seleccione Jefe de Área --", noResult: "No se encuentró", search: "Buscar" }
                        });
                    } else {
                        $('#sJefeArea').picker();
                        $('#sJefeArea').picker('destroy');
                        $("#sJefeArea").find('option').remove();
                        $("#sJefeArea").attr('disabled', 'disabled');
                    }
                    
                    //jSuites.dropdown(document.getElementById('sCaja'));
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        ListSustentos(id,estado) {
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
                                case 'RxH':
                                    tipo = 'RxH';
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
                                (ls[i].estado == 0 || ls[i].estado == 2 ? (tipo != 'VR' ? '<button type="button" data-bs-toggle="tooltip" data-bs-title="Modificar" dataId="' + ls[i].id + '" dataTipo="' + ls[i].tipo + '" class="btn btn-outline-primary btn-icon modificarSC"><i class="ion ion-md-create"></i></button> ' : '') : '') +
                                (ls[i].estado == 0 || ls[i].estado == 2 ? ('<button type="button" data-bs-toggle="tooltip" data-bs-title="Eliminar" dataId="' + ls[i].id + '" dataTipo="' + ls[i].tipo + '" dataCodigo="' + ls[i].codigo + '" dataFilePDF="' + ls[i].filePDF + '" dataFileXML="' + ls[i].fileXML + '"class="btn btn-outline-danger btn-icon borrarSC"><i class="ion ion-md-trash"></i></button>  '):'') +
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
                            dom: '<"dataTables_wrapper dt-bootstrap"<"row"<"col-xl-7 d-block d-sm-flex d-xl-block justify-content-center"<"d-block d-lg-inline-flex me-0 me-md-3"l><"d-block d-lg-inline-flex"B>><"col-xl-5 d-flex d-xl-block justify-content-center"fr>>t<"row"<"col-md-5"i><"col-md-7"p>>>',
                            buttons: [
                                { extend: 'excel', className: 'btn-sm' },
                                { extend: 'pdf', className: 'btn-sm' },
                                { extend: 'print', className: 'btn-sm', name: 'Imprimir' }
                            ],
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

                        if (tipoRendicion == 'Caja') {
                            dsh.SumaTotal();
                        }
                        if (tipoRendicion == 'Requisición') {
                            dsh.SumaTotalRequisicion();
                        }
                        
                    }
                },
                error: function (request) {
                }
            });
        },

        InsertSustento(tipo,codigo,ls,filename) {
            var idRendicion = $('#txtIdRendicionSC').val();
            var fdata = new FormData();
            fdata.append('idRendicion', idRendicion);
            fdata.append('tipo', tipo);
            fdata.append('codigo', codigo);

            if (tipo == 'Factura' || tipo == 'Boleta' || tipo == 'RxH') {
                fdata.append('id', $('#txtIdSCFactura').val());
                fdata.append('descripcion', $('#txtDescripcionSCFactura').val());
                fdata.append('centroCosto', $('#txtCentroCostoSCFactura').val());
                fdata.append('ruc', $('#txtRucSCFactura').val());
                fdata.append('razonSocial', $('#txtEmpresaSCFactura').val());
                fdata.append('nroDoc', $('#txtNroFacturaSCFactura').val());
                fdata.append('fechaDoc', $('#txtFechaSCFactura').val());
                fdata.append('importe', $('#txtMontoSCFactura').val());

                if ($('#txtIdSCFactura').val() == '' || $('#txtIdSCFactura').val() == null) {
                    var filePDF = $("#fPDF").get(0).files;
                    var fileXML = $("#fXML").get(0).files;

                    fdata.append(filePDF[0].name, filePDF[0]);

                    if (fileXML.length != 0) {
                        fdata.append(fileXML[0].name, fileXML[0]);
                    }
                }
            }

            if (tipo == 'Otro') {
                fdata.append('id', $('#txtIdSCOtro').val());
                fdata.append('descripcion', $('#txtDescripcionSCOtro').val());
                fdata.append('centroCosto', $('#txtCentroCostoSCOtro').val());
                fdata.append('nroDoc', $('#txtNroFacturaSCOtro').val());
                fdata.append('fechaDoc', $('#txtFechaSCOtro').val());
                fdata.append('importe', $('#txtMontoSCOtro').val());

                if ($('#txtIdSCOtro').val() == '' || $('#txtIdSCOtro').val() == null) {
                    var filePDF = $("#fPDFOtro").get(0).files;
                    fdata.append(filePDF[0].name, filePDF[0]);
                }
            }

            if (tipo == 'Voucher') {
                fdata.append('id', $('#txtIdSCVoucher').val());
                fdata.append('descripcion', $('#txtDescripcionSCVoucher').val());
                fdata.append('centroCosto', $('#txtCentroCostoSCVoucher').val());
                fdata.append('fechaDoc', ls.Fecha);
                fdata.append('voucherId', ls.IdVoucher);
                fdata.append('filePDF', filename);
                fdata.append('importe', ls.Monto);
            }

            $.ajax({
                type: "POST",
                url: url_InsertSustento,
                //beforeSend: function (xhr) {
                //    xhr.setRequestHeader("XSRF-TOKEN",
                //        $('input:hidden[name="__RequestVerificationToken"]').val());
                //},
                data: fdata,
                contentType: false,
                processData: false,
                success: function (data) {
                    //console.log(data);
                    if (data.status) {
                        //var ls = JSON.parse(data.value).data;

                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'Se guardó correctamente!',
                        }).then((result) => {
                            if (result.isConfirmed) {

                                if (tipo == 'Factura' || tipo == 'Boleta' || tipo == 'RxH') {
                                    $('#mSCFactura').modal('hide');
                                    dsh.ListSustentos(idRendicion);
                                    $('#spinner_loading').hide();
                                }

                                if (tipo == 'Otro') {
                                    $('#mSCOtro').modal('hide');
                                    dsh.ListSustentos(idRendicion);
                                    $('#spinner_loading').hide();
                                }

                                if (tipo == 'Voucher') {
                                    $('#mSCVoucher').modal('hide');
                                    dsh.ListSustentos(idRendicion);
                                    $('#spinner_loading').hide();
                                }
                            }
                        })
                    }
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        DeleteSustento(id,pdf,xml,codigo) {
            
            $.ajax({
                type: "POST",
                url: url_DeleteSustento,
                //beforeSend: function (xhr) {
                //    xhr.setRequestHeader("XSRF-TOKEN",
                //        $('input:hidden[name="__RequestVerificationToken"]').val());
                //},
                data: {
                    id: id,
                    filePDF: pdf,
                    fileXML: xml,
                    codigo: codigo
                },
                //contentType: false,
                //processData: false,
                success: function (data) {
                    //console.log(data);
                    if (data.status) {
                        //var ls = JSON.parse(data.value).data;

                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'Se eliminó correctamente!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#mSCFactura').modal('hide');
                                dsh.ListSustentos($('#txtIdRendicionSC').val());
                                $('#spinner_loading').hide();
                            }
                        })
                    }
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        GetVouchers() {
            $.ajax({
                type: "POST",
                url: url_GetVouchers,
                data: {
                    companyId : sessionStorage.IdEmpresa
                },
                success: function (data) {
                    //console.log(data);
                    if (data.status) {
                        //var ls = JSON.parse(data.value).data;

                        var ls = JSON.parse(data.value).data;

                        $("#sVouchers").find('option').remove();
                        for (var i = 0; i < ls.length; i++) {
                            $("#sVouchers").append("<option value='" + ls[i].IdVoucher + "'> N°: " + ls[i].Correlativo + " | Monto: " + dsh.soles(ls[i].Monto) + " | Usuario: " + ls[i].Usuario + " | Fecha: " + dsh.formatDateSlash(new Date(ls[i].Fecha)) + " </option>");
                        }

                    }
                },
                error: function () {
                    console.log("Error");
                }
            });
        },

        GetCorreoContadores() {
            $.ajax({
                type: "POST",
                url: url_GetCorreoContadores,
                data: {
                    companyId : sessionStorage.IdEmpresa
                },
                success: function (data) {
                    //console.log(data);
                    if (data.status) {
                        //var ls = JSON.parse(data.value).data;

                        var ls = JSON.parse(data.value).data[0];

                        dsh.SendMail(ls.correos);
                    }
                },
                error: function () {
                    console.log("Error");
                    return false;
                }
            });
        },

        SendMail(para) {

            var para = para;
            var asunto = 'NOTIFICACIÓN DE NUEVA RENDICION POR REVISAR';
            var cuerpo = `
                <p> Estimado(a).</p>
                <p> Se ha generado una nueva rendición ` + $('#txtNroReporte').val() + ` para la empresa ` + sessionStorage.RazonSocial + ` por el monto de ` + dsh.soles(sumCC) + `</p>

                <p> Atte.</p>
                <p> <strong>ADGIntegrado - Módulo Rendiciones.</strong></p>
            `;

            $.ajax({
                type: "POST",
                url: url_SendMail,
                data: {
                    Para: para,
                    Asunto: asunto,
                    Cuerpo: cuerpo
                },
                success: function (data) {
                    //console.log(data);
                    if (data.status) {
                        return true;
                    }
                },
                error: function () {
                    console.log("Error");
                    return false;
                }
            });
        },
    };

    dsh.init();
});