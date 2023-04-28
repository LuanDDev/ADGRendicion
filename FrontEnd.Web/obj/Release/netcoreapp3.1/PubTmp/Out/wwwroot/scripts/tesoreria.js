var canvas = document.getElementById("my_canvas");
var autoresize = true;

var ctx = document.getElementById("my_canvas").getContext("2d");
var ctrl_pressed = false;
var reading_dom = false;
var text_top = 15;

var pasteCatcher;
var paste_mode;

var caja;
var sumCC;

var ruta;
var nombreCaptura;
$(document).ready(function () {

    var dsh = {
        init: function () {
            pasteCatcher = document.createElement("div");
            pasteCatcher.setAttribute("id", "paste_ff");
            pasteCatcher.setAttribute("contenteditable", "");
            pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;';
            pasteCatcher.style.marginLeft = "-20px";
            pasteCatcher.style.width = "10px";
            document.body.appendChild(pasteCatcher);
            document.getElementById('paste_ff').addEventListener('DOMSubtreeModified', function () {
                if (paste_mode == 'auto' || ctrl_pressed == false)
                    return true;
                //if paste handle failed - capture pasted object manually
                if (pasteCatcher.children.length == 1) {
                    if (pasteCatcher.firstElementChild.src != undefined) {
                        //image
                        dsh.paste_createImage(pasteCatcher.firstElementChild.src);

                        console.log(pasteCatcher.firstElementChild.src);
                    }
                }
                //register cleanup after some time.
                setTimeout(function () {
                    pasteCatcher.innerHTML = '';
                }, 20);
            }, false);

            dsh.evento();
        },

        evento() {
            if (sessionStorage.IdEmpresa == 0 || sessionStorage.IdEmpresa == undefined) {
                document.location.href = url_selectCompany;
            }

            $('#spinner_loading').show();
            dsh.ListRendiciones();

            //handlers
            document.addEventListener('keydown', function (e) {
                dsh.on_keyboard_action(e);
            }, false); //firefox fix
            document.addEventListener('keyup', function (e) {
                dsh.on_keyboardup_action(e);
            }, false); //firefox fix
            document.addEventListener('paste', function (e) {
                dsh.paste_auto(e);
            }, false); //official paste handler

            $(document).on('click', '.ver', function () {
                var id = $(this).attr('dataId');
                $('#txtIdRendicionSC').val(id);
                var canvasConta = document.getElementById("canvasContabilidad");
                var autoresizeConta = true;

                var ctxConta = document.getElementById("canvasContabilidad").getContext("2d");

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

                ruta = ROOT + '/Rendicion/CONTA_' + id.toString() + '.jpg';
                nombreCaptura = 'CONTA_' + id.toString() + '.jpg';

                pastedImageConta.src = ruta;
                canvas.width = canvas.width
                $('#mInfo').modal('show');
            });

            $(document).on('click', '#btnFinalizar', function () {
                Swal.fire({
                    icon: 'warning', /*'success','error','warning','info','question'*/
                    title: 'Confirmación',
                    text: '¿Seguro desea finalizar la rendición?',
                    allowOutsideClick: false,
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        $('#spinner_loading').show();

                        dsh.UpdateEstadoRendicion(4)
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

        limpiar() {
            $('#txtObservacion').val('');
            canvas.width = canvas.width;
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

                        var ls = JSON.parse(data.value).data.filter(x => x.estado == 3);

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
                                '<button type="button" data-bs-toggle="tooltip" data-bs-title="Ver Información" dataId="' + ls[i].id + '" dataTipo="' + ls[i].tipo + '" dataCodigo="' + ls[i].codigo + '" dataDate="' + ls[i].dateCreate + '" dataEstado="' + ls[i].estado + '" class="btn btn-indigo btn-xs ver"><i class="ion ion-md-apps"></i></button> '
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

        UpdateEstadoRendicion(estado) {
            var formData = new FormData();
            var dataUrl;

            if (document.getElementById("my_canvas").toDataURL().length == 1614) {
                dataUrl = "";
                nombreCaptura = "";
            } else {
                dataUrl = document.getElementById("my_canvas").toDataURL('image/jpeg').replace('data:image/jpeg;base64,', '');
            }

            formData.append('imageData', dataUrl);
            formData.append('id', $('#txtIdRendicionSC').val());
            formData.append('estado', estado);

            $.ajax({
                cache: false,
                url: url_UpdateEstadoRendicion,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    var ls = JSON.parse(data.value).data[0];
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'Se finalizó correctamente',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                dsh.ListRendiciones();
                                if (estado == 3) {
                                    dsh.SendMail(data.correos, true);
                                }
                                if (estado == 2) {
                                    dsh.SendMail(ls.userMail, false);
                                }
                                $('#mInfo').modal('hide');
                                $('#spinner_loading').hide();
                            }
                        })
                    }
                },
                error: function (request) {
                }
            });
        },

        paste_auto(e) {
            paste_mode = '';
            pasteCatcher.innerHTML = '';
            var plain_text_used = false;
            if (e.clipboardData) {
                var items = e.clipboardData.items;
                if (items) {
                    paste_mode = 'auto';
                    //access data directly
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].type.indexOf("image") !== -1) {
                            //image
                            var blob = items[i].getAsFile();
                            var URLObj = window.URL || window.webkitURL;
                            var source = URLObj.createObjectURL(blob);
                            dsh.paste_createImage(source);


                            //setTimeout(() => {
                            //    var link = document.createElement('a');
                            //    link.download = 'descargar.jpg';
                            //    link.href = canvas.toDataURL()
                            //    link.click();
                            //}, "2000")

                        }
                    }
                    e.preventDefault();
                }
                else {
                    //wait for DOMSubtreeModified event
                    //https://bugzilla.mozilla.org/show_bug.cgi?id=891247
                }
            }
        },
        //on keyboard press -
        on_keyboard_action(event) {
            k = event.keyCode;
            //ctrl
            if (k == 17 || event.metaKey || event.ctrlKey) {
                if (ctrl_pressed == false)
                    ctrl_pressed = true;
            }
            //c
            if (k == 86) {
                if (document.activeElement != undefined && document.activeElement.type == 'text') {
                    //let user paste into some input
                    return false;
                }

                if (ctrl_pressed == true && !window.Clipboard)
                    pasteCatcher.focus();
            }
        },
        //on kaybord release
        on_keyboardup_action(event) {
            k = event.keyCode;
            //ctrl
            if (k == 17 || event.metaKey || event.ctrlKey || event.key == 'Meta')
                ctrl_pressed = false;
        },
        //draw image
        paste_createImage(source) {
            var pastedImage = new Image();
            pastedImage.onload = function () {
                if (autoresize == true) {
                    //resize canvas
                    canvas.width = pastedImage.width;
                    canvas.height = pastedImage.height;
                }
                else {
                    //clear canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                ctx.drawImage(pastedImage, 0, 0);
            };
            pastedImage.src = source;
        },
    };

    dsh.init();
});