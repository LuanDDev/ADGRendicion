using FrontEnd.Web.Controllers.Security;
using FrontEnd.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FrontEnd.Web.Controllers
{
    public class RendicionController : BaseController
    {
        private readonly IConfiguration _configuration;
        public RendicionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> ListRendiciones(Rendicion obj)
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(obj);
                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "Rendicion/listRendiciones";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("No se encontraron registros");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> GetRequisiciones(Rendicion obj)
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(obj);
                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "Rendicion/getRequisiciones";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("No se encontraron registros");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }
        public async Task<IActionResult> GetRendicion(Rendicion obj)
        {
            try
            {
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(obj);
                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "Rendicion/getRendicion";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("No se encontraron registros");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> InserRendicion(Rendicion obj)
        {
            try
            {
                obj.user = (int)UsuarioLogueado.userId;

                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(obj);
                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "Rendicion/insertRendicion";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("No se encontraron registros");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> DeleteRendicion(Rendicion obj)
        {
            try
            {
                obj.user = (int)UsuarioLogueado.userId;

                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(obj);
                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "Rendicion/deleteRendicion";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("No se encontraron registros");
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }
        
        public async Task<IActionResult> ConsultaRuc(string ruc)
        {
            try
            {
                
                var api = "https://api.apis.net.pe/v1/ruc?numero=";
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var url = api + ruc;
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer apis-token-4313.cLZTZLyiCs8BgVy4BKzTIl8-j1na5EW9");
                var result = await httpClient.GetAsync(url);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("No se encontraron registros");
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
