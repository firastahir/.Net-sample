using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Beep.Startup))]
namespace Beep
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
