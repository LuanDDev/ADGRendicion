using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Models
{
    public class Rendicion
    {
        public int id { get; set; }
        public string descripcion { get; set; }
        public string codigo { get; set; }
        public string tipo { get; set; }
        public string area { get; set; }
        public int jefeArea { get; set; }
        public string imgUrl { get; set; }
        public string imageData { get; set; }
        public string observacion { get; set; }
        public int? idCaja { get; set; }
        public int? idRequisicion { get; set; }
        public int estado { get; set; }
        public int companyId { get; set; }
        public int user { get; set; }
        public int who { get; set; }
    }
}
