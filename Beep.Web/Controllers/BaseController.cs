using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Beep.Web.Controllers
{
    public class BaseController : Controller
    {
        protected ActionResult AngularJsonResult(object content, bool serialize = true)
        {

            return new ContentResult
            {
                ContentType = "application/json",
                Content = !serialize ? (string)content : JsonConvert.SerializeObject(content, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }),
            };
        }
        protected BeepUser CurrentUser
        {
            get
            {
                if (User.Identity.IsAuthenticated)
                    return SetCurrentUser();
                return null;
            }
        }

        protected BeepUser SetCurrentUser()
        {
            return new BeepUser
            {
                Role = User.Claims.SingleOrDefault(a => a.Type == ClaimTypes.Role).Value,
                UserId = User.Claims.SingleOrDefault(a => a.Type == ClaimTypes.Sid).Value,
                UserName = User.Identity.Name
            };
        }
    }

    public class BeepUser
    {
        public string UserName { get; set; }
        public string UserId { get; set; }
        public string Role { get; set; }
        public bool HasUnfinishedEPMConnect { get; set; }
    }

    //public static class BeepUserRole
    //{
    //    public const string Benchmarker = "Benchmarker";
    //    public const string NonBenchmarker = "NonBenchmarker";
    //}
}