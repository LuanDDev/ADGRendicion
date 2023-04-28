using AspNetCore.Reporting;
using FrontEnd.Web.Controllers.Security;
using FrontEnd.Web.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Web.Helper;

namespace FrontEnd.Web.Controllers
{
    public class RendicionController : BaseController
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _hostingEnvironment;
        public RendicionController(IConfiguration configuration, IHostingEnvironment env)
        {
            _configuration = configuration;
            _hostingEnvironment = env;

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult JefeArea()
        {
            return View();
        }
        public IActionResult Contabilidad()
        {
            return View();
        }
        public IActionResult Tesoreria()
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

        public async Task<IActionResult> InsertRendicion(Rendicion obj)
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
        public async Task<IActionResult> UpdateEstadoRendicion(Rendicion obj)
        {
            try
            {

                if (obj.imageData != "" && obj.imageData != null)
                {
                    byte[] f = Convert.FromBase64String(obj.imageData);

                    var fileStream = new MemoryStream(f);

                    IFormFile file = new FormFile(fileStream, 0, f.Length, "captura", "captura.jpg");

                    string folderName = "Rendicion";
                    string webRootPath = _hostingEnvironment.WebRootPath;
                    string newPath = Path.Combine(webRootPath, folderName);

                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    if (file.Length > 0)
                    {
                        string sFileExtension = ".jpg";
                        string text = "";
                        if (obj.estado == 4)
                        {
                            text = "TESO_";
                        }
                        else
                        {
                            text = "CONTA_";
                        }
                        
                        obj.imgUrl = text + obj.id.ToString() + sFileExtension;
                        string fullPath = Path.Combine(newPath, obj.imgUrl);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                            stream.Position = 0;
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

                var url = api + "Rendicion/updateEstadoRendicion";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var result = await httpClient.PostAsync(url, content);

                if (!result.IsSuccessStatusCode)
                {
                    throw new ArgumentException("No se encontraron registros");
                }

                var data = await result.Content.ReadAsStringAsync();

                var correosTesoreria = _configuration["Correos:tesoreria"];

                return Ok(new { value = data, correos = correosTesoreria, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }
        public async Task<IActionResult> UpdateAreaRendicion(Rendicion obj)
        {
            try
            {
                obj.observacion = UsuarioLogueado.userLogin + ": " + obj.observacion;
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                // Pass the handler to httpclient(from you are calling api)
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(obj);
                var content = new StringContent(request_json, Encoding.UTF8, "application/json");

                var url = api + "Rendicion/updateAreaRendicion";
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

                //if (Request.Form["tipo"] == "Factura")
                //{

                    if (Request.Form["id"] != "")
                    {
                        obj.id = Convert.ToInt32(Request.Form["id"]);
                    }

                    obj.descripcion = Request.Form["descripcion"];
                    obj.centroCosto = Request.Form["centroCosto"];
                    obj.tipo = Request.Form["tipo"];
                    obj.ruc = Request.Form["ruc"];
                    obj.razonSocial = Request.Form["razonSocial"];
                    obj.nroDoc = Request.Form["nroDoc"];
                    obj.importe = Convert.ToDecimal(Request.Form["importe"]);
                    obj.fechaDoc = Convert.ToDateTime(Request.Form["fechaDoc"]);

                var abre = "";

                switch (obj.tipo)
                {
                    case "Factura":
                        abre = "FAC_";
                        break;
                    case "Boleta":
                        abre = "BOL_";
                        break;
                    case "RxH":
                        abre = "RxH_";
                        break;
                    case "Otro":
                        abre = "OTR_";
                        break;
                    default:
                        break;
                }

                if (Request.Form["id"] == "")
                    {
                        IFormFile filePDF;
                        IFormFile fileXML;
                        if (Request.Form.Files.Count == 1)
                        {
                            filePDF = Request.Form.Files[0];

                            if (filePDF.Length > 0)
                            {
                                string sFileExtension = Path.GetExtension(filePDF.FileName).ToLower();
                                obj.filePDF = abre + obj.nroDoc + "_" + Request.Form["codigo"] + sFileExtension;
                                string fullPath = Path.Combine(newPath, obj.filePDF);
                                using (var stream = new FileStream(fullPath, FileMode.Create))
                                {
                                    filePDF.CopyTo(stream);
                                }
                            }
                        }
                        else if (Request.Form.Files.Count == 2)
                        {
                            filePDF = Request.Form.Files[0];
                            fileXML = Request.Form.Files[1];

                            if (filePDF.Length > 0)
                            {
                                string sFileExtension = Path.GetExtension(filePDF.FileName).ToLower();

                                obj.filePDF = abre + obj.nroDoc + "_" + Request.Form["codigo"] + sFileExtension;

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

                        if (Request.Form["tipo"] == "Voucher")
                        {
                            obj.voucherId = Convert.ToInt32(Request.Form["voucherId"]);
                            obj.filePDF = Request.Form["filePDF"];
                        }
                    }
                //} 

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

        public IActionResult VerPDFFactura([FromBody] PdfFactura obj)
        {
            var root = _configuration["RutaSustento:ruta"];
            var path = root + "/" + obj.codigo + "/" + obj.pdf;

            var stream = new FileStream(path, FileMode.Open);
            return File(stream, "application/pdf", obj.pdf);

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

                var path = _configuration["RutaSustento:ruta"] + "/" + obj.codigo;
                string[] pdfList = Directory.GetFiles(path, obj.filePDF);
                string[] xmlList = Directory.GetFiles(path, obj.fileXML);

                foreach (string f in pdfList)
                {
                    System.IO.File.Delete(f);
                }

                foreach (string f in xmlList)
                {
                    System.IO.File.Delete(f);
                }

                var data = await result.Content.ReadAsStringAsync();

                return Ok(new { value = data, status = true });
            }
            catch (Exception ex)
            {

                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> GetVouchers(Sustento obj)
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

                var url = api + "Rendicion/getVouchers";
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

        public async Task<IActionResult> GetAreas(Area obj)
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

                var url = api + "Area/getAreasForCompany";
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

        public async Task<IActionResult> GetJefeArea(Area obj)
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

                var url = api + "Area/getJefeArea";
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
        public async Task<IActionResult> GetFileVoucher(int id, string codigo)
        {
            try
            {
                Voucher obj = new Voucher();
                obj.id = id;
                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient httpClient = new HttpClient(clientHandler);

                var request_json = JsonSerializer.Serialize(obj);

                var contentC = new StringContent(request_json, Encoding.UTF8, "application/json");
                var urlC = api + "Rendicion/getVoucher";
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var resultC = await httpClient.PostAsync(urlC, contentC);
                var dataC = await resultC.Content.ReadAsStringAsync();
                //Cambio de Orden para obtener el IdVoucher

                JObject jBodyC = JObject.Parse(dataC);
                List<ReporteCabecera> cabecera = new List<ReporteCabecera>();

                for (int i = 0; i < jBodyC["data"].Count(); i++)
                {
                    ReporteCabecera _bodyC = new ReporteCabecera()
                    {
                        Ruc = (string)jBodyC["data"][i]["Ruc"],
                        RazonSocial = (string)jBodyC["data"][i]["RazonSocial"],
                        Logo = (string)jBodyC["data"][i]["Logo"],
                        NombreCompleto = (string)jBodyC["data"][i]["NombreCompleto"],
                        DNI = (string)jBodyC["data"][i]["DNI"],
                        RutaSignature = (string)jBodyC["data"][i]["RutaSignature"],
                        IdVoucher = (int)jBodyC["data"][i]["IdVoucher"],
                        Correlativo = (string)jBodyC["data"][i]["Correlativo"]
                    };
                    cabecera.Add(_bodyC);
                }


                var contentD = new StringContent(request_json, Encoding.UTF8, "application/json");
                var urlD = api + "Rendicion/getVoucherDetalle";
                //httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);
                var resultD = await httpClient.PostAsync(urlD, contentD);
                var dataD = await resultD.Content.ReadAsStringAsync();
                //Cambio de Orden para obtener el IdVoucher

                JObject jBodyD = JObject.Parse(dataD);
                List<ReporteCuerpo> cuerpo = new List<ReporteCuerpo>();
                var cont = jBodyD["data"].Count();
                for (int i = 0; i < cont; i++)
                {
                    ReporteCuerpo _bodyD = new ReporteCuerpo()
                    {
                        FechaRegistro = (DateTime)jBodyD["data"][i]["FechaRegistro"],
                        Motivo = (string)jBodyD["data"][i]["Motivo"],
                        Origen = (string)jBodyD["data"][i]["Origen"],
                        Destino = (string)jBodyD["data"][i]["Destino"],
                        InstDestino = (string)jBodyD["data"][i]["InstDestino"],
                        Monto = (double)jBodyD["data"][i]["Monto"],
                        CCosto = (string)jBodyD["data"][i]["CCosto"]
                    };
                    cuerpo.Add(_bodyD);
                }

                string imageFirma = "";
                string imageLogo = "";

                string webRootPath = _hostingEnvironment.WebRootPath;

                string _firmaPath = "//10.10.10.24\\Signature\\" + cabecera[0].RutaSignature;
                string _logoPath = $"{webRootPath}\\img\\logos\\{cabecera[0].Logo}";

                var ds = new List<ProcesarDataSource>();

                if (System.IO.File.Exists(_firmaPath))
                {
                    byte[] bytesFirma = System.IO.File.ReadAllBytes(_firmaPath);
                    imageFirma = Convert.ToBase64String(bytesFirma);
                }
                if (System.IO.File.Exists(_logoPath))
                {
                    byte[] bytesLogo = System.IO.File.ReadAllBytes(_logoPath);
                    imageLogo = Convert.ToBase64String(bytesLogo);
                }

                Dictionary<string, string> parameters = new Dictionary<string, string>();
                parameters.Add("firma", imageFirma);
                parameters.Add("logo", imageLogo);

                parameters.Add("razonSocial", cabecera[0].RazonSocial);
                parameters.Add("ruc", cabecera[0].Ruc);
                parameters.Add("correlativo", cabecera[0].Correlativo);
                parameters.Add("trabajador", cabecera[0].NombreCompleto);
                parameters.Add("dni", cabecera[0].DNI);


                ds.Add(new ProcesarDataSource() { name = "dsDetalleMovilidad", data = cuerpo });
                ds.Add(new ProcesarDataSource() { name = "dsCabeceraMovilidad", data = cabecera });

                string assemblyfolder = Path.Combine(webRootPath, "Reports");
                string path = Path.Combine(assemblyfolder, "rptGenerarVoucher.rdlc");

                string contentType = "application`/pdf";
                string _fecha = DateTime.Now.ToString("yy");
                string _numero = cabecera[0].Correlativo;//Convert.ToInt32(cabecera[0].IdVoucher).ToString("D6");
                string fileName = "VOU_" + _fecha + _numero.Trim() + "_" + cabecera[0].NombreCompleto + ".pdf";

                string mimeType = "";
                int extension = 1;

                LocalReport localReport = new LocalReport(path);

                localReport.AddDataSource("dsCabeceraMovilidad", cabecera);
                localReport.AddDataSource("dsDetalleMovilidad", cuerpo);

                var result = localReport.Execute(RenderType.Pdf, extension, parameters, mimeType);

                string folderName = codigo;
                string pathRendicion = _configuration["RutaSustento:ruta"];
                string newPath = Path.Combine(pathRendicion, folderName, fileName);

                byte[] bytes = result.MainStream;

                FileStream FileObject = new FileStream(newPath, FileMode.Create, FileAccess.Write);
                FileObject.Write(bytes, 0, bytes.Length);
                FileObject.Close();

                //return File(result.MainStream, contentType, fileName);
                return Ok(new { value = dataC, fileName = fileName, status = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { value = ex.Message, status = false });
            }
        }

        public async Task<IActionResult> GetCorreoContadores(Sustento obj)
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

                var url = api + "Rendicion/getCorreoContadores";
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
        public async Task<IActionResult> SendMail(MailRequest _obj)
        {
            try
            {

                List<IFormFile> filesUp = new List<IFormFile>();
                var multipartContent = new MultipartFormDataContent();

                multipartContent.Add(new StringContent(_obj.Para), name: "Para");
                multipartContent.Add(new StringContent(_obj.Asunto), name: "Asunto");
                multipartContent.Add(new StringContent(_obj.Cuerpo), name: "Cuerpo");

                if (_obj.ruta != "" && _obj.ruta != null)
                {
                    string Files = _hostingEnvironment.WebRootPath + "/capturasRequisicion/" + _obj.ruta;

                    byte[] fileBytes = System.IO.File.ReadAllBytes(Files);


                    if (fileBytes.Length != 0 || fileBytes != null)
                    {

                        StreamContent fileStreamContent = new StreamContent(System.IO.File.OpenRead(Files));
                        fileStreamContent.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
                        multipartContent.Add(fileStreamContent, name: "Adjuntos", fileName: "captura.jpg");

                    }

                }

                var api = _configuration["Api:root"];
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                HttpClient httpClient = new HttpClient(clientHandler);

                var url = api + "Mail/send";
                HttpResponseMessage result = new HttpResponseMessage();
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + UsuarioLogueado.Token);

                result = await httpClient.PostAsync(url, multipartContent);

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
