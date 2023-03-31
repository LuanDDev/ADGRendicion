using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Models
{
    public class Caja
    {
        public int id { get; set; }
        public string descripcion { get; set; }
        public decimal monto { get; set; }
        public int companyId { get; set; }
        public bool estado { get; set; }
        public bool isDelete { get; set; }
        public int user { get; set; }
    }
}
