#pragma checksum "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f3d313f7a8304e85ddc5a9e5402409590cb7301a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Rendicion_JefeArea), @"mvc.1.0.view", @"/Views/Rendicion/JefeArea.cshtml")]
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
#line 1 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\_ViewImports.cshtml"
using FrontEnd.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\_ViewImports.cshtml"
using FrontEnd.Web.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f3d313f7a8304e85ddc5a9e5402409590cb7301a", @"/Views/Rendicion/JefeArea.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"15d64e4ed31d6e7e32094d16927043cf9e760ddc", @"/Views/_ViewImports.cshtml")]
    public class Views_Rendicion_JefeArea : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/assets/plugins/switchery/dist/switchery.min.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/assets/plugins/switchery/dist/switchery.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
  
    ViewData["Title"] = "JefeArea";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            DefineSection("Styles", async() => {
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "f3d313f7a8304e85ddc5a9e5402409590cb7301a4520", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    <link");
                BeginWriteAttribute("href", " href=\"", 210, "\"", 252, 1);
#nullable restore
#line 9 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
WriteAttributeValue("", 217, Url.Content("~/css/rendicion.css"), 217, 35, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(" rel=\"stylesheet\" />\r\n");
            }
            );
            WriteLiteral(@"
<div id=""div_table"">

</div>

<div class=""modal fade"" id=""mSustentosCaja"" data-bs-backdrop=""static"" data-bs-keyboard=""false"" tabindex=""-1"" aria-labelledby=""staticBackdropLabel"" aria-hidden=""true"">
    <div class=""modal-dialog modal-dialog-centered modal-xl"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h5 class=""modal-title"" id=""titleModalSustentosCaja""></h5>
                <button type=""button"" class=""btn-close"" data-bs-dismiss=""modal"" aria-label=""Close""></button>
            </div>
            <div class=""modal-body"">
                <div class=""container-fluid"">
                    <div class=""row mb-3"">
                        <div class=""col"">
                            <div class=""progress"" style=""height:30px !important"">
                                <div id=""div_subTitle"" class=""progress-bar fs-16px fw-bold"" style=""width: 100%; background-color: grey !important;"">FLUJO DE CAJA (""CHICA"")</div>
                            </div>
    ");
            WriteLiteral(@"                    </div>
                    </div>
                    <div class=""row mb-1"">
                        <input type=""hidden"" id=""txtIdRendicionSC"" />
                        <input type=""hidden"" id=""txtCodigoRendicionSC"" />
                        <div class=""col-8"">
                            <div class=""row"">
                                <label class=""form-label col-md-3 pt-2"">Empresa</label>
                                <div class=""col-md-9"">
                                    <input id=""txtEmpresa"" type=""text"" class=""form-control label-popup"" readonly");
            BeginWriteAttribute("placeholder", " placeholder=\"", 1897, "\"", 1911, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                        <div class=""col-4"">
                            <div class=""row"">
                                <label class=""form-label col-md-3 pt-2"">Reporte N°</label>
                                <div class=""col-md-9"">
                                    <input id=""txtNroReporte"" type=""text"" class=""form-control label-popup"" readonly");
            BeginWriteAttribute("placeholder", " placeholder=\"", 2380, "\"", 2394, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row mb-1"">
                        <div class=""col-8"">
                            <div class=""row"">
                                <label class=""form-label col-md-3 pt-2"">RUC</label>
                                <div class=""col-md-9"">
                                    <input id=""txtRuc"" type=""text"" class=""form-control label-popup"" readonly");
            BeginWriteAttribute("placeholder", " placeholder=\"", 2921, "\"", 2935, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                        <div class=""col-4"">
                            <div class=""row"">
                                <label class=""form-label col-md-3 pt-2"">Área</label>
                                <div class=""col-md-9"">
                                    <input id=""txtArea"" type=""text"" class=""form-control label-popup""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 3383, "\"", 3397, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row mb-1"">
                        <div class=""col-8"">
                            <div class=""row"">
                                <label class=""form-label col-md-3 pt-2"">Trabajador Responsable</label>
                                <div class=""col-md-9"">
                                    <input id=""txtTrabajador"" type=""text"" class=""form-control label-popup"" readonly");
            BeginWriteAttribute("placeholder", " placeholder=\"", 3950, "\"", 3964, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                        <div class=""col-4"">
                            <div class=""row"">
                                <label class=""form-label col-md-3 pt-2"">Jefe de Área</label>
                                <div class=""col-md-9"">
                                    <input id=""txtJefeArea"" type=""text"" class=""form-control label-popup""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 4424, "\"", 4438, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row mb-1"">
                        <div class=""col-8"">
                            <div class=""row"">
                                <label class=""form-label col-md-3 pt-2"">Motivo</label>
                                <div class=""col-md-9"">
                                    <input id=""txtMotivo"" type=""text"" class=""form-control label-popup"" readonly");
            BeginWriteAttribute("placeholder", " placeholder=\"", 4971, "\"", 4985, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                        <div class=""col-4"">
                            <div id=""div_txtPeriodo"" class=""row"">
                                <label class=""form-label col-md-3 pt-2"">Periodo</label>
                                <div class=""col-md-9"">
                                    <input id=""txtPeriodo"" type=""text"" class=""form-control label-popup"" readonly");
            BeginWriteAttribute("placeholder", " placeholder=\"", 5468, "\"", 5482, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row mb-1"">
                        <div class=""col-8"">
                            <div class=""row"">
                                <label class=""form-label col-md-3 pt-2"">Fecha</label>
                                <div class=""col-md-9"">
                                    <input id=""txtFecha"" type=""text"" class=""form-control label-popup"" readonly");
            BeginWriteAttribute("placeholder", " placeholder=\"", 6013, "\"", 6027, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row mb-1 mt-4"">
                        <div class=""col-3"">
                            <label class=""form-label col-md-3 pt-2"">Resumen</label>
                            <div id=""div_table_sumSC"">

                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class=""row mb-3"">
                        <div id=""div_tableSC"">

                        </div>
                    </div>
                    <hr />
                    <div class=""row"">
                        <div class=""col"">
                            <div class=""mb-3"">
                                <label for=""txtObservacion"" class=""form-label"">Observación</label>
                                <textarea class=""form-control"" id=""txtObservacion"" rows=""3""></textarea>
     ");
            WriteLiteral("                       </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col\">\r\n");
            WriteLiteral(@"                        </div>
                    </div>

                </div>
            </div>
            <div class=""modal-footer"">
                <button id=""btnRechazar"" type=""button"" class=""btn btn-danger"">Observar</button>
                <button id=""btnAprobar"" type=""button"" class=""btn btn-green"">Enviar a Contabilidad</button>
");
            WriteLiteral("\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div id=\"spinner_loading\" class=\"loading\" style=\"display:none;\">Loading</div>\r\n\r\n");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f3d313f7a8304e85ddc5a9e5402409590cb7301a15371", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    <script>\r\n        var url_ListRendiciones = \"");
#nullable restore
#line 167 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                              Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/ListRendiciones\";\r\n        var url_GetRendicion = \"");
#nullable restore
#line 168 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                           Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/GetRendicion\";\r\n        var url_InsertRendicion = \"");
#nullable restore
#line 169 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                              Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/InsertRendicion\";\r\n        var url_UpdateEstadoRendicion = \"");
#nullable restore
#line 170 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                                    Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/UpdateEstadoRendicion\";\r\n        var url_UpdateAreaRendicion = \"");
#nullable restore
#line 171 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                                  Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/UpdateAreaRendicion\";\r\n        var url_ListCajasCombo = \"");
#nullable restore
#line 172 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                             Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Box/ListCajasCombo\";\r\n        var url_GetRequisiciones = \"");
#nullable restore
#line 173 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                               Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/GetRequisiciones\";\r\n        var url_DeleteRendicion = \"");
#nullable restore
#line 174 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                              Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/DeleteRendicion\";\r\n        var url_ConsultaRuc = \"");
#nullable restore
#line 175 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                          Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/ConsultaRuc\";\r\n        var url_ListSustentos = \"");
#nullable restore
#line 176 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                            Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/ListSustentos\";\r\n        var url_ListSustentoById = \"");
#nullable restore
#line 177 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                               Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/ListSustentoById\";\r\n        var url_InsertSustento = \"");
#nullable restore
#line 178 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                             Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/InsertSustento\";\r\n        var url_DeleteSustento = \"");
#nullable restore
#line 179 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                             Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/DeleteSustento\";\r\n        var url_VerPDFFactura = \"");
#nullable restore
#line 180 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                            Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/VerPDFFactura\";\r\n        var url_GetVouchers = \"");
#nullable restore
#line 181 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                          Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/GetVouchers\";\r\n        var url_GetFileVoucher = \"");
#nullable restore
#line 182 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                             Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/GetFileVoucher\";\r\n        var url_GetCorreoContadores = \"");
#nullable restore
#line 183 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                                  Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/GetCorreoContadores\";\r\n        var url_SendMail = \"");
#nullable restore
#line 184 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                       Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/SendMail\";\r\n        var url_UpdateEstadoRendicion = \"");
#nullable restore
#line 185 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
                                    Write(Url.Content("~/"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\" + \"Rendicion/UpdateEstadoRendicion\";\r\n    </script>\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 9938, "\"", 9981, 1);
#nullable restore
#line 187 "D:\Dev\ADGRendicion\FrontEnd.Web\Views\Rendicion\JefeArea.cshtml"
WriteAttributeValue("", 9944, Url.Content("~/Scripts/jefeArea.js"), 9944, 37, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n");
            }
            );
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
