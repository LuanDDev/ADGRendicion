using FrontEnd.Web.Controllers.Security;
using FrontEnd.Web.Models;
using FrontEnd.Web.Models.Seguridad;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FrontEnd.Web.Controllers
{
    public class LoginController : BaseController
    {
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IActionResult Login(User user)
        {
            ViewBag.User = user;
            return View();
        }
        public async Task<IActionResult> Authenticate(Login login)
        {
            try
            {
                if (login.User == "" || login.User == null)
                {
                    throw new Exception("Usuario no valido");
                }
                //if (login.Contrasena == "" || login.Contrasena == null)
                //{
                //    throw new Exception("Contraseña no valida");
                //}
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);
                var api = _configuration["Api:root"];

                List<KeyValuePair<string, string>> queries = new List<KeyValuePair<string, string>>();

                queries.Add(new KeyValuePair<string, string>("login", login.User));

                HttpContent httpContent = new FormUrlEncodedContent(queries);

                var response = await httpClient.PostAsync(api + "User/login", httpContent);

                var sResponse = await response.Content.ReadAsStringAsync();

                JObject jusuario = JObject.Parse(sResponse);
                //if (jusuario["login"].Count() == 0)
                //{
                //    throw new Exception("Usuario no se encuentra registrado");
                //}

                User _UserLoginAPI = new User()
                {
                    userId = (int?)jusuario["login"][0]["userId"],
                    userLogin = (string)jusuario["login"][0]["userLogin"],
                    userName = (string)jusuario["login"][0]["userName"],
                    userLastName = (string)jusuario["login"][0]["userLastName"],
                    userProfileId = (int)jusuario["login"][0]["userProfileId"],
                    profileName = (string)jusuario["login"][0]["profileName"],
                    userActive = (bool)jusuario["login"][0]["userActive"],
                    userDelete = (bool)jusuario["login"][0]["userDelete"],
                    userIdCreate = (int?)jusuario["login"][0]["userIdCreate"],
                    userDateCreate = (DateTime?)jusuario["login"][0]["userDateCreate"],
                    userIdUpdate = (int?)jusuario["login"][0]["userIdUpdate"],
                    userDateUpdate = (DateTime?)jusuario["login"][0]["userDateUpdate"],
                    userIdDelete = (int?)jusuario["login"][0]["userIdDelete"],
                    userDateDelete = (DateTime?)jusuario["login"][0]["userDateDelete"],
                    Token = (string)jusuario["token"]
                };

                //string contrasena = (string)jusuario["login"][0]["userPswd"];
                //string pswd = Encryptor.Encriptar(login.Contrasena.Trim());

                //string desecn = Encryptor.Desencriptar(contrasena);
                //if (contrasena != pswd)
                //{
                //    throw new Exception("Contraseña incorrecta");
                //}

                UserLogueado usuarioLogueado = JsonConvert.SerializeObject(_UserLoginAPI);

                List<Claim> lstClaim = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, usuarioLogueado)
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(lstClaim, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity),
                    new AuthenticationProperties
                    {
                        IsPersistent = false,
                        ExpiresUtc = DateTime.Now.AddHours(12)
                    });


                return Ok(new { value = sResponse, status = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { value = ex.Message, status = false });
            }
        }
        [HttpPost]
        public async Task<IActionResult> CerrarSesion()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { value = "", status = true });
        }
    }
}
