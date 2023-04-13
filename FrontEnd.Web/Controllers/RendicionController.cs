using FrontEnd.Web.Controllers.Security;
using FrontEnd.Web.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
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
        private readonly IHostingEnvironment _hostingEnvironment;
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

        public async Task<IActionResult> ListSustentos(Sustento obj)
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

                var url = api + "Rendicion/listSustentos";
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

        public async Task<IActionResult> ListSustentoById(Sustento obj)
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

                var url = api + "Rendicion/listSustentoById";
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

        public async Task<IActionResult> InsertSustento()
        {
            try
            {
                string folderName = Request.Form["codigo"];
                string path = "C://ADGRendicion";
                string newPath = Path.Combine(path, folderName);

                Sustento obj = new Sustento();

                obj.user = (int)UsuarioLogueado.userId;
                obj.idRendicion = Convert.ToInt32(Request.Form["idRendicion"]);

                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }

                if (Request.Form["tipo"] == "Factura")
                {

                    if (Request.Form["id"] != "")
                    {
                        obj.id = Convert.ToInt32(Request.Form["id"]);
                    }
                    obj.descripcion = Request.Form["descripcion"];
                    obj.tipo = Request.Form["tipo"];
                    obj.ruc = Request.Form["ruc"];
                    obj.razonSocial = Request.Form["razonSocial"];
                    obj.nroDoc = Request.Form["nroDoc"];
                    obj.importe = Convert.ToDecimal(Request.Form["importe"].ToString());
                    obj.fechaDoc = Convert.ToDateTime(Request.Form["fechaDoc"]);

                    IFormFile filePDF;
                    IFormFile fileXML;
                    if (Request.Form.Files.Count == 1)
                    {
                        filePDF = Request.Form.Files[0];

                        if (filePDF.Length > 0)
                        {
                            string sFileExtension = Path.GetExtension(filePDF.FileName).ToLower();
                            obj.filePDF = "FAC_" + obj.nroDoc + "_" + Request.Form["codigo"] + sFileExtension;
                            string fullPath = Path.Combine(newPath, obj.filePDF);
                            using (var stream = new FileStream(fullPath, FileMode.Create))
                            {
                                filePDF.CopyTo(stream);
                            }
                        }
                    }
                    else
                    {
                        filePDF = Request.Form.Files[0];
                        fileXML = Request.Form.Files[1];

                        if (filePDF.Length > 0)
                        {
                            string sFileExtension = Path.GetExtension(filePDF.FileName).ToLower();

                            obj.filePDF = "FAC_" + obj.nroDoc + "_" + Request.Form["codigo"] + sFileExtension;

                            string fullPath = Path.Combine(newPath, obj.filePDF);
                            using (var stream = new FileStream(fullPath, FileMode.Create))
                            {
                                filePDF.CopyTo(stream);
                            }
                        }

                        if (fileXML.Length > 0)
                        {
                            string sFileExtension = Path.GetExtension(fileXML.FileName).ToLower();
                            obj.fileXML = "XML_" + obj.nroDoc + "_" + Request.Form["codigo"] + sFileExtension;
                            string fullPath = Path.Combine(newPath, obj.fileXML);
                            using (var stream = new FileStream(fullPath, FileMode.Create))
                            {
                                fileXML.CopyTo(stream);
                            }
                        }
                    }

                } 

                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(obj);
                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "Rendicion/insertSustento";
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

        public async Task<IActionResult> DeleteSustento(Sustento obj)
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

                var url = api + "Rendicion/deleteSustento";
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
    }
}
