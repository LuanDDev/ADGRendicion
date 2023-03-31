using System;

namespace FrontEnd.Web.Models.Seguridad
{
    public class UserLoginAPI
    {
        // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);

        public int? CodUsuario { get; set; }
        public string Login { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string NombreCompleto { get; set; }
        public int? CodEmpresa { get; set; }
        public string RazonSocial { get; set; }
        public string Empresas { get; set; }
        public string TipoUsuarioMa { get; set; }
        public string NivelUsuario { get; set; }
        public string Clave { get; set; }
        public bool Activo { get; set; }
        public bool ActivoLogueo { get; set; }
        public int? CodUsuarioIngreso { get; set; }
        public DateTime? FechaIngreso { get; set; }
        public int? CodUsuarioActualizacion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public int IdPerfil { get; set; }
        public string Perfil { get; set; }
        public string Token { get; set; }
    }
    //public class Logueado
    //{
    //    public List<UserLoginAPI> login { get; set; }
    //    public string token { get; set; }
    //}
}
