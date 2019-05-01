using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace Beep.APIClient
{
    public class LoggingHandler : DelegatingHandler
    {

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            var response = new HttpResponseMessage();
            var sw = Stopwatch.StartNew();
            try
            {
                //Add Token
                // base.SendAsync calls the inner handler
                response = await base.SendAsync(request, cancellationToken);
                sw.Stop();
                if(response.IsSuccessStatusCode)
                Log.Logger.Information("API RESPONSE TIME {URL}{TIME ELAPSED}", request.RequestUri.AbsolutePath, sw.Elapsed);
                else
                    Log.Logger.Error("API ERROR {@Request} {@Response}", request, response);

            }
            catch (Exception ex)
            {
                Log.Logger.Error(ex,"API ERROR {@Request}", request);
            }
            return response;
        }
    }
}
