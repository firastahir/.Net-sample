using Beep.DataContracts;
using Beep.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beep.DataAccess
{
    public class BuildingRepository : IBuildingRepository
    {
        public Building GetBuilding(int i)
        {
            var locations = new List<Location>();
            for (int j = 1; j <= 10; j++)
            {
                locations.Add(new Location()
                {
                    Address = new Address()
                    {
                        AddressLine1 = i+"31" + j + " Bridgeton Trails Dr",
                        City = "Bridgeton",
                        State = "MO",
                        ZipCode = 63044 + j
                    }
                });
            }
            var building = new Building()
            {
                BuildingID = i.ToString(),
                BuildingType = "Building Type - " + i,
                Description = "Building Description -  " + i.ToString(),
                ElectricMeterID = "Meter - " + i,
                GasMeterID = "Gas Meter - " + i,
                SqFeet = i * 123,
                Locations = locations,
                Address = new Address()
                {
                    AddressLine1 = i + "31" + i + " Bridgeton Trails Dr",
                    City = "Bridgeton",
                    State = "MO",
                    ZipCode = 63044 + i
                }
            };
            return building;
        }

        public List<Building> GetBuildings(string userID)
        {
            var buildings = new List<Building>();

            for (int i = 1; i <= 10; i++)
            {
                buildings.Add(new Building()
                {
                    BuildingID = i.ToString(),
                    BuildingType = "Building Type - " + i,
                    Description = "Building Description -  " + i.ToString(),
                    ElectricMeterID = "Meter - " + i,
                    GasMeterID = "Gas Meter - " + i,
                    SqFeet = i * 123,
                    LocationCount=i*6,
                    Address = new Address()
                    {
                        AddressLine1 = i + "31" + i + " Bridgeton Trails Dr",
                        City = "Bridgeton",
                        State = "MO",
                        ZipCode = 63044 + i
                    }
                });
            }
            return buildings;
        }
    }
}
