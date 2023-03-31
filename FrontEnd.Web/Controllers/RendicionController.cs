using FrontEnd.Web.Controllers.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Web.Controllers
{
    public class RendicionController : BaseController
    {
        private readonly IConfiguration _configuration;
        public RendicionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            return View();
        }

    }
}
