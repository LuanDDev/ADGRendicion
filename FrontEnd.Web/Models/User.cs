using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Models
{
    public class User
    {
        public int CodUsuario { get; set; }
        public int? userId { get; set; }
        public string userLogin { get; set; }
        public string userPswd { get; set; }
        public string userName { get; set; }
        public string userLastName { get; set; }
        public string profileName { get; set; }
        public int userProfileId { get; set; }
        public bool userActive { get; set; }
        public bool userDelete { get; set; }
        public int? userIdCreate { get; set; }
        public DateTime? userDateCreate { get; set; }
        public int? userIdUpdate { get; set; }
        public DateTime? userDateUpdate { get; set; }
        public int? userIdDelete { get; set; }
        public DateTime? userDateDelete { get; set; }
        public string Token { get; set; }
        public string softwares { get; set; }
        public int empresa { get; set; }
    }
}
