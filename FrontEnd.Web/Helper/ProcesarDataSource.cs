
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Helper
{
    public class ProcesarDataSource
    {
        public string name { get; set; }
        public object data { get; set; }
    }

    public class Rpt_Procesar
    {
        public List<object> GET(string ReportPath, List<ProcesarDataSource> ds, string[] Parametro, string formato = "PDF")
        {
            List<object> retorno = new List<object>();
            LocalReport localReport = new LocalReport();
            localReport.DataSources.Clear();
            localReport.ReportPath = ReportPath;
            localReport.EnableExternalImages = true;

            foreach (var item in ds)
            {
                ReportDataSource rds = new ReportDataSource();
                rds.Name = item.name;
                rds.Value = item.data;
                localReport.DataSources.Add(rds);
            }

            var vrEstado = Parametro.Where(x => x.Trim().Length != 0).ToArray();

            try
            {
                if (Parametro != null)
                {
                    ReportParameter[] parameters = new ReportParameter[Parametro.Where(x => x.Trim().Length != 0).ToList().Count()];

                    int Items = 0;
                    foreach (var Parameter in Parametro.Where(x => x.Trim().Length != 0))
                    {
                        string[] ParametersList = Parameter.Split("|".ToCharArray());

                        parameters[Items] = new ReportParameter(ParametersList[0], ParametersList[1]);
                        Items++;
                    }
                    localReport.SetParameters(parameters);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            Warning[] warnings;
            string[] streamids;
            string mimeType;
            string encoding;
            string extension;

            byte[] bytes = localReport.Render(formato, null, out mimeType, out encoding, out extension, out streamids, out warnings);

            retorno.Add(bytes);
            retorno.Add(mimeType);

            return retorno;
        }
    }
}
