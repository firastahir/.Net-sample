using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Beep.DataModels;
using Beep.Web.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Beep.Web.Controllers
{
    public class AccountController : BaseController
    {

        public IActionResult Index()
        {
            return View();
        }

        #region Registration
        [HttpPost]
        public async Task<IActionResult> InitialRegistration()
        {
            //Generate Guid
            Guid g = Guid.NewGuid();
            return Ok();
        }

        public async Task<IActionResult> ConfirmEmail()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> EpmRegistration()
        {
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetEpmData(string userId)
        {
            string epmData = "{}";
            return AngularJsonResult(epmData);
        }
        #endregion

        #region Manage Profile
        public IActionResult ChangePassword()
        {
            return Ok();
        }
        public IActionResult ChangeName()
        {
            return Ok();
        }
        public IActionResult ChangeSecurityQuestion()
        {
            return Ok();
        }
        public IActionResult ChangeEmail()
        {
            return Ok();
        }
        #endregion

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel viewModel)
        {
            var identity = new ClaimsIdentity();

            if (viewModel.UserID.Equals("truan"))
            {
                identity = new ClaimsIdentity(new[]{
                new Claim(ClaimTypes.Name,viewModel.UserID),
                new Claim("UserID",viewModel.UserID),

                new Claim(ClaimTypes.Sid,viewModel.UserID),
                new Claim(ClaimTypes.Role,"benchMarker")
            }, CookieAuthenticationDefaults.AuthenticationScheme);
            }
            else if (viewModel.UserID.Equals("kiran"))
            {
                identity = new ClaimsIdentity(new[]{
                new Claim(ClaimTypes.Name,viewModel.UserID),
                new Claim("UserID",viewModel.UserID),

                new Claim(ClaimTypes.Sid,viewModel.UserID),
                new Claim(ClaimTypes.Role,"admin")
            }, CookieAuthenticationDefaults.AuthenticationScheme);
            }
            else if (viewModel.UserID.Equals("kaitlyn"))
            {
                identity = new ClaimsIdentity(new[]{
                new Claim(ClaimTypes.Name,viewModel.UserID),
                new Claim("UserID",viewModel.UserID),

                new Claim(ClaimTypes.Sid,viewModel.UserID),
                new Claim(ClaimTypes.Role,"nonBenchMarker")
            }, CookieAuthenticationDefaults.AuthenticationScheme);
            }
            else
            {
                identity = new ClaimsIdentity(new[]{
                new Claim(ClaimTypes.Name,viewModel.UserID),
                new Claim("UserID",viewModel.UserID),

                new Claim(ClaimTypes.Sid,viewModel.UserID),
                new Claim(ClaimTypes.Role,"benchMarker")
            }, CookieAuthenticationDefaults.AuthenticationScheme);
            }

            //throw new BeepException("The UserID and/or Password you entered does not match our records. Please try again.")
            //var identity = new ClaimsIdentity(new[]{
            //    new Claim(ClaimTypes.Name,viewModel.UserID),
            //    new Claim("UserID",viewModel.UserID),
            //    //new Claim("Role","nonBenchMarker"),
            //                    new Claim("Role","benchMarker"),

            //    new Claim(ClaimTypes.Sid,viewModel.UserID),
            //    //new Claim(ClaimTypes.Role,"nonBenchMarker")
            //    new Claim(ClaimTypes.Role,"benchMarker")
            //}, CookieAuthenticationDefaults.AuthenticationScheme);

            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return Ok();
        }

        [Authorize]
        public IActionResult GetUser()
        {
            SetCurrentUser();
            return AngularJsonResult(new { Name = User.Identity.Name, Role = User.Claims.SingleOrDefault(a => a.Type == ClaimTypes.Role).Value });
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}