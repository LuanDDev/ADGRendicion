using FrontEnd.Web.Models.Seguridad;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace FrontEnd.Web.Controllers.Security
{
    public class BaseController : Controller
    {
        public UserLogueado UsuarioLogueado => User.Identity.Name;

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (User.Identity.IsAuthenticated)
            {
                ViewBag.UsuarioLogueado = UsuarioLogueado;
            }
            await next();
        }
        
    }
}
