using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beep.Controllers
{
  public class BaseController : Controller
  {
   

    protected ActionResult AngularJsonResult(object content)
    {
      return new ContentResult
      {
        ContentType = "application/json",
        Content = JsonConvert.SerializeObject(content, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }),
      };
    }
  }
}
