using FrontEnd.Web.Controllers.Security;
using FrontEnd.Web.Helper.Security;
using FrontEnd.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FrontEnd.Web.Controllers
{
    public class UserController : BaseController
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IActionResult UserView()
        {
            return View();
        }

        public async Task<IActionResult> getUsers()
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var url = api + "User/users";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.GetAsync(url);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("No se pudo registrar");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> getUser(User user)
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(user);
                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "User/user";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("something bad happended");
                }

                var data = await result.Content.ReadAsStringAsync();

                JObject jusuario = JObject.Parse(data);

                User _user = new User()
                {
                    userId = (int?)jusuario["user"][0]["userId"],
                    userLogin = (string)jusuario["user"][0]["userLogin"],
                    userPswd = (string)jusuario["user"][0]["userPswd"],
                    userName = (string)jusuario["user"][0]["userName"],
                    userLastName = (string)jusuario["user"][0]["userLastName"],
                    userProfileId = (int)jusuario["user"][0]["userProfileId"],
                    userActive = (bool)jusuario["user"][0]["userActive"],
                    userDelete = (bool)jusuario["user"][0]["userDelete"],
                    userIdCreate = (int?)jusuario["user"][0]["userIdCreate"],
                    userDateCreate = (DateTime)jusuario["user"][0]["userDateCreate"]
                };
                _user.userPswd = Encryptor.Desencriptar(_user.userPswd);

                data = JsonSerializer.Serialize(_user);

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> insertUser(User user)
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                if (user.userId == null)
                {
                    user.userPswd = Encryptor.Encriptar(user.userPswd);
                }
                user.userIdCreate = UsuarioLogueado.userId;

                var request_json = JsonSerializer.Serialize(user);

                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "User/insertUser";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("something bad happended");
                }

                var data = await result.Content.ReadAsStringAsync();


                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> updatePasswordUser(User user)
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);
                user.userId = UsuarioLogueado.userId;
                user.userPswd = Encryptor.Encriptar(user.userPswd);

                var request_json = JsonSerializer.Serialize(user);

                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "User/updatePasswordUser";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("something bad happended");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { value = ex.Message, status = false });
            }
        }
        public async Task<IActionResult> getCompanies()
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var url = api + "Company/companies";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.GetAsync(url);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("something bad happended");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }
        public async Task<IActionResult> getProfiles()
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var url = api + "Profile/profiles";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.GetAsync(url);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("something bad happended");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> getMenuForProfile(ObjectUtil _obj)
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                _obj.profileId = UsuarioLogueado.userProfileId;


                var request_json = JsonSerializer.Serialize(_obj);

                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "Profile/menuForProfile";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    //var a =  (result.Headers.WwwAuthenticate);

                    throw new ArgumentException("something bad happended");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }
    }
}
