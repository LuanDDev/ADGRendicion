$(document).ready(function () {
    var dsh = {
        init: function () {
            dsh.evento();
        },

        evento() {
            //dsh.GetCompanies();
            console.log(UsuarioLogueado);

            if (UsuarioLogueado.length > 0) {
                $('#User').val(UsuarioLogueado.userLogin);

                dsh.Login();
            }

            $("#btnLogin").on("click", function () {
                dsh.Login();
            })

            $('#User').keyup(function (event) {
                if (event.which === 13) {
                    $("#btnLogin").click();
                }
            });
            $('#Contrasena').keyup(function (event) {
                if (event.which === 13) {
                    $("#btnLogin").click();
                }
            });

            $(document).on("click", "#btnOlvide", function () {
                $('#Usuario').val('');

                $('#mOlvido').modal('show');
            });

            $(document).on("click", "#btnEnviarCorreo", function () {
                if ($('#Usuario').val() != "") {
                    $.ajax({

                        cache: false,
                        async: true,
                        url: url_enviarCorreo,
                        type: "GET",
                        data: {
                            Login: $('#Usuario').val()
                        },
                        datatype: false,
                        contentType: false,
                        success: function (data) {
                            if (data.status) {
                                $('#mOlvido').modal('hide');
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Se emvio un correo con sus accesos.',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Usuario no existe',
                                    icon: 'error'
                                })
                            }
                        },
                        error: function () {
                            console.log("Error");
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Debe ingresar un usuario',
                        icon: 'error'
                    })
                }

            });

        },

        Login() {

            //var formData = new FormData($("#formLogin")[0]);
            var formData = new FormData();
            formData.append("User", UsuarioLogueado[0].userLogin);
            //formData.append("Contrasena", "12345");
            //formData.append("Company", "1");

            $.ajax({

                cache: false,
                async: true,
                url: url_Authenticate,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    dsh.alerts('Correcto!!', 'success');
                    window.location.href = url_selectCompany2;
                },
                error: function (data) {
                    //window.location.href = url_home;
                    dsh.alerts(data.responseJSON.value, 'danger');
                }
            });
        },

        alerts(mensaje, type) {
            $('#liveAlertPlaceholder').html('');
            var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
            var wrapper = document.createElement('div');
            wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + mensaje + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

            alertPlaceholder.append(wrapper);
        },

        
    };

    dsh.init();
});