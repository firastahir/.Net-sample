using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Beep.Web.Models;
using Microsoft.Extensions.Logging;
using System.IO;
using Beep.APIClient;
using Microsoft.Extensions.Configuration;
using System;

namespace Beep.Web.Controllers
{
    public class HomeController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult GetBannerImages()
        {
            System.IO.DirectoryInfo di = new System.IO.DirectoryInfo("wwwroot/Content/images/banner");
            var result = new List<string>();
            foreach (FileInfo file in di.GetFiles())
            {
                result.Add(file.Name);
            }
            return AngularJsonResult(result);
        }

        public IActionResult GetFaqs()
        {
            string faqs = "{}";
            return AngularJsonResult(faqs);
        }

        [HttpPost]
        public IActionResult ContactUs()
        {
            return Ok();
        }
    }
}
