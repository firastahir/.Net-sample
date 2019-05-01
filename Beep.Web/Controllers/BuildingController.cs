using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Beep.APIClient;
using Beep.DataModels;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Beep.Web.Controllers
{

    public class BuildingController : BaseController
    {
        private BeepAPIClient _beepAPIClient;
        private IConfiguration _config;
        public BuildingController(BeepAPIClient beepAPIClient, IConfiguration config)
        {
            _beepAPIClient = beepAPIClient;
            _config = config;
        }

        [HttpGet]
        [EnableQuery()]
        public async Task<IActionResult> GetBuildings()
        {
            // var result = @"[{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63014""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63015""},{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63016""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63017""},{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63018""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63019""},{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65215,""name"":""Main Street Marriot"",""function"":""Hotel"",""addressLine1"":""123 Main Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""},{""buildingId"":65216,""name"":""Central Administration"",""function"":""Office"",""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013""}]";

            var buildings = new List<Building>();
            for (int i = 1; i <= 2000; i++)
            {
                var building = new Building()
                {

                    AddressLine1 = Faker.Address.StreetAddress(),
                    BuildingId = i,
                    City = Faker.Address.City(),
                    ZipCode = 63040 + i,
                    Function = i % 10 == 0 ? "Hotel" : "Office",
                    State = "Missouri",
                    EpmBuildingId = i,
                    FloorArea = i * 10
                };
                if (i % 2 == 0)
                    building.Function = "Hotel";
                else if (i % 3 == 0)
                    building.Function = "Office";
                else if (i % 4 == 0)
                    building.Function = "Adult Education";
                else if (i % 5 == 0)
                    building.Function = "Aquarium";
                else if (i % 6 == 0)
                    building.Function = "Bank Branch";
                else if (i % 7 == 0)
                    building.Function = "Data Center";
                else if (i % 8 == 0)
                    building.Function = "Library";
                else if (i % 9 == 0)
                    building.Function = "Casino";
                else if (i % 10 == 0)
                    building.Function = "Parking";
                buildings.Add(building);

            }

           //await _beepAPIClient.CallAPI(new APIRequest(
           //    _config.GetSection("API.GetBuildingsByUserId").Value + User.Identity.Name/*come back for this*/
           //    , HttpMethod.Get));
            var result = JsonConvert.SerializeObject(buildings);

            //Make sure to return typed list for EnableQuery to work.
            List<Building> list = JsonConvert.DeserializeObject<List<Building>>(result);
            list[0].TotalBuildings = list.AsQueryable().Count();
            return Ok(list.AsQueryable());
        }

        public async Task <ActionResult> GetBuildingDetail(int id)
        {
            //APIRequest request = new APIRequest(
            //    _config.GetSection("API.GetBuildingDetails").Value + id
            //    , HttpMethod.Get);
            //var response = await _beepAPIClient.CallAPI(request);
            //if (response.Success)
            //    return Ok(response.ResponseString);

            var result = @"{""buildingId"":65216,""epmBuildingId"":496550,""name"":""Central Administration"",""constructionStatus"":""Existing"",""function"":""Office"",""floorArea"":60000,""yearBuilt"":2008,""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013"",""occupancyPercent"":98.5,""comments"":""Renovated in 2007"",""autoExportOptIn"":true,""premiseList"":[{""premiseId"":320932092,""addressLine1"":""1 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013"",""numberOfMeters"":3},{""premiseId"":320932154,""addressLine1"":""20 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013"",""numberOfMeters"":2},{""premiseId"":32093215,""addressLine1"":""21 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013"",""numberOfMeters"":2},{""premiseId"":3209321,""addressLine1"":""25 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013"",""numberOfMeters"":2},{""premiseId"":320932,""addressLine1"":""2 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013"",""numberOfMeters"":2},{""premiseId"":32093215412,""addressLine1"":""24 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013"",""numberOfMeters"":2},{""premiseId"":32093215423,""addressLine1"":""23 Central Street"",""city"":""St.Louis"",""state"":""MO"",""zipCode"":""63013"",""numberOfMeters"":2}]}";
            return Ok(result);
        }


        public async Task<IActionResult> SearchLocationsByAddress(string address)
        {
            //var request = new APIRequest(
            //    _config.GetSection("API.SearchPremiseByAddressOrMeter").Value
            //    , HttpMethod.Get);
            //request.AddHeaderValue("address", address);//fill in other things later or is everything in the address string?
            ////request.AddHeaderValue("streetNumber", streetNumber);
            ////request.AddHeaderValue("streetName", streetName);
            ////request.AddHeaderValue("preDirectional", preDirectional);
            ////request.AddHeaderValue("streetSuffix", streetSuffix);
            ////request.AddHeaderValue("postDirectional", postDirectional);
            ////request.AddHeaderValue("city", city);
            ////request.AddHeaderValue("state", state);
            ////request.AddHeaderValue("zip", zip);
            //var result = await _beepAPIClient.CallAPI(request);
            //if (result.Success)
            //    return Ok(result.ResponseString);
            //else
            //    throw new BeepException("No results found for your search criteria. Please modify your search and try again.");
            var locations = new List<object>();
            for (int i = 1; i <= 10; i++)
            {
                locations.Add(new
                {
                    premiseId = i,
                    addressLine1 = i + " " + address,
                    city = "Bridgeton",
                    zipCode = 63040 + i,
                    state = "MO"
                });
            }

            return AngularJsonResult(locations);
        }



        public async Task<IActionResult> SearchLocationsByMeterID(string meter)
        {
            //var request = new APIRequest(
            //    _config.GetSection("API.SearchPremiseByAddressOrMeter").Value
            //    , HttpMethod.Get);
            //request.AddHeaderValue("meterNumber", meter);
            //var result = await _beepAPIClient.CallAPI(request);
            //if (result.Success)
            //    return Ok(result.ResponseString);
            //else
            //    throw new BeepException("No results found for your search criteria. Please modify your search and try again.");

           // var locations = new List<object>();
            var location = new
            {
                premiseId = new Random().Next(1000, 10000),
                addressLine1 = Faker.Address.StreetAddress(),
                addressLine2 = Faker.Address.SecondaryAddress(),
                city = "St Louis",
                zipCode = 63141,
                state = "MO"
            };


            return AngularJsonResult(location);
        }

        //  [Route("/api/Building/createBuilding")]

        [Authorize(Roles = "BenchMarker")]//see this
        public async Task <IActionResult> CreateBuilding([FromBody] Building building)
        {
            //await _beepAPIClient.CallAPI(
            //    new APIRequest(_config.GetSection("API.CreateBuilding").Value + User.Identity.Name/*come back for this*/
            //    , HttpMethod.Post)
            //    , building);
            return Ok();
        }

        [Authorize(Roles = "BenchMarker")]
        public async Task<IActionResult> AddBuilding(int buildingID)//should we pass in Building here?
        {
            //await _beepAPIClient.CallAPI(
            //                new APIRequest(_config.GetSection("API.CreateBuilding").Value + User.Identity.Name/*come back for this*/
            //                , HttpMethod.Post));
            return Ok();
        }
        public async Task<IActionResult> EditBuilding([FromBody] Building building)
        {
            //await _beepAPIClient.CallAPI(
            //    new APIRequest(_config.GetSection("API.EditBuilding").Value + User.Identity.Name/*come back for this*/
            //    , HttpMethod.Put)
            //    , building);
            return Ok();
        }
        public async Task<IActionResult> GetUsageData(int id)
        {
            //var request = new APIRequest(
            //    _config.GetSection("API.GetAggregateUsageByBuildingID").Value + id
            //    , HttpMethod.Get);
            //request.AddHeaderValue("dateFrom", "");
            //request.AddHeaderValue("dateTo", "");
            //var result = await _beepAPIClient.CallAPI(request);
            //if (result.Success)
            //    return AngularJsonResult(result.ResponseString, false);


            var data = new List<BuildingUsage>();

            for (int i = 0; i < 25; i++)
            {
                data.Add(new BuildingUsage() { meterType = "Electric", meterID = "983981", meterUsage = "540000", dateFrom = "2018-06-01", dateTo = "2018-06-30" });
                data.Add(new BuildingUsage() { meterType = "Gas", meterID = "983982", meterUsage = "600010", dateFrom = "2018-06-01", dateTo = "2018-06-30" });
            }


            return AngularJsonResult(data);

        }

        [Authorize(Roles = "BenchMarker")]
        public async Task<IActionResult> ExportToEnergyStar(int id)
        {
            //await _beepAPIClient.CallAPI(
            //    new APIRequest(
            //        _config.GetSection("API.PostUsageToEPM").Value + id
            //    , HttpMethod.Post));
            return Ok();
        }
    }
}