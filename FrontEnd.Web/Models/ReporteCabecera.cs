using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Models
{
    public class ReporteCabecera
    {
        public string Ruc { get; set; }
        public string RazonSocial { get; set; }
        public string Logo { get; set; }
        public string NombreCompleto { get; set; }
        public string DNI { get; set; }
        public string RutaSignature { get; set; }
        public int IdVoucher { get; set; }
        public string Correlativo { get; set; }
    }
}
