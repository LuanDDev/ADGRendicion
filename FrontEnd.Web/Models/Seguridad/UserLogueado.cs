using Newtonsoft.Json.Linq;
using System;

namespace FrontEnd.Web.Models.Seguridad
{
    public class UserLogueado
    {
        public int? userId { get; set; }
        public string userLogin { get; set; }
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

        public static implicit operator UserLogueado(string usuarioAuthentication)
        {
            JObject jusuario = JObject.Parse(usuarioAuthentication);
            UserLogueado usuario = new UserLogueado()
            {
                userId = (int?)jusuario[nameof(userId)],
                userLogin = (string)jusuario[nameof(userLogin)],
                userName = (string)jusuario[nameof(userName)],
                userLastName = (string)jusuario[nameof(userLastName)],
                profileName = (string)jusuario[nameof(profileName)],
                userProfileId = (int)jusuario[nameof(userProfileId)],
                userActive = (bool)jusuario[nameof(userActive)],
                userDelete = (bool)jusuario[nameof(userDelete)],
                userIdCreate = (int?)jusuario[nameof(userIdCreate)],
                userDateCreate = (DateTime?)jusuario[nameof(userDateCreate)],
                userIdUpdate = (int?)jusuario[nameof(userIdUpdate)],
                userDateUpdate = (DateTime?)jusuario[nameof(userDateUpdate)],
                userIdDelete = (int?)jusuario[nameof(userIdDelete)],
                userDateDelete = (DateTime?)jusuario[nameof(userDateDelete)],
                Token = (string)jusuario[nameof(Token)]
            };
            return usuario;
        }

        public static implicit operator string(UserLogueado usuarioAuthentication)
        {
            JObject jusuario = new JObject()
            {
                [nameof(userId)] = usuarioAuthentication.userId,
                [nameof(userLogin)] = usuarioAuthentication.userLogin,
                [nameof(userName)] = usuarioAuthentication.userName,
                [nameof(userLastName)] = usuarioAuthentication.userLastName,
                [nameof(profileName)] = usuarioAuthentication.profileName,
                [nameof(userProfileId)] = usuarioAuthentication.userProfileId,
                [nameof(userActive)] = usuarioAuthentication.userActive,
                [nameof(userDelete)] = usuarioAuthentication.userDelete,
                [nameof(userIdCreate)] = usuarioAuthentication.userIdCreate,
                [nameof(userDateCreate)] = usuarioAuthentication.userDateCreate,
                [nameof(userIdUpdate)] = usuarioAuthentication.userIdUpdate,
                [nameof(userDateUpdate)] = usuarioAuthentication.userDateUpdate,
                [nameof(userIdDelete)] = usuarioAuthentication.userIdDelete,
                [nameof(userDateDelete)] = usuarioAuthentication.userDateDelete,
                [nameof(Token)] = usuarioAuthentication.Token
            };
            return jusuario.ToString();
        }
    }
}
