﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Models
{
    public class Sustento
    {
        public int id { get; set; }
        public int idRendicion { get; set; }
        public string tipo { get; set; }
        public string descripcion { get; set; }
        public string ruc { get; set; }
        public string razonSocial { get; set; }
        public string nroDoc { get; set; }
        public DateTime? fechaDoc { get; set; }
        public decimal? importe { get; set; }
        public int? voucherId { get; set; }
        public string filePDF { get; set; }
        public string fileXML { get; set; }
        public int user { get; set; }
    }
}