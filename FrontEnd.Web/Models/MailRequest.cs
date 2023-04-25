using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Models
{
    public class MailRequest
    {
        public string Para { get; set; }
        public string Asunto { get; set; }
        public string Cuerpo { get; set; }
        public IFormFile Adjuntos { get; set; }
        public string ruta { get; set; }
    }
}
