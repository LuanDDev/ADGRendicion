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
        public int? idCaja { get; set; }
        public int? idRequisicion { get; set; }
        public int companyId { get; set; }
        public int user { get; set; }
    }
}
