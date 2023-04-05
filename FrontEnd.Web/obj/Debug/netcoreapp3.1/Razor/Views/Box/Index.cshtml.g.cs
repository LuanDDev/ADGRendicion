#pragma checksum "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\Box\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "884d2a4cf5c5f128927df77449b0a45e8db65285"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Box_Index), @"mvc.1.0.view", @"/Views/Box/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\_ViewImports.cshtml"
using FrontEnd.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\_ViewImports.cshtml"
using FrontEnd.Web.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"884d2a4cf5c5f128927df77449b0a45e8db65285", @"/Views/Box/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"15d64e4ed31d6e7e32094d16927043cf9e760ddc", @"/Views/_ViewImports.cshtml")]
    public class Views_Box_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\Box\Index.cshtml"
  
    ViewData["Title"] = "Mantenimiento de Cajas";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
            DefineSection("Styles", async() => {
                WriteLiteral("\r\n    <link");
                BeginWriteAttribute("href", " href=\"", 138, "\"", 178, 1);
#nullable restore
#line 9 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\Box\Index.cshtml"
WriteAttributeValue("", 145, Url.Content("~/css/jsuites.css"), 145, 33, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(" rel=\"stylesheet\" />\r\n");
            }
            );
            WriteLiteral(@"
<div class=""container-fluid"">
    <div class=""container-fluid text-center"">
        <div class=""row"">
            <div class=""col-auto me-auto"">
                <div class=""mb-3"">
                    <label for=""btnNuevo"" class=""form-label"">&nbsp;</label>
                    <button id=""btnNuevo"" type=""button"" class=""form-control btn btn-primary"" ");
            WriteLiteral(@">
                        Nuevo
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<hr />
<div id=""div_table"">

</div>
<div class=""modal fade"" id=""mNuevo"" data-bs-backdrop=""static"" data-bs-keyboard=""false"" tabindex=""-1"" aria-labelledby=""staticBackdropLabel"" aria-hidden=""true"">
    <div class=""modal-dialog modal-dialog-centered"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h5 class=""modal-title"" id=""titleModal"">Nueva Caja</h5>
                <button type=""button"" class=""btn-close"" data-bs-dismiss=""modal"" aria-label=""Close""></button>
            </div>
            <div class=""modal-body"">

                <div class=""container-fluid"">
                    <div class=""row"">
                        <div class=""col"">
                            <div class=""mb-3"">
                                <label for=""txtDescripcion"" class=""form-label"">Descripción</label>
                            ");
            WriteLiteral(@"    <input id=""txtDescripcion"" type=""text"" class=""form-control"" />
                                <input type=""hidden"" id=""txtId"" />
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""mb-3"">
                                <label for=""txtMonto"" class=""form-label"">Monto S/.</label>
                                <input id=""txtMonto"" type=""number"" class=""form-control"" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-secondary"" data-bs-dismiss=""modal"">Cerrar</button>
                <button id=""btnGuardar"" type=""button"" class=""btn btn-primary"">Guardar</button>
            </div>
        </div>
    </div>
</div>

<div id=""spinner_loading"" class=""loading"" style=""display:none;"">Loading</div>

");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 2680, "\"", 2717, 1);
#nullable restore
#line 69 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\Box\Index.cshtml"
WriteAttributeValue("", 2686, Url.Content("~/js/jsuites.js"), 2686, 31, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n\r\n    <script>\r\n        var url_ListCajas = \"");
#nullable restore
#line 72 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\Box\Index.cshtml"
                        Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Box/ListCajas\";\r\n        var url_InsertCaja = \"");
#nullable restore
#line 73 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\Box\Index.cshtml"
                         Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Box/InsertCaja\";\r\n        var url_DeleteCaja = \"");
#nullable restore
#line 74 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\Box\Index.cshtml"
                         Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Box/DeleteCaja\";\r\n    </script>\r\n\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 2985, "\"", 3040, 1);
#nullable restore
#line 77 "D:\Dev\ADGRendiciones\ADGRendiciones\FrontEnd.Web\Views\Box\Index.cshtml"
WriteAttributeValue("", 2991, Url.Content("~/Scripts/administracion/cajas.js"), 2991, 49, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n");
            }
            );
            WriteLiteral("-");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
