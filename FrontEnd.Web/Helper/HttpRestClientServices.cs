using Nancy.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace PE_AAUDIT_ACL_WEB.Helper
{
    public enum HttpRestClientContentType
    { 
        Json,
        Urlencoded
    }
    public class HttpRestClientServices<T>
    {
        private int Timeout = 0;
        public HttpRestClientServices(int Timeout = 0) {
            this.Timeout = Timeout;
        }

        public   bool AcceptAllCertifications(object sender, System.Security.Cryptography.X509Certificates.X509Certificate certification, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }
        public async System.Threading.Tasks.Task<string>  PostAsync(string URLWebHttpService, object parameterObject, string token = "")
        {
            try
            {
                URLWebHttpService = URLWebHttpService.Replace("%", "");
                JavaScriptSerializer js = new JavaScriptSerializer();
                string postdata = js.Serialize(parameterObject);
                byte[] data = Encoding.UTF8.GetBytes(postdata);
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URLWebHttpService);
                if (Timeout != 0)
                {
                    request.Timeout = this.Timeout;
                }
                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("Authorization", token);
                }
                request.KeepAlive = false;
                request.Method = "POST";
                request.ContentLength = data.Length;
                request.ContentType = "application/json";
                var requestStream = await request.GetRequestStreamAsync();
                requestStream.Write(data, 0, data.Length);
                try
                {
                    ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.
                        RemoteCertificateValidationCallback(AcceptAllCertifications);
                    HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync();
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    return await reader.ReadToEndAsync();  

                }
                catch (WebException e)
                {
                    WebResponse response = e.Response;

                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    var reader = new StreamReader(response.GetResponseStream());
                    return reader.ReadToEnd();        
                }


            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public T Post(string URLWebHttpService, object parameterObject, string token = "", HttpRestClientContentType type = HttpRestClientContentType.Json)
        {
            try
            {
                URLWebHttpService = URLWebHttpService.Replace("%", "");
                JavaScriptSerializer js = new JavaScriptSerializer();
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URLWebHttpService);
                if (Timeout != 0)
                {
                    request.Timeout = this.Timeout;
                }
                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("Authorization", token);
                }
                request.KeepAlive = false;
                request.Method = "POST";

                byte[] data = new byte[] { };
                if (type == HttpRestClientContentType.Json)
                {
                    request.ContentType = "application/json";
                    string postdata = js.Serialize(parameterObject);
                    data = Encoding.UTF8.GetBytes(postdata);
                }
                else if (type == HttpRestClientContentType.Urlencoded)
                {
                    request.ContentType = "application/x-www-form-urlencoded"; 
                    data = Encoding.UTF8.GetBytes(Convert.ToString(parameterObject));
                }
                request.ContentLength = data.Length;
                
                var requestStream = request.GetRequestStream();
                requestStream.Write(data, 0, data.Length);
                
                try
                {
                    ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.
                        RemoteCertificateValidationCallback(AcceptAllCertifications);
                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    string tramaJson = reader.ReadToEnd();
                    return js.Deserialize<T>(tramaJson);

                }
                catch (WebException e)
                {
                    WebResponse response = e.Response;

                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    var reader = new StreamReader(response.GetResponseStream());
                    string text = reader.ReadToEnd();
                    return js.Deserialize<T>(text);
                }


            }
            catch (Exception ex)
            {
                throw;
            }
        }



        public async System.Threading.Tasks.Task<string> GetAsync(string URLWebHttpService, string token = "")
        {
            try
            {

                URLWebHttpService = URLWebHttpService.Replace("%", "");

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URLWebHttpService);
                if (Timeout != 0)
                {
                    request.Timeout = this.Timeout;
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("Authorization", token);
                }
                request.KeepAlive = false;
                request.Method = "GET";

                try
                {
                    ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.
                        RemoteCertificateValidationCallback(AcceptAllCertifications);
                    HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync();
                    StreamReader reader = new StreamReader(response.GetResponseStream());

                    return await reader.ReadToEndAsync();      
                }
                catch (WebException e)
                {
                    WebResponse response = e.Response;

                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    var reader = new StreamReader(response.GetResponseStream());
                    return reader.ReadToEnd();       
                }


            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public T Get(string URLWebHttpService, string token = "")
        {
            try
            {

                URLWebHttpService = URLWebHttpService.Replace("%", "");

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URLWebHttpService);
                if (Timeout != 0)
                {
                    request.Timeout = this.Timeout;
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("Authorization", token);
                }
                request.KeepAlive = false;
                request.Method = "GET";

                try
                {
                    //request.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                    ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.
                        RemoteCertificateValidationCallback(AcceptAllCertifications);
                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                    StreamReader reader = new StreamReader(response.GetResponseStream());

                    string tramaJson = reader.ReadToEnd();
                    return js.Deserialize<T>(tramaJson);
                }
                catch (WebException e)
                {
                    WebResponse response = e.Response;

                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    var reader = new StreamReader(response.GetResponseStream());
                    string text = reader.ReadToEnd();
                    return js.Deserialize<T>(text);
                }


            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async System.Threading.Tasks.Task<T> DeleteAsync(string URLWebHttpService, string token = "")
        {
            try
            {

                URLWebHttpService = URLWebHttpService.Replace("%", "");

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URLWebHttpService);
                if (Timeout != 0)
                {
                    request.Timeout = this.Timeout;
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("Authorization", token);
                }
                request.KeepAlive = false;
                request.Method = "DELETE";
                try
                {
                    ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.
                        RemoteCertificateValidationCallback(AcceptAllCertifications);
                    HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync();
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    string tramaJson = await reader.ReadToEndAsync();
                    return js.Deserialize<T>(tramaJson);

                }
                catch (WebException e)
                {
                    WebResponse response = e.Response;

                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    var reader = new StreamReader(response.GetResponseStream());
                    string text = reader.ReadToEnd();
                    return js.Deserialize<T>(text);
                }


            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public T Delete(string URLWebHttpService, string token = "")
        {
            try
            {

                URLWebHttpService = URLWebHttpService.Replace("%", "");

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URLWebHttpService);
                if (Timeout != 0)
                {
                    request.Timeout = this.Timeout;
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("Authorization", token);
                }
                request.KeepAlive = false;
                request.Method = "DELETE";

                try
                {

                    ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.
                        RemoteCertificateValidationCallback(AcceptAllCertifications);
                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    string tramaJson = reader.ReadToEnd();
                    return js.Deserialize<T>(tramaJson);
                }
                catch (WebException e)
                {
                    WebResponse response = e.Response;

                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    var reader = new StreamReader(response.GetResponseStream());
                    string text = reader.ReadToEnd();
                    return js.Deserialize<T>(text);
                }


            }
            catch (Exception ex)
            {
                throw;
            }
        }



        public async System.Threading.Tasks.Task<T> PutAsync(string URLWebHttpService, object parameterObject, string token = "")
        {
            try
            {
                URLWebHttpService = URLWebHttpService.Replace("%", "");

                JavaScriptSerializer js = new JavaScriptSerializer();
                string postdata = js.Serialize(parameterObject);
                byte[] data = Encoding.UTF8.GetBytes(postdata);
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URLWebHttpService);
                if (Timeout != 0)
                {
                    request.Timeout = this.Timeout;
                }
                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("Authorization", token);
                }
                request.KeepAlive = false;
                request.Method = "PUT";
                request.ContentLength = data.Length;
                request.ContentType = "application/json";
                var requestStream = request.GetRequestStream();
                requestStream.Write(data, 0, data.Length);
                try
                {

                    ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.
                        RemoteCertificateValidationCallback(AcceptAllCertifications);
                    HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync();
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    string tramaJson = await reader.ReadToEndAsync();
                    return js.Deserialize<T>(tramaJson);
                }
                catch (WebException e)
                {
                    WebResponse response = e.Response;

                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    var reader = new StreamReader(response.GetResponseStream());
                    string text = reader.ReadToEnd();
                    return js.Deserialize<T>(text);
                }


            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public T Put(string URLWebHttpService, object parameterObject, string token = "")
        {
            try
            {
                URLWebHttpService = URLWebHttpService.Replace("%", "");

                JavaScriptSerializer js = new JavaScriptSerializer();
                string postdata = js.Serialize(parameterObject);
                byte[] data = Encoding.UTF8.GetBytes(postdata);
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URLWebHttpService);
                if (Timeout != 0)
                {
                    request.Timeout = this.Timeout;
                }
                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("Authorization", token);
                }
                request.KeepAlive = false;
                request.Method = "PUT";
                request.ContentLength = data.Length;
                request.ContentType = "application/json";
                var requestStream = request.GetRequestStream();
                requestStream.Write(data, 0, data.Length);
                try
                {

                    ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.
                        RemoteCertificateValidationCallback(AcceptAllCertifications);
                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    string tramaJson = reader.ReadToEnd();
                    return js.Deserialize<T>(tramaJson);

                }
                catch (WebException e)
                {
                    WebResponse response = e.Response;

                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    var reader = new StreamReader(response.GetResponseStream());
                    string text = reader.ReadToEnd();
                    return js.Deserialize<T>(text);
                }

            }
            catch (Exception ex)
            {
                throw;
            }
        }


                                                              
    }
}
