using System;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using Beep.APIClient;
using Beep.DataModels;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Beep.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.Configure<CookiePolicyOptions>(options =>
            //{
            //    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            //    options.CheckConsentNeeded = context => true;
            //    options.MinimumSameSitePolicy = SameSiteMode.None;
            //});


            Log.Logger = new LoggerConfiguration()
               .ReadFrom.Configuration(Configuration)
               .Enrich.FromLogContext()
               .CreateLogger();


            services.AddOData();
            services.AddMvc();//.SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie();

            services.AddTransient<LoggingHandler>();
            services.AddHttpClient<BeepAPIClient>(c =>
            {
                c.BaseAddress = new Uri("https://custcorpd.ameren.com:8443/");
            })
            .ConfigurePrimaryHttpMessageHandler(() =>
            {
                return new HttpClientHandler()
                {
                    UseDefaultCredentials = true,
                    //Proxy = new WebProxy("http://proxy.ameren.com", false),
                    //UseProxy = true
                };
            })
            .AddHttpMessageHandler<LoggingHandler>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
            //    _logger.LogCritical()
            //    app.UseDeveloperExceptionPage();
            //}
            //else
            //{


            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var exception = errorFeature.Error;
                    dynamic user = null;
                    var errorID = new Guid().ToString();

                    var err = Log.ForContext("Source", exception.TargetSite?.ReflectedType?.Name);
                    err = err.ForContext("ENV", env.EnvironmentName);

                    if (context.User.Identity.IsAuthenticated)
                    {
                        user =
                        new
                        {
                            UserID = context?.User?.Identity.Name,
                            Role = context?.User?.Claims?.SingleOrDefault(a => a.Type == ClaimTypes.Role)?.Value
                        };
                        err = err.ForContext("User", user);
                    }

                    err.Error(exception, exception.Message);
                    string responseMessage = "";
                    if (exception.GetType() == typeof(UnauthorizedAccessException))
                        context.Response.StatusCode = 401;
                    else if (exception.GetType() == typeof(BeepException))
                    {
                        context.Response.StatusCode = 400;
                        responseMessage = exception.Message;
                    }
                    else
                        context.Response.StatusCode = 500;
                    await context.Response.WriteAsync(responseMessage);
                });
            });
            app.UseHsts();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();

            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                name: "api",
                template: "api/{controller}/{action}/{id?}");

                routes.EnableDependencyInjection();
                routes.Select().Expand().Filter().OrderBy().MaxTop(100).Count();

                routes.MapRoute(
                    name: "default",
                   defaults: new { controller = "Home", action = "Index" },
                    template: "{*url}");
            });
        }
    }
}
