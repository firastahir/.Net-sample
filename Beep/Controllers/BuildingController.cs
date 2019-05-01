using Beep.DataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beep.Controllers
{
  public class BuildingController : BaseController
  {
    private readonly IBuildingRepository _buildingRepo;
    public BuildingController(IBuildingRepository buildingRepo)
    {
      _buildingRepo = buildingRepo;
    }
   
    [HttpGet]
    public ActionResult GetBuildings()
    {
      try
      {
        var buildings = _buildingRepo.GetBuildings("");
        return AngularJsonResult(buildings);
      }
      catch(Exception ex)
      {
        //log here
        throw;
      }
    }
    public ActionResult GetBuildingDetail(int id)
    {
      var building = _buildingRepo.GetBuilding(id);
      return AngularJsonResult(building);
    }
  }
}
