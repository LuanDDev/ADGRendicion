using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Models
{
    public class Usuario
    {
        public int? CodUsuario { get; set; }
        public int empresa { get; set; }
        public string Login { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int CodEmpresa { get; set; }
        public string TipoUsuarioMa { get; set; }
        public string Clave { get; set; }
        public int? CodUsuarioActualizacion { get; set; }
        public string Correo { get; set; }
        public string Empresas { get; set; }
        public int idPerfil { get; set; }
    }
}
