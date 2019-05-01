using Beep.DataAccess;
using Beep.DataContracts;
using System.Web.Mvc;
using Unity;
using Unity.Mvc5;

namespace Beep
{
  public static class UnityConfig
  {
    public static void RegisterComponents()
    {
      var container = new UnityContainer();
      container.RegisterType<IBuildingRepository, BuildingRepository>();
      DependencyResolver.SetResolver(new UnityDependencyResolver(container));
    }
  }
}
