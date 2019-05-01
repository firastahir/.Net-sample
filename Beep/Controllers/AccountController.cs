using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Beep.Models;
using System.Web.Http;

namespace Beep.Controllers
{
  public class AccountController : Controller
    {

    #region Authentication

    #endregion


    #region Manage Profile

    // Get User Profile
    public ActionResult GetProfile()
    {
      return null;
    }

    #endregion
  }
}
