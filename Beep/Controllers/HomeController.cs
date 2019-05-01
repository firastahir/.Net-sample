using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beep.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      return View();
    }

    [HttpGet]
    public ActionResult GetBuildings()
    {
      List<object> buildings = new List<object>();
      for (int i = 1; i <= 20; i++)
      {
        buildings.Add(new { ID = i, Building = "Building - " + i });
      }
      return Json(buildings,JsonRequestBehavior.AllowGet);
    }
  }
}
