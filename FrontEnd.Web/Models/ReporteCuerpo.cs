using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Models
{
    public class ReporteCuerpo
    {
        public DateTime FechaRegistro { get; set; }
        public string Motivo { get; set; }
        public string Origen { get; set; }
        public string Destino { get; set; }
        public string InstDestino { get; set; }
        public double Monto { get; set; }
        public string CCosto { get; set; }
    }
}
