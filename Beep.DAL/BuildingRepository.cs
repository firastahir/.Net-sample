using Beep.APIClient;
using Beep.Contracts;
using Beep.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Beep.DAL
{
    public class BuildingRepository : IBuildingRepository
    {
        private BeepAPIClient _apiClient;
        private IHttpClientFactory _httpClientFactory;
        public BuildingRepository(BeepAPIClient apiClient)
        {
            _apiClient = apiClient;
        }
        public Building GetBuilding(int i)
        {
            var locations = new List<Location>();
            for (int j = 1; j <= 10; j++)
            {
                locations.Add(new Location()
                {
                    PremiseNumber = j,
                    Address = new Address()
                    {
                        AddressLine1 = i + "31" + j + " Bridgeton Trails Dr",
                        City = "Bridgeton",
                        State = "MO",
                        ZipCode = 63044 + j
                    }
                });
            }
            var building = new Building()
            {
                BuildingID = i,
                Function = "Building Type - " + i,
                Description = "Building Description -  " + i.ToString(),
                ElectricMeterID = "Meter - " + i,
                GasMeterID = "Gas Meter - " + i,
                FloorArea = i * 123,
                Locations = locations,
                Address = new Address()
                {
                    AddressLine1 = i + "31" + i + " Bridgeton Trails Dr",
                    City = "Bridgeton",
                    State = "MO",
                    ZipCode = 63044 + i
                },
                ConstructionStatus = "Existing",
                OccupancyPercent = i + 90,
                YearBuilt = 1990 + i
            };
            return building;
        }

        public List<Building> GetBuildings(string userID)
        {

            var apiRequest = new APIRequest("exp/beep/v1/benchmarking/building", HttpMethod.Get);

            apiRequest.AddQueryValue("userID", userID);
            // return _apiClient.CallAPI<List<Building>>(apiRequest).Result;

            return null;


            //for (int i = 1; i <= 10; i++)
            //{
            //    buildings.Add(new Building()
            //    {
            //        BuildingID = i,
            //        Function = "Building Type - " + i,
            //        Description = "Building Description -  " + i.ToString(),
            //        ElectricMeterID = "Meter - " + i,
            //        GasMeterID = "Gas Meter - " + i,
            //        FloorArea = i * 123,
            //        LocationCount = i * 6,
            //        Address = new Address()
            //        {
            //            AddressLine1 = i + "31" + i + " Bridgeton Trails Dr",
            //            City = "Bridgeton",
            //            State = "MO",
            //            ZipCode = 63044 + i
            //        },
            //        ConstructionStatus = "Existing",
            //        OccupancyPercent = i + 90,
            //        YearBuilt=1990+i
            //    });
            //}
            //  return buildings;
        }
    }
}
